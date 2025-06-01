import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';

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

      const where: Prisma.BrandWhereInput = { locale };
      if (section) {
        where.section = section;
      }

      this.logger.log(
        `Fetching brands from database: ${JSON.stringify(where)}`
      );

      const brands = await this.prisma.brand.findMany({
        where,
        select: {
          id: true,
          name: true,
          locale: true,
          section: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      console.log('Fetched brands:', brands);

      // Кешируем результат на 5 минут
      await this.cacheService.set(cacheKey, brands, { ttl: 300 });
      this.logger.log(`Cached brands for: ${cacheKey}`);

      return brands;
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
