import { Injectable, Logger } from '@nestjs/common';
import { Section, Locale } from '@prisma/client';

import { PrismaService } from '../../common/database/prisma.service';
import { CacheService } from '../../common/cache/cache.service';

@Injectable()
export class AdminMasterDataService {
  private readonly logger = new Logger(AdminMasterDataService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService
  ) {}

  // ==================== АДМИНСКИЕ КАТЕГОРИИ ====================

  async getAdminCategories(locale: Locale, section?: Section) {
    const cacheKey = `admin_categories:${locale}:${section || 'all'}`;

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const whereClause = section ? { section } : {};

    const categories = await this.prisma.adminCategory.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { locale },
        },
        subcategories: {
          include: {
            translations: {
              where: { locale },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const result = categories.map((category) => ({
      id: category.id,
      section: category.section,
      name: category.translations[0]?.name || '',
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        name: sub.translations[0]?.name || '',
      })),
    }));

    await this.cache.set(cacheKey, result, { ttl: 300 }); // 5 минут кеш
    return result;
  }

  async getAdminCategoryById(id: number, locale: Locale) {
    const category = await this.prisma.adminCategory.findUnique({
      where: { id },
      include: {
        translations: {
          where: { locale },
        },
        subcategories: {
          include: {
            translations: {
              where: { locale },
            },
          },
        },
      },
    });

    if (!category) {
      return null;
    }

    return {
      id: category.id,
      section: category.section,
      name: category.translations[0]?.name || '',
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        name: sub.translations[0]?.name || '',
      })),
    };
  }

  // ==================== АДМИНСКИЕ ПОДКАТЕГОРИИ ====================

  async getAdminSubcategories(categoryId?: number, locale?: Locale) {
    const whereClause = categoryId ? { categoryId } : {};

    const subcategories = await this.prisma.adminSubcategory.findMany({
      where: whereClause,
      include: {
        category: {
          include: {
            translations: locale ? { where: { locale } } : true,
          },
        },
        translations: locale ? { where: { locale } } : true,
      },
      orderBy: { id: 'asc' },
    });

    return subcategories.map((sub) => ({
      id: sub.id,
      categoryId: sub.categoryId,
      name: locale
        ? sub.translations.find((t) => t.locale === locale)?.name || ''
        : sub.translations,
      category: {
        id: sub.category.id,
        section: sub.category.section,
        name: locale
          ? sub.category.translations.find((t) => t.locale === locale)?.name ||
            ''
          : sub.category.translations,
      },
    }));
  }

  async getAdminSubcategoryById(id: number, locale: Locale) {
    const subcategory = await this.prisma.adminSubcategory.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            translations: {
              where: { locale },
            },
          },
        },
        translations: {
          where: { locale },
        },
      },
    });

    if (!subcategory) {
      return null;
    }

    return {
      id: subcategory.id,
      categoryId: subcategory.categoryId,
      name: subcategory.translations[0]?.name || '',
      category: {
        id: subcategory.category.id,
        section: subcategory.category.section,
        name: subcategory.category.translations[0]?.name || '',
      },
    };
  }

  // ==================== АДМИНСКИЕ БРЕНДЫ ====================

  async getAdminBrands(locale: Locale, categoryId?: number, section?: Section) {
    const cacheKey = `admin_brands:${locale}:${categoryId || 'all'}:${section || 'all'}`;

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let whereClause = {};

    if (categoryId || section) {
      whereClause = {
        categoryBrands: {
          some: {
            ...(categoryId && { categoryId }),
            ...(section && { section }),
          },
        },
      };
    }

    const brands = await this.prisma.adminBrand.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { locale },
        },
        categoryBrands: {
          include: {
            category: {
              include: {
                translations: {
                  where: { locale },
                },
              },
            },
          },
        },
      },
      orderBy: {
        translations: {
          _count: 'desc',
        },
      },
    });

    const result = brands.map((brand) => ({
      id: brand.id,
      name: brand.translations[0]?.name || '',
      categories: brand.categoryBrands.map((cb) => ({
        id: cb.category.id,
        section: cb.section,
        name: cb.category.translations[0]?.name || '',
      })),
    }));

    await this.cache.set(cacheKey, result, { ttl: 300 }); // 5 минут кеш
    return result;
  }

  async getAdminBrandById(id: number, locale: Locale) {
    const brand = await this.prisma.adminBrand.findUnique({
      where: { id },
      include: {
        translations: {
          where: { locale },
        },
        categoryBrands: {
          include: {
            category: {
              include: {
                translations: {
                  where: { locale },
                },
              },
            },
          },
        },
      },
    });

    if (!brand) {
      return null;
    }

    return {
      id: brand.id,
      name: brand.translations[0]?.name || '',
      categories: brand.categoryBrands.map((cb) => ({
        id: cb.category.id,
        section: cb.section,
        name: cb.category.translations[0]?.name || '',
      })),
    };
  }

  // ==================== СВЯЗИ КАТЕГОРИИ-БРЕНДЫ ====================

  async getAdminBrandsByCategory(
    categoryId: number,
    locale: Locale,
    section?: Section
  ) {
    const cacheKey = `admin_brands_by_category:${categoryId}:${locale}:${section || 'all'}`;

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const whereClause = {
      categoryId,
      ...(section && { section }),
    };

    const categoryBrands = await this.prisma.adminCategoryBrand.findMany({
      where: whereClause,
      include: {
        brand: {
          include: {
            translations: {
              where: { locale },
            },
          },
        },
      },
      orderBy: {
        brand: {
          translations: {
            _count: 'desc',
          },
        },
      },
    });

    const result = categoryBrands.map((cb) => ({
      id: cb.brand.id,
      name: cb.brand.translations[0]?.name || '',
    }));

    await this.cache.set(cacheKey, result, { ttl: 300 }); // 5 минут кеш
    return result;
  }

  // ==================== СТАТИСТИКА ====================

  async getAdminMasterDataStats() {
    const [
      categoriesCount,
      subcategoriesCount,
      brandsCount,
      categoryBrandsCount,
    ] = await Promise.all([
      this.prisma.adminCategory.count(),
      this.prisma.adminSubcategory.count(),
      this.prisma.adminBrand.count(),
      this.prisma.adminCategoryBrand.count(),
    ]);

    const [nevaCategories, xSolutionCategories] = await Promise.all([
      this.prisma.adminCategory.count({ where: { section: Section.NEVA } }),
      this.prisma.adminCategory.count({
        where: { section: Section.X_SOLUTION },
      }),
    ]);

    return {
      categories: {
        total: categoriesCount,
        neva: nevaCategories,
        xSolution: xSolutionCategories,
      },
      subcategories: {
        total: subcategoriesCount,
      },
      brands: {
        total: brandsCount,
      },
      categoryBrands: {
        total: categoryBrandsCount,
      },
    };
  }

  // ==================== КЕШ ====================

  async invalidateAdminCache(locale?: string, section?: string) {
    const patterns = [
      'admin_categories:*',
      'admin_brands:*',
      'admin_brands_by_category:*',
      ...(locale ? [`*:${locale}:*`] : []),
      ...(section ? [`*:${section}*`] : []),
    ];

    let totalDeleted = 0;
    for (const pattern of patterns) {
      const deleted = await this.cache.invalidateByPattern(pattern);
      totalDeleted += deleted;
    }

    return {
      success: true,
      message: 'Кеш админских мастер-данных инвалидирован',
      deletedCount: totalDeleted,
      patterns,
    };
  }
}
