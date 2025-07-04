// frontend/src/shared/store/adminCategoryStore.ts (СТРОГО ТИПИЗИРОВАННАЯ ВЕРСИЯ)

import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

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
  readonly name: string;
  readonly subcategories?: readonly SubcategoryData[];
}

interface SubcategoryData {
  readonly id: number;
  readonly categoryId?: number;
  readonly name: string;
}

interface BrandData {
  readonly id: number;
  readonly name: string;
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

interface ProductSpecificationTranslation {
  readonly ru: { readonly name: string; readonly value: string };
  readonly en: { readonly name: string; readonly value: string };
  readonly uz: { readonly name: string; readonly value: string };
  readonly kr: { readonly name: string; readonly value: string };
}

interface ProductSpecification {
  readonly id: string;
  readonly key: string;
  readonly sortOrder: number;
  readonly translations: ProductSpecificationTranslation;
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

// ✅ Интерфейс для правильной типизации FormData
interface FormDataShape {
  readonly section: string;
  readonly categoryId: number | null;
  readonly subcategoryId: number | null;
  readonly brandId: number | null;
}

interface AdminCategoryState {
  // ==================== СУЩЕСТВУЮЩИЕ ПОЛЯ ====================
  readonly selectedSection: string;
  readonly selectedCategory: number | null;
  readonly selectedSubcategory: number | null;
  readonly selectedBrand: number | null;

  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];
  readonly brands: readonly BrandData[];

  readonly loading: LoadingState;
  readonly error: string;

  // ==================== НОВЫЕ ПОЛЯ ДЛЯ ПРОДУКТА ====================
  readonly productTranslations: ProductTranslations;
  readonly productImages: readonly ProductImage[];
  readonly productSpecifications: readonly ProductSpecification[];
  readonly isCreatingProduct: boolean;
  readonly productCreationError: string;
  readonly temporaryMessage: string;
  readonly isShowingTempMessage: boolean;

  // ==================== ДЕЙСТВИЯ ====================
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

  // Характеристики
  addProductSpecification: (key: string) => void;
  removeProductSpecification: (specId: string) => void;
  setProductSpecification: (
    specId: string,
    locale: keyof ProductSpecificationTranslation,
    field: 'name' | 'value',
    value: string
  ) => void;
  reorderProductSpecifications: (fromIndex: number, toIndex: number) => void;

  // Создание продукта
  createProduct: () => Promise<boolean>;
  setProductCreationError: (error: string) => void;
  clearProductCreationError: () => void;
  resetProductData: () => void;

  // Временные сообщения
  showTemporaryMessage: (message: string, duration?: number) => void;
  hideTemporaryMessage: () => void;
}

// ==================== УТИЛИТЫ ====================

const getItemName = (
  item: CategoryData | SubcategoryData | BrandData
): string => {
  return item.name || 'Без названия';
};

const generateImageId = (): string => {
  return `img_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
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

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // Добавляем таймаут и обработку ошибок
      signal: AbortSignal.timeout(10000), // 10 секунд таймаут
    });

    console.log(`📡 Ответ сервера: ${response.status} ${response.statusText}`);
    return response;
  } catch (error) {
    console.error('💥 Ошибка сетевого запроса:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(
          'Превышено время ожидания запроса. Проверьте подключение к серверу.'
        );
      }
      if (error.message.includes('fetch')) {
        throw new Error(
          'Не удается подключиться к серверу. Убедитесь что бэкенд запущен на ' +
            baseUrl
        );
      }
    }

    throw error;
  }

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
    `/admin/master-data/categories?section=${section}&locale=${locale}`
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
    `/admin/master-data/subcategories?categoryId=${categoryId}&locale=${locale}`
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

// ==================== ZUSTAND STORE ====================

export const useAdminCategoryStore = create<AdminCategoryState>()(
  subscribeWithSelector((set, get) => ({
    // ==================== СОСТОЯНИЕ ====================
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
    productSpecifications: [],
    isCreatingProduct: false,
    productCreationError: '',
    temporaryMessage: '',
    isShowingTempMessage: false,

    // ==================== ДЕЙСТВИЯ ====================

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
      const locale = 'ru';

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

        console.error('❗ Ошибка загрузки подкатегорий:', error);
      }
    },

    loadBrands: async (subcategoryId?: number) => {
      const locale = 'ru';

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

    // ==================== ДЕЙСТВИЯ ДЛЯ ПРОДУКТА ====================

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

    // ==================== ДЕЙСТВИЯ ДЛЯ ХАРАКТЕРИСТИК ====================

    addProductSpecification: (key: string) => {
      set((state) => {
        const newSpecification: ProductSpecification = {
          id: `spec_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
          key: key.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
          sortOrder: state.productSpecifications.length,
          translations: {
            ru: { name: '', value: '' },
            en: { name: '', value: '' },
            uz: { name: '', value: '' },
            kr: { name: '', value: '' },
          },
        };

        return {
          productSpecifications: [
            ...state.productSpecifications,
            newSpecification,
          ],
        };
      });
    },

    removeProductSpecification: (specId: string) => {
      set((state) => ({
        productSpecifications: state.productSpecifications.filter(
          (spec) => spec.id !== specId
        ),
      }));
    },

    setProductSpecification: (specId: string, locale, field, value) => {
      set((state) => ({
        productSpecifications: state.productSpecifications.map((spec) =>
          spec.id === specId
            ? {
                ...spec,
                translations: {
                  ...spec.translations,
                  [locale]: {
                    ...spec.translations[locale],
                    [field]: value,
                  },
                },
              }
            : spec
        ),
      }));
    },

    reorderProductSpecifications: (fromIndex: number, toIndex: number) => {
      set((state) => {
        const newSpecs = [...state.productSpecifications];
        const [movedSpec] = newSpecs.splice(fromIndex, 1);
        newSpecs.splice(toIndex, 0, movedSpec);

        // Обновляем sortOrder
        const updatedSpecs = newSpecs.map((spec, index) => ({
          ...spec,
          sortOrder: index,
        }));

        return { productSpecifications: updatedSpecs };
      });
    },

    // ✅ ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ФУНКЦИЯ createProduct (JSON + отдельные изображения)
    createProduct: async () => {
      const state = get();

      console.log('🔍 Debug полное состояние:', {
        selectedSection: state.selectedSection,
        selectedCategory: state.selectedCategory,
        selectedSubcategory: state.selectedSubcategory,
        selectedBrand: state.selectedBrand,
        ruName: state.productTranslations.ru.name,
        imagesCount: state.productImages.length,
        productTranslations: state.productTranslations,
      });

      // Валидация обязательных полей
      if (!state.selectedSection || state.selectedSection.trim() === '') {
        set({ productCreationError: 'Выберите секцию (NEVA или X-Solution)' });
        return false;
      }

      if (!state.selectedCategory || state.selectedCategory < 1) {
        set({ productCreationError: 'Выберите категорию' });
        return false;
      }

      if (!state.productTranslations.ru.name.trim()) {
        set({
          productCreationError: 'Введите название продукта на русском языке',
        });
        return false;
      }

      set({ isCreatingProduct: true, productCreationError: '' });

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Токен авторизации не найден');
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // ✅ ШАГ 1: Создаем продукт через JSON API (точно по Swagger схеме)
        const productData = {
          section: state.selectedSection.trim().toUpperCase(), // "NEVA" или "X_SOLUTION"
          categoryId: Number(state.selectedCategory),
          subcategoryId: state.selectedSubcategory
            ? Number(state.selectedSubcategory)
            : undefined,
          brandId: state.selectedBrand
            ? Number(state.selectedBrand)
            : undefined,
          isActive: true,
          translations: [
            {
              locale: 'ru',
              name: state.productTranslations.ru.name.trim(),
              description:
                state.productTranslations.ru.description?.trim() || '',
              marketingDescription:
                state.productTranslations.ru.marketingDescription?.trim() || '',
            },
          ],
          specifications: state.productSpecifications
            .filter((spec) => {
              // Включаем характеристику если есть хотя бы одно заполненное поле для русского языка
              const ruTranslation = spec.translations.ru;
              return ruTranslation.name.trim() || ruTranslation.value.trim();
            })
            .map((spec) => ({
              key: spec.key,
              sortOrder: spec.sortOrder,
              translations: Object.entries(spec.translations)
                .filter(
                  ([, translation]) =>
                    translation.name.trim() || translation.value.trim()
                )
                .map(([locale, translation]) => ({
                  locale,
                  name: translation.name.trim() || '',
                  value: translation.value.trim() || '',
                })),
            }))
            .filter((spec) => spec.translations.length > 0), // Только спецификации с переводами
        };

        // Добавляем дополнительные переводы если заполнено хотя бы одно поле
        (['en', 'uz', 'kr'] as const).forEach((locale) => {
          const translation = state.productTranslations[locale];
          const hasName = translation.name && translation.name.trim();
          const hasDescription =
            translation.description && translation.description.trim();
          const hasMarketingDescription =
            translation.marketingDescription &&
            translation.marketingDescription.trim();

          // Если есть хотя бы одно заполненное поле для этого языка
          if (hasName || hasDescription || hasMarketingDescription) {
            productData.translations.push({
              locale,
              name: hasName ? translation.name.trim() : '', // Если name пустое, используем пустую строку
              description: hasDescription ? translation.description.trim() : '',
              marketingDescription: hasMarketingDescription
                ? translation.marketingDescription.trim()
                : '',
            });
          }
        });

        console.log(
          '📤 Отправляем JSON данные для создания продукта:',
          productData
        );

        // Создание продукта
        const productResponse = await fetch(`${baseUrl}/admin/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        console.log(
          `📡 Ответ создания продукта: ${productResponse.status} ${productResponse.statusText}`
        );

        if (!productResponse.ok) {
          const errorData = await productResponse.json();
          console.error('🚨 Ошибка создания продукта:', errorData);

          let errorMessage = 'Ошибка создания продукта';
          if (errorData.message) {
            if (Array.isArray(errorData.message)) {
              errorMessage = errorData.message.join(', ');
            } else {
              errorMessage = errorData.message;
            }
          }
          throw new Error(errorMessage);
        }

        const createdProduct = await productResponse.json();
        console.log('✅ Продукт успешно создан:', createdProduct);

        // ✅ ШАГ 2: Загружаем изображения отдельно (если есть)
        if (state.productImages.length > 0) {
          console.log(
            `📸 Загружаем ${state.productImages.length} изображений для продукта ${createdProduct.productId}...`
          );

          try {
            const imageFormData = new FormData();

            // Добавляем все изображения, отсортированные по slotIndex
            const sortedImages = [...state.productImages].sort(
              (a: ProductImage, b: ProductImage) => a.slotIndex - b.slotIndex
            );
            sortedImages.forEach((image: ProductImage) => {
              imageFormData.append('images', image.file);
              console.log(
                `📤 Добавляем изображение: ${image.file.name} (${image.file.size} bytes)`
              );
            });

            const imageResponse = await fetch(
              `${baseUrl}/admin/products/${createdProduct.productId}/images`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: imageFormData,
              }
            );

            console.log(
              `📡 Ответ загрузки изображений: ${imageResponse.status} ${imageResponse.statusText}`
            );

            if (!imageResponse.ok) {
              const imageError = await imageResponse.json();
              console.warn(
                '⚠️ Продукт создан, но изображения не загружены:',
                imageError
              );
              // НЕ прерываем процесс - продукт уже создан успешно
            } else {
              const imageResult = await imageResponse.json();
              console.log('✅ Изображения успешно загружены:', imageResult);
            }
          } catch (imageError) {
            console.warn(
              '⚠️ Ошибка загрузки изображений (продукт уже создан):',
              imageError
            );
            // НЕ прерываем процесс - продукт уже создан успешно
          }
        } else {
          console.log(
            '📷 Изображения не добавлены - продукт создан только с текстовыми данными'
          );
        }

        console.log('🎉 Процесс создания продукта завершен успешно!');

        // Небольшая задержка для обеспечения инвалидации кеша
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Сбрасываем данные формы
        get().resetProductData();
        set({ isCreatingProduct: false });

        console.log(
          '✅ Данные формы сброшены, продукт должен появиться в каталоге'
        );
        return true;
      } catch (error) {
        console.error('💥 Критическая ошибка создания продукта:', error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка создания продукта';
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
        productSpecifications: [],
        productCreationError: '',
      });
    },

    // Временные сообщения
    showTemporaryMessage: (message: string, duration = 3000) => {
      set({ temporaryMessage: message, isShowingTempMessage: true });

      // Автоматически скрыть сообщение через указанное время
      setTimeout(() => {
        const currentState = get();
        currentState.hideTemporaryMessage();
      }, duration);
    },

    hideTemporaryMessage: () => {
      set({ temporaryMessage: '', isShowingTempMessage: false });
    },

    // ==================== УТИЛИТЫ ====================

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
        productSpecifications: [],
        isCreatingProduct: false,
        productCreationError: '',
      });
    },
  }))
);

// ==================== СЕЛЕКТОРЫ ====================

const createSelectOptions = (
  items:
    | readonly CategoryData[]
    | readonly SubcategoryData[]
    | readonly BrandData[]
): SelectOption[] => {
  return items.map((item) => ({
    value: item.id,
    label: getItemName(item),
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

export const useProductTranslations = (): ProductTranslations =>
  useAdminCategoryStore((state) => state.productTranslations);

export const useProductImages = (): readonly ProductImage[] =>
  useAdminCategoryStore((state) => state.productImages);

export const useProductSpecifications = (): readonly ProductSpecification[] =>
  useAdminCategoryStore((state) => state.productSpecifications);

export const useIsCreatingProduct = (): boolean =>
  useAdminCategoryStore((state) => state.isCreatingProduct);

export const useProductCreationError = (): string =>
  useAdminCategoryStore((state) => state.productCreationError);

export const useTemporaryMessage = (): string =>
  useAdminCategoryStore((state) => state.temporaryMessage);

export const useShowTemporaryMessage = (): boolean =>
  useAdminCategoryStore((state) => state.isShowingTempMessage);

export const useProductImageBySlot = (slotIndex: number): ProductImage | null =>
  useAdminCategoryStore(
    (state) =>
      state.productImages.find((img) => img.slotIndex === slotIndex) || null
  );

export const useProductSpecificationById = (
  specId: string
): ProductSpecification | null =>
  useAdminCategoryStore(
    (state) =>
      state.productSpecifications.find((spec) => spec.id === specId) || null
  );

// ==================== МЕМОИЗИРОВАННЫЕ СЕЛЕКТОРЫ ====================

export const useCategoryOptions = (): SelectOption[] => {
  const categories = useCategories();

  return React.useMemo(() => createSelectOptions(categories), [categories]);
};

export const useSubcategoryOptions = (): SelectOption[] => {
  const subcategories = useSubcategories();

  return React.useMemo(
    () => createSelectOptions(subcategories),
    [subcategories]
  );
};

export const useBrandOptions = (): SelectOption[] => {
  const brands = useBrands();

  return React.useMemo(() => createSelectOptions(brands), [brands]);
};

// ✅ ИСПРАВЛЕННАЯ ТИПИЗАЦИЯ
export const useFormData = (): FormDataShape => {
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
  const selectedSubcategory = useSelectedSubcategory();
  const selectedBrand = useSelectedBrand();
  const productTranslations = useProductTranslations();
  const productImages = useProductImages();
  const productSpecifications = useProductSpecifications();

  return React.useMemo(() => {
    const isValidSection = Boolean(
      selectedSection &&
        selectedSection.trim() &&
        ['NEVA', 'X_SOLUTION'].includes(selectedSection.trim().toUpperCase())
    );

    const isValidCategory = Boolean(selectedCategory && selectedCategory > 0);
    const isValidSubcategory = Boolean(
      selectedSubcategory && selectedSubcategory > 0
    );
    const isValidBrand = Boolean(selectedBrand && selectedBrand > 0);

    // Проверка всех полей переводов: name, description, specifications для всех локалей
    const isValidTranslations = Boolean(
      // Русский (обязательно)
      productTranslations.ru.name.trim().length >= 2 &&
        productTranslations.ru.description.trim() &&
        productTranslations.ru.specifications.trim() &&
        // Английский
        productTranslations.en.name.trim() &&
        productTranslations.en.description.trim() &&
        productTranslations.en.specifications.trim() &&
        // Узбекский
        productTranslations.uz.name.trim() &&
        productTranslations.uz.description.trim() &&
        productTranslations.uz.specifications.trim() &&
        // Корейский
        productTranslations.kr.name.trim() &&
        productTranslations.kr.description.trim() &&
        productTranslations.kr.specifications.trim()
    );

    const isValidImages = productImages.length > 0;

    // Валидация характеристик - все должны иметь name и value на русском языке
    const isValidSpecifications = productSpecifications.every((spec) => {
      const ruTranslation = spec.translations.ru;
      return ruTranslation.name.trim() && ruTranslation.value.trim();
    });

    const isValid =
      isValidSection &&
      isValidCategory &&
      isValidSubcategory &&
      isValidBrand &&
      isValidTranslations &&
      isValidImages &&
      isValidSpecifications;

    console.log('🔍 Валидация формы (17 полей = 100%):', {
      isValidSection,
      isValidCategory,
      isValidSubcategory,
      isValidBrand,
      isValidTranslations,
      isValidImages,
      isValidSpecifications,
      specificationsCount: productSpecifications.length,
      finalResult: isValid,
    });

    return isValid;
  }, [
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    productTranslations,
    productImages.length,
    productSpecifications,
  ]);
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

      // Действия для характеристик
      addProductSpecification: store.addProductSpecification,
      removeProductSpecification: store.removeProductSpecification,
      setProductSpecification: store.setProductSpecification,
      reorderProductSpecifications: store.reorderProductSpecifications,

      // Создание продукта
      createProduct: store.createProduct,
      setProductCreationError: store.setProductCreationError,
      clearProductCreationError: store.clearProductCreationError,
      resetProductData: store.resetProductData,

      // Временные сообщения
      showTemporaryMessage: store.showTemporaryMessage,
      hideTemporaryMessage: store.hideTemporaryMessage,
    }),
    [store]
  );
};
