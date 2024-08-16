"use server";

import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createBoard } from "./createBoard";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export async function deleteBoard(id: string) {
  await database.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2kgKGsyKPAvbE86R4IEhdPP2eQq");
}

export { createBoard };
