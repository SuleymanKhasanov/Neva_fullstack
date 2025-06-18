import { Injectable, Logger } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { NevaProduct } from './dto/product.dto';

interface ProductsResult {
  products: NevaProduct[];
  hasNextPage: boolean;
  totalCount: number;
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService
  ) {}

  async getProducts(params: {
    locale: string;
    page?: number;
    limit?: number;
    after?: string;
    section?: Section;
    categoryId?: number | string;
    brandId?: number | string;
  }): Promise<ProductsResult> {
    const { locale, page = 1, limit = 20, after, section } = params;
    const categoryId = params.categoryId
      ? parseInt(String(params.categoryId), 10)
      : undefined;
    const brandId = params.brandId
      ? parseInt(String(params.brandId), 10)
      : undefined;

    // Создаем уникальный ключ кеша
    const cacheKey = this.buildProductsCacheKey({
      locale,
      page,
      limit,
      after,
      section,
      categoryId,
      brandId,
    });

    try {
      console.log(`🔍 Checking cache for key: ${cacheKey}`);

      // Пытаемся получить из кеша
      const cached = await this.cacheService.get<ProductsResult>(cacheKey);
      if (cached) {
        console.log(`🎯 CACHE HIT for products: ${cacheKey}`);
        this.logger.log(`🎯 CACHE HIT for products: ${cacheKey}`);

        return cached;
      }

      console.log(
        `🔍 CACHE MISS for products: ${cacheKey} - fetching from database`
      );
      this.logger.log(
        `🔍 CACHE MISS for products: ${cacheKey} - fetching from database`
      );

      // Валидация categoryId и brandId с кешированием
      if (categoryId && !isNaN(categoryId)) {
        const categoryExists = await this.cacheService.getOrSet(
          `category_exists:${categoryId}`,
          async () => {
            const category = await this.prisma.category.findUnique({
              where: { id: categoryId },
            });

            return !!category;
          },
          { ttl: 600 } // 10 минут
        );

        if (!categoryExists) {
          this.logger.warn(`Category ID ${categoryId} not found`);

          return { products: [], hasNextPage: false, totalCount: 0 };
        }
      }

      if (brandId && !isNaN(brandId)) {
        const brandExists = await this.cacheService.getOrSet(
          `brand_exists:${brandId}`,
          async () => {
            const brand = await this.prisma.brand.findUnique({
              where: { id: brandId },
            });

            return !!brand;
          },
          { ttl: 600 } // 10 минут
        );

        if (!brandExists) {
          this.logger.warn(`Brand ID ${brandId} not found`);

          return { products: [], hasNextPage: false, totalCount: 0 };
        }
      }

      const afterId = after
        ? parseInt(Buffer.from(after, 'base64').toString(), 10)
        : undefined;

      // Строим WHERE условие с учетом переводов
      const where: any = {
        isActive: true,
        translations: {
          some: {
            locale: locale as any,
          },
        },
        ...(section && { section }),
        ...(categoryId && !isNaN(categoryId) && { categoryId }),
        ...(brandId && !isNaN(brandId) && { brandId }),
        ...(afterId && { id: { gt: afterId } }),
      };

      this.logger.log(
        `Fetching products with filters: ${JSON.stringify(where)}`
      );

      const skip = afterId ? undefined : (page - 1) * limit;
      const take = limit;

      const startTime = Date.now();

      // Параллельно выполняем запросы к БД
      const [products, totalCount] = await Promise.all([
        this.prisma.product.findMany({
          where,
          skip,
          take,
          orderBy: { id: 'asc' },
          include: {
            translations: {
              where: { locale: locale as any },
            },
            category: {
              include: {
                translations: {
                  where: { locale: locale as any },
                },
              },
            },
            brand: {
              include: {
                translations: {
                  where: { locale: locale as any },
                },
              },
            },
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        }),
        // Кешируем общий счетчик отдельно для переиспользования
        this.cacheService.getOrSet(
          `products_count:${JSON.stringify(where)}`,
          () => this.prisma.product.count({ where }),
          { ttl: 180 } // 3 минуты для счетчика
        ),
      ]);

      const dbTime = Date.now() - startTime;
      console.log(`⏱️ Database query took: ${dbTime}ms`);

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      const productsWithUrls = products
        .filter((product) => product.translations.length > 0) // Только с переводами
        .map((product) => {
          const translation = product.translations[0];
          const brandTranslation = product.brand?.translations[0];
          const categoryTranslation = product.category?.translations[0];
          const primaryImage = product.images[0];

          return {
            id: product.id,
            name: translation.name,
            locale: translation.locale,
            section: product.section,
            description: translation.description || '',
            image: primaryImage
              ? `${baseUrl}/public/images/${primaryImage.imageSmall}`
              : null,
            fullImage: primaryImage
              ? `${baseUrl}/public/images/${primaryImage.imageLarge}`
              : null,
            brand: brandTranslation
              ? {
                  id: product.brand!.id,
                  name: brandTranslation.name,
                  locale: brandTranslation.locale,
                  section: product.section, // Используем секцию продукта
                }
              : null,
            category: {
              id: product.category.id,
              name: categoryTranslation?.name || 'Unknown',
              locale: categoryTranslation?.locale || locale,
              section: product.category.section,
            },
          };
        });

      const result: ProductsResult = {
        products: productsWithUrls,
        hasNextPage: products.length === limit,
        totalCount,
      };

      // Кешируем результат
      await this.cacheService.set(cacheKey, result, { ttl: 300 });
      console.log(
        `💾 CACHED products result: ${cacheKey} (${result.products.length} items)`
      );
      this.logger.log(
        `💾 CACHED products result: ${cacheKey} (${result.products.length} items)`
      );

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch products: ${message}`, stack);
      throw new Error(message);
    }
  }

  async getCategories(locale: string, section?: Section) {
    const cacheKey = `categories:${locale}:${section || 'all'}`;

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const categories = await this.prisma.category.findMany({
          where: {
            ...(section && { section }),
            translations: {
              some: {
                locale: locale as any,
              },
            },
          },
          include: {
            translations: {
              where: { locale: locale as any },
            },
            categoryBrands: {
              where: {
                ...(section && { section }),
              },
              include: {
                brand: {
                  include: {
                    translations: {
                      where: { locale: locale as any },
                    },
                  },
                },
              },
            },
          },
        });

        const formattedCategories = categories
          .filter((cat) => cat.translations.length > 0)
          .map((category) => ({
            id: category.id,
            name: category.translations[0].name,
            locale: category.translations[0].locale,
            section: category.section,
            brands: category.categoryBrands
              .filter((cb) => cb.brand.translations.length > 0)
              .map((cb) => ({
                id: cb.brand.id,
                name: cb.brand.translations[0].name,
                locale: cb.brand.translations[0].locale,
                section: cb.section,
              })),
          }));

        return { categories: formattedCategories };
      },
      { ttl: 300 }
    );
  }

  async getBrands(locale: string, section?: Section) {
    const cacheKey = `brands:${locale}:${section || 'all'}`;

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const brands = await this.prisma.brand.findMany({
          where: {
            translations: {
              some: {
                locale: locale as any,
              },
            },
            ...(section && {
              categoryBrands: {
                some: {
                  section,
                },
              },
            }),
          },
          include: {
            translations: {
              where: { locale: locale as any },
            },
          },
          orderBy: {
            id: 'asc',
          },
        });

        return brands
          .filter((brand) => brand.translations.length > 0)
          .map((brand) => ({
            id: brand.id,
            name: brand.translations[0].name,
            locale: brand.translations[0].locale,
            section: section || Section.NEVA, // Используем переданную секцию или fallback
          }));
      },
      { ttl: 300 }
    );
  }

  // Инвалидация кеша продуктов
  async invalidateProductsCache(locale?: string, section?: Section) {
    const patterns = [
      'products:*',
      'products_count:*',
      locale ? `*:${locale}:*` : '*',
      section ? `*:${section}*` : '*',
    ];

    for (const pattern of patterns) {
      await this.cacheService.invalidateByPattern(pattern);
    }
  }

  // Приватный метод для создания ключа кеша продуктов
  private buildProductsCacheKey(params: {
    locale: string;
    page?: number;
    limit?: number;
    after?: string;
    section?: Section;
    categoryId?: number;
    brandId?: number;
  }): string {
    const parts = [
      'products',
      `locale:${params.locale}`,
      `page:${params.page || 1}`,
      `limit:${params.limit || 20}`,
      `after:${params.after || 'null'}`,
      `section:${params.section || 'all'}`,
      `categoryId:${params.categoryId || 'all'}`,
      `brandId:${params.brandId || 'all'}`,
    ];

    return parts.join(':');
  }
}
