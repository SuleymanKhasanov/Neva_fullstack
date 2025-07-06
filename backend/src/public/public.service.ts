// src/public/public.service.ts
import { createHash } from 'crypto';

import { Injectable, Logger } from '@nestjs/common';

import { Section, Locale } from '@prisma/client';

import { CacheService } from '../common/cache/cache.service';
import { PrismaService } from '../common/database/prisma.service';

// Интерфейсы для фильтров
export interface ProductFilters {
  locale: string;
  section?: string;
  categoryId?: number;
  subcategoryId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
  search?: string;
}

export interface CategoryFilters {
  locale: string;
  section?: string;
  withSubcategories?: boolean;
  withBrands?: boolean;
}

export interface BrandFilters {
  locale: string;
  section?: string;
  categoryId?: number;
}

export interface SearchQuery {
  query: string;
  locale: string;
  section?: string;
  page?: number;
  limit?: number;
}

// Интерфейсы для ответов
export interface ProductsResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CategoriesResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export interface BrandsResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  brands: any[];
}

export interface SearchResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  brands: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagination: any;
  query: string;
}

export interface MenuResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  neva: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xSolution: any[];
}

@Injectable()
export class PublicService {
  private readonly logger = new Logger(PublicService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService
  ) {}

  // ==================== УТИЛИТЫ КЕШИРОВАНИЯ ====================

  private createCacheKey(
    prefix: string,
    data: Record<string, unknown>
  ): string {
    const normalizedData = Object.keys(data)
      .sort()
      .reduce(
        (result, key) => {
          if (data[key] !== undefined && data[key] !== null) {
            result[key] = data[key];
          }

          return result;
        },
        {} as unknown as Record<string, unknown>
      );

    const hash = createHash('md5')
      .update(JSON.stringify(normalizedData))
      .digest('hex')
      .substring(0, 8);

    return `${prefix}:${hash}`;
  }

  // ==================== ПРОДУКТЫ ====================

  async getProducts(filters: ProductFilters): Promise<ProductsResponse> {
    const {
      locale,
      section,
      categoryId,
      subcategoryId,
      brandId,
      page = 1,
      limit = 20,
      search,
    } = filters;

    const cacheKey = this.createCacheKey(
      'products',
      filters as unknown as unknown as Record<string, unknown>
    );

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const where: Record<string, unknown> = {
          isActive: true,
          translations: {
            some: { locale: locale as Locale },
          },
          ...(section && { section: section as Section }),
          ...(categoryId && { categoryId }),
          ...(subcategoryId && { subcategoryId }),
          ...(brandId && { brandId }),
          ...(search && {
            translations: {
              some: {
                locale: locale as Locale,
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          }),
        };

        const [products, total] = await Promise.all([
          this.prisma.product.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            include: {
              translations: {
                where: { locale: locale as Locale },
              },
              brand: {
                include: {
                  translations: {
                    where: { locale: locale as Locale },
                  },
                },
              },
              category: {
                include: {
                  translations: {
                    where: { locale: locale as Locale },
                  },
                },
              },
              subcategory: {
                include: {
                  translations: {
                    where: { locale: locale as Locale },
                  },
                },
              },
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
            orderBy: { id: 'desc' },
          }),
          this.prisma.product.count({ where }),
        ]);

        const formattedProducts = products
          .filter((p) => p.translations.length > 0)
          .map((product) => this.formatProduct(product));

        const totalPages = Math.ceil(total / limit);

        return {
          products: formattedProducts,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        };
      },
      { ttl: 600 } // 10 минут - продукты редко изменяются
    );
  }

  async getProduct(id: number, locale: string): Promise<any> {
    const cacheKey = `product:${id}:${locale}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const product = await this.prisma.product.findUnique({
          where: { id, isActive: true },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
            brand: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            category: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            subcategory: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            images: {
              orderBy: { sortOrder: 'asc' },
            },
            specifications: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
        });

        if (!product || product.translations.length === 0) {
          return null;
        }

        return this.formatProductDetail(product);
      },
      { ttl: 1800 } // 30 минут - детали продукта статичны
    );
  }

  async getProductBySlug(slug: string, locale: string): Promise<any> {
    const cacheKey = `product:slug:${slug}:${locale}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const product = await this.prisma.product.findFirst({
          where: {
            slug,
            isActive: true,
            translations: {
              some: { locale: locale as Locale },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
            brand: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            category: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            subcategory: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
            images: {
              orderBy: { sortOrder: 'asc' },
            },
            specifications: {
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
        });

        if (!product) {
          return null;
        }

        return this.formatProductDetail(product);
      },
      { ttl: 1800 } // 30 минут - детали продукта статичны
    );
  }

  // ==================== КАТЕГОРИИ (ТОЛЬКО С ПРОДУКТАМИ) ====================

  async getCategories(filters: CategoryFilters): Promise<CategoriesResponse> {
    const {
      locale,
      section,
      withSubcategories = true,
      withBrands = true,
    } = filters;

    const cacheKey = this.createCacheKey(
      'categories',
      filters as unknown as Record<string, unknown>
    );

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        // 🔥 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Показываем только категории с активными продуктами
        const categories = await this.prisma.category.findMany({
          where: {
            ...(section && { section: section as Section }),
            translations: {
              some: { locale: locale as Locale },
            },
            // ✅ Фильтр: только категории с активными продуктами
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
            ...(withSubcategories && {
              subcategories: {
                // ✅ Показываем только субкатегории с продуктами
                where: {
                  products: {
                    some: {
                      isActive: true,
                      translations: {
                        some: { locale: locale as Locale },
                      },
                    },
                  },
                },
                include: {
                  translations: {
                    where: { locale: locale as Locale },
                  },
                },
              },
            }),
            ...(withBrands && {
              categoryBrands: {
                // ✅ Показываем только бренды с продуктами в этой категории
                where: {
                  brand: {
                    products: {
                      some: {
                        isActive: true,
                        categoryId: undefined, // Это будет заполнено динамически
                        translations: {
                          some: { locale: locale as Locale },
                        },
                      },
                    },
                  },
                },
                include: {
                  brand: {
                    include: {
                      translations: {
                        where: { locale: locale as Locale },
                      },
                    },
                  },
                },
              },
            }),
          },
          orderBy: { id: 'asc' },
        });

        // Дополнительная фильтрация брендов в коде для корректного categoryId
        const formattedCategories = [];

        for (const category of categories) {
          if (category.translations.length === 0) continue;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let formattedCategory: any = {
            id: category.id,
            name: category.translations[0].name,
            section: category.section,
          };

          // Субкатегории (уже отфильтрованы в запросе)
          if (withSubcategories) {
            formattedCategory.subcategories =
              category.subcategories
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ?.filter((s: any) => s.translations.length > 0)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((s: any) => ({
                  id: s.id,
                  name: s.translations[0].name,
                })) || [];
          }

          // Бренды - дополнительная фильтрация по categoryId
          if (withBrands) {
            const categoryBrands = await this.prisma.brand.findMany({
              where: {
                translations: {
                  some: { locale: locale as Locale },
                },
                products: {
                  some: {
                    isActive: true,
                    categoryId: category.id,
                    translations: {
                      some: { locale: locale as Locale },
                    },
                  },
                },
              },
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            });

            formattedCategory.brands = categoryBrands
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((b: any) => b.translations.length > 0)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((b: any) => ({
                id: b.id,
                name: b.translations[0].name,
              }));
          }

          formattedCategories.push(formattedCategory);
        }

        return { categories: formattedCategories };
      },
      { ttl: 3600 } // 1 час - категории очень редко изменяются
    );
  }

  async getCategory(id: number, locale: string): Promise<any> {
    const cacheKey = `category:${id}:${locale}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        // ✅ Проверяем что у категории есть активные продукты
        const category = await this.prisma.category.findFirst({
          where: {
            id,
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
            subcategories: {
              where: {
                products: {
                  some: {
                    isActive: true,
                    translations: {
                      some: { locale: locale as Locale },
                    },
                  },
                },
              },
              include: {
                translations: {
                  where: { locale: locale as Locale },
                },
              },
            },
          },
        });

        if (!category || category.translations.length === 0) {
          return null;
        }

        // Получаем бренды с продуктами в этой категории
        const categoryBrands = await this.prisma.brand.findMany({
          where: {
            translations: {
              some: { locale: locale as Locale },
            },
            products: {
              some: {
                isActive: true,
                categoryId: category.id,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
        });

        return {
          id: category.id,
          name: category.translations[0].name,
          section: category.section,
          subcategories:
            category.subcategories
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ?.filter((s: any) => s.translations.length > 0)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((s: any) => ({
                id: s.id,
                name: s.translations[0].name,
              })) || [],
          brands: categoryBrands
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((b: any) => b.translations.length > 0)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((b: any) => ({
              id: b.id,
              name: b.translations[0].name,
            })),
        };
      },
      { ttl: 600 }
    );
  }

  async getSubcategories(categoryId: number, locale: string): Promise<any[]> {
    const cacheKey = `subcategories:${categoryId}:${locale}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        // ✅ Только субкатегории с продуктами
        const subcategories = await this.prisma.subcategory.findMany({
          where: {
            categoryId,
            translations: {
              some: { locale: locale as Locale },
            },
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
          orderBy: { id: 'asc' },
        });

        return subcategories
          .filter((s) => s.translations.length > 0)
          .map((subcategory) => ({
            id: subcategory.id,
            name: subcategory.translations[0].name,
            categoryId: subcategory.categoryId,
          }));
      },
      { ttl: 300 }
    );
  }

  // ==================== БРЕНДЫ (ТОЛЬКО С ПРОДУКТАМИ) ====================

  async getBrands(filters: BrandFilters): Promise<BrandsResponse> {
    const { locale, section, categoryId } = filters;

    const cacheKey = this.createCacheKey(
      'brands',
      filters as unknown as Record<string, unknown>
    );

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const where: Record<string, unknown> = {
          translations: {
            some: { locale: locale as Locale },
          },
          // ✅ Только бренды с активными продуктами
          products: {
            some: {
              isActive: true,
              translations: {
                some: { locale: locale as Locale },
              },
              ...(section && { section: section as Section }),
              ...(categoryId && { categoryId }),
            },
          },
        };

        const brands = await this.prisma.brand.findMany({
          where,
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
          orderBy: { id: 'asc' },
        });

        const formattedBrands = brands
          .filter((b) => b.translations.length > 0)
          .map((brand) => ({
            id: brand.id,
            name: brand.translations[0].name,
          }));

        return { brands: formattedBrands };
      },
      { ttl: 3600 } // 1 час - бренды очень редко изменяются
    );
  }

  async getBrand(id: number, locale: string): Promise<any> {
    const cacheKey = `brand:${id}:${locale}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        // ✅ Проверяем что у бренда есть активные продукты
        const brand = await this.prisma.brand.findFirst({
          where: {
            id,
            translations: {
              some: { locale: locale as Locale },
            },
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
        });

        if (!brand || brand.translations.length === 0) {
          return null;
        }

        return {
          id: brand.id,
          name: brand.translations[0].name,
        };
      },
      { ttl: 600 }
    );
  }

  // ==================== ПОИСК ====================

  async search(query: SearchQuery): Promise<SearchResponse> {
    const { query: searchTerm, locale, section, page = 1, limit = 20 } = query;

    const cacheKey = this.createCacheKey(
      'search',
      query as unknown as Record<string, unknown>
    );

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        // Поиск продуктов
        const productsResult = await this.getProducts({
          locale,
          section,
          search: searchTerm,
          page,
          limit,
        });

        // Поиск категорий (только с продуктами)
        const categories = await this.prisma.category.findMany({
          where: {
            ...(section && { section: section as Section }),
            translations: {
              some: {
                locale: locale as Locale,
                name: { contains: searchTerm, mode: 'insensitive' },
              },
            },
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
          take: 10,
        });

        // Поиск брендов (только с продуктами)
        const brands = await this.prisma.brand.findMany({
          where: {
            translations: {
              some: {
                locale: locale as Locale,
                name: { contains: searchTerm, mode: 'insensitive' },
              },
            },
            products: {
              some: {
                isActive: true,
                translations: {
                  some: { locale: locale as Locale },
                },
                ...(section && { section: section as Section }),
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as Locale },
            },
          },
          take: 10,
        });

        return {
          products: productsResult.products,
          categories: categories
            .filter((c) => c.translations.length > 0)
            .map((c) => ({ id: c.id, name: c.translations[0].name })),
          brands: brands
            .filter((b) => b.translations.length > 0)
            .map((b) => ({ id: b.id, name: b.translations[0].name })),
          pagination: productsResult.pagination,
          query: searchTerm,
        };
      },
      { ttl: 300 } // 5 минут - поиск может изменяться
    );
  }

  // ==================== НАВИГАЦИЯ ====================

  async getMenuData(locale: string, section?: string): Promise<MenuResponse> {
    const cacheKey = `menu:${locale}:${section || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const nevaCategories = await this.getCategories({
          locale,
          section: section === 'NEVA' ? 'NEVA' : section ? undefined : 'NEVA',
        });

        const xSolutionCategories = await this.getCategories({
          locale,
          section:
            section === 'X_SOLUTION'
              ? 'X_SOLUTION'
              : section
                ? undefined
                : 'X_SOLUTION',
        });

        return {
          neva: section === 'X_SOLUTION' ? [] : nevaCategories.categories,
          xSolution: section === 'NEVA' ? [] : xSolutionCategories.categories,
        };
      },
      { ttl: 3600 } // 1 час - меню очень стабильно
    );
  }

  // ==================== ПРИВАТНЫЕ МЕТОДЫ ====================

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatProduct(product: any): any {
    const translation = product.translations[0];
    const image = product.images[0];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
      id: product.id,
      name: translation.name,
      description: translation.description || '',
      section: product.section,
      slug: product.slug,
      image: image ? `${baseUrl}/public/images/${image.imageSmall}` : null,
      brand: product.brand?.translations[0]
        ? {
            id: product.brand.id,
            name: product.brand.translations[0].name,
          }
        : null,
      category: {
        id: product.category.id,
        name: product.category.translations[0]?.name || 'Unknown',
      },
      subcategory: product.subcategory?.translations[0]
        ? {
            id: product.subcategory.id,
            name: product.subcategory.translations[0].name,
          }
        : null,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatProductDetail(product: any): any {
    const translation = product.translations[0];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
      id: product.id,
      name: translation.name,
      description: translation.description,
      marketingDescription: translation.marketingDescription,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription,
      section: product.section,
      slug: product.slug,
      brand: product.brand?.translations[0]
        ? {
            id: product.brand.id,
            name: product.brand.translations[0].name,
          }
        : null,
      category: {
        id: product.category.id,
        name: product.category.translations[0]?.name || 'Unknown',
      },
      subcategory: product.subcategory?.translations[0]
        ? {
            id: product.subcategory.id,
            name: product.subcategory.translations[0].name,
          }
        : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: product.images.map((img: any) => ({
        id: img.id,
        small: `${baseUrl}/public/images/${img.imageSmall}`,
        large: `${baseUrl}/public/images/${img.imageLarge}`,
        altText: img.altText,
        isPrimary: img.isPrimary,
      })),
      specifications: product.specifications
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((spec: any) => spec.translations.length > 0)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((spec: any) => ({
          name: spec.translations[0].name,
          value: spec.translations[0].value,
        })),
    };
  }
}
