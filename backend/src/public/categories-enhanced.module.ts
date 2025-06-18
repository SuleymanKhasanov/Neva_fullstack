// backend/src/categories/categories-enhanced.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { CategoriesEnhancedController } from './categories-enhanced.controller';
import { CategoriesEnhancedService } from './categories-enhanced.service';

@Module({
  controllers: [CategoriesEnhancedController],
  providers: [CategoriesEnhancedService, PrismaService, CacheService],
  exports: [CategoriesEnhancedService],
})
export class CategoriesEnhancedModule {
  constructor() {
    console.log(
      '🌐✨ CategoriesEnhancedModule initialized with subcategories support'
    );
    console.log('📋 Available public enhanced endpoints:');
    console.log(
      '   GET /categories-enhanced/all               - Все категории с субкатегориями'
    );
    console.log(
      '   GET /categories-enhanced/neva              - NEVA категории с субкатегориями'
    );
    console.log(
      '   GET /categories-enhanced/x-solution        - X-SOLUTION категории с субкатегориями'
    );
    console.log(
      '   GET /categories-enhanced/:id/subcategories - Субкатегории конкретной категории'
    );
    console.log('');
    console.log('🌍 Поддерживаемые языки: ru, en, kr, uz');
    console.log('⚡ Кеширование: 5 минут для всех запросов');
    console.log(
      '🎯 Показываются только категории/субкатегории с активными продуктами'
    );
  }
}
