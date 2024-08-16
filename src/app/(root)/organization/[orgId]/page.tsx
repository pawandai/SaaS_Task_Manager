import BoardList from "@/components/DashboardComponents/boards/boardList";
import Info from "@/components/DashboardComponents/organization/info";
import OrganizationControl from "@/components/OrgComponents/orgControl";
import { Separator } from "@/components/ui/separator";

const OrganizationPage = async () => {
  return (
    <div className="flex flex-col space-y-4">
      <OrganizationControl />
      <Info />
      <Separator />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationPage;
