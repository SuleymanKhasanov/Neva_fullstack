export interface Category {
  id: number;
  name: string;
  locale: string;
  section: 'NEVA' | 'X_SOLUTION';
  brands?: BrandDto[]; // Добавляем brands как опциональное поле
}

export interface BrandDto {
  id: number;
  name: string;
  locale: string;
  section: 'NEVA' | 'X_SOLUTION';
}

export interface CategoryWithBrands extends Category {
  brands: BrandDto[]; // Гарантируем, что brands всегда есть
}

export interface ApiResponseWithBrands {
  data: CategoryWithBrands[];
  meta: {
    total: number;
    page: number;
    limit: number | null;
    totalPages: number;
  };
}
