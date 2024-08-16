import Info from "@/components/DashboardComponents/organization/info";
import OrganizationControl from "@/components/OrgComponents/orgControl";

const OrganizationPage = async () => {
  return (
    <div className="flex flex-col space-y-4">
      <OrganizationControl />
      <Info />
    </div>
  );
};

export default OrganizationPage;
