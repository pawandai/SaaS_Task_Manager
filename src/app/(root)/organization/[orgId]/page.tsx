import BoardList from "@/components/DashboardComponents/boards/boardList";
import Info from "@/components/DashboardComponents/organization/info";
import OrganizationControl from "@/components/OrgComponents/orgControl";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import { Suspense } from "react";

const OrganizationPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="flex flex-col space-y-4">
      <OrganizationControl />
      <Info isPro={isPro} />
      <Separator />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationPage;
