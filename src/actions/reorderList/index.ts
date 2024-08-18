"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { ReorderList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      database.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await database.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder list",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: lists };
};

export const reorderList = createSafeAction(ReorderList, handler);
