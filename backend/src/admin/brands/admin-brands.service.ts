// src/admin/brands/admin-brands.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Locale } from '@prisma/client';

import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';

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

        // Убираем дубликаты брендов
        const uniqueBrands = new Map();

        categoryBrands.forEach((cb) => {
          if (!uniqueBrands.has(cb.brand.id)) {
            uniqueBrands.set(cb.brand.id, {
              id: cb.brand.id,
              createdAt: cb.brand.createdAt,
              updatedAt: cb.brand.updatedAt,
              translations: cb.brand.translations,
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
}
