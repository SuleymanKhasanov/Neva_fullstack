// src/admin/categories/admin-categories.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class AdminCategoriesService {
  private readonly logger = new Logger(AdminCategoriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService
  ) {}

  // ==================== АДМИНСКИЕ КАТЕГОРИИ ====================

  async getAdminCategories(section?: string, locale?: string) {
    const cacheKey = `admin:admin-categories:all:${section || 'all'}:${locale || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const categories = await this.prisma.adminCategory.findMany({
          where: {
            ...(section && { section: section as any }),
          },
          include: {
            translations: {
              ...(locale && { where: { locale: locale as any } }),
            },
            subcategories: {
              include: {
                translations: {
                  ...(locale && { where: { locale: locale as any } }),
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return categories.map((category) => ({
          id: category.id,
          section: category.section,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          translations: category.translations,
          subcategories: category.subcategories.map((sub) => ({
            id: sub.id,
            categoryId: sub.categoryId,
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
            translations: sub.translations,
          })),
        }));
      },
      { ttl: 300 } // 5 минут
    );
  }

  async getAdminSubcategories(categoryId?: string, locale?: string) {
    const cacheKey = `admin:admin-subcategories:${categoryId || 'all'}:${locale || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const subcategories = await this.prisma.adminSubcategory.findMany({
          where: {
            ...(categoryId && { categoryId: parseInt(categoryId) }),
          },
          include: {
            translations: {
              ...(locale && { where: { locale: locale as any } }),
            },
            category: {
              include: {
                translations: {
                  ...(locale && { where: { locale: locale as any } }),
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return subcategories.map((subcategory) => ({
          id: subcategory.id,
          categoryId: subcategory.categoryId,
          createdAt: subcategory.createdAt,
          updatedAt: subcategory.updatedAt,
          translations: subcategory.translations,
          category: {
            id: subcategory.category.id,
            section: subcategory.category.section,
            translations: subcategory.category.translations,
          },
        }));
      },
      { ttl: 300 } // 5 минут
    );
  }

  // ==================== КАТЕГОРИИ ====================

  async getAllCategories(section?: string, locale?: string) {
    const cacheKey = `admin:categories:all:${section || 'all'}:${locale || 'all'}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
        const categories = await this.prisma.category.findMany({
          where: {
            ...(section && { section: section as any }),
          },
          include: {
            translations: {
              ...(locale && { where: { locale: locale as any } }),
            },
            subcategories: {
              include: {
                translations: {
                  ...(locale && { where: { locale: locale as any } }),
                },
                _count: {
                  select: { products: true },
                },
              },
            },
            _count: {
              select: {
                products: true,
                categoryBrands: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return categories.map((category) => ({
          id: category.id,
          section: category.section,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          translations: category.translations,
          subcategories: category.subcategories.map((sub) => ({
            id: sub.id,
            categoryId: sub.categoryId,
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
            translations: sub.translations,
            productsCount: sub._count.products,
          })),
          stats: {
            productsCount: category._count.products,
            brandsCount: category._count.categoryBrands,
            subcategoriesCount: category.subcategories.length,
          },
        }));
      },
      { ttl: 600 }
    );
  }

  async getCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        translations: true,
        subcategories: {
          include: {
            translations: true,
            _count: {
              select: { products: true },
            },
          },
        },
        categoryBrands: {
          include: {
            brand: {
              include: { translations: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      id: category.id,
      section: category.section,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: category.translations,
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        categoryId: sub.categoryId,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
        translations: sub.translations,
        productsCount: sub._count.products,
      })),
      brands: category.categoryBrands.map((cb) => ({
        id: cb.brand.id,
        section: cb.section,
        translations: cb.brand.translations,
      })),
      productsCount: category._count.products,
    };
  }

  async createCategory(data: {
    section: string;
    translations: Array<{ locale: string; name: string }>;
  }) {
    const category = await this.prisma.category.create({
      data: {
        section: data.section as any,
        translations: { create: data.translations as any },
      },
      include: { translations: true },
    });

    await this.invalidateCache();

    return category;
  }

  async updateCategory(
    id: number,
    data: {
      section?: string;
      translations?: Array<{ locale: string; name: string }>;
    }
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      const updateData: any = {};
      if (data.section) {
        updateData.section = data.section;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.category.update({
          where: { id },
          data: updateData,
        });
      }

      if (data.translations) {
        await tx.categoryTranslation.deleteMany({ where: { categoryId: id } });
        await tx.categoryTranslation.createMany({
          data: data.translations.map((t) => ({
            categoryId: id,
            locale: t.locale as any,
            name: t.name,
          })),
        });
      }
    });

    await this.invalidateCache();

    return { success: true, message: 'Категория обновлена' };
  }

  async deleteCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true, subcategories: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category._count.products > 0) {
      throw new BadRequestException(
        `Cannot delete category: ${category._count.products} products are attached`
      );
    }

    if (category._count.subcategories > 0) {
      throw new BadRequestException(
        `Cannot delete category: ${category._count.subcategories} subcategories are attached`
      );
    }

    await this.prisma.category.delete({ where: { id } });
    await this.invalidateCache();

    return { success: true, message: 'Категория удалена' };
  }

  // ==================== СУБКАТЕГОРИИ ====================

  async getAllSubcategories(categoryId?: number, locale?: string) {
    const subcategories = await this.prisma.subcategory.findMany({
      where: {
        ...(categoryId && { categoryId }),
      },
      include: {
        translations: {
          ...(locale && { where: { locale: locale as any } }),
        },
        category: {
          include: {
            translations: {
              ...(locale && { where: { locale: locale as any } }),
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return subcategories.map((subcategory) => ({
      id: subcategory.id,
      categoryId: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      translations: subcategory.translations,
      category: {
        id: subcategory.category.id,
        section: subcategory.category.section,
        translations: subcategory.category.translations,
      },
      productsCount: subcategory._count.products,
    }));
  }

  async getSubcategory(id: number) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: {
        translations: true,
        category: {
          include: { translations: true },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    return {
      id: subcategory.id,
      categoryId: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      translations: subcategory.translations,
      category: {
        id: subcategory.category.id,
        section: subcategory.category.section,
        translations: subcategory.category.translations,
      },
      productsCount: subcategory._count.products,
    };
  }

  async createSubcategory(data: {
    categoryId: number;
    translations: Array<{ locale: string; name: string }>;
  }) {
    // Проверяем существование категории
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${data.categoryId} not found`
      );
    }

    const subcategory = await this.prisma.subcategory.create({
      data: {
        categoryId: data.categoryId,
        translations: { create: data.translations as any },
      },
      include: { translations: true },
    });

    await this.invalidateCache();

    return subcategory;
  }

  async updateSubcategory(
    id: number,
    data: {
      categoryId?: number;
      translations?: Array<{ locale: string; name: string }>;
    }
  ) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      const updateData: any = {};
      if (data.categoryId) {
        updateData.categoryId = data.categoryId;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.subcategory.update({
          where: { id },
          data: updateData,
        });
      }

      if (data.translations) {
        await tx.subcategoryTranslation.deleteMany({
          where: { subcategoryId: id },
        });
        await tx.subcategoryTranslation.createMany({
          data: data.translations.map((t) => ({
            subcategoryId: id,
            locale: t.locale as any,
            name: t.name,
          })),
        });
      }
    });

    await this.invalidateCache();

    return { success: true, message: 'Субкатегория обновлена' };
  }

  async deleteSubcategory(id: number) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    if (subcategory._count.products > 0) {
      throw new BadRequestException(
        `Cannot delete subcategory: ${subcategory._count.products} products are attached`
      );
    }

    await this.prisma.subcategory.delete({ where: { id } });
    await this.invalidateCache();

    return { success: true, message: 'Субкатегория удалена' };
  }

  // ==================== СВЯЗЫВАНИЕ БРЕНДОВ ====================

  async linkBrandToCategory(
    categoryId: number,
    brandId: number,
    section: string
  ) {
    // Проверяем существование категории и бренда
    const [category, brand] = await Promise.all([
      this.prisma.category.findUnique({ where: { id: categoryId } }),
      this.prisma.brand.findUnique({ where: { id: brandId } }),
    ]);

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    // Проверяем существующую связь
    const existing = await this.prisma.categoryBrand.findUnique({
      where: {
        categoryId_brandId_section: {
          categoryId,
          brandId,
          section: section as any,
        },
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Brand ${brandId} is already linked to category ${categoryId} for section ${section}`
      );
    }

    await this.prisma.categoryBrand.create({
      data: { categoryId, brandId, section: section as any },
    });

    await this.invalidateCache();

    return { success: true, message: 'Бренд привязан к категории' };
  }

  async unlinkBrandFromCategory(
    categoryId: number,
    brandId: number,
    section: string
  ) {
    const existing = await this.prisma.categoryBrand.findUnique({
      where: {
        categoryId_brandId_section: {
          categoryId,
          brandId,
          section: section as any,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Brand ${brandId} is not linked to category ${categoryId} for section ${section}`
      );
    }

    await this.prisma.categoryBrand.delete({
      where: { id: existing.id },
    });

    await this.invalidateCache();

    return { success: true, message: 'Бренд отвязан от категории' };
  }

  // ==================== УТИЛИТЫ ====================

  private async invalidateCache() {
    try {
      await Promise.all([
        this.cache.invalidateByPattern('admin:categories:*'),
        this.cache.invalidateByPattern('categories:*'),
        this.cache.invalidateByPattern('subcategories:*'),
        this.cache.invalidateByPattern('brands:*'),
        this.cache.invalidateByPattern('products:*'),
        this.cache.invalidateByPattern('menu:*'),
      ]);
      this.logger.log('Cache invalidated for categories');
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }
}
