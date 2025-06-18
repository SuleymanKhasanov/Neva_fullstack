// src/admin/admin.module.ts (исправленный с правильными импортами)
import { Module } from '@nestjs/common';

import { AdminBrandsController } from './brands/admin-brands.controller';
import { AdminBrandsService } from './brands/admin-brands.service';
import { AdminCategoriesController } from './categories/admin-categories.controller';
import { AdminCategoriesService } from './categories/admin-categories.service';
import { AdminProductsController } from './products/admin-products.controller';
import { AdminProductsService } from './products/admin-products.service';
import { AdminSystemController } from './system/admin-system.controller';
import { AdminSystemService } from './system/admin-system.service';

@Module({
  controllers: [
    AdminProductsController,
    AdminCategoriesController,
    AdminBrandsController,
    AdminSystemController,
  ],
  providers: [
    AdminProductsService,
    AdminCategoriesService,
    AdminBrandsService,
    AdminSystemService,
  ],
  exports: [
    AdminProductsService,
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
    console.log('   🏷️ /admin/categories/*         - Управление категориями');
    console.log('   🏢 /admin/brands/*             - Управление брендами');
    console.log('   🔧 /admin/system/*             - Системные операции');
  }
}
