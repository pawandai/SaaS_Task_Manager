import { createBoard } from "./createBoard";
import { updateBoard } from "./updateBoard";
import { deleteBoard } from "./deleteBoard";
import { createList } from "./createList";
import { updateList } from "./updateList";
import { deleteList } from "./deleteList";
import { copyList } from "./copyList";
import { createCard } from "./createCard";
import { reorderList } from "./reorderList";
import { reorderCard } from "./reorderCard";
import { updateCard } from "./updateCard";
import { copyCard } from "./copyCard";
import { deleteCard } from "./deleteCard";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export {
  createBoard,
  updateBoard,
  deleteBoard,
  createList,
  updateList,
  deleteList,
  copyList,
  createCard,
  reorderList,
  reorderCard,
  updateCard,
  copyCard,
  deleteCard,
};
