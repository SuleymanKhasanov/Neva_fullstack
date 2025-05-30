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
  setSection: (section) => {
    const normalizedSection = section === 'all' ? 'all' : section; // Уже в верхнем регистре
    console.log('Setting section in store:', normalizedSection);
    set({ section: normalizedSection, brandId: null });
  },
  setBrandId: (brandId) => {
    console.log('Setting brandId in store:', brandId);
    set({ brandId });
  },
}));
