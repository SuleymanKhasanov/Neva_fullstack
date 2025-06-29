// src/shared/types/strict-types.ts
import { Locale, Section } from '@prisma/client';

/**
 * Строгие типы для улучшения безопасности типов
 */

// ==================== БАЗОВЫЕ СТРОГИЕ ТИПЫ ====================

export type StrictLocale = Locale;
export type StrictSection = Section;

// ==================== ИНТЕРФЕЙСЫ ДЛЯ ПЕРЕВОДОВ ====================

export interface StrictTranslation {
  readonly id: number;
  readonly locale: StrictLocale;
  readonly name: string;
}

export interface StrictTranslationInput {
  readonly locale: StrictLocale;
  readonly name: string;
  readonly description?: string;
  readonly marketingDescription?: string;
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ СПЕЦИФИКАЦИЙ ====================

export interface StrictSpecificationTranslation {
  readonly id: number;
  readonly locale: StrictLocale;
  readonly name: string;
  readonly value: string;
}

export interface StrictSpecificationTranslationInput {
  readonly locale: StrictLocale;
  readonly name: string;
  readonly value: string;
}

export interface StrictSpecification {
  readonly id: number;
  readonly key: string;
  readonly sortOrder: number;
  readonly translations: readonly StrictSpecificationTranslation[];
}

export interface StrictSpecificationInput {
  readonly key: string;
  readonly sortOrder?: number;
  readonly translations: readonly StrictSpecificationTranslationInput[];
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ БРЕНДОВ ====================

export interface StrictBrand {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly translations: readonly StrictTranslation[];
}

export interface StrictBrandInput {
  readonly translations: readonly {
    readonly locale: StrictLocale;
    readonly name: string;
  }[];
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ КАТЕГОРИЙ ====================

export interface StrictCategory {
  readonly id: number;
  readonly section: StrictSection;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly translations: readonly StrictTranslation[];
}

export interface StrictCategoryInput {
  readonly section: StrictSection;
  readonly translations: readonly {
    readonly locale: StrictLocale;
    readonly name: string;
  }[];
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ СУБКАТЕГОРИЙ ====================

export interface StrictSubcategory {
  readonly id: number;
  readonly categoryId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly translations: readonly StrictTranslation[];
  readonly category: StrictCategory;
}

export interface StrictSubcategoryInput {
  readonly categoryId: number;
  readonly translations: readonly {
    readonly locale: StrictLocale;
    readonly name: string;
  }[];
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ ПРОДУКТОВ ====================

export interface StrictProductImage {
  readonly id: number;
  readonly imageSmall: string;
  readonly imageLarge: string;
  readonly altText: string | null;
  readonly isPrimary: boolean;
  readonly sortOrder: number;
}

export interface StrictProduct {
  readonly id: number;
  readonly section: StrictSection;
  readonly slug: string;
  readonly isActive: boolean;
  readonly categoryId: number;
  readonly subcategoryId: number | null;
  readonly brandId: number | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly translations: readonly StrictTranslationInput[];
  readonly category: StrictCategory;
  readonly subcategory: StrictSubcategory | null;
  readonly brand: StrictBrand | null;
  readonly images: readonly StrictProductImage[];
  readonly specifications: readonly StrictSpecification[];
}

export interface StrictProductInput {
  readonly section: StrictSection;
  readonly categoryId: number;
  readonly subcategoryId?: number;
  readonly brandId?: number;
  readonly isActive?: boolean;
  readonly translations: readonly StrictTranslationInput[];
  readonly specifications?: readonly StrictSpecificationInput[];
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ ОТВЕТОВ API ====================

export interface StrictApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly error?: string;
}

export interface StrictPaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

export interface StrictPaginatedResponse<T = unknown> {
  readonly success: boolean;
  readonly data: {
    readonly items: readonly T[];
    readonly pagination: StrictPaginationMeta;
  };
  readonly message?: string;
  readonly error?: string;
}

// ==================== ИНТЕРФЕЙСЫ ДЛЯ ФИЛЬТРОВ ====================

export interface StrictBaseFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface StrictProductFilters extends StrictBaseFilters {
  readonly locale?: StrictLocale;
  readonly section?: StrictSection;
  readonly categoryId?: number;
  readonly subcategoryId?: number;
  readonly brandId?: number;
  readonly isActive?: boolean;
}

export interface StrictCategoryFilters extends StrictBaseFilters {
  readonly locale?: StrictLocale;
  readonly section?: StrictSection;
  readonly withSubcategories?: boolean;
  readonly withBrands?: boolean;
}

export interface StrictBrandFilters extends StrictBaseFilters {
  readonly locale?: StrictLocale;
  readonly section?: StrictSection;
  readonly categoryId?: number;
}

// ==================== GUARD ФУНКЦИИ ДЛЯ ПРОВЕРКИ ТИПОВ ====================

export function isValidLocale(value: string): value is StrictLocale {
  return ['ru', 'en', 'uz', 'kr'].includes(value);
}

export function isValidSection(value: string): value is StrictSection {
  return ['NEVA', 'X_SOLUTION'].includes(value);
}

export function assertLocale(value: string): StrictLocale {
  if (!isValidLocale(value)) {
    throw new Error(`Invalid locale: ${value}. Must be one of: ru, en, uz, kr`);
  }

  return value;
}

export function assertSection(value: string): StrictSection {
  if (!isValidSection(value)) {
    throw new Error(
      `Invalid section: ${value}. Must be one of: NEVA, X_SOLUTION`
    );
  }

  return value;
}

// ==================== УТИЛИТЫ ДЛЯ РАБОТЫ С READONLY ТИПАМИ ====================

/**
 * Рекурсивно делает все свойства readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Убирает readonly модификаторы
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Рекурсивно убирает readonly модификаторы
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

// ==================== ТИПЫ ДЛЯ СОСТОЯНИЯ ЗАГРУЗКИ ====================

export interface StrictLoadingState {
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly lastUpdated: Date | null;
}

export interface StrictAsyncState<T> extends StrictLoadingState {
  readonly data: T | null;
}

// ==================== ТИПЫ ДЛЯ КЕШИРОВАНИЯ ====================

export interface StrictCacheOptions {
  readonly ttl?: number;
  readonly prefix?: string;
  readonly tags?: readonly string[];
}

export interface StrictCacheEntry<T> {
  readonly key: string;
  readonly value: T;
  readonly createdAt: Date;
  readonly expiresAt: Date;
  readonly tags: readonly string[];
}
