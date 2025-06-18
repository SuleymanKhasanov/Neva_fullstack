// src/admin/system/admin-system.service.ts
import { Injectable, Logger } from '@nestjs/common';

import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class AdminSystemService {
  private readonly logger = new Logger(AdminSystemService.name);

  constructor(
    private readonly cache: CacheService,
    private readonly prisma: PrismaService
  ) {}

  // ==================== УПРАВЛЕНИЕ КЕШЕМ ====================

  async getCacheStats() {
    return this.cache.getStats();
  }

  async clearAllCache() {
    try {
      await this.cache.reset();

      return {
        success: true,
        message: 'Кеш очищен успешно',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Не удалось очистить кеш',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deleteCacheKey(key: string) {
    await this.cache.del(key);

    return {
      success: true,
      message: `Ключ кеша '${key}' удален успешно`,
    };
  }

  async deleteCacheByPattern(pattern: string) {
    const deletedCount = await this.cache.invalidateByPattern(pattern);

    return {
      success: true,
      message: `Удалено ${deletedCount} ключей кеша по паттерну '${pattern}'`,
      deletedCount,
    };
  }

  async invalidateProductsCache(locale?: string, section?: string) {
    const patterns: string[] = [
      'products:*',
      'products_count:*',
      'product:*',
      'product_exists:*',
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
      message: 'Кеш продуктов инвалидирован',
      deletedCount: totalDeleted,
      patterns,
    };
  }

  async invalidateCategoriesCache(locale?: string, section?: string) {
    const pattern = `categories:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cache.invalidateByPattern(pattern);

    return {
      success: true,
      message: 'Кеш категорий инвалидирован',
      deletedCount,
      pattern,
    };
  }

  async invalidateBrandsCache(locale?: string, section?: string) {
    const pattern = `brands:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cache.invalidateByPattern(pattern);

    return {
      success: true,
      message: 'Кеш брендов инвалидирован',
      deletedCount,
      pattern,
    };
  }

  async getCacheHealth() {
    try {
      // Простой тест записи/чтения
      const testKey = 'health_check';
      const testValue = { timestamp: Date.now() };

      await this.cache.set(testKey, testValue, { ttl: 10 });
      const retrievedValue = await this.cache.get(testKey);
      await this.cache.del(testKey);

      const isHealthy =
        JSON.stringify(retrievedValue) === JSON.stringify(testValue);

      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        test: {
          write: true,
          read: !!retrievedValue,
          match: isHealthy,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ==================== СИСТЕМНАЯ ИНФОРМАЦИЯ ====================

  async getSystemHealth() {
    try {
      // Проверка базы данных
      const dbHealth = await this.checkDatabaseHealth();

      // Проверка кеша
      const cacheHealth = await this.getCacheHealth();

      // Общее состояние
      const overallHealth =
        dbHealth.status === 'healthy' && cacheHealth.status === 'healthy'
          ? 'healthy'
          : 'unhealthy';

      return {
        status: overallHealth,
        timestamp: new Date().toISOString(),
        components: {
          database: dbHealth,
          cache: cacheHealth,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getSystemStats() {
    try {
      const [
        productsCount,
        categoriesCount,
        brandsCount,
        subcategoriesCount,
        imagesCount,
        specificationsCount,
      ] = await Promise.all([
        this.prisma.product.count(),
        this.prisma.category.count(),
        this.prisma.brand.count(),
        this.prisma.subcategory.count(),
        this.prisma.productImage.count(),
        this.prisma.productSpecification.count(),
      ]);

      const [activeProducts, inactiveProducts] = await Promise.all([
        this.prisma.product.count({ where: { isActive: true } }),
        this.prisma.product.count({ where: { isActive: false } }),
      ]);

      return {
        products: {
          total: productsCount,
          active: activeProducts,
          inactive: inactiveProducts,
        },
        categories: {
          total: categoriesCount,
          subcategories: subcategoriesCount,
        },
        brands: {
          total: brandsCount,
        },
        content: {
          images: imagesCount,
          specifications: specificationsCount,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to get system stats: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getSystemLogs() {
    // Заглушка для логов - в реальной системе здесь был бы доступ к файлам логов
    return {
      logs: [
        {
          level: 'info',
          message: 'System is running normally',
          timestamp: new Date().toISOString(),
        },
      ],
      message: 'Logs feature is not implemented yet',
    };
  }

  // ==================== ПРИВАТНЫЕ МЕТОДЫ ====================

  private async checkDatabaseHealth() {
    try {
      // Простой запрос к базе данных
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'healthy',
        message: 'Database connection is working',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
