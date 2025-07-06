// shared/types/category.ts

/**
 * Типы для работы с категориями
 */

// ==================== ОСНОВНЫЕ ТИПЫ ====================

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  section: string;
  brands?: Brand[];
  subcategories?: Subcategory[];
}

export interface CategoryWithBrands extends Category {
  brands: Brand[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId?: number;
}

// ==================== API ОТВЕТЫ ====================

export interface ApiResponseWithBrands {
  data: CategoryWithBrands[];
  meta: {
    total: number;
    page: number;
    limit: number | null;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number | null;
    totalPages: number;
  };
}

// ==================== ЭКСПОРТ ====================

export type {
  Category as CategoryData,
  Brand as BrandData,
  Subcategory as SubcategoryData,
};
