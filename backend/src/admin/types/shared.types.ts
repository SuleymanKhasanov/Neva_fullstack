// backend/src/admin/types/shared.types.ts

// Общий интерфейс для пользователя админки
export interface AdminUser {
  username: string;
  role: string;
}

// Общие типы для продуктов
export interface ProductTranslation {
  id: number;
  locale: string;
  name: string;
  description: string | null;
  marketingDescription: string | null;
}

export interface BrandData {
  id: number;
  translations: Array<{
    id: number;
    name: string;
    locale: string;
  }>;
}

export interface CategoryData {
  id: number;
  section: string;
  translations: Array<{
    id: number;
    name: string;
    locale: string;
  }>;
}

export interface SubcategoryData {
  id: number;
  translations: Array<{
    id: number;
    name: string;
    locale: string;
  }>;
}

export interface ProductImage {
  id: number;
  imageSmall: string;
  imageLarge: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  id: number;
  specKey: string; // Используем specKey как в БД
  sortOrder: number;
  translations: Array<{
    id: number;
    locale: string;
    name: string;
    value: string;
  }>;
}

// Основной интерфейс продукта для админки
export interface AdminProduct {
  id: number;
  section: string;
  slug: string | null;
  isActive: boolean;
  categoryId: number;
  subcategoryId: number | null;
  brandId: number | null;
  createdAt: Date;
  updatedAt: Date;
  translations: ProductTranslation[];
  brand: BrandData | null;
  category: CategoryData;
  subcategory: SubcategoryData | null;
  images: Array<
    ProductImage & {
      smallUrl?: string;
      largeUrl?: string;
    }
  >;
  specifications: ProductSpecification[];
}

// Типы для Prisma (чтобы избежать конфликтов с автогенерированными типами)
export interface BasicProductUpdate {
  categoryId?: number;
  subcategoryId?: number | null;
  brandId?: number | null;
  isActive?: boolean;
  slug?: string;
}
