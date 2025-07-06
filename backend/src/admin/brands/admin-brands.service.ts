// src/admin/brands/admin-brands.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Locale, Section } from '@prisma/client';

import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';
import {
  CreateBrandEnhancedDto,
  BrandCreatedResponseDto,
} from '../dto/create-brand-enhanced.dto';

@Injectable()
export class AdminBrandsService {
  private readonly logger = new Logger(AdminBrandsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService
  ) {}

  // ==================== АДМИНСКИЕ БРЕНДЫ ====================

  async getAdminBrands(locale?: string, section?: string) {
    const cacheKey = `admin:admin-brands:${locale || 'all'}:${section || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const brands = await this.prisma.adminBrand.findMany({
          include: {
            translations: {
              ...(locale && { where: { locale: locale as Locale } }),
            },
            categoryBrands: {
              ...(section && { where: { section: section as any } }),
              include: {
                category: {
                  include: {
                    translations: {
                      ...(locale && { where: { locale: locale as Locale } }),
                    },
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return brands.map((brand) => ({
          id: brand.id,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
          translations: brand.translations,
          categoryBrands: brand.categoryBrands.map((cb) => ({
            id: cb.id,
            section: cb.section,
            category: {
              id: cb.category.id,
              section: cb.category.section,
              translations: cb.category.translations,
            },
          })),
        }));
      },
      { ttl: 300 }
    );
  }

  async getSubcategoryById(subcategoryId: number) {
    return this.prisma.adminSubcategory.findUnique({
      where: { id: subcategoryId },
    });
  }

  async getAdminBrandsByCategory(
    categoryId?: number,
    locale?: string,
    section?: string
  ) {
    const cacheKey = `admin:admin-brands-by-category:${categoryId || 'all'}:${locale || 'all'}:${section || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const categoryBrands = await this.prisma.adminCategoryBrand.findMany({
          where: {
            ...(categoryId && { categoryId }),
            ...(section && { section: section as any }),
          },
          include: {
            brand: {
              include: {
                translations: {
                  ...(locale && { where: { locale: locale as Locale } }),
                },
              },
            },
            category: {
              include: {
                translations: {
                  ...(locale && { where: { locale: locale as Locale } }),
                },
              },
            },
          },
          orderBy: {
            brand: { createdAt: 'desc' },
          },
        });

        // Убираем дубликаты брендов и форматируем как categories API
        const uniqueBrands = new Map();

        categoryBrands.forEach((cb) => {
          if (!uniqueBrands.has(cb.brand.id)) {
            // Извлекаем название из переводов (как в categories API)
            const translation = cb.brand.translations?.[0];
            const name = translation?.name || 'Без названия';

            uniqueBrands.set(cb.brand.id, {
              id: cb.brand.id,
              name: name, // Прямое поле name вместо translations
              createdAt: cb.brand.createdAt,
              updatedAt: cb.brand.updatedAt,
            });
          }
        });

        return Array.from(uniqueBrands.values());
      },
      { ttl: 300 }
    );
  }

  async getAllBrands() {
    return this.cache.getOrSet(
      'admin:brands:all',
      async () => {
        const brands = await this.prisma.brand.findMany({
          include: {
            translations: true,
            _count: {
              select: {
                products: true,
                categoryBrands: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return brands.map((brand) => ({
          id: brand.id,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
          translations: brand.translations,
          stats: {
            productsCount: brand._count.products,
            categoriesCount: brand._count.categoryBrands,
          },
        }));
      },
      { ttl: 600 }
    );
  }

  async getBrand(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        translations: true,
        categoryBrands: {
          include: {
            category: {
              include: { translations: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return {
      id: brand.id,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      translations: brand.translations,
      categories: brand.categoryBrands.map((cb) => ({
        id: cb.category.id,
        section: cb.section,
        translations: cb.category.translations,
      })),
      productsCount: brand._count.products,
    };
  }

  // ==================== СОЗДАНИЕ БРЕНДА С КАТЕГОРИЯМИ ====================

  async createBrandWithCategories(
    dto: CreateBrandEnhancedDto
  ): Promise<BrandCreatedResponseDto> {
    this.logger.log(
      `Creating brand with categories. Section: ${dto.section}, Categories: ${dto.categoryIds.length}`
    );

    // Валидация категорий
    const categories = await this.prisma.adminCategory.findMany({
      where: {
        id: { in: dto.categoryIds },
        section: dto.section as Section,
      },
    });

    if (categories.length !== dto.categoryIds.length) {
      const missingCategories = dto.categoryIds.filter(
        (id) => !categories.find((cat) => cat.id === id)
      );
      throw new BadRequestException(
        `Категории не найдены или не соответствуют секции ${dto.section}: ${missingCategories.join(', ')}`
      );
    }

    // Валидация подкатегорий (если указаны)
    if (dto.subcategoryIds && dto.subcategoryIds.length > 0) {
      const subcategories = await this.prisma.adminSubcategory.findMany({
        where: {
          id: { in: dto.subcategoryIds },
          categoryId: { in: dto.categoryIds },
        },
      });

      if (subcategories.length !== dto.subcategoryIds.length) {
        const missingSubcategories = dto.subcategoryIds.filter(
          (id) => !subcategories.find((sub) => sub.id === id)
        );
        throw new BadRequestException(
          `Подкатегории не найдены или не соответствуют выбранным категориям: ${missingSubcategories.join(', ')}`
        );
      }
    }

    // Проверяем, что есть обязательный русский перевод
    const ruTranslation = dto.translations.find((t) => t.locale === 'ru');
    if (!ruTranslation) {
      throw new BadRequestException(
        'Обязательно укажите название бренда на русском языке'
      );
    }

    // Транзакция для создания бренда
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Создаем бренд в админских таблицах
      const adminBrand = await tx.adminBrand.create({
        data: {
          translations: {
            createMany: {
              data: dto.translations.map((t) => ({
                locale: t.locale as Locale,
                name: t.name,
              })),
            },
          },
        },
        include: { translations: true },
      });

      // 2. Создаем связи с категориями
      const categoryBrandData = dto.categoryIds.map((categoryId) => ({
        brandId: adminBrand.id,
        categoryId: categoryId,
        section: dto.section as Section,
      }));

      await tx.adminCategoryBrand.createMany({
        data: categoryBrandData,
      });

      // 3. Создаем связи с подкатегориями (если указаны)
      if (dto.subcategoryIds && dto.subcategoryIds.length > 0) {
        // Пока пропустим подкатегории, так как в схеме БД нет связи AdminBrand -> AdminSubcategory
        this.logger.log(
          `Subcategories specified but not linked in current schema: ${dto.subcategoryIds.join(', ')}`
        );
      }

      return adminBrand;
    });

    // Инвалидируем кеш
    await this.invalidateAdminCache();

    this.logger.log(`Brand created successfully with ID: ${result.id}`);

    // Формируем ответ
    return {
      id: result.id,
      section: dto.section,
      translations: result.translations.map((t) => ({
        locale: t.locale as any,
        name: t.name,
      })),
      categoriesCount: dto.categoryIds.length,
      subcategoriesCount: dto.subcategoryIds?.length || 0,
      createdAt: result.createdAt,
      message: 'Бренд успешно создан и привязан к выбранным категориям',
    };
  }

  async createBrand(data: {
    translations: Array<{ locale: string; name: string }>;
  }) {
    const brand = await this.prisma.brand.create({
      data: {
        translations: {
          create: data.translations.map((t) => ({
            locale: t.locale as Locale,
            name: t.name,
          })),
        },
      },
      include: { translations: true },
    });

    await this.invalidateCache();

    return brand;
  }

  async updateBrand(
    id: number,
    data: {
      translations?: Array<{ locale: string; name: string }>;
    }
  ) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    if (data.translations) {
      await this.prisma.$transaction(async (tx) => {
        await tx.brandTranslation.deleteMany({ where: { brandId: id } });
        await tx.brandTranslation.createMany({
          data: data.translations!.map((t) => ({
            brandId: id,
            locale: t.locale as Locale,
            name: t.name,
          })),
        });
      });
    }

    await this.invalidateCache();

    return { success: true, message: 'Бренд обновлен' };
  }

  async deleteBrand(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    if (brand._count.products > 0) {
      throw new Error(
        `Cannot delete brand: ${brand._count.products} products are attached`
      );
    }

    await this.prisma.brand.delete({ where: { id } });
    await this.invalidateCache();

    return { success: true, message: 'Бренд удален' };
  }

  private async invalidateCache() {
    try {
      await Promise.all([
        this.cache.invalidateByPattern('admin:brands:*'),
        this.cache.invalidateByPattern('brands:*'),
        this.cache.invalidateByPattern('products:*'),
        this.cache.invalidateByPattern('categories:*'),
        this.cache.invalidateByPattern('menu:*'),
      ]);
      this.logger.log('Cache invalidated for brands');
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }

  private async invalidateAdminCache() {
    try {
      await Promise.all([
        this.cache.invalidateByPattern('admin:admin-brands:*'),
        this.cache.invalidateByPattern('admin:admin-brands-by-category:*'),
        this.cache.invalidateByPattern('admin:categories:*'),
        this.cache.invalidateByPattern('admin:subcategories:*'),
        this.cache.invalidateByPattern('brands:*'),
        this.cache.invalidateByPattern('menu:*'),
      ]);
      this.logger.log('Admin cache invalidated for brands');
    } catch (error) {
      this.logger.warn('Failed to invalidate admin cache:', error);
    }
  }
}
