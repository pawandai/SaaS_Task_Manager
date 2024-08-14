import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 landing-background flex flex-col">
      <main className="flex flex-col items-center py-12 flex-1">
        <h1 className="text-4xl font-bold mb-4 text-center text-gradient">
          Welcome to Task Manager App
        </h1>
        <p className="text-lg text-center max-w-2xl mb-8">
          Organize, prioritize, and track your tasks easily with our Task
          Manager App. Start achieving your goals today!
        </p>
        <Link
          href="/signup"
          className={`${buttonVariants({
            size: "lg",
            variant: "secondary",
          })}`}
        >
          Get Started &nbsp;&rarr;
        </Link>
      </main>

      <footer className="flex items-center justify-center py-6 bg-gray-200 mt-10">
        <p className="text-gray-600">
          © 2024 Task Manager App.{" "}
          <span className="hidden sm:inline">All rights reserved.</span>
        </p>
      </footer>
    </div>
  );
}
