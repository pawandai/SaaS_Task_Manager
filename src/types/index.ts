import { Card, List } from "@prisma/client";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

export type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type ListWithCard = List & { cards: Card[] };
export type CardWithList = Card & { list: List };
