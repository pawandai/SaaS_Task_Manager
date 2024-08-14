import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { PropsWithChildren } from "react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className={`${urbanist.className}`}>{children}</div>;
};

export default AuthLayout;
