// src/admin/products/admin-products.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';
import { UploadService } from '../../common/upload/upload.service';

// Простые интерфейсы для админки
interface CreateProductData {
  brandId?: number;
  categoryId: number;
  subcategoryId?: number;
  section: string;
  slug?: string;
  isActive?: boolean;
  translations: Array<{
    locale: string;
    name: string;
    description?: string;
    marketingDescription?: string;
  }>;
  specifications?: Array<{
    key: string;
    translations: Array<{
      locale: string;
      name: string;
      value: string;
    }>;
  }>;
}

interface UpdateProductData {
  brandId?: number;
  categoryId?: number;
  subcategoryId?: number;
  isActive?: boolean;
  translations?: Array<{
    locale: string;
    name: string;
    description?: string;
    marketingDescription?: string;
  }>;
  specifications?: Array<{
    key: string;
    translations: Array<{
      locale: string;
      name: string;
      value: string;
    }>;
  }>;
}

interface ProductFilters {
  categoryId?: number;
  subcategoryId?: number;
  brandId?: number;
  section?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class AdminProductsService {
  private readonly logger = new Logger(AdminProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly upload: UploadService
  ) {}

  // ==================== ОСНОВНЫЕ CRUD ОПЕРАЦИИ ====================

  async getProducts(filters: ProductFilters) {
    const {
      categoryId,
      subcategoryId,
      brandId,
      section,
      isActive,
      page = 1,
      limit = 50,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: any = {
      ...(categoryId && { categoryId }),
      ...(subcategoryId && { subcategoryId }),
      ...(brandId && { brandId }),
      ...(section && { section }),
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        translations: {
          some: {
            name: { contains: search, mode: 'insensitive' },
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
          translations: true,
          brand: {
            include: { translations: true },
          },
          category: {
            include: { translations: true },
          },
          subcategory: {
            include: { translations: true },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 3, // Только первые 3 изображения для списка
          },
          _count: {
            select: {
              images: true,
              specifications: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      products: products.map(this.formatProduct),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        translations: true,
        brand: {
          include: { translations: true },
        },
        category: {
          include: { translations: true },
        },
        subcategory: {
          include: { translations: true },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        specifications: {
          include: { translations: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.formatProduct(product);
  }

  async createProduct(data: CreateProductData) {
    // Валидация
    await this.validateProductData(data);

    const result = await this.prisma.$transaction(async (tx) => {
      // Создать продукт
      const product = await tx.product.create({
        data: {
          section: data.section as any,
          categoryId: data.categoryId,
          subcategoryId: data.subcategoryId,
          brandId: data.brandId,
          isActive: data.isActive ?? true,
          slug: this.generateSlug(data.translations[0].name),
        },
      });

      // Создать переводы
      await tx.productTranslation.createMany({
        data: data.translations.map((t) => ({
          productId: product.id,
          locale: t.locale as any,
          name: t.name,
          description: t.description,
          marketingDescription: t.marketingDescription,
        })),
      });

      // Создать характеристики
      if (data.specifications?.length) {
        for (const spec of data.specifications) {
          const specification = await tx.productSpecification.create({
            data: {
              productId: product.id,
              specKey: spec.key,
            },
          });

          await tx.productSpecificationTranslation.createMany({
            data: spec.translations.map((t) => ({
              specificationId: specification.id,
              locale: t.locale as any,
              name: t.name,
              value: t.value,
            })),
          });
        }
      }

      return product;
    });

    // Инвалидировать кеш
    await this.invalidateCache();

    this.logger.log(`Created product ID: ${result.id}`);

    return this.getProduct(result.id);
  }

  async updateProduct(id: number, data: UpdateProductData) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      // Обновить основные данные
      const updateData: any = {};
      if (data.categoryId !== undefined)
        updateData.categoryId = data.categoryId;
      if (data.subcategoryId !== undefined)
        updateData.subcategoryId = data.subcategoryId;
      if (data.brandId !== undefined) updateData.brandId = data.brandId;
      if (data.isActive !== undefined) updateData.isActive = data.isActive;

      if (Object.keys(updateData).length > 0) {
        await tx.product.update({
          where: { id },
          data: updateData,
        });
      }

      // Обновить переводы
      if (data.translations?.length) {
        await tx.productTranslation.deleteMany({ where: { productId: id } });
        await tx.productTranslation.createMany({
          data: data.translations.map((t) => ({
            productId: id,
            locale: t.locale as any,
            name: t.name,
            description: t.description,
            marketingDescription: t.marketingDescription,
          })),
        });

        // Обновить slug
        const newSlug = this.generateSlug(data.translations[0].name);
        await tx.product.update({
          where: { id },
          data: { slug: newSlug },
        });
      }

      // Обновить характеристики
      if (data.specifications?.length) {
        await tx.productSpecification.deleteMany({ where: { productId: id } });

        for (const spec of data.specifications) {
          const specification = await tx.productSpecification.create({
            data: {
              productId: id,
              specKey: spec.key,
            },
          });

          await tx.productSpecificationTranslation.createMany({
            data: spec.translations.map((t) => ({
              specificationId: specification.id,
              locale: t.locale as any,
              name: t.name,
              value: t.value,
            })),
          });
        }
      }
    });

    await this.invalidateCache();
    this.logger.log(`Updated product ID: ${id}`);

    return this.getProduct(id);
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Мягкое удаление - просто деактивируем
    await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    await this.invalidateCache();
    this.logger.log(`Deleted (deactivated) product ID: ${id}`);
  }

  // ==================== УПРАВЛЕНИЕ ИЗОБРАЖЕНИЯМИ ====================

  async uploadImages(productId: number, files: Express.Multer.File[]) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const uploaded = await this.upload.processAndSaveImages(productId, files);

    return {
      success: true,
      uploaded,
      message: `Uploaded ${uploaded.length} images`,
    };
  }

  async deleteImage(productId: number, imageId: number) {
    await this.upload.deleteImage(productId, imageId);
  }

  async setPrimaryImage(productId: number, imageId: number) {
    // Сброс текущего основного изображения
    await this.prisma.productImage.updateMany({
      where: { productId, isPrimary: true },
      data: { isPrimary: false },
    });

    // Установка нового основного изображения
    await this.prisma.productImage.update({
      where: { id: imageId, productId },
      data: { isPrimary: true },
    });
  }

  // ==================== МАССОВЫЕ ОПЕРАЦИИ ====================

  async bulkUpdateStatus(productIds: number[], isActive: boolean) {
    const result = await this.prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: { isActive },
    });

    await this.invalidateCache();

    return result;
  }

  async bulkDelete(productIds: number[]) {
    const result = await this.prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: { isActive: false },
    });

    await this.invalidateCache();

    return result;
  }

  // ==================== СВЯЗИ И ПРИВЯЗКИ ====================

  async moveToCategory(
    productId: number,
    categoryId: number,
    subcategoryId?: number
  ) {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        categoryId,
        subcategoryId,
      },
    });

    await this.invalidateCache();
  }

  async changeBrand(productId: number, brandId: number) {
    await this.prisma.product.update({
      where: { id: productId },
      data: { brandId },
    });

    await this.invalidateCache();
  }

  // ==================== ХАРАКТЕРИСТИКИ ====================

  async addSpecification(productId: number, specData: any) {
    const specification = await this.prisma.productSpecification.create({
      data: {
        productId,
        specKey: specData.key,
      },
    });

    await this.prisma.productSpecificationTranslation.createMany({
      data: specData.translations.map((t: any) => ({
        specificationId: specification.id,
        locale: t.locale,
        name: t.name,
        value: t.value,
      })),
    });

    await this.invalidateCache();

    return specification;
  }

  async deleteSpecification(productId: number, specId: number) {
    await this.prisma.productSpecification.delete({
      where: { id: specId, productId },
    });

    await this.invalidateCache();
  }

  // ==================== СТАТИСТИКА ====================

  async getProductsStats() {
    const [total, active, inactive, bySection] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.product.count({ where: { isActive: false } }),
      this.prisma.product.groupBy({
        by: ['section'],
        _count: true,
      }),
    ]);

    return {
      total,
      active,
      inactive,
      bySection,
    };
  }

  async getStatsByCategory() {
    return this.prisma.product.groupBy({
      by: ['categoryId'],
      _count: true,
      where: { isActive: true },
    });
  }

  async getStatsByBrand() {
    return this.prisma.product.groupBy({
      by: ['brandId'],
      _count: true,
      where: { isActive: true, brandId: { not: null } },
    });
  }

  // ==================== ПРИВАТНЫЕ МЕТОДЫ ====================

  private async validateProductData(data: CreateProductData) {
    // Проверить категорию
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new BadRequestException(`Category ${data.categoryId} not found`);
    }

    if (category.section !== data.section) {
      throw new BadRequestException('Category section mismatch');
    }

    // Проверить субкатегорию
    if (data.subcategoryId) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { id: data.subcategoryId },
        include: { category: true },
      });

      if (!subcategory) {
        throw new BadRequestException(
          `Subcategory ${data.subcategoryId} not found`
        );
      }

      if (subcategory.categoryId !== data.categoryId) {
        throw new BadRequestException(
          'Subcategory does not belong to category'
        );
      }
    }

    // Проверить бренд
    if (data.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: data.brandId },
      });

      if (!brand) {
        throw new BadRequestException(`Brand ${data.brandId} not found`);
      }
    }

    // Проверить уникальность локалей
    const locales = data.translations.map((t) => t.locale);
    if (new Set(locales).size !== locales.length) {
      throw new BadRequestException('Duplicate locales in translations');
    }
  }

  private formatProduct(product: any) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
      id: product.id,
      section: product.section,
      slug: product.slug,
      isActive: product.isActive,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      brandId: product.brandId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      translations: product.translations,
      brand: product.brand
        ? {
            ...product.brand,
            translations: product.brand.translations,
          }
        : null,
      category: {
        ...product.category,
        translations: product.category.translations,
      },
      subcategory: product.subcategory
        ? {
            ...product.subcategory,
            translations: product.subcategory.translations,
          }
        : null,
      images: product.images.map((img: any) => ({
        id: img.id,
        smallUrl: `${baseUrl}/public/images/${img.imageSmall}`,
        largeUrl: `${baseUrl}/public/images/${img.imageLarge}`,
        altText: img.altText,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
      })),
      specifications:
        product.specifications?.map((spec: any) => ({
          id: spec.id,
          key: spec.specKey,
          sortOrder: spec.sortOrder,
          translations: spec.translations,
        })) || [],
      stats: {
        imagesCount: product._count?.images || product.images?.length || 0,
        specificationsCount:
          product._count?.specifications || product.specifications?.length || 0,
      },
    };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private async invalidateCache() {
    try {
      await Promise.all([
        this.cache.invalidateByPattern('products:*'),
        this.cache.invalidateByPattern('product:*'),
        this.cache.invalidateByPattern('categories:*'),
        this.cache.invalidateByPattern('brands:*'),
        this.cache.invalidateByPattern('menu:*'),
        this.cache.invalidateByPattern('search:*'),
      ]);
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }
}
