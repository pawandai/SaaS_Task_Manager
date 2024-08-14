import { OrganizationList } from "@clerk/nextjs";

const SelectOrganizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
};

export default SelectOrganizationPage;
