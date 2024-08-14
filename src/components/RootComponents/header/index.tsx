import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="bg-slate-200 w-full p-3">
      <div className="mx-auto max-w-7xl flex justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="sm:block hidden"
          />

          <Button size={"sm"} className="hidden sm:block">
            Create
          </Button>
          <Button size={"sm"} className="sm:hidden block">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/selectOrganization"
            afterSelectOrganizationUrl="/organization/:id"
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            }}
          />
          <UserButton
            afterSwitchSessionUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
