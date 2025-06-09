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

      // Получаем продукт из базы данных с переводами
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          translations: {
            where: { locale: locale as any },
          },
          brand: {
            include: {
              translations: {
                where: { locale: locale as any },
              },
            },
          },
          category: {
            include: {
              translations: {
                where: { locale: locale as any },
              },
            },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
          },
        },
      });

      if (!product || product.translations.length === 0) {
        this.logger.warn(
          `Product with ID ${id} and locale ${locale} not found`
        );
        throw new NotFoundException(
          `Product with ID ${id} and locale ${locale} not found`
        );
      }

      const translation = product.translations[0];
      const brandTranslation = product.brand?.translations[0];
      const categoryTranslation = product.category?.translations[0];

      // Формируем полные URL для изображений
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      // Генерируем slug из названия
      const slug = this.generateSlug(translation.name);

      // Создаем DTO
      const productDetail: ProductDetailDto = {
        id: product.id,
        name: translation.name,
        description: translation.description || '',
        image:
          product.images.length > 0
            ? `${baseUrl}/public/images/${product.images[0].imageSmall}`
            : null,
        fullImage:
          product.images.length > 0
            ? `${baseUrl}/public/images/${product.images[0].imageLarge}`
            : null,
        locale,
        section: product.section,
        slug: product.slug || slug,
        brand: brandTranslation
          ? {
              id: product.brand!.id,
              name: brandTranslation.name,
              locale: brandTranslation.locale,
              section: product.section, // Используем секцию продукта
            }
          : null,
        category: {
          id: product.category.id,
          name: categoryTranslation?.name || 'Unknown',
          locale: categoryTranslation?.locale || locale,
          section: product.category.section,
        },
        seoTitle: this.generateSeoTitle(
          translation.name,
          brandTranslation?.name
        ),
        seoDescription: this.generateSeoDescription(
          translation.name,
          translation.description || '',
          brandTranslation?.name
        ),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
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
        const product = await this.prisma.product.findUnique({
          where: { id },
          include: {
            translations: {
              where: { locale: locale as any },
            },
          },
        });
        return !!(product && product.translations.length > 0);
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
