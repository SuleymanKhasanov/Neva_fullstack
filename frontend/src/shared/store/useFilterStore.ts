import { create } from 'zustand';

interface FilterState {
  section: string;
  brandId: number | null;
  setSection: (section: string) => void;
  setBrandId: (brandId: number | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  section: 'all',
  brandId: null,
  setSection: (section: string) => {
    console.log('Setting section:', section);
    set({ section, brandId: null }); // Сбрасываем brandId при смене секции
  },
  setBrandId: (brandId: number | null) => {
    console.log('Setting brandId:', brandId);
    set({ brandId });
  },
}));
