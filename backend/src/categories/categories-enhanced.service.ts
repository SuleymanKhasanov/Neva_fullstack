// backend/src/categories/categories-enhanced.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Section, Locale } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

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
    private prisma: PrismaService,
    private cacheService: CacheService
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

      // Получаем категории с субкатегориями, но только те, к которым привязаны бренды/продукты
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

      // Форматируем результат
      const formattedCategories: CategoryWithSubcategories[] = categories
        .filter((category) => category.translations.length > 0)
        .map((category) => {
          const translation = category.translations[0];

          // Получаем уникальные бренды для субкатегорий
          const uniqueBrandsFromSubcategories = new Set<number>();
          category.subcategories.forEach((sub) => {
            // Для каждой субкатегории получаем продукты и их бренды
            // Но это будет сложный запрос, пока упростим
          });

          return {
            id: category.id,
            name: translation.name,
            locale: translation.locale,
            section: category.section,
            subcategories: category.subcategories
              .filter((sub) => sub.translations.length > 0)
              .map((subcategory) => {
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
          .filter((sub) => sub.translations.length > 0)
          .map((subcategory) => {
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
  async invalidateEnhancedCategoriesCache(locale?: string, section?: Section) {
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

// backend/src/categories/categories-enhanced.controller.ts
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

import { Public } from '../auth/decorators/public.decorator';

import { CategoriesEnhancedService } from './categories-enhanced.service';

class SubcategoryResponseDto {
  @ApiProperty({ description: 'Subcategory ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Subcategory name', example: 'Ручки' })
  name!: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale!: string;

  @ApiProperty({ description: 'Products count', example: 15 })
  productsCount!: number;

  @ApiProperty({ description: 'Brands count', example: 3 })
  brandsCount!: number;
}

class CategoryWithSubcategoriesDto {
  @ApiProperty({ description: 'Category ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Category name', example: 'Канцтовары' })
  name!: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale!: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section!: Section;

  @ApiProperty({
    description: 'Subcategories with products',
    type: [SubcategoryResponseDto],
  })
  subcategories!: SubcategoryResponseDto[];

  @ApiProperty({ description: 'Brands count', example: 5 })
  brandsCount!: number;

  @ApiProperty({ description: 'Products count', example: 25 })
  productsCount!: number;
}

class CategoriesEnhancedResponseDto {
  @ApiProperty({
    description: 'Categories with subcategories',
    type: [CategoryWithSubcategoriesDto],
  })
  data!: CategoryWithSubcategoriesDto[];
}

@ApiTags('Categories Enhanced')
@Controller('categories-enhanced')
@Public()
export class CategoriesEnhancedController {
  constructor(
    private readonly categoriesEnhancedService: CategoriesEnhancedService
  ) {}

  @Get('all')
  @ApiOperation({
    summary: 'Получить все категории с субкатегориями (только с продуктами)',
    description:
      'Возвращает только те категории и субкатегории, к которым привязаны активные продукты',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'Categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getAllCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale
      );

    return { data: result.categories };
  }

  @Get('neva')
  @ApiOperation({
    summary: 'Получить NEVA категории с субкатегориями',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'NEVA categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getNevaCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale,
        Section.NEVA
      );

    return { data: result.categories };
  }

  @Get('x-solution')
  @ApiOperation({
    summary: 'Получить X_SOLUTION категории с субкатегориями',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'X_SOLUTION categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getXSolutionCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale,
        Section.X_SOLUTION
      );

    return { data: result.categories };
  }

  @Get(':categoryId/subcategories')
  @ApiOperation({
    summary: 'Получить субкатегории конкретной категории',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategories for category',
    type: [SubcategoryResponseDto],
  })
  async getSubcategoriesByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('locale') locale: string
  ): Promise<{ data: SubcategoryResponseDto[] }> {
    const subcategories =
      await this.categoriesEnhancedService.getSubcategoriesByCategory(
        categoryId,
        locale
      );

    return { data: subcategories };
  }
}
