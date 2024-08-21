"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, increaseAvailableCount } from "@/lib/orgLimit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: "Unauthorized" };

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro)
    return {
      error:
        "You have reached the maximum limit of boards for your organization.",
    };

  const { title, image } = data;

  // const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
  //   image.split("|");

  // if (
  //   !imageId ||
  //   !imageThumbUrl ||
  //   !imageFullUrl ||
  //   !imageLinkHTML ||
  //   !imageUserName
  // )
  //   return { error: "Missing Fields. Failed to create board." };

  let board;

  try {
    board = await database.board.create({
      data: {
        title,
        orgId,
        // Later set the urls to the actual image urls from unsplash api
        imageId: "123",
        imageThumbUrl:
          "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageFullUrl:
          "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageUserName: "Pawan Awasthi",
        imageLinkHTML:
          "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    });
    if (!isPro) await increaseAvailableCount();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return { error: "Failed to create board" };
  }

  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
