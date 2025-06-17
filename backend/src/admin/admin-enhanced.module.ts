// 🔒 backend/src/admin/admin-enhanced.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

// Существующие контроллеры
import { AdminBrandsController } from './admin-brands.controller';
import { AdminCategoriesEnhancedController } from './admin-categories-enhanced.controller';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminProductsEnhancedController } from './admin-products-enhanced.controller';
import { AdminProductsEnhancedService } from './admin-products-enhanced.service';
import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';
import { CacheAdminController } from './cache-admin.controller';
import { ImageService } from './image.service';

// 🆕 Новые контроллеры и сервисы для субкатегорий

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024, files: 10 },
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error(`Unsupported file type: ${file.mimetype}`), false);
        }
      },
    }),
  ],
  controllers: [
    // Существующие контроллеры (для обратной совместимости)
    AdminProductsController,
    AdminCategoriesController,
    AdminBrandsController,
    CacheAdminController,

    // 🆕 Новые расширенные контроллеры
    AdminCategoriesEnhancedController,
    AdminProductsEnhancedController,
  ],
  providers: [
    // Общие сервисы
    PrismaService,
    CacheService,
    ImageService,

    // Существующие сервисы
    AdminProductsService,

    // 🆕 Новые сервисы
    AdminProductsEnhancedService,
  ],
  exports: [AdminProductsService, AdminProductsEnhancedService, ImageService],
})
export class AdminEnhancedModule {
  constructor() {
    console.log(
      '🔒✨ AdminEnhancedModule initialized with subcategories support'
    );
    console.log('📋 Available enhanced admin endpoints:');
    console.log('   🏷️ Categories & Subcategories:');
    console.log(
      '     GET    /admin/categories-enhanced          - Все категории с субкатегориями'
    );
    console.log(
      '     GET    /admin/categories-enhanced/:id      - Категория по ID'
    );
    console.log(
      '     POST   /admin/categories-enhanced          - Создать категорию'
    );
    console.log(
      '     PUT    /admin/categories-enhanced/:id      - Обновить категорию'
    );
    console.log(
      '     DELETE /admin/categories-enhanced/:id      - Удалить категорию'
    );
    console.log('   📦 Subcategories:');
    console.log(
      '     GET    /admin/categories-enhanced/subcategories/all     - Все субкатегории'
    );
    console.log(
      '     GET    /admin/categories-enhanced/subcategories/:id     - Субкатегория по ID'
    );
    console.log(
      '     POST   /admin/categories-enhanced/subcategories         - Создать субкатегорию'
    );
    console.log(
      '     PUT    /admin/categories-enhanced/subcategories/:id     - Обновить субкатегорию'
    );
    console.log(
      '     DELETE /admin/categories-enhanced/subcategories/:id     - Удалить субкатегорию'
    );
    console.log('   🎯 Products Enhanced:');
    console.log(
      '     GET    /admin/products-enhanced            - Продукты с субкатегориями'
    );
    console.log(
      '     GET    /admin/products-enhanced/:id        - Продукт по ID'
    );
    console.log(
      '     POST   /admin/products-enhanced            - Создать продукт'
    );
    console.log(
      '     PUT    /admin/products-enhanced/:id        - Обновить продукт'
    );
    console.log(
      '     DELETE /admin/products-enhanced/:id        - Удалить продукт'
    );
    console.log('   🔗 Brand-Category Relations:');
    console.log(
      '     POST   /admin/categories-enhanced/:categoryId/brands/:brandId    - Привязать бренд'
    );
    console.log(
      '     DELETE /admin/categories-enhanced/:categoryId/brands/:brandId    - Отвязать бренд'
    );
    console.log('');
    console.log(
      '🔑 Все эндпойнты защищены JWT авторизацией (@Auth() decorator)'
    );
  }
}
