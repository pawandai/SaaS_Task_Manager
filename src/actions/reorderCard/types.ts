import { z } from "zod";
import { ReorderCard } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof ReorderCard>;
export type ReturnType = ActionState<InputType, Card[]>;
