import { auth } from "@clerk/nextjs/server";
import { database } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const increaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await database.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit)
    await database.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  else
    await database.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
};
export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await database.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit)
    await database.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  else
    await database.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await database.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) return true;
  else return false;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) return 0;

  const orgLimit = await database.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  return orgLimit?.count || 0;
};
