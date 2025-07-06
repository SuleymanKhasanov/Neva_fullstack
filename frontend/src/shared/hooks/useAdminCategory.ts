// shared/hooks/useAdminCategory.ts

import { useState, useCallback, useEffect } from 'react';
import { useAdminApi } from './useAdminApi';
import type {
  Locale,
  CategoryData,
  SubcategoryData,
  BrandData,
  SelectOption,
  AdminCategoryError,
  LoadingState,
  Translation,
} from '@/shared/types/admin-category.types';

// ==================== ИНТЕРФЕЙСЫ ====================

interface UseAdminCategoryProps {
  readonly defaultLocale?: Locale;
  readonly enableDebugMode?: boolean;
  readonly autoLoadBrands?: boolean;
}

interface UseAdminCategoryReturn {
  // Состояние выбора
  readonly selectedSection: string;
  readonly selectedCategory: string | number;
  readonly selectedSubcategory: string | number;
  readonly selectedBrand: string | number;

  // Данные
  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];
  readonly brands: readonly BrandData[];

  // Опции для селектов
  readonly sectionOptions: readonly SelectOption[];
  readonly categoryOptions: readonly SelectOption[];
  readonly subcategoryOptions: readonly SelectOption[];
  readonly brandOptions: readonly SelectOption[];

  // Состояния загрузки
  readonly loading: LoadingState;
  readonly error: string;

  // Обработчики
  readonly handleSectionChange: (value: string | number) => void;
  readonly handleCategoryChange: (value: string | number) => void;
  readonly handleSubcategoryChange: (value: string | number) => void;
  readonly handleBrandChange: (value: string | number) => void;

  // Утилиты
  readonly clearError: () => void;
  readonly resetForm: () => void;
  readonly isFormValid: boolean;
  readonly debugInfo: Record<string, unknown>;
}

// ==================== КОНСТАНТЫ ====================

const SECTION_OPTIONS: readonly SelectOption[] = [
  { value: 'NEVA', label: 'Neva' },
  { value: 'X_SOLUTION', label: 'X-Solution' },
] as const;

const DEFAULT_PROPS: Required<UseAdminCategoryProps> = {
  defaultLocale: 'ru',
  enableDebugMode: process.env.NODE_ENV === 'development',
  autoLoadBrands: true,
} as const;

// ==================== УТИЛИТЫ ====================

const getTranslatedName = (
  translations: readonly Translation[],
  locale: Locale = 'ru'
): string => {
  if (!translations || translations.length === 0) {
    return 'Без названия';
  }

  const translation = translations.find((t) => t.locale === locale);
  return translation?.name || translations[0]?.name || 'Без названия';
};

const createSelectOptions = (
  items: readonly (CategoryData | SubcategoryData | BrandData)[],
  locale: Locale = 'ru'
): readonly SelectOption[] => {
  return items.map((item) => ({
    value: item.id,
    label: getTranslatedName(item.translations, locale),
    data: item,
  }));
};

const handleApiError = (
  error: unknown,
  context: string
): AdminCategoryError => {
  console.error(`💥 ${context} error:`, error);

  if (error instanceof Error) {
    return {
      type: 'NETWORK',
      message: `Ошибка ${context.toLowerCase()}`,
      details: error.message,
    };
  }

  return {
    type: 'UNKNOWN',
    message: `Неизвестная ошибка при ${context.toLowerCase()}`,
    details: String(error),
  };
};

// ==================== ОСНОВНОЙ ХУК ====================

export const useAdminCategory = (
  props: UseAdminCategoryProps = {}
): UseAdminCategoryReturn => {
  const { defaultLocale, enableDebugMode, autoLoadBrands } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const { adminApi } = useAdminApi();

  // ==================== СОСТОЯНИЕ ====================

  // Выбранные значения
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | number>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | number
  >('');
  const [selectedBrand, setSelectedBrand] = useState<string | number>('');

  // Данные
  const [categories, setCategories] = useState<readonly CategoryData[]>([]);
  const [subcategories, setSubcategories] = useState<
    readonly SubcategoryData[]
  >([]);
  const [brands, setBrands] = useState<readonly BrandData[]>([]);

  // Состояния загрузки
  const [loading, setLoading] = useState<LoadingState>({
    categories: false,
    subcategories: false,
    brands: false,
  });

  const [error, setError] = useState<string>('');

  // ==================== ЗАГРУЗКА ДАННЫХ ====================

  const loadCategories = useCallback(
    async (section: string) => {
      if (!section) {
        setCategories([]);
        return;
      }

      setLoading((prev) => ({ ...prev, categories: true }));
      setError('');

      try {
        const response = await adminApi.categories.getAll(
          `section=${section}&locale=${defaultLocale}`
        );

        if (response.success && response.data) {
          const typedData = response.data as CategoryData[];
          setCategories(typedData);
        } else {
          throw new Error(response.message || 'Failed to load categories');
        }
      } catch (err) {
        const apiError = handleApiError(err, 'загрузки категорий');
        setError(apiError.message);
        setCategories([]);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    },
    [adminApi.categories, defaultLocale, enableDebugMode]
  );

  const loadSubcategories = useCallback(
    async (categoryId: number) => {
      if (!categoryId) {
        setSubcategories([]);
        return;
      }

      setLoading((prev) => ({ ...prev, subcategories: true }));
      setError('');

      try {
        const response = await adminApi.categories.getSubcategories(
          categoryId,
          defaultLocale
        );

        if (response.success && response.data) {
          const typedData = response.data as SubcategoryData[];
          setSubcategories(typedData);
        } else {
          throw new Error(response.message || 'Failed to load subcategories');
        }
      } catch (err) {
        const apiError = handleApiError(err, 'загрузки субкатегорий');
        setError(apiError.message);
        setSubcategories([]);
      } finally {
        setLoading((prev) => ({ ...prev, subcategories: false }));
      }
    },
    [adminApi.categories, defaultLocale, enableDebugMode]
  );

  const loadBrands = useCallback(
    async (section: string) => {
      if (!section || !autoLoadBrands) {
        setBrands([]);
        return;
      }

      setLoading((prev) => ({ ...prev, brands: true }));
      setError('');

      try {
        const response = await adminApi.brands.getAll(
          `section=${section}&locale=${defaultLocale}`
        );

        if (response.success && response.data) {
          const typedData = response.data as BrandData[];
          setBrands(typedData);
        } else {
          throw new Error(response.message || 'Failed to load brands');
        }
      } catch (err) {
        const apiError = handleApiError(err, 'загрузки брендов');
        setError(apiError.message);
        setBrands([]);
      } finally {
        setLoading((prev) => ({ ...prev, brands: false }));
      }
    },
    [adminApi.brands, defaultLocale, enableDebugMode, autoLoadBrands]
  );

  // ==================== ОБРАБОТЧИКИ ====================

  const handleSectionChange = useCallback(
    (value: string | number) => {
      const section = value.toString();

      setSelectedSection(section);
      setSelectedCategory('');
      setSelectedSubcategory('');
      setSelectedBrand('');

      // Загружаем данные для новой секции
      loadCategories(section);
      if (autoLoadBrands) {
        loadBrands(section);
      }
    },
    [loadCategories, loadBrands, autoLoadBrands, enableDebugMode]
  );

  const handleCategoryChange = useCallback(
    (value: string | number) => {
      setSelectedCategory(value);
      setSelectedSubcategory('');

      // Загружаем субкатегории
      if (typeof value === 'number') {
        loadSubcategories(value);
      } else {
        const numValue = parseInt(value.toString(), 10);
        if (!isNaN(numValue)) {
          loadSubcategories(numValue);
        }
      }
    },
    [loadSubcategories, enableDebugMode]
  );

  const handleSubcategoryChange = useCallback(
    (value: string | number) => {
      setSelectedSubcategory(value);
    },
    [enableDebugMode]
  );

  const handleBrandChange = useCallback(
    (value: string | number) => {
      setSelectedBrand(value);
    },
    [enableDebugMode]
  );

  // ==================== УТИЛИТЫ ====================

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const resetForm = useCallback(() => {
    setSelectedSection('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedBrand('');
    setCategories([]);
    setSubcategories([]);
    setBrands([]);
    setError('');
  }, []);

  // ==================== ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ====================

  const categoryOptions = createSelectOptions(categories, defaultLocale);
  const subcategoryOptions = createSelectOptions(subcategories, defaultLocale);
  const brandOptions = createSelectOptions(brands, defaultLocale);

  const isFormValid = Boolean(
    selectedSection &&
      selectedCategory &&
      (subcategories.length === 0 || selectedSubcategory)
  );

  const debugInfo = {
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    categoriesCount: categories.length,
    subcategoriesCount: subcategories.length,
    brandsCount: brands.length,
    loading,
    error,
    isFormValid,
    defaultLocale,
    autoLoadBrands,
  };

  // ==================== ОТЛАДКА ====================

  useEffect(() => {
    if (enableDebugMode) {
      console.log('🔍 useAdminCategory state:', debugInfo);
    }
  }, [debugInfo, enableDebugMode]);

  // ==================== ВОЗВРАТ ====================

  return {
    // Состояние выбора
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,

    // Данные
    categories,
    subcategories,
    brands,

    // Опции для селектов
    sectionOptions: SECTION_OPTIONS,
    categoryOptions,
    subcategoryOptions,
    brandOptions,

    // Состояния загрузки
    loading,
    error,

    // Обработчики
    handleSectionChange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleBrandChange,

    // Утилиты
    clearError,
    resetForm,
    isFormValid,
    debugInfo,
  };
};

export default useAdminCategory;
