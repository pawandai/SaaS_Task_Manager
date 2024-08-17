import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title is require",
      invalid_type_error: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(255),
  boardId: z.string(),
});
