import { Controller, Get, Post, Delete, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CacheService } from '../common/cache.service';

@ApiTags('Cache Administration')
@Controller('admin/cache')
export class CacheAdminController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get cache statistics' })
  @ApiResponse({ status: 200, description: 'Cache statistics' })
  async getCacheStats() {
    return await this.cacheService.getStats();
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear all cache' })
  @ApiResponse({ status: 200, description: 'Cache cleared successfully' })
  async clearAllCache() {
    try {
      await this.cacheService.reset();
      return { message: 'Cache cleared successfully' };
    } catch (error) {
      return {
        message: 'Failed to clear cache',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete('key/:key')
  @ApiOperation({ summary: 'Delete specific cache key' })
  @ApiParam({ name: 'key', description: 'Cache key to delete' })
  @ApiResponse({ status: 200, description: 'Cache key deleted' })
  async deleteCacheKey(@Param('key') key: string) {
    await this.cacheService.del(key);
    return { message: `Cache key '${key}' deleted successfully` };
  }

  @Delete('pattern')
  @ApiOperation({ summary: 'Delete cache keys by pattern' })
  @ApiQuery({
    name: 'pattern',
    description: 'Pattern to match cache keys (supports * and ?)',
  })
  @ApiResponse({ status: 200, description: 'Cache keys deleted by pattern' })
  async deleteCacheByPattern(@Query('pattern') pattern: string) {
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);
    return {
      message: `Deleted ${deletedCount} cache keys matching pattern '${pattern}'`,
      deletedCount,
    };
  }

  @Post('invalidate/products')
  @ApiOperation({ summary: 'Invalidate products cache' })
  @ApiQuery({ name: 'locale', required: false, description: 'Locale filter' })
  @ApiQuery({ name: 'section', required: false, description: 'Section filter' })
  @ApiResponse({ status: 200, description: 'Products cache invalidated' })
  async invalidateProductsCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    const patterns: string[] = [
      'products:*',
      'products_count:*',
      ...(locale ? [`*:${locale}:*`] : []),
      ...(section ? [`*:${section}*`] : []),
    ];

    let totalDeleted = 0;
    for (const pattern of patterns) {
      const deleted = await this.cacheService.invalidateByPattern(pattern);
      totalDeleted += deleted;
    }

    return {
      message: 'Products cache invalidated',
      deletedCount: totalDeleted,
      patterns,
    };
  }

  @Post('invalidate/categories')
  @ApiOperation({ summary: 'Invalidate categories cache' })
  @ApiQuery({ name: 'locale', required: false, description: 'Locale filter' })
  @ApiQuery({ name: 'section', required: false, description: 'Section filter' })
  @ApiResponse({ status: 200, description: 'Categories cache invalidated' })
  async invalidateCategoriesCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    const pattern = `categories:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);

    return {
      message: 'Categories cache invalidated',
      deletedCount,
      pattern,
    };
  }

  @Post('invalidate/brands')
  @ApiOperation({ summary: 'Invalidate brands cache' })
  @ApiQuery({ name: 'locale', required: false, description: 'Locale filter' })
  @ApiQuery({ name: 'section', required: false, description: 'Section filter' })
  @ApiResponse({ status: 200, description: 'Brands cache invalidated' })
  async invalidateBrandsCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    const pattern = `brands:locale:${locale || '*'}:section:${section || '*'}`;
    const deletedCount = await this.cacheService.invalidateByPattern(pattern);

    return {
      message: 'Brands cache invalidated',
      deletedCount,
      pattern,
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Check cache health' })
  @ApiResponse({ status: 200, description: 'Cache health status' })
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
  @ApiOperation({ summary: 'Get cache debug information' })
  @ApiResponse({ status: 200, description: 'Cache debug info' })
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
