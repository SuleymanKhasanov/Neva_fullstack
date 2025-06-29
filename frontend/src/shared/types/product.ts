// shared/types/product.ts

export interface ProductBrand {
  id: number;
  name: string;
  locale: string;
  section: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  locale: string;
  section: string;
}

export interface ProductImage {
  id: number;
  small: string;
  large: string;
  altText?: string;
  isPrimary: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  marketingDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  section: string;
  slug: string;
  brand: ProductBrand;
  category: ProductCategory;
  subcategory?: {
    id: number;
    name: string;
  };
  images: ProductImage[];
  specifications: ProductSpecification[];
}

export interface ProductApiResponse {
  data: ProductDetail;
  success: boolean;
  message?: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  description: string;
  image: string | null;
  brand: {
    id: number;
    name: string;
  };
}

// Для получения всех продуктов (статическая генерация)
export interface ProductPath {
  locale: string;
  id: string;
  slug: string; // Всегда должен быть валидной строкой
}

export interface AllProductsApiResponse {
  data: {
    products: ProductDetail[];
  };
  success: boolean;
}
