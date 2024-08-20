import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = ({
  action,
  entityType,
  entityTitle,
}: AuditLog) => {
  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} ${entityTitle}`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} ${entityTitle}`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} ${entityTitle}`;
    default:
      return `Performed action ${entityTitle.toLowerCase()} on ${entityTitle}`;
  }
};
