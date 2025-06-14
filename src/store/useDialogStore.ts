import { ReactNode } from "react";
import { create } from "zustand";

interface DialogOptions {
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'; // Tailwind-inspired sizes
}

interface DialogState {
  isOpen: boolean;
  content: ReactNode | null;
  options: DialogOptions;
  openDialog: (content: ReactNode, options?: DialogOptions) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  options: { maxWidth: 'md', title: '' },
  openDialog: (content, options = {}) =>
    set({
      isOpen: true,
      content,
      options: { maxWidth: 'md', title: '', ...options },
    }),
  closeDialog: () =>
    set((state) => {
      setTimeout(() => set({ content: null }), 300); // Clear content after animation
      return { ...state, isOpen: false };
    }),
}));
