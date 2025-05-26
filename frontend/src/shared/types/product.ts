export interface BrandDto {
  id: number;
  name: string;
  locale: string;
  section: 'NEVA' | 'X_SOLUTION';
}

export interface CategoryDto {
  id: number;
  name: string;
  locale: string;
  section: 'NEVA' | 'X_SOLUTION';
}

export interface ProductDto {
  id: number;
  name: string;
  image: string | null;
  fullImage: string | null;
  description: string;
  locale: string;
  section: 'NEVA' | 'X_SOLUTION';
  brand: BrandDto | null;
  category: CategoryDto;
}

export interface ProductsResponse {
  data: ProductDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
