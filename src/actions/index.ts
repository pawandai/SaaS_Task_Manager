"use server";

import { createBoard } from "./createBoard";
import { updateBoard } from "./updateBoard";
import { deleteBoard } from "./deleteBoard";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export { createBoard, updateBoard, deleteBoard };
