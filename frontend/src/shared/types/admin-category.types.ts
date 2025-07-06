// shared/types/admin-category.types.ts

/**
 * Типы для работы с категориями в админке
 * Строгая типизация для компонента AdminCreateCategory
 */

// ==================== ОСНОВНЫЕ ТИПЫ ====================

export type Section = 'NEVA' | 'X_SOLUTION';
export type Locale = 'ru' | 'en' | 'uz' | 'kr';

// ==================== ПЕРЕВОДЫ ====================

export interface Translation {
  readonly id: number;
  readonly name: string;
  readonly locale: Locale;
}

// ==================== КАТЕГОРИИ ====================

export interface CategoryData {
  readonly id: number;
  readonly section: Section;
  readonly translations: readonly Translation[];
  readonly isActive?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface SubcategoryData {
  readonly id: number;
  readonly categoryId: number;
  readonly translations: readonly Translation[];
  readonly isActive?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface BrandData {
  readonly id: number;
  readonly translations: readonly Translation[];
  readonly isActive?: boolean;
  readonly section?: Section;
  readonly logo?: string;
  readonly website?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

// ==================== API ОТВЕТЫ ====================

export interface CategoriesApiResponse {
  readonly success: boolean;
  readonly data?: readonly CategoryData[];
  readonly message?: string;
  readonly error?: string;
}

export interface SubcategoriesApiResponse {
  readonly success: boolean;
  readonly data?: readonly SubcategoryData[];
  readonly message?: string;
  readonly error?: string;
}

export interface BrandsApiResponse {
  readonly success: boolean;
  readonly data?: readonly BrandData[];
  readonly message?: string;
  readonly error?: string;
}

// ==================== СЕЛЕКТ ОПЦИИ ====================

export interface SelectOption {
  readonly value: string | number;
  readonly label: string;
  readonly disabled?: boolean;
  readonly data?: unknown; // Дополнительные данные
}

// ==================== СОСТОЯНИЕ КОМПОНЕНТА ====================

export interface AdminCreateCategoryState {
  readonly selectedSection: string;
  readonly selectedCategory: string | number;
  readonly selectedSubcategory: string | number;
  readonly selectedBrand: string | number;
  readonly categories: readonly CategoryData[];
  readonly subcategories: readonly SubcategoryData[];
  readonly brands: readonly BrandData[];
  readonly loadingCategories: boolean;
  readonly loadingSubcategories: boolean;
  readonly loadingBrands: boolean;
  readonly error: string;
}

// ==================== ПАРАМЕТРЫ ЗАПРОСОВ ====================

export interface LoadCategoriesParams {
  readonly section: Section;
  readonly locale?: Locale;
  readonly isActive?: boolean;
}

export interface LoadSubcategoriesParams {
  readonly categoryId: number;
  readonly locale?: Locale;
  readonly isActive?: boolean;
}

export interface LoadBrandsParams {
  readonly section?: Section;
  readonly locale?: Locale;
  readonly isActive?: boolean;
  readonly categoryId?: number;
}

// ==================== ОБРАБОТЧИКИ СОБЫТИЙ ====================

export type SectionChangeHandler = (section: string) => void;
export type CategoryChangeHandler = (categoryId: string | number) => void;
export type SubcategoryChangeHandler = (subcategoryId: string | number) => void;
export type BrandChangeHandler = (brandId: string | number) => void;

// ==================== УТИЛИТЫ ====================

export interface TranslationUtils {
  getTranslatedName: (
    translations: readonly Translation[],
    locale?: Locale
  ) => string;
  hasTranslation: (
    translations: readonly Translation[],
    locale: Locale
  ) => boolean;
  getAllTranslations: (
    translations: readonly Translation[]
  ) => Record<Locale, string>;
}

// ==================== ОШИБКИ ====================

export interface AdminCategoryError {
  readonly type: 'NETWORK' | 'SERVER' | 'VALIDATION' | 'UNKNOWN';
  readonly message: string;
  readonly details?: string;
  readonly code?: string | number;
}

// ==================== ЗАГРУЗОЧНЫЕ СОСТОЯНИЯ ====================

export interface LoadingState {
  readonly categories: boolean;
  readonly subcategories: boolean;
  readonly brands: boolean;
}

// ==================== КОНФИГУРАЦИЯ ====================

export interface AdminCategoryConfig {
  readonly defaultLocale: Locale;
  readonly enableDebugMode: boolean;
  readonly retryAttempts: number;
  readonly timeoutMs: number;
  readonly cacheResults: boolean;
}

// ==================== МЕТРИКИ И АНАЛИТИКА ====================

export interface AdminCategoryMetrics {
  readonly loadTime: {
    readonly categories: number;
    readonly subcategories: number;
    readonly brands: number;
  };
  readonly errorCount: number;
  readonly successCount: number;
  readonly userInteractions: number;
}

// ==================== ФИЛЬТРЫ ====================

export interface CategoryFilters {
  readonly section?: Section;
  readonly isActive?: boolean;
  readonly search?: string;
  readonly hasSubcategories?: boolean;
}

export interface BrandFilters {
  readonly section?: Section;
  readonly isActive?: boolean;
  readonly search?: string;
  readonly categoryId?: number;
}

// ==================== ЭКСПОРТ ====================

export * from './admin.types'; // Переиспользуем существующие типы

// ==================== ТИПЫ-ЗАЩИТНИКИ (TYPE GUARDS) ====================

export function isCategoryData(obj: unknown): obj is CategoryData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'section' in obj &&
    'translations' in obj &&
    Array.isArray((obj as CategoryData).translations)
  );
}

export function isSubcategoryData(obj: unknown): obj is SubcategoryData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'categoryId' in obj &&
    'translations' in obj &&
    Array.isArray((obj as SubcategoryData).translations)
  );
}

export function isBrandData(obj: unknown): obj is BrandData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'translations' in obj &&
    Array.isArray((obj as BrandData).translations)
  );
}

export function isValidSection(section: string): section is Section {
  return section === 'NEVA' || section === 'X_SOLUTION';
}

export function isValidLocale(locale: string): locale is Locale {
  return ['ru', 'en', 'uz', 'kr'].includes(locale);
}

// ==================== КОНСТАНТЫ ====================

export const SECTIONS: readonly Section[] = ['NEVA', 'X_SOLUTION'] as const;
export const LOCALES: readonly Locale[] = ['ru', 'en', 'uz', 'kr'] as const;

export const SECTION_LABELS: Record<Section, string> = {
  NEVA: 'Neva',
  X_SOLUTION: 'X-Solution',
} as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  uz: "O'zbek",
  kr: '한국어',
} as const;

export const DEFAULT_CONFIG: AdminCategoryConfig = {
  defaultLocale: 'ru',
  enableDebugMode: process.env.NODE_ENV === 'development',
  retryAttempts: 3,
  timeoutMs: 10000,
  cacheResults: true,
} as const;
