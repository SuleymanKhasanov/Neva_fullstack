// frontend/src/shared/store/adminCategoryStore.ts (РАСШИРЕННАЯ ВЕРСИЯ)

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

// ==================== НОВЫЕ ТИПЫ ДЛЯ ПРОДУКТА ====================

interface ProductImage {
  readonly id: string;
  readonly file: File;
  readonly preview: string;
  readonly slotIndex: number;
  readonly isPrimary: boolean;
}

interface ProductTranslations {
  readonly ru: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
    readonly specifications: string;
  };
  readonly en: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
    readonly specifications: string;
  };
  readonly uz: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
    readonly specifications: string;
  };
  readonly kr: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
    readonly specifications: string;
  };
}

interface AdminCategoryState {
  // ==================== СУЩЕСТВУЮЩИЕ ПОЛЯ ====================
  // Выбранные значения для категорий
  readonly selectedSection: string;
  readonly selectedCategory: number | null;
  readonly selectedSubcategory: number | null;
  readonly selectedBrand: number | null;

  // Данные категорий
  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];
  readonly brands: readonly BrandData[];

  // Состояния загрузки категорий
  readonly loading: LoadingState;
  readonly error: string;

  // ==================== НОВЫЕ ПОЛЯ ДЛЯ ПРОДУКТА ====================
  // Переводы продукта
  readonly productTranslations: ProductTranslations;

  // Изображения продукта (5 слотов: 0, 1, 2, 3, 4)
  readonly productImages: readonly ProductImage[];

  // Состояние создания продукта
  readonly isCreatingProduct: boolean;
  readonly productCreationError: string;

  // ==================== СУЩЕСТВУЮЩИЕ ДЕЙСТВИЯ ====================
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

  // ==================== НОВЫЕ ДЕЙСТВИЯ ДЛЯ ПРОДУКТА ====================
  // Переводы
  setProductTranslation: (
    locale: keyof ProductTranslations,
    field: keyof ProductTranslations['ru'],
    value: string
  ) => void;

  // Изображения
  setProductImage: (slotIndex: number, file: File | null) => void;
  removeProductImage: (slotIndex: number) => void;
  setPrimaryProductImage: (slotIndex: number) => void;
  reorderProductImages: (fromIndex: number, toIndex: number) => void;

  // Создание продукта
  createProduct: () => Promise<boolean>;
  setProductCreationError: (error: string) => void;
  clearProductCreationError: () => void;

  // Сброс данных продукта
  resetProductData: () => void;
}

// ==================== УТИЛИТЫ ====================

const getTranslatedName = (
  translations: readonly Translation[],
  locale = 'ru'
): string => {
  const translation = translations.find((t) => t.locale === locale);
  return translation?.name || translations[0]?.name || 'Без названия';
};

const generateImageId = (): string => {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

const revokeImagePreview = (preview: string): void => {
  URL.revokeObjectURL(preview);
};

// ==================== НАЧАЛЬНЫЕ СОСТОЯНИЯ ====================

const initialProductTranslations: ProductTranslations = {
  ru: {
    name: '',
    description: '',
    marketingDescription: '',
    specifications: '',
  },
  en: {
    name: '',
    description: '',
    marketingDescription: '',
    specifications: '',
  },
  uz: {
    name: '',
    description: '',
    marketingDescription: '',
    specifications: '',
  },
  kr: {
    name: '',
    description: '',
    marketingDescription: '',
    specifications: '',
  },
};

// ==================== API ФУНКЦИИ ====================

const getAuthToken = (): string | null => {
  const possibleKeys = [
    'admin_access_token',
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

  console.error('🚫 Токен не найден в localStorage.');
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
      throw new Error('Сессия истекла. Войдите в систему заново.');
    }

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

  if (Array.isArray(rawData)) {
    return rawData as CategoryData[];
  }

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

  if (Array.isArray(rawData)) {
    return rawData as SubcategoryData[];
  }

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

  if (Array.isArray(rawData)) {
    return rawData as BrandData[];
  }

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

// ==================== API СОЗДАНИЯ ПРОДУКТА ====================

const createProductApi = async (formData: FormData): Promise<boolean> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Не авторизован: токен отсутствует в localStorage');
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}/admin/products`;

  console.log(`🚀 Создание продукта: ${fullUrl}`);

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  console.log(
    `📡 Ответ создания продукта: ${response.status} ${response.statusText}`
  );

  if (!response.ok) {
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

  return true;
};

// ==================== ZUSTAND STORE ====================

export const useAdminCategoryStore = create<AdminCategoryState>()(
  subscribeWithSelector((set, get) => ({
    // ==================== СУЩЕСТВУЮЩЕЕ СОСТОЯНИЕ ====================
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

    // ==================== НОВОЕ СОСТОЯНИЕ ПРОДУКТА ====================
    productTranslations: initialProductTranslations,
    productImages: [],
    isCreatingProduct: false,
    productCreationError: '',

    // ==================== СУЩЕСТВУЮЩИЕ SETTER ДЕЙСТВИЯ ====================

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

    // ==================== СУЩЕСТВУЮЩАЯ ЗАГРУЗКА ДАННЫХ ====================

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

        set((state) => ({
          categories: [],
          loading: { ...state.loading, categories: false },
          error: errorMessage,
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

    // ==================== НОВЫЕ ДЕЙСТВИЯ ДЛЯ ПРОДУКТА ====================

    setProductTranslation: (locale, field, value) => {
      set((state) => ({
        productTranslations: {
          ...state.productTranslations,
          [locale]: {
            ...state.productTranslations[locale],
            [field]: value,
          },
        },
      }));
    },

    setProductImage: (slotIndex: number, file: File | null) => {
      set((state) => {
        const newImages = [...state.productImages];

        // Удаляем существующее изображение в этом слоте
        const existingIndex = newImages.findIndex(
          (img) => img.slotIndex === slotIndex
        );
        if (existingIndex !== -1) {
          revokeImagePreview(newImages[existingIndex].preview);
          newImages.splice(existingIndex, 1);
        }

        // Добавляем новое изображение если файл предоставлен
        if (file) {
          const newImage: ProductImage = {
            id: generateImageId(),
            file,
            preview: createImagePreview(file),
            slotIndex,
            isPrimary: newImages.length === 0, // Первое изображение автоматически основное
          };
          newImages.push(newImage);
        }

        return { productImages: newImages };
      });
    },

    removeProductImage: (slotIndex: number) => {
      set((state) => {
        const imageToRemove = state.productImages.find(
          (img) => img.slotIndex === slotIndex
        );
        if (imageToRemove) {
          revokeImagePreview(imageToRemove.preview);
        }

        const newImages = state.productImages.filter(
          (img) => img.slotIndex !== slotIndex
        );

        // Если удаляем основное изображение, делаем основным первое оставшееся
        if (imageToRemove?.isPrimary && newImages.length > 0) {
          newImages[0] = { ...newImages[0], isPrimary: true };
        }

        return { productImages: newImages };
      });
    },

    setPrimaryProductImage: (slotIndex: number) => {
      set((state) => {
        const newImages = state.productImages.map((img) => ({
          ...img,
          isPrimary: img.slotIndex === slotIndex,
        }));

        return { productImages: newImages };
      });
    },

    reorderProductImages: (fromIndex: number, toIndex: number) => {
      set((state) => {
        const newImages = [...state.productImages];
        const fromImage = newImages.find((img) => img.slotIndex === fromIndex);
        const toImage = newImages.find((img) => img.slotIndex === toIndex);

        if (fromImage && toImage) {
          // Меняем местами slotIndex
          const updatedImages = newImages.map((img) => {
            if (img.slotIndex === fromIndex) {
              return { ...img, slotIndex: toIndex };
            }
            if (img.slotIndex === toIndex) {
              return { ...img, slotIndex: fromIndex };
            }
            return img;
          });

          return { productImages: updatedImages };
        }

        return state;
      });
    },

    createProduct: async () => {
      const state = get();

      // Валидация
      if (!state.selectedSection || !state.selectedCategory) {
        set({ productCreationError: 'Выберите секцию и категорию' });
        return false;
      }

      if (!state.productTranslations.ru.name.trim()) {
        set({
          productCreationError: 'Введите название продукта на русском языке',
        });
        return false;
      }

      if (state.productImages.length === 0) {
        set({ productCreationError: 'Добавьте минимум одно изображение' });
        return false;
      }

      set({ isCreatingProduct: true, productCreationError: '' });

      try {
        const formData = new FormData();

        // Основные поля
        formData.append('section', state.selectedSection);
        formData.append('categoryId', state.selectedCategory.toString());
        if (state.selectedSubcategory) {
          formData.append(
            'subcategoryId',
            state.selectedSubcategory.toString()
          );
        }
        if (state.selectedBrand) {
          formData.append('brandId', state.selectedBrand.toString());
        }

        // Переводы
        formData.append(
          'translations',
          JSON.stringify(state.productTranslations)
        );

        // Изображения (сортируем по slotIndex)
        const sortedImages = [...state.productImages].sort(
          (a, b) => a.slotIndex - b.slotIndex
        );
        sortedImages.forEach((image, index) => {
          formData.append('images', image.file);
          formData.append(
            `imageMetadata[${index}]`,
            JSON.stringify({
              slotIndex: image.slotIndex,
              isPrimary: image.isPrimary,
            })
          );
        });

        await createProductApi(formData);

        console.log('✅ Продукт успешно создан');

        // Сбрасываем данные продукта после успешного создания
        get().resetProductData();

        set({ isCreatingProduct: false });
        return true;
      } catch (error) {
        console.error('💥 Ошибка создания продукта:', error);

        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка создания продукта';

        set({
          isCreatingProduct: false,
          productCreationError: errorMessage,
        });
        return false;
      }
    },

    setProductCreationError: (error: string) => {
      set({ productCreationError: error });
    },

    clearProductCreationError: () => {
      set({ productCreationError: '' });
    },

    resetProductData: () => {
      const state = get();

      // Освобождаем все preview URL
      state.productImages.forEach((img) => {
        revokeImagePreview(img.preview);
      });

      set({
        productTranslations: initialProductTranslations,
        productImages: [],
        productCreationError: '',
      });
    },

    // ==================== СУЩЕСТВУЮЩИЕ УТИЛИТЫ ====================

    setError: (error: string) => {
      set({ error });
    },

    clearError: () => {
      set({ error: '' });
    },

    resetForm: () => {
      const state = get();

      // Освобождаем preview URL изображений
      state.productImages.forEach((img) => {
        revokeImagePreview(img.preview);
      });

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
        productTranslations: initialProductTranslations,
        productImages: [],
        isCreatingProduct: false,
        productCreationError: '',
      });
    },
  }))
);

// ==================== СУЩЕСТВУЮЩИЕ СЕЛЕКТОРЫ ====================

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

// ==================== НОВЫЕ СЕЛЕКТОРЫ ДЛЯ ПРОДУКТА ====================

export const useProductTranslations = (): ProductTranslations =>
  useAdminCategoryStore((state) => state.productTranslations);

export const useProductImages = (): readonly ProductImage[] =>
  useAdminCategoryStore((state) => state.productImages);

export const useIsCreatingProduct = (): boolean =>
  useAdminCategoryStore((state) => state.isCreatingProduct);

export const useProductCreationError = (): string =>
  useAdminCategoryStore((state) => state.productCreationError);

// Селектор для получения изображения по слоту
export const useProductImageBySlot = (slotIndex: number): ProductImage | null =>
  useAdminCategoryStore(
    (state) =>
      state.productImages.find((img) => img.slotIndex === slotIndex) || null
  );

// ==================== МЕМОИЗИРОВАННЫЕ СЕЛЕКТОРЫ ====================

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

export const useFormData = () => {
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
  const productTranslations = useProductTranslations();
  const productImages = useProductImages();

  return React.useMemo(
    () =>
      Boolean(
        selectedSection &&
          selectedCategory &&
          productTranslations.ru.name.trim() &&
          productImages.length > 0
      ),
    [
      selectedSection,
      selectedCategory,
      productTranslations.ru.name,
      productImages.length,
    ]
  );
};

// ==================== ЭКСПОРТ ДЕЙСТВИЙ ====================

export const useAdminCategoryActions = () => {
  const store = useAdminCategoryStore();

  return React.useMemo(
    () => ({
      // Существующие действия
      setSelectedSection: store.setSelectedSection,
      setSelectedCategory: store.setSelectedCategory,
      setSelectedSubcategory: store.setSelectedSubcategory,
      setSelectedBrand: store.setSelectedBrand,
      clearError: store.clearError,
      resetForm: store.resetForm,

      // Новые действия для продукта
      setProductTranslation: store.setProductTranslation,
      setProductImage: store.setProductImage,
      removeProductImage: store.removeProductImage,
      setPrimaryProductImage: store.setPrimaryProductImage,
      reorderProductImages: store.reorderProductImages,
      createProduct: store.createProduct,
      setProductCreationError: store.setProductCreationError,
      clearProductCreationError: store.clearProductCreationError,
      resetProductData: store.resetProductData,
    }),
    [store]
  );
};
