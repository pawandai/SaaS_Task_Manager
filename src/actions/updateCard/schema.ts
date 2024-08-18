import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, { message: "Description must be at least 3 characters" })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title is require",
        invalid_type_error: "Title is required",
      })
      .min(3, { message: "Title must be at least 3 characters" })
      .max(255)
  ),
  id: z.string(),
});
