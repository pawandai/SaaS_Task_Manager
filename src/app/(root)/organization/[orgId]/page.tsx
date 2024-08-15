import Board from "@/components/DashboardComponents/boards/board";
import Form from "@/components/DashboardComponents/boards/form";
import OrganizationControl from "@/components/OrgComponents/orgControl";
import { database } from "@/lib/db";

const OrganizationPage = async () => {
  const boards = await database.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <OrganizationControl />
      <Form />
      <div className="flex flex-col space-y-4">
        {boards.map(({ id, title }) => (
          <Board key={id} id={id} title={title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
