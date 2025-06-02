// backend/src/product/product.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, CacheService],
  exports: [ProductService], // Экспортируем сервис для использования в других модулях
})
export class ProductModule {
  constructor() {
    console.log(
      '✅ ProductModule initialized for individual product endpoints'
    );
    console.log('🔧 Available endpoints:');
    console.log('   - GET /product/:id - Get product details');
    console.log('   - GET /product/:id/exists - Check product existence');
  }
}
