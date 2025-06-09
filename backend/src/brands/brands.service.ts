import { Injectable, Logger } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService
  ) {}

  async getBrands(locale: string, section?: Section) {
    const cacheKey = `brands:locale:${locale}:section:${section || 'all'}`;

    try {
      // Проверяем кеш
      const cached = await this.cacheService.get(cacheKey);
      if (cached) {
        this.logger.log(`Cache hit for brands: ${cacheKey}`);
        return cached;
      }

      // Строим WHERE условие для поиска брендов с переводами
      const where: any = {
        translations: {
          some: {
            locale: locale as any,
          },
        },
      };

      // Если указана секция, ищем бренды через CategoryBrand
      if (section) {
        where.categoryBrands = {
          some: {
            section,
          },
        };
      }

      this.logger.log(
        `Fetching brands from database: ${JSON.stringify(where)}`
      );

      const brands = await this.prisma.brand.findMany({
        where,
        include: {
          translations: {
            where: { locale: locale as any },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      // Форматируем результат
      const formattedBrands = brands
        .filter((brand) => brand.translations.length > 0)
        .map((brand) => {
          // Получаем секцию из CategoryBrand если она есть
          const brandSection = section || Section.NEVA; // Fallback только если секция не указана

          return {
            id: brand.id,
            name: brand.translations[0].name,
            locale: brand.translations[0].locale,
            section: brandSection,
          };
        });

      console.log('Fetched brands:', formattedBrands);

      // Кешируем результат на 5 минут
      await this.cacheService.set(cacheKey, formattedBrands, { ttl: 300 });
      this.logger.log(`Cached brands for: ${cacheKey}`);

      return formattedBrands;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch brands: ${message}`, stack);
      throw new Error(message);
    }
  }

  // Метод для инвалидации кеша брендов
  async invalidateBrandsCache(locale?: string, section?: Section) {
    try {
      const pattern = `brands:locale:${locale || '*'}:section:${section || '*'}`;
      const deletedCount = await this.cacheService.invalidateByPattern(pattern);
      this.logger.log(`Invalidated ${deletedCount} brand cache keys`);
    } catch (error) {
      this.logger.error('Failed to invalidate brands cache:', error);
    }
  }
}
