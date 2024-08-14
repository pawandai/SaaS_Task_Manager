import { Header } from "@/components/RootComponents";
import { Metadata } from "next";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "My Tasks",
  description: "Create, manage, and complete your tasks",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${manrope.className}`}>
      <Header />
      {children}
    </div>
  );
};

export default RootLayout;
