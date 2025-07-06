// src/admin/system/admin-system.controller.ts (исправленный)
import { Controller, Get, Post, Delete, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import { AdminSystemService } from './admin-system.service';

@ApiTags('Admin - System')
@Controller('admin/system')
@Auth()
export class AdminSystemController {
  constructor(private readonly adminSystemService: AdminSystemService) {}

  // ==================== УПРАВЛЕНИЕ КЕШЕМ ====================

  @Get('cache/stats')
  @ApiOperation({ summary: 'Получить статистику кеша' })
  @ApiResponse({ status: 200, description: 'Статистика кеша' })
  async getCacheStats() {
    return await this.adminSystemService.getCacheStats();
  }

  @Post('cache/clear')
  @ApiOperation({ summary: 'Очистить весь кеш' })
  @ApiResponse({ status: 200, description: 'Кеш очищен успешно' })
  async clearAllCache() {
    return this.adminSystemService.clearAllCache();
  }

  @Delete('cache/key/:key')
  @ApiOperation({ summary: 'Удалить конкретный ключ кеша' })
  @ApiParam({ name: 'key', description: 'Ключ кеша для удаления' })
  @ApiResponse({ status: 200, description: 'Ключ кеша удален' })
  async deleteCacheKey(@Param('key') key: string) {
    return this.adminSystemService.deleteCacheKey(key);
  }

  @Delete('cache/pattern')
  @ApiOperation({ summary: 'Удалить ключи кеша по паттерну' })
  @ApiQuery({
    name: 'pattern',
    description: 'Паттерн для поиска ключей кеша (поддерживает * и ?)',
    example: 'products:*',
  })
  @ApiResponse({ status: 200, description: 'Ключи кеша удалены по паттерну' })
  async deleteCacheByPattern(@Query('pattern') pattern: string) {
    return this.adminSystemService.deleteCacheByPattern(pattern);
  }

  @Post('cache/invalidate/products')
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
    return this.adminSystemService.invalidateProductsCache(locale, section);
  }

  @Post('cache/invalidate/categories')
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
    return this.adminSystemService.invalidateCategoriesCache(locale, section);
  }

  @Post('cache/invalidate/brands')
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
    return this.adminSystemService.invalidateBrandsCache(locale, section);
  }

  @Get('cache/health')
  @ApiOperation({ summary: 'Проверить здоровье кеша' })
  @ApiResponse({ status: 200, description: 'Статус здоровья кеша' })
  async getCacheHealth() {
    return this.adminSystemService.getCacheHealth();
  }

  // ==================== СИСТЕМНАЯ ИНФОРМАЦИЯ ====================

  @Get('health')
  @ApiOperation({ summary: 'Состояние системы' })
  @ApiResponse({ status: 200, description: 'Общее состояние системы' })
  async getSystemHealth(@CurrentUser() user?: any) {
    return this.adminSystemService.getSystemHealth();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Общая статистика' })
  @ApiResponse({ status: 200, description: 'Системная статистика' })
  async getSystemStats(@CurrentUser() user?: any) {
    return this.adminSystemService.getSystemStats();
  }

  @Get('logs')
  @ApiOperation({ summary: 'Системные логи' })
  @ApiResponse({ status: 200, description: 'Последние логи системы' })
  async getSystemLogs(@CurrentUser() user?: any) {
    return this.adminSystemService.getSystemLogs();
  }
}
