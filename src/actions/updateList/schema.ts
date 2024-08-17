import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title is require",
      invalid_type_error: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(255),
  id: z.string(),
  boardId: z.string(),
});
