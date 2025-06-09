// backend/src/admin/admin-products.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';
import { CreateProductDto, UpdateProductDto } from './dto/admin-product.dto';

@Injectable()
export class AdminProductsService {
  private readonly logger = new Logger(AdminProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        translations: true,
        brand: {
          include: { translations: true },
        },
        category: {
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

    return products.map(this.formatProduct);
  }

  async findOne(id: number) {
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

  async create(createProductDto: CreateProductDto) {
    // Простая валидация
    await this.validateProductData(createProductDto);

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Создать продукт
      const product = await tx.product.create({
        data: {
          section: createProductDto.section,
          categoryId: createProductDto.categoryId,
          brandId: createProductDto.brandId,
          isActive: createProductDto.isActive ?? true,
          slug: this.generateSlug(createProductDto.translations[0].name),
        },
      });

      // 2. Создать переводы
      await tx.productTranslation.createMany({
        data: createProductDto.translations.map((t) => ({
          productId: product.id,
          locale: t.locale,
          name: t.name,
          description: t.description,
          marketingDescription: t.marketingDescription,
        })),
      });

      // 3. Создать характеристики
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
    });

    // Инвалидировать кеш
    await this.invalidateCache();

    this.logger.log(`Created product ID: ${result.id}`);
    return this.findOne(result.id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      // Обновить основные данные
      const updateData: any = {};
      if (updateProductDto.categoryId !== undefined)
        updateData.categoryId = updateProductDto.categoryId;
      if (updateProductDto.brandId !== undefined)
        updateData.brandId = updateProductDto.brandId;
      if (updateProductDto.isActive !== undefined)
        updateData.isActive = updateProductDto.isActive;

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
          data: updateProductDto.translations.map((t) => ({
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

  async remove(id: number) {
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

  private async validateProductData(dto: CreateProductDto) {
    // Проверить категорию
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException(`Category ${dto.categoryId} not found`);
    }

    if (category.section !== dto.section) {
      throw new BadRequestException('Category section mismatch');
    }

    // Проверить бренд если указан
    if (dto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: dto.brandId },
      });

      if (!brand) {
        throw new BadRequestException(`Brand ${dto.brandId} not found`);
      }
    }

    // Проверить уникальность локалей
    const locales = dto.translations.map((t) => t.locale);
    if (new Set(locales).size !== locales.length) {
      throw new BadRequestException('Duplicate locales in translations');
    }
  }

  private formatProduct(product: any) {
    return {
      id: product.id,
      section: product.section,
      slug: product.slug,
      isActive: product.isActive,
      categoryId: product.categoryId,
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
          key: spec.specKey,
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

  private async invalidateCache() {
    try {
      await this.cacheService.invalidateByPattern('products:*');
      await this.cacheService.invalidateByPattern('product:*');
      await this.cacheService.invalidateByPattern('categories:*');
      await this.cacheService.invalidateByPattern('brands:*');
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }
}
