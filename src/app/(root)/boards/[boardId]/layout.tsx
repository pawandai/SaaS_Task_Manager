import BoardNavbar from "@/components/DashboardComponents/boards/boardNavbar";
import { ModalProvider } from "@/components/providers/modalProvider";
import { QueryProvider } from "@/components/providers/queryProvider";
import { database } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

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
    <QueryProvider>
      <div
        className="relative h-[92vh] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      >
        <Toaster richColors position="top-center" />
        <ModalProvider />
        <BoardNavbar data={board} />
        <div className="absolute inset-0 bg-black/20" />
        <main className="relative pt-8 h-full">{children}</main>
      </div>
    </QueryProvider>
  );
};

export default BoardIdLayout;
