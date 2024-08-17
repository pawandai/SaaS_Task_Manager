"use server";

import { createBoard } from "./createBoard";
import { updateBoard } from "./updateBoard";
import { deleteBoard } from "./deleteBoard";
import { createList } from "./createList";
import { updateList } from "./updateList";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export { createBoard, updateBoard, deleteBoard, createList, updateList };
