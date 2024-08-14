import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) NextResponse.redirect(new URL("/sign-in", req.url));

  if (auth().userId && isPublicRoute(req)) {
    let path = "/selectOrganization";

    if (auth().orgId) path = `/organization/${auth().orgId}`;

    const organizationSelection = new URL(path, req.url);
    return NextResponse.redirect(organizationSelection);
  }

  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/selectOrganization"
  ) {
    const organizationSelection = new URL("/selectOrganization", req.url);
    return NextResponse.redirect(organizationSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
