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
