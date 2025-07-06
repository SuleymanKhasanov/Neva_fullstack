// backend/src/admin/admin-products-enhanced.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import type { PrismaClient } from '@prisma/client';

import { CacheService } from '../common/cache/cache.service';
import { PrismaService } from '../common/database/prisma.service';

import {
  CreateProductEnhancedDto,
  UpdateProductEnhancedDto,
  TranslationDto,
} from './dto/admin-product-enhanced.dto';
import type { AdminProduct } from './types/shared.types';

// Типы для типизации Prisma транзакций
type PrismaTransaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

@Injectable()
export class AdminProductsEnhancedService {
  private readonly logger = new Logger(AdminProductsEnhancedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  async findAll(): Promise<AdminProduct[]> {
    const products = await this.prisma.product.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => this.formatProductEnhanced(product));
  }

  async findOne(id: number): Promise<AdminProduct> {
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

    return this.formatProductEnhanced(product);
  }

  async create(
    createProductDto: CreateProductEnhancedDto
  ): Promise<AdminProduct> {
    // Валидация данных из админских таблиц
    await this.validateProductDataFromAdmin(createProductDto);

    const result = await this.prisma.$transaction(
      async (tx: PrismaTransaction) => {
        // 1. Скопировать данные из админских таблиц в публичные
        const publicIds = await this.copyAdminDataToPublic(
          tx,
          createProductDto
        );

        // 2. Создать продукт с ID из публичных таблиц
        const product = await tx.product.create({
          data: {
            section: createProductDto.section,
            categoryId: publicIds.categoryId,
            subcategoryId: publicIds.subcategoryId,
            brandId: publicIds.brandId,
            isActive: createProductDto.isActive ?? true,
            slug: this.generateSlug(createProductDto.translations[0].name),
          },
        });

        // 3. Создать переводы
        await tx.productTranslation.createMany({
          data: createProductDto.translations.map((t: TranslationDto) => ({
            productId: product.id,
            locale: t.locale,
            name: t.name,
            description: t.description,
            marketingDescription: t.marketingDescription,
          })),
        });

        // 4. Создать характеристики
        if (createProductDto.specifications?.length) {
          for (const spec of createProductDto.specifications) {
            const specification = await tx.productSpecification.create({
              data: {
                productId: product.id,
                specKey: spec.key,
              },
            });

            await tx.productSpecificationTranslation.createMany({
              data: spec.translations.map((t) => ({
                specificationId: specification.id,
                locale: t.locale,
                name: t.name,
                value: t.value,
              })),
            });
          }
        }

        return product;
      }
    );

    // Инвалидировать кеш
    await this.invalidateCache();

    this.logger.log(
      `Created product ID: ${result.id} with admin category: ${createProductDto.categoryId}, admin subcategory: ${createProductDto.subcategoryId || 'none'}, admin brand: ${createProductDto.brandId || 'none'}`
    );

    return this.findOne(result.id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductEnhancedDto
  ): Promise<AdminProduct> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx: PrismaTransaction) => {
      // Обновить основные данные с правильной типизацией Prisma
      const updateData: any = {}; // Используем any для упрощения работы с Prisma типами

      if (updateProductDto.categoryId !== undefined) {
        updateData.categoryId = updateProductDto.categoryId;
      }
      if (updateProductDto.subcategoryId !== undefined) {
        updateData.subcategoryId = updateProductDto.subcategoryId;
      }
      if (updateProductDto.brandId !== undefined) {
        updateData.brandId = updateProductDto.brandId;
      }
      if (updateProductDto.isActive !== undefined) {
        updateData.isActive = updateProductDto.isActive;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.product.update({
          where: { id },
          data: updateData,
        });
      }

      // Обновить переводы если предоставлены
      if (updateProductDto.translations?.length) {
        await tx.productTranslation.deleteMany({ where: { productId: id } });
        await tx.productTranslation.createMany({
          data: updateProductDto.translations.map((t: TranslationDto) => ({
            productId: id,
            locale: t.locale,
            name: t.name,
            description: t.description,
            marketingDescription: t.marketingDescription,
          })),
        });

        // Обновить slug
        const newSlug = this.generateSlug(
          updateProductDto.translations[0].name
        );
        await tx.product.update({
          where: { id },
          data: { slug: newSlug },
        });
      }

      // Обновить характеристики если предоставлены
      if (updateProductDto.specifications?.length) {
        await tx.productSpecification.deleteMany({ where: { productId: id } });

        for (const spec of updateProductDto.specifications) {
          const specification = await tx.productSpecification.create({
            data: {
              productId: id,
              specKey: spec.key,
            },
          });

          await tx.productSpecificationTranslation.createMany({
            data: spec.translations.map((t) => ({
              specificationId: specification.id,
              locale: t.locale,
              name: t.name,
              value: t.value,
            })),
          });
        }
      }
    });

    await this.invalidateCache();
    this.logger.log(`Updated product ID: ${id}`);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Удалить продукт (каскадное удаление)
    await this.prisma.product.delete({ where: { id } });

    await this.invalidateCache();
    this.logger.log(`Deleted product ID: ${id}`);
  }

  private async validateProductDataFromAdmin(
    dto: CreateProductEnhancedDto
  ): Promise<void> {
    // Проверить категорию в админских таблицах
    const adminCategory = await this.prisma.adminCategory.findUnique({
      where: { id: dto.categoryId },
    });

    if (!adminCategory) {
      throw new BadRequestException(
        `Admin category ${dto.categoryId} not found`
      );
    }

    if (adminCategory.section !== dto.section) {
      throw new BadRequestException('Admin category section mismatch');
    }

    // Проверить субкатегорию если указана
    if (dto.subcategoryId) {
      const adminSubcategory = await this.prisma.adminSubcategory.findUnique({
        where: { id: dto.subcategoryId },
      });

      if (!adminSubcategory) {
        throw new BadRequestException(
          `Admin subcategory ${dto.subcategoryId} not found`
        );
      }

      if (adminSubcategory.categoryId !== dto.categoryId) {
        throw new BadRequestException(
          `Admin subcategory ${dto.subcategoryId} does not belong to admin category ${dto.categoryId}`
        );
      }
    }

    // Проверить бренд если указан
    if (dto.brandId) {
      const adminBrand = await this.prisma.adminBrand.findUnique({
        where: { id: dto.brandId },
      });

      if (!adminBrand) {
        throw new BadRequestException(`Admin brand ${dto.brandId} not found`);
      }
    }

    // Проверить уникальность локалей
    const locales = dto.translations.map((t: TranslationDto) => t.locale);
    if (new Set(locales).size !== locales.length) {
      throw new BadRequestException('Duplicate locales in translations');
    }
  }

  private async copyAdminDataToPublic(
    tx: PrismaTransaction,
    dto: CreateProductEnhancedDto
  ): Promise<{
    categoryId: number;
    subcategoryId: number | null;
    brandId: number | null;
  }> {
    let publicCategoryId: number;
    let publicSubcategoryId: number | null = null;
    let publicBrandId: number | null = null;

    // 1. Копировать категорию
    const adminCategory = await tx.adminCategory.findUnique({
      where: { id: dto.categoryId },
      include: { translations: true },
    });

    // Ищем публичную категорию с такими же переводами (по названию)
    let existingPublicCategory = await tx.category.findFirst({
      where: {
        section: adminCategory!.section,
        translations: {
          some: {
            name: adminCategory!.translations[0]?.name,
          },
        },
      },
      include: { translations: true },
    });

    if (existingPublicCategory) {
      // Проверить нужно ли обновить переводы
      const existingTranslations = existingPublicCategory.translations.map(
        (t) => t.locale
      );
      const adminTranslations = adminCategory!.translations.map(
        (t) => t.locale
      );

      if (
        !adminTranslations.every((locale) =>
          existingTranslations.includes(locale)
        )
      ) {
        // Добавить недостающие переводы
        for (const adminTranslation of adminCategory!.translations) {
          if (!existingTranslations.includes(adminTranslation.locale)) {
            await tx.categoryTranslation.create({
              data: {
                categoryId: existingPublicCategory.id,
                locale: adminTranslation.locale,
                name: adminTranslation.name,
              },
            });
          }
        }
      }
      publicCategoryId = existingPublicCategory.id;
    } else {
      // Создать новую публичную категорию
      const newPublicCategory = await tx.category.create({
        data: {
          section: adminCategory!.section,
        },
      });

      await tx.categoryTranslation.createMany({
        data: adminCategory!.translations.map((t) => ({
          categoryId: newPublicCategory.id,
          locale: t.locale,
          name: t.name,
        })),
      });

      publicCategoryId = newPublicCategory.id;
    }

    // 2. Копировать субкатегорию если указана
    if (dto.subcategoryId) {
      const adminSubcategory = await tx.adminSubcategory.findUnique({
        where: { id: dto.subcategoryId },
        include: { translations: true },
      });

      let existingPublicSubcategory = null;

      if (adminSubcategory?.translations[0]?.name) {
        existingPublicSubcategory = await tx.subcategory.findFirst({
          where: {
            categoryId: publicCategoryId,
            translations: {
              some: {
                name: adminSubcategory.translations[0].name,
              },
            },
          },
          include: { translations: true },
        });
      }

      if (existingPublicSubcategory && adminSubcategory) {
        // Обновить переводы если нужно
        const existingTranslations = existingPublicSubcategory.translations.map(
          (t) => t.locale
        );

        for (const adminTranslation of adminSubcategory.translations) {
          if (!existingTranslations.includes(adminTranslation.locale)) {
            await tx.subcategoryTranslation.create({
              data: {
                subcategoryId: existingPublicSubcategory.id,
                locale: adminTranslation.locale,
                name: adminTranslation.name,
              },
            });
          }
        }
        publicSubcategoryId = existingPublicSubcategory.id;
      } else if (adminSubcategory) {
        // Создать новую публичную субкатегорию
        const newPublicSubcategory = await tx.subcategory.create({
          data: {
            categoryId: publicCategoryId,
          },
        });

        await tx.subcategoryTranslation.createMany({
          data: adminSubcategory.translations.map((t) => ({
            subcategoryId: newPublicSubcategory.id,
            locale: t.locale,
            name: t.name,
          })),
        });

        publicSubcategoryId = newPublicSubcategory.id;
      }
    }

    // 3. Копировать бренд если указан
    if (dto.brandId) {
      const adminBrand = await tx.adminBrand.findUnique({
        where: { id: dto.brandId },
        include: { translations: true },
      });

      let existingPublicBrand = null;

      if (adminBrand?.translations[0]?.name) {
        existingPublicBrand = await tx.brand.findFirst({
          where: {
            translations: {
              some: {
                name: adminBrand.translations[0].name,
              },
            },
          },
          include: { translations: true },
        });
      }

      if (existingPublicBrand && adminBrand) {
        // Обновить переводы если нужно
        const existingTranslations = existingPublicBrand.translations.map(
          (t) => t.locale
        );

        for (const adminTranslation of adminBrand.translations) {
          if (!existingTranslations.includes(adminTranslation.locale)) {
            await tx.brandTranslation.create({
              data: {
                brandId: existingPublicBrand.id,
                locale: adminTranslation.locale,
                name: adminTranslation.name,
              },
            });
          }
        }
        publicBrandId = existingPublicBrand.id;
      } else if (adminBrand) {
        // Создать новый публичный бренд
        const newPublicBrand = await tx.brand.create({
          data: {},
        });

        await tx.brandTranslation.createMany({
          data: adminBrand.translations.map((t) => ({
            brandId: newPublicBrand.id,
            locale: t.locale,
            name: t.name,
          })),
        });

        // Создать связь категория-бренд
        await tx.categoryBrand.create({
          data: {
            categoryId: publicCategoryId,
            brandId: newPublicBrand.id,
            section: dto.section,
          },
        });

        publicBrandId = newPublicBrand.id;
      }
    }

    return {
      categoryId: publicCategoryId,
      subcategoryId: publicSubcategoryId,
      brandId: publicBrandId,
    };
  }

  private formatProductEnhanced(product: any): AdminProduct {
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
        smallUrl: this.getImageUrl(img.imageSmall),
        largeUrl: this.getImageUrl(img.imageLarge),
        altText: img.altText,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
      })),
      specifications:
        product.specifications?.map((spec: any) => ({
          id: spec.id,
          specKey: spec.specKey, // ✅ Используем specKey как в БД
          sortOrder: spec.sortOrder,
          translations: spec.translations,
        })) || [],
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

  private getImageUrl(imagePath: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return `${baseUrl}/public/images/${imagePath}`;
  }

  private async invalidateCache(): Promise<void> {
    try {
      await this.cacheService.invalidateByPattern('products:*');
      await this.cacheService.invalidateByPattern('product:*');
      await this.cacheService.invalidateByPattern('categories:*');
      await this.cacheService.invalidateByPattern('categories_enhanced:*');
      await this.cacheService.invalidateByPattern('brands:*');
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }
}
