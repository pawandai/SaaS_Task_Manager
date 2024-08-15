"use server";

import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const createBoard = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = createBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await database.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database error",
    };
  }

  revalidatePath("/organization/org_2kgKGsyKPAvbE86R4IEhdPP2eQq");
  redirect("/organization/org_2kgKGsyKPAvbE86R4IEhdPP2eQq");
}

export async function deleteBoard(id: string) {
  await database.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2kgKGsyKPAvbE86R4IEhdPP2eQq");
}
