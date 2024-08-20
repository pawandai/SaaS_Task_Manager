import { Sidebar } from "@/components/DashboardComponents";
import { ModalProvider } from "@/components/providers/modalProvider";
import { QueryProvider } from "@/components/providers/queryProvider";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Toaster richColors position="top-center" />
            <ModalProvider />
            {/* Here goes the sidebar */}
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </QueryProvider>
  );
};

export default OrganizationLayout;
