import { Injectable, Logger } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { GetCategoriesDto } from './dto/get-categories.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService
  ) {}

  async getCategories(dto: GetCategoriesDto): Promise<{
    categories: {
      id: number;
      name: string;
      locale: string;
      section: Section;
      brands: { id: number; name: string; locale: string; section: Section }[];
    }[];
  }> {
    const { locale, section } = dto;
    const cacheKey = `categories:locale:${locale}:section:${section || 'all'}`;

    try {
      // Проверяем кеш
      const cached = await this.cacheService.get<{
        categories: {
          id: number;
          name: string;
          locale: string;
          section: Section;
          brands: {
            id: number;
            name: string;
            locale: string;
            section: Section;
          }[];
        }[];
      }>(cacheKey);

      if (cached) {
        this.logger.log(`Cache hit for categories: ${cacheKey}`);
        return cached;
      }

      this.logger.log(
        `Fetching categories from database for locale: ${locale}, section: ${section || 'all'}`
      );

      const categories = await this.prisma.category.findMany({
        where: {
          locale,
          ...(section && { section }),
        },
        select: {
          id: true,
          name: true,
          locale: true,
          section: true,
          brands: {
            select: {
              id: true,
              name: true,
              locale: true,
              section: true,
            },
          },
        },
      });

      const result = { categories };

      // Кешируем результат на 5 минут
      await this.cacheService.set(cacheKey, result, { ttl: 300 });
      this.logger.log(`Cached categories for: ${cacheKey}`);

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch categories: ${message}`, stack);
      throw new Error(message);
    }
  }

  // Метод для инвалидации кеша категорий
  async invalidateCategoriesCache(locale?: string, section?: Section) {
    try {
      const pattern = `categories:locale:${locale || '*'}:section:${section || '*'}`;
      const deletedCount = await this.cacheService.invalidateByPattern(pattern);
      this.logger.log(`Invalidated ${deletedCount} category cache keys`);
    } catch (error) {
      this.logger.error('Failed to invalidate categories cache:', error);
    }
  }
}
