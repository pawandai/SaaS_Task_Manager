import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { database } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async ({
  entityId,
  action,
  entityTitle,
  entityType,
}: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) throw new Error("User not found");

    await database.auditLog.create({
      data: {
        action,
        entityId,
        entityType,
        entityTitle,
        orgId,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.fullName as string,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
