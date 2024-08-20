import { create } from "zustand";
import { ProModalStore } from "@/types";

export const useProModal = create<ProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
