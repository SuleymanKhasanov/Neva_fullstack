// src/public/categories-enhanced.service.ts (исправленный)
import { Injectable, Logger } from '@nestjs/common';
import { Section, Locale } from '@prisma/client';

import { CacheService } from '../common/cache/cache.service';
import { PrismaService } from '../common/database/prisma.service';

interface SubcategoryWithStats {
  id: number;
  name: string;
  locale: string;
  productsCount: number;
  brandsCount: number;
}

interface CategoryWithSubcategories {
  id: number;
  name: string;
  locale: string;
  section: Section;
  subcategories: SubcategoryWithStats[];
  brandsCount: number;
  productsCount: number;
}

@Injectable()
export class CategoriesEnhancedService {
  private readonly logger = new Logger(CategoriesEnhancedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  async getCategoriesWithSubcategories(
    locale: string,
    section?: Section
  ): Promise<{ categories: CategoryWithSubcategories[] }> {
    const cacheKey = `categories_enhanced:locale:${locale}:section:${section || 'all'}`;

    try {
      // Проверяем кеш
      const cached = await this.cacheService.get<{
        categories: CategoryWithSubcategories[];
      }>(cacheKey);
      if (cached) {
        this.logger.log(`🎯 Cache hit for enhanced categories: ${cacheKey}`);

        return cached;
      }

      this.logger.log(
        `🔍 Cache miss for enhanced categories: ${cacheKey} - fetching from database`
      );

      // Получаем категории с субкатегориями
      const categories = await this.prisma.category.findMany({
        where: {
          ...(section && { section }),
          translations: {
            some: { locale: locale as Locale },
          },
          OR: [
            // Категории с брендами
            {
              categoryBrands: {
                some: {},
              },
            },
            // Категории с продуктами
            {
              products: {
                some: {
                  isActive: true,
                  translations: {
                    some: { locale: locale as Locale },
                  },
                },
              },
            },
            // Категории с субкатегориями, у которых есть продукты
            {
              subcategories: {
                some: {
                  products: {
                    some: {
                      isActive: true,
                      translations: {
                        some: { locale: locale as Locale },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          translations: {
            where: { locale: locale as Locale },
          },
          subcategories: {
            where: {
              // Показываем только субкатегории с продуктами
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
              _count: {
                select: {
                  products: {
                    where: {
                      isActive: true,
                      translations: {
                        some: { locale: locale as Locale },
                      },
                    },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              categoryBrands: true,
              products: {
                where: {
                  isActive: true,
                  translations: {
                    some: { locale: locale as Locale },
                  },
                },
              },
            },
          },
        },
        orderBy: { id: 'asc' },
      });

      // Форматируем результат с правильной типизацией
      const formattedCategories: CategoryWithSubcategories[] = categories
        .filter((category: any) => category.translations.length > 0)
        .map((category: any) => {
          const translation = category.translations[0];

          return {
            id: category.id,
            name: translation.name,
            locale: translation.locale,
            section: category.section,
            subcategories: category.subcategories
              .filter((sub: any) => sub.translations.length > 0)
              .map((subcategory: any) => {
                const subTranslation = subcategory.translations[0];

                return {
                  id: subcategory.id,
                  name: subTranslation.name,
                  locale: subTranslation.locale,
                  productsCount: subcategory._count.products,
                  brandsCount: 0, // TODO: подсчитать уникальные бренды в продуктах субкатегории
                };
              }),
            brandsCount: category._count.categoryBrands,
            productsCount: category._count.products,
          };
        });

      const result = { categories: formattedCategories };

      // Кешируем результат на 5 минут
      await this.cacheService.set(cacheKey, result, { ttl: 300 });
      this.logger.log(`💾 Cached enhanced categories for: ${cacheKey}`);

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch enhanced categories: ${message}`,
        stack
      );
      throw new Error(message);
    }
  }

  async getSubcategoriesByCategory(
    categoryId: number,
    locale: string
  ): Promise<SubcategoryWithStats[]> {
    const cacheKey = `subcategories:category:${categoryId}:locale:${locale}`;

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const subcategories = await this.prisma.subcategory.findMany({
          where: {
            categoryId,
            translations: {
              some: { locale: locale as Locale },
            },
            // Показываем только субкатегории с продуктами
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
            _count: {
              select: {
                products: {
                  where: {
                    isActive: true,
                    translations: {
                      some: { locale: locale as Locale },
                    },
                  },
                },
              },
            },
          },
        });

        return subcategories
          .filter((sub: any) => sub.translations.length > 0)
          .map((subcategory: any) => {
            const translation = subcategory.translations[0];

            return {
              id: subcategory.id,
              name: translation.name,
              locale: translation.locale,
              productsCount: subcategory._count.products,
              brandsCount: 0, // TODO: подсчитать уникальные бренды
            };
          });
      },
      { ttl: 300 }
    );
  }

  // Инвалидация кеша
  async invalidateEnhancedCategoriesCache(
    locale?: string,
    section?: Section
  ): Promise<void> {
    try {
      const patterns = [
        'categories_enhanced:*',
        'subcategories:*',
        locale ? `*:${locale}:*` : '*',
        section ? `*:${section}*` : '*',
      ];

      for (const pattern of patterns) {
        await this.cacheService.invalidateByPattern(pattern);
      }
      this.logger.log('Enhanced categories cache invalidated');
    } catch (error) {
      this.logger.error(
        'Failed to invalidate enhanced categories cache:',
        error
      );
    }
  }
}
