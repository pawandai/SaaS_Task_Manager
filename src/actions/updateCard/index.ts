"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { id, boardId, ...rest } = data;
  let card;

  try {
    card = await database.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...rest,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update card",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
