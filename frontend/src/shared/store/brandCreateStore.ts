// frontend/src/shared/store/brandCreateStore.ts
'use client';

import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// ==================== ТИПЫ ====================

interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

interface Translation {
  readonly id: number;
  readonly name: string;
  readonly locale: string;
}

interface CategoryData {
  readonly id: number;
  readonly section: string;
  readonly name: string;
  readonly subcategories?: readonly SubcategoryData[];
}

interface SubcategoryData {
  readonly id: number;
  readonly name: string;
  readonly categoryId?: number;
}

interface LoadingState {
  readonly categories: boolean;
  readonly subcategories: boolean;
}

interface BrandCreateState {
  // Выбранные значения
  readonly selectedSection: string;
  readonly selectedCategory: number | null;
  readonly selectedSubcategory: number | null;

  // Данные
  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];

  // Состояния
  readonly loading: LoadingState;
  readonly error: string;

  // Действия
  readonly setSelectedSection: (section: string) => void;
  readonly setSelectedCategory: (categoryId: number) => void;
  readonly setSelectedSubcategory: (subcategoryId: number) => void;
  readonly clearSelectedSubcategory: () => void;
  readonly clearError: () => void;
  readonly resetForm: () => void;
  readonly loadCategories: (section: string) => Promise<void>;
  readonly loadSubcategories: (categoryId: number) => Promise<void>;
}

// ==================== УТИЛИТЫ ====================

const getItemName = (item: CategoryData | SubcategoryData): string => {
  return item.name || 'Без названия';
};

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  return (
    localStorage.getItem('admin_access_token') ||
    localStorage.getItem('accessToken') ||
    localStorage.getItem('access_token')
  );
};

// ==================== НАЧАЛЬНЫЕ СОСТОЯНИЯ ====================

const initialLoadingState: LoadingState = {
  categories: false,
  subcategories: false,
};

// ==================== ZUSTAND STORE ====================

export const useBrandCreateStore = create<BrandCreateState>()(
  subscribeWithSelector((set, get) => ({
    // Состояние
    selectedSection: '',
    selectedCategory: null,
    selectedSubcategory: null,
    categories: [],
    subcategories: [],
    loading: initialLoadingState,
    error: '',

    // ==================== ДЕЙСТВИЯ ====================

    setSelectedSection: (section: string) => {
      set({
        selectedSection: section,
        selectedCategory: null,
        selectedSubcategory: null,
        subcategories: [],
        error: '',
      });

      // Автоматически загружаем категории для новой секции
      if (section) {
        get().loadCategories(section);
      }
    },

    setSelectedCategory: (categoryId: number) => {
      set({
        selectedCategory: categoryId,
        selectedSubcategory: null,
        subcategories: [],
        error: '',
      });

      // Автоматически загружаем подкатегории для новой категории
      get().loadSubcategories(categoryId);
    },

    setSelectedSubcategory: (subcategoryId: number) => {
      set({
        selectedSubcategory: subcategoryId,
        error: '',
      });
    },

    clearSelectedSubcategory: () => {
      set({
        selectedSubcategory: null,
      });
    },

    clearError: () => {
      set({ error: '' });
    },

    resetForm: () => {
      set({
        selectedSection: '',
        selectedCategory: null,
        selectedSubcategory: null,
        categories: [],
        subcategories: [],
        loading: initialLoadingState,
        error: '',
      });
    },

    // ==================== ЗАГРУЗКА ДАННЫХ ====================

    loadCategories: async (section: string) => {
      const locale = 'ru';

      set((state) => ({
        loading: { ...state.loading, categories: true },
        error: '',
      }));

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Токен авторизации не найден');
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const url = `${baseUrl}/admin/master-data/categories?locale=${locale}&section=${section}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const categories: CategoryData[] = await response.json();

        set({
          categories,
          loading: { ...get().loading, categories: false },
        });

        console.log(
          `✅ Загружено ${categories.length} категорий для секции ${section}:`,
          categories.map((c) => c.name).join(', ')
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка загрузки категорий';

        set({
          categories: [],
          error: errorMessage,
          loading: { ...get().loading, categories: false },
        });

        console.error('❌ Ошибка загрузки категорий:', error);
      }
    },

    loadSubcategories: async (categoryId: number) => {
      set((state) => ({
        loading: { ...state.loading, subcategories: true },
        error: '',
      }));

      try {
        // Ищем категорию в уже загруженных данных
        const state = get();
        const category = state.categories.find((c) => c.id === categoryId);

        if (category && category.subcategories) {
          // Используем подкатегории из уже загруженных данных
          set({
            subcategories: category.subcategories,
            loading: { ...state.loading, subcategories: false },
          });

          console.log(
            `✅ Загружено ${category.subcategories.length} подкатегорий для категории ${categoryId}:`,
            category.subcategories.map((s) => s.name).join(', ')
          );
        } else {
          // Если подкатегорий нет в данных, устанавливаем пустой массив
          set({
            subcategories: [],
            loading: { ...state.loading, subcategories: false },
          });

          console.log(`✅ Подкатегории для категории ${categoryId} не найдены`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ошибка загрузки подкатегорий';

        set({
          subcategories: [],
          error: errorMessage,
          loading: { ...get().loading, subcategories: false },
        });

        console.error('❌ Ошибка загрузки подкатегорий:', error);
      }
    },
  }))
);

// ==================== СЕЛЕКТОРЫ ====================

export const useBrandSelectedSection = (): string =>
  useBrandCreateStore((state) => state.selectedSection);

export const useBrandSelectedCategory = (): number | null =>
  useBrandCreateStore((state) => state.selectedCategory);

export const useBrandSelectedSubcategory = (): number | null =>
  useBrandCreateStore((state) => state.selectedSubcategory);

export const useBrandCategories = (): readonly CategoryData[] =>
  useBrandCreateStore((state) => state.categories);

export const useBrandSubcategories = (): readonly SubcategoryData[] =>
  useBrandCreateStore((state) => state.subcategories);

export const useBrandLoading = (): LoadingState =>
  useBrandCreateStore((state) => state.loading);

export const useBrandError = (): string =>
  useBrandCreateStore((state) => state.error);

// Кешированные селекторы для действий
export const useBrandSetSelectedSection = () =>
  useBrandCreateStore((state) => state.setSelectedSection);

export const useBrandSetSelectedCategory = () =>
  useBrandCreateStore((state) => state.setSelectedCategory);

export const useBrandSetSelectedSubcategory = () =>
  useBrandCreateStore((state) => state.setSelectedSubcategory);

export const useBrandClearSelectedSubcategory = () =>
  useBrandCreateStore((state) => state.clearSelectedSubcategory);

export const useBrandClearError = () =>
  useBrandCreateStore((state) => state.clearError);

export const useBrandResetForm = () =>
  useBrandCreateStore((state) => state.resetForm);

export const useBrandLoadCategories = () =>
  useBrandCreateStore((state) => state.loadCategories);

export const useBrandLoadSubcategories = () =>
  useBrandCreateStore((state) => state.loadSubcategories);

// Альтернативный способ - мемоизированный объект
export const useBrandActions = () =>
  React.useMemo(
    () => ({
      setSelectedSection: useBrandCreateStore.getState().setSelectedSection,
      setSelectedCategory: useBrandCreateStore.getState().setSelectedCategory,
      setSelectedSubcategory:
        useBrandCreateStore.getState().setSelectedSubcategory,
      clearSelectedSubcategory:
        useBrandCreateStore.getState().clearSelectedSubcategory,
      clearError: useBrandCreateStore.getState().clearError,
      resetForm: useBrandCreateStore.getState().resetForm,
      loadCategories: useBrandCreateStore.getState().loadCategories,
      loadSubcategories: useBrandCreateStore.getState().loadSubcategories,
    }),
    []
  );

// ==================== МЕМОИЗИРОВАННЫЕ СЕЛЕКТОРЫ ====================

const createSelectOptions = (
  items: readonly CategoryData[] | readonly SubcategoryData[]
): SelectOption[] => {
  return items.map((item) => ({
    value: item.id,
    label: getItemName(item),
  }));
};

export const useBrandCategoryOptions = (): SelectOption[] => {
  const categories = useBrandCategories();

  return React.useMemo(() => createSelectOptions(categories), [categories]);
};

export const useBrandSubcategoryOptions = (): SelectOption[] => {
  const subcategories = useBrandSubcategories();

  return React.useMemo(
    () => createSelectOptions(subcategories),
    [subcategories]
  );
};
