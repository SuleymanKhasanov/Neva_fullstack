// backend/src/product/product.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';
import { ProductDetailDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Получить продукт по ID и локали с кешированием
   */
  async getProductById(id: number, locale: string): Promise<ProductDetailDto> {
    const cacheKey = `product:${id}:${locale}`;

    try {
      // Проверяем кеш
      const cached = await this.cacheService.get<ProductDetailDto>(cacheKey);
      if (cached) {
        this.logger.log(`🎯 Cache hit for product: ${cacheKey}`);
        return cached;
      }

      this.logger.log(
        `🔍 Cache miss for product: ${cacheKey} - fetching from database`
      );

      // Получаем продукт из базы данных с учетом локали
      const product = await this.prisma.product.findFirst({
        where: {
          id,
          locale, // Фильтруем по локали
        },
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              locale: true,
              section: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              locale: true,
              section: true,
            },
          },
        },
      });

      if (!product) {
        this.logger.warn(
          `Product with ID ${id} and locale ${locale} not found`
        );
        throw new NotFoundException(
          `Product with ID ${id} and locale ${locale} not found`
        );
      }

      // Формируем полные URL для изображений
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      const imageFileName = product.image
        ? product.image.split('/').pop()
        : null;
      const fullImageFileName = product.fullImage
        ? product.fullImage.split('/').pop()
        : null;

      // Генерируем slug из названия
      const slug = this.generateSlug(product.name);

      // Создаем DTO
      const productDetail: ProductDetailDto = {
        id: product.id,
        name: product.name,
        description: product.description,
        image: imageFileName
          ? `${baseUrl}/public/images/${imageFileName}`
          : null,
        fullImage: fullImageFileName
          ? `${baseUrl}/public/images/${fullImageFileName}`
          : null,
        locale: product.locale,
        section: product.section,
        slug,
        brand: product.brand,
        category: product.category,
        seoTitle: this.generateSeoTitle(product.name, product.brand?.name),
        seoDescription: this.generateSeoDescription(
          product.name,
          product.description,
          product.brand?.name
        ),
        createdAt: new Date().toISOString(), // Добавим поля в схему позже
        updatedAt: new Date().toISOString(),
      };

      // Кешируем результат на 10 минут
      await this.cacheService.set(cacheKey, productDetail, { ttl: 600 });
      this.logger.log(`💾 Cached product: ${cacheKey}`);

      return productDetail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch product ${id}: ${message}`, stack);
      throw new Error(`Failed to fetch product: ${message}`);
    }
  }

  /**
   * Проверить существование продукта с учетом локали
   */
  async productExists(id: number, locale: string): Promise<boolean> {
    const cacheKey = `product_exists:${id}:${locale}`;

    return await this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const product = await this.prisma.product.findFirst({
          where: {
            id,
            locale,
          },
          select: { id: true },
        });
        return !!product;
      },
      { ttl: 300 } // 5 минут
    );
  }

  /**
   * Инвалидировать кеш продукта
   */
  async invalidateProductCache(id: number, locale?: string): Promise<void> {
    try {
      if (locale) {
        await this.cacheService.del(`product:${id}:${locale}`);
        await this.cacheService.del(`product_exists:${id}:${locale}`);
        this.logger.log(`🗑️ Invalidated cache for product: ${id}:${locale}`);
      } else {
        // Инвалидируем все локали для данного продукта
        await this.cacheService.invalidateByPattern(`product:${id}:*`);
        await this.cacheService.invalidateByPattern(`product_exists:${id}:*`);
        this.logger.log(
          `🗑️ Invalidated cache for product: ${id} (all locales)`
        );
      }
    } catch (error) {
      this.logger.error(`Failed to invalidate cache for product ${id}:`, error);
    }
  }

  /**
   * Генерировать slug из названия продукта
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // убираем специальные символы
      .replace(/\s+/g, '-') // пробелы в дефисы
      .replace(/-+/g, '-') // множественные дефисы в один
      .trim();
  }

  /**
   * Генерировать SEO заголовок
   */
  private generateSeoTitle(productName: string, brandName?: string): string {
    const brand = brandName ? `${brandName} ` : '';
    return `${brand}${productName} | Neva - Официальный дистрибьютор в Узбекистане`;
  }

  /**
   * Генерировать SEO описание
   */
  private generateSeoDescription(
    productName: string,
    description: string,
    brandName?: string
  ): string {
    const brand = brandName ? `${brandName} ` : '';
    const shortDescription =
      description.length > 100
        ? description.substring(0, 100) + '...'
        : description;

    return `Купить ${brand}${productName} в Ташкенте. ${shortDescription} ✓ Официальная гарантия ✓ Доставка по Узбекистану ✓ Лучшие цены`;
  }
}
