"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { ReorderCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      database.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await database.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder card",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: updatedCards };
};

export const reorderCard = createSafeAction(ReorderCard, handler);
