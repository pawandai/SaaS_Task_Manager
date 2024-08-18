import { z } from "zod";
import { ReorderList } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof ReorderList>;
export type ReturnType = ActionState<InputType, List[]>;
