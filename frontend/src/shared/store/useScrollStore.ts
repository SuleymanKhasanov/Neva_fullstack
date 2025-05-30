import { create } from 'zustand';

interface ScrollStore {
  isScrollEnd: boolean;
  setIsScrollEnd: (value: boolean) => void;
  isLoadingNext: boolean;
  setIsLoadingNext: (value: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrollEnd: false,
  setIsScrollEnd: (value) => set({ isScrollEnd: value }),
  isLoadingNext: false,
  setIsLoadingNext: (value) => set({ isLoadingNext: value }),
}));
