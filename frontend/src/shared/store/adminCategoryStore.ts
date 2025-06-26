// shared/stores/adminCategoryStore.ts

import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { getCurrentLocale } from '@/shared/utils/redirect';

// ==================== СТРОГИЕ ТИПЫ ====================

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
  readonly translations: readonly Translation[];
}

interface SubcategoryData {
  readonly id: number;
  readonly categoryId: number;
  readonly translations: readonly Translation[];
}

interface BrandData {
  readonly id: number;
  readonly translations: readonly Translation[];
}

interface LoadingState {
  readonly categories: boolean;
  readonly subcategories: boolean;
  readonly brands: boolean;
}

interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly error?: string;
}

interface AdminCategoryState {
  // Выбранные значения
  readonly selectedSection: string;
  readonly selectedCategory: number | null;
  readonly selectedSubcategory: number | null;
  readonly selectedBrand: number | null;

  // Данные
  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];
  readonly brands: readonly BrandData[];

  // Состояния загрузки
  readonly loading: LoadingState;
  readonly error: string;

  // Действия
  setSelectedSection: (section: string) => void;
  setSelectedCategory: (categoryId: number | null) => void;
  setSelectedSubcategory: (subcategoryId: number | null) => void;
  setSelectedBrand: (brandId: number | null) => void;

  loadCategories: (section: string) => Promise<void>;
  loadSubcategories: (categoryId: number) => Promise<void>;
  loadBrands: (subcategoryId?: number) => Promise<void>;

  setError: (error: string) => void;
  clearError: () => void;
  resetForm: () => void;
}

// ==================== УТИЛИТЫ ====================

const getTranslatedName = (
  translations: readonly Translation[],
  locale = 'ru'
): string => {
  const translation = translations.find((t) => t.locale === locale);
  return translation?.name || translations[0]?.name || 'Без названия';
};

// ==================== API ФУНКЦИИ ====================

const getAuthToken = (): string | null => {
  // Проверяем разные возможные ключи токена
  const possibleKeys = [
    'admin_access_token', // ✅ Основной ключ из AuthContext
    'accessToken',
    'access_token',
    'authToken',
    'token',
  ];

  for (const key of possibleKeys) {
    const token = localStorage.getItem(key);
    if (token && token.trim()) {
      console.log(`🔑 Найден токен с ключом: ${key}`);
      return token.trim();
    }
  }

  console.error(
    '🚫 Токен не найден в localStorage. Доступные ключи:',
    Object.keys(localStorage)
  );
  return null;
};

const makeApiRequest = async (endpoint: string): Promise<Response> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Не авторизован: токен отсутствует в localStorage');
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}${endpoint}`;

  console.log(`🌐 API запрос: ${fullUrl}`);
  console.log(`🔑 Используемый токен: ${token.substring(0, 20)}...`);

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(`📡 Ответ сервера: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    if (response.status === 401) {
      // Специальная обработка 401 ошибки
      console.error(
        '🚫 Ошибка авторизации (401). Токен недействителен или истек.'
      );
      throw new Error('Сессия истекла. Войдите в систему заново.');
    }

    // Пытаемся получить детали ошибки от сервера
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Игнорируем ошибку парсинга JSON
    }

    throw new Error(errorMessage);
  }

  return response;
};

const fetchCategories = async (
  section: string,
  locale: string
): Promise<readonly CategoryData[]> => {
  const response = await makeApiRequest(
    `/admin/categories?section=${section}&locale=${locale}`
  );

  const rawData: unknown = await response.json();

  // Если это массив - бекенд вернул данные напрямую
  if (Array.isArray(rawData)) {
    return rawData as CategoryData[];
  }

  // Если это объект с success
  const apiResponse = rawData as ApiResponse<CategoryData[]>;
  if (
    typeof apiResponse === 'object' &&
    apiResponse !== null &&
    'success' in apiResponse
  ) {
    if (!apiResponse.success) {
      throw new Error(apiResponse.message || 'Ошибка загрузки категорий');
    }
    return apiResponse.data || [];
  }

  // Если это объект с data (без success)
  const dataResponse = rawData as { data?: CategoryData[] };
  if (
    typeof dataResponse === 'object' &&
    dataResponse !== null &&
    'data' in dataResponse
  ) {
    return dataResponse.data || [];
  }

  throw new Error('Неожиданный формат ответа от сервера');
};

const fetchSubcategories = async (
  categoryId: number,
  locale: string
): Promise<readonly SubcategoryData[]> => {
  const response = await makeApiRequest(
    `/admin/categories/subcategories/all?categoryId=${categoryId}&locale=${locale}`
  );

  const rawData: unknown = await response.json();

  // Если это массив - бекенд вернул данные напрямую
  if (Array.isArray(rawData)) {
    return rawData as SubcategoryData[];
  }

  // Если это объект с success
  const apiResponse = rawData as ApiResponse<SubcategoryData[]>;
  if (
    typeof apiResponse === 'object' &&
    apiResponse !== null &&
    'success' in apiResponse
  ) {
    if (!apiResponse.success) {
      throw new Error(apiResponse.message || 'Ошибка загрузки субкатегорий');
    }
    return apiResponse.data || [];
  }

  // Если это объект с data (без success)
  const dataResponse = rawData as { data?: SubcategoryData[] };
  if (
    typeof dataResponse === 'object' &&
    dataResponse !== null &&
    'data' in dataResponse
  ) {
    return dataResponse.data || [];
  }

  throw new Error('Неожиданный формат ответа от сервера');
};

const fetchBrands = async (
  subcategoryId?: number,
  locale: string = 'ru'
): Promise<readonly BrandData[]> => {
  let endpoint = `/admin/brands?locale=${locale}`;

  if (subcategoryId) {
    endpoint += `&subcategoryId=${subcategoryId}`;
  }

  const response = await makeApiRequest(endpoint);

  const rawData: unknown = await response.json();

  // Если это массив - бекенд вернул данные напрямую
  if (Array.isArray(rawData)) {
    return rawData as BrandData[];
  }

  // Если это объект с success
  const apiResponse = rawData as ApiResponse<BrandData[]>;
  if (
    typeof apiResponse === 'object' &&
    apiResponse !== null &&
    'success' in apiResponse
  ) {
    if (!apiResponse.success) {
      throw new Error(apiResponse.message || 'Ошибка загрузки брендов');
    }
    return apiResponse.data || [];
  }

  // Если это объект с data (без success)
  const dataResponse = rawData as { data?: BrandData[] };
  if (
    typeof dataResponse === 'object' &&
    dataResponse !== null &&
    'data' in dataResponse
  ) {
    return dataResponse.data || [];
  }

  throw new Error('Неожиданный формат ответа от сервера');
};

// ==================== ZUSTAND STORE ====================

export const useAdminCategoryStore = create<AdminCategoryState>()(
  subscribeWithSelector((set, get) => ({
    // Начальное состояние
    selectedSection: '',
    selectedCategory: null,
    selectedSubcategory: null,
    selectedBrand: null,

    categories: [],
    subcategories: [],
    brands: [],

    loading: {
      categories: false,
      subcategories: false,
      brands: false,
    },

    error: '',

    // ==================== SETTER ДЕЙСТВИЯ ====================

    setSelectedSection: (section: string) => {
      set({
        selectedSection: section,
        selectedCategory: null,
        selectedSubcategory: null,
        selectedBrand: null,
        categories: [],
        subcategories: [],
        brands: [],
      });

      if (section) {
        get().loadCategories(section);
      }
    },

    setSelectedCategory: (categoryId: number | null) => {
      set({
        selectedCategory: categoryId,
        selectedSubcategory: null,
        selectedBrand: null,
        subcategories: [],
        brands: [],
      });

      if (categoryId) {
        get().loadSubcategories(categoryId);
      }
    },

    setSelectedSubcategory: (subcategoryId: number | null) => {
      set({
        selectedSubcategory: subcategoryId,
        selectedBrand: null,
        brands: [],
      });

      if (subcategoryId) {
        get().loadBrands(subcategoryId);
      }
    },

    setSelectedBrand: (brandId: number | null) => {
      set({ selectedBrand: brandId });
    },

    // ==================== ЗАГРУЗКА ДАННЫХ ====================

    loadCategories: async (section: string) => {
      const locale = getCurrentLocale();

      set((state) => ({
        loading: { ...state.loading, categories: true },
        error: '',
      }));

      try {
        console.log(
          '🔄 Загрузка категорий для секции:',
          section,
          'локаль:',
          locale
        );
        console.log('🌍 Текущий URL:', window.location.href);
        console.log(
          '📍 Base URL:',
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        );

        const categories = await fetchCategories(section, locale);

        set((state) => ({
          categories,
          loading: { ...state.loading, categories: false },
        }));

        console.log('✅ Категории загружены:', categories.length);
      } catch (error) {
        console.error('💥 Ошибка загрузки категорий:', error);

        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка загрузки категорий';

        // Более детальная ошибка для отладки
        let detailedError = errorMessage;
        if (
          errorMessage.includes('401') ||
          errorMessage.includes('авторизации')
        ) {
          detailedError = 'Ошибка авторизации. Проверьте токен в localStorage.';
        } else if (
          errorMessage.includes('Network') ||
          errorMessage.includes('fetch')
        ) {
          detailedError = 'Сервер недоступен. Проверьте подключение.';
        }

        set((state) => ({
          categories: [],
          loading: { ...state.loading, categories: false },
          error: detailedError,
        }));
      }
    },

    loadSubcategories: async (categoryId: number) => {
      const locale = getCurrentLocale();

      set((state) => ({
        loading: { ...state.loading, subcategories: true },
        error: '',
      }));

      try {
        console.log(
          '🔄 Загрузка субкатегорий для категории:',
          categoryId,
          'локаль:',
          locale
        );

        const subcategories = await fetchSubcategories(categoryId, locale);

        set((state) => ({
          subcategories,
          loading: { ...state.loading, subcategories: false },
        }));

        console.log('✅ Субкатегории загружены:', subcategories.length);
      } catch (error) {
        console.error('💥 Ошибка загрузки субкатегорий:', error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ошибка загрузки субкатегорий';

        set((state) => ({
          subcategories: [],
          loading: { ...state.loading, subcategories: false },
          error: errorMessage,
        }));
      }
    },

    loadBrands: async (subcategoryId?: number) => {
      const locale = getCurrentLocale();

      set((state) => ({
        loading: { ...state.loading, brands: true },
        error: '',
      }));

      try {
        console.log(
          '🔄 Загрузка брендов для субкатегории:',
          subcategoryId,
          'локаль:',
          locale
        );

        const brands = await fetchBrands(subcategoryId, locale);

        set((state) => ({
          brands,
          loading: { ...state.loading, brands: false },
        }));

        console.log('✅ Бренды загружены:', brands.length);
      } catch (error) {
        console.error('💥 Ошибка загрузки брендов:', error);

        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка загрузки брендов';

        set((state) => ({
          brands: [],
          loading: { ...state.loading, brands: false },
          error: errorMessage,
        }));
      }
    },

    // ==================== УТИЛИТЫ ====================

    setError: (error: string) => {
      set({ error });
    },

    clearError: () => {
      set({ error: '' });
    },

    resetForm: () => {
      set({
        selectedSection: '',
        selectedCategory: null,
        selectedSubcategory: null,
        selectedBrand: null,
        categories: [],
        subcategories: [],
        brands: [],
        loading: {
          categories: false,
          subcategories: false,
          brands: false,
        },
        error: '',
      });
    },
  }))
);

// ==================== СЕЛЕКТОРЫ С МЕМОИЗАЦИЕЙ ====================

// Мемоизированная функция создания опций
const createSelectOptions = (
  items:
    | readonly CategoryData[]
    | readonly SubcategoryData[]
    | readonly BrandData[],
  locale: string
): SelectOption[] => {
  return items.map((item) => ({
    value: item.id,
    label: getTranslatedName(item.translations, locale),
  }));
};

// Простые селекторы для получения данных
export const useSelectedSection = (): string =>
  useAdminCategoryStore((state) => state.selectedSection);

export const useSelectedCategory = (): number | null =>
  useAdminCategoryStore((state) => state.selectedCategory);

export const useSelectedSubcategory = (): number | null =>
  useAdminCategoryStore((state) => state.selectedSubcategory);

export const useSelectedBrand = (): number | null =>
  useAdminCategoryStore((state) => state.selectedBrand);

export const useCategories = (): readonly CategoryData[] =>
  useAdminCategoryStore((state) => state.categories);

export const useSubcategories = (): readonly SubcategoryData[] =>
  useAdminCategoryStore((state) => state.subcategories);

export const useBrands = (): readonly BrandData[] =>
  useAdminCategoryStore((state) => state.brands);

export const useLoading = (): LoadingState =>
  useAdminCategoryStore((state) => state.loading);

export const useError = (): string =>
  useAdminCategoryStore((state) => state.error);

// Экспорт типа для использования в компонентах
export interface FormData {
  readonly section: string;
  readonly categoryId: number | null;
  readonly subcategoryId: number | null;
  readonly brandId: number | null;
}

// Мемоизированные селекторы для опций - используем отдельные хуки
export const useCategoryOptions = (): SelectOption[] => {
  const categories = useCategories();
  const locale = getCurrentLocale();

  return React.useMemo(
    () => createSelectOptions(categories, locale),
    [categories, locale]
  );
};

export const useSubcategoryOptions = (): SelectOption[] => {
  const subcategories = useSubcategories();
  const locale = getCurrentLocale();

  return React.useMemo(
    () => createSelectOptions(subcategories, locale),
    [subcategories, locale]
  );
};

export const useBrandOptions = (): SelectOption[] => {
  const brands = useBrands();
  const locale = getCurrentLocale();

  return React.useMemo(
    () => createSelectOptions(brands, locale),
    [brands, locale]
  );
};

// Мемоизированный селектор для данных формы
export const useFormData = (): FormData => {
  const selectedSection = useSelectedSection();
  const selectedCategory = useSelectedCategory();
  const selectedSubcategory = useSelectedSubcategory();
  const selectedBrand = useSelectedBrand();

  return React.useMemo(
    () => ({
      section: selectedSection,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      brandId: selectedBrand,
    }),
    [selectedSection, selectedCategory, selectedSubcategory, selectedBrand]
  );
};

export const useIsFormValid = (): boolean => {
  const selectedSection = useSelectedSection();
  const selectedCategory = useSelectedCategory();

  return React.useMemo(
    () => Boolean(selectedSection && selectedCategory),
    [selectedSection, selectedCategory]
  );
};

// Экспорт действий
export const useAdminCategoryActions = () => {
  const store = useAdminCategoryStore();

  return React.useMemo(
    () => ({
      setSelectedSection: store.setSelectedSection,
      setSelectedCategory: store.setSelectedCategory,
      setSelectedSubcategory: store.setSelectedSubcategory,
      setSelectedBrand: store.setSelectedBrand,
      clearError: store.clearError,
      resetForm: store.resetForm,
    }),
    [store]
  );
};
