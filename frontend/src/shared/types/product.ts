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

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  fullImage: string;
  locale: string;
  section: string;
  slug: string;
  brand: ProductBrand;
  category: ProductCategory;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
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
  slug: string;
}

export interface AllProductsApiResponse {
  data: {
    products: ProductDetail[];
  };
  success: boolean;
}
