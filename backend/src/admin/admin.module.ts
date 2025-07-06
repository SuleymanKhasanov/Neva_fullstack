// src/admin/admin.module.ts (исправленный с правильными импортами)
import { Module } from '@nestjs/common';

import { AdminBrandsController } from './brands/admin-brands.controller';
import { AdminBrandsService } from './brands/admin-brands.service';
import { AdminCategoriesController } from './categories/admin-categories.controller';
import { AdminCategoriesService } from './categories/admin-categories.service';
import { AdminProductsEnhancedController } from './products/admin-products-enhanced.controller';
import { AdminProductsEnhancedService } from '../admin/admin-products-enhanced.service';
import { AdminSystemController } from './system/admin-system.controller';
import { AdminSystemService } from './system/admin-system.service';
import { AdminMasterDataModule } from './master-data/admin-master-data.module';
import { ImageService } from '../common/upload/image.service';
import { UploadService } from '../common/upload/upload.service';
import { PrismaService } from '../common/database/prisma.service';
import { CacheService } from '../common/cache/cache.service';

@Module({
  imports: [AdminMasterDataModule],
  controllers: [
    AdminProductsEnhancedController,
    AdminCategoriesController,
    AdminBrandsController,
    AdminSystemController,
  ],
  providers: [
    AdminProductsEnhancedService,
    AdminCategoriesService,
    AdminBrandsService,
    AdminSystemService,
    PrismaService,
    CacheService,
    ImageService,
    UploadService,
  ],
  exports: [
    AdminProductsEnhancedService,
    AdminCategoriesService,
    AdminBrandsService,
    AdminSystemService,
  ],
})
export class AdminModule {
  constructor() {
    console.log('🔒 AdminModule initialized (Protected endpoints)');
    console.log('📋 Protected admin endpoints:');
    console.log('   📦 /admin/products/*           - Управление продуктами');
    console.log(
      '   ⚡ /admin/products-enhanced/*   - Улучшенное управление продуктами'
    );
    console.log('   🏷️ /admin/categories/*         - Управление категориями');
    console.log('   🏢 /admin/brands/*             - Управление брендами');
    console.log(
      '   📊 /admin/master-data/*        - Мастер-данные для админки'
    );
    console.log('   🔧 /admin/system/*             - Системные операции');
  }
}
