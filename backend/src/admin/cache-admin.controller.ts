// backend/src/admin/cache-admin.controller.ts
import { Controller, Get, Post, Delete, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CacheService } from '../common/cache.service';

@ApiTags('Admin - Cache')
@Controller('admin/cache')
export class CacheAdminController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Получить статистику кеша' })
  @ApiResponse({ status: 200, description: 'Статистика кеша' })
  async getCacheStats() {
    return await this.cacheService.getStats();
  }

  @Post('clear')
  @ApiOperation({ summary: 'Очистить весь кеш' })
  @ApiResponse({ status: 200, description: 'Кеш очищен успешно' })
  async clearAllCache() {
    try {
      await this.cacheService.reset();
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

  @Delete('key/:key')
  @ApiOperation({ summary: 'Удалить конкретный ключ кеша' })
  @ApiParam({ name: 'key', description: 'Ключ кеша для удаления' })
  @ApiResponse({ status: 200, description: 'Ключ кеша удален' })
  async deleteCacheKey(@Param('key') key: string) {
    await this.cacheService.del(key);
    return {
      success: true,
      message: `Ключ кеша '${key}' удален успешно`,
    };
  }

  @Delete('pattern')
  @ApiOperation({ summary: 'Удалить ключи кеша по паттерну' })
  @ApiQuery({
    name: 'pattern',
    description: 'Паттерн для поиска ключей кеша (поддерживает * и ?)',
    example: 'products:*',
  })
  @ApiResponse({ status: 200, description: 'Ключи кеша удалены по паттерну' })
  async deleteCacheByPattern(@Query('pattern') pattern: string) {
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);
    return {
      success: true,
      message: `Удалено ${deletedCount} ключей кеша по паттерну '${pattern}'`,
      deletedCount,
    };
  }

  @Post('invalidate/products')
  @ApiOperation({ summary: 'Инвалидировать кеш продуктов' })
  @ApiQuery({
    name: 'locale',
    required: false,
    description: 'Фильтр по локали',
  })
  @ApiQuery({
    name: 'section',
    required: false,
    description: 'Фильтр по секции',
  })
  @ApiResponse({ status: 200, description: 'Кеш продуктов инвалидирован' })
  async invalidateProductsCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
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
      const deleted = await this.cacheService.invalidateByPattern(pattern);
      totalDeleted += deleted;
    }

    return {
      success: true,
      message: 'Кеш продуктов инвалидирован',
      deletedCount: totalDeleted,
      patterns,
    };
  }

  @Post('invalidate/categories')
  @ApiOperation({ summary: 'Инвалидировать кеш категорий' })
  @ApiQuery({
    name: 'locale',
    required: false,
    description: 'Фильтр по локали',
  })
  @ApiQuery({
    name: 'section',
    required: false,
    description: 'Фильтр по секции',
  })
  @ApiResponse({ status: 200, description: 'Кеш категорий инвалидирован' })
  async invalidateCategoriesCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    const pattern = `categories:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);

    return {
      success: true,
      message: 'Кеш категорий инвалидирован',
      deletedCount,
      pattern,
    };
  }

  @Post('invalidate/brands')
  @ApiOperation({ summary: 'Инвалидировать кеш брендов' })
  @ApiQuery({
    name: 'locale',
    required: false,
    description: 'Фильтр по локали',
  })
  @ApiQuery({
    name: 'section',
    required: false,
    description: 'Фильтр по секции',
  })
  @ApiResponse({ status: 200, description: 'Кеш брендов инвалидирован' })
  async invalidateBrandsCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    const pattern = `brands:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);

    return {
      success: true,
      message: 'Кеш брендов инвалидирован',
      deletedCount,
      pattern,
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Проверить здоровье кеша' })
  @ApiResponse({ status: 200, description: 'Статус здоровья кеша' })
  async getCacheHealth() {
    try {
      // Простой тест записи/чтения
      const testKey = 'health_check';
      const testValue = { timestamp: Date.now() };

      await this.cacheService.set(testKey, testValue, { ttl: 10 });
      const retrievedValue = await this.cacheService.get(testKey);
      await this.cacheService.del(testKey);

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

  @Get('debug')
  @ApiOperation({ summary: 'Получить отладочную информацию кеша' })
  @ApiResponse({ status: 200, description: 'Отладочная информация кеша' })
  async getCacheDebug() {
    try {
      const stats = await this.cacheService.getStats();

      // Тестируем базовые операции
      const testKey = 'debug_test';
      const testValue = { test: true, timestamp: Date.now() };

      await this.cacheService.set(testKey, testValue, { ttl: 30 });
      const retrieved = await this.cacheService.get(testKey);
      await this.cacheService.del(testKey);

      return {
        stats,
        basicOperations: {
          set: true,
          get: !!retrieved,
          delete: true,
          match: JSON.stringify(retrieved) === JSON.stringify(testValue),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
