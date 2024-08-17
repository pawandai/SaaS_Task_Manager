import BoardNavbar from "@/components/DashboardComponents/boards/boardNavbar";
import { database } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) redirect("/selectOrganization");

  const board = await database.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) notFound();

  return (
    <div
      className="relative h-[92vh] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/20" />
      <main className="relative pt-8 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
