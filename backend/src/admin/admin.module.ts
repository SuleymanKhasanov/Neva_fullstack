// backend/src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminBrandsController } from './admin-brands.controller';
import { ImageService } from './image.service';
import { CacheAdminController } from './cache-admin.controller';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10,
      },
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
    AdminProductsController,
    AdminCategoriesController,
    AdminBrandsController,
    CacheAdminController,
  ],
  providers: [AdminProductsService, ImageService, PrismaService, CacheService],
  exports: [AdminProductsService, ImageService],
})
export class AdminModule {
  constructor() {
    console.log('✅ Clean AdminModule initialized');
    console.log('📋 Available endpoints:');
    console.log('   📦 Products:');
    console.log('     GET    /admin/products     - Список продуктов');
    console.log('     GET    /admin/products/:id - Один продукт');
    console.log('     POST   /admin/products     - Создать продукт');
    console.log('     PUT    /admin/products/:id - Обновить продукт');
    console.log('     DELETE /admin/products/:id - Удалить продукт');
    console.log(
      '     POST   /admin/products/:id/images - Загрузить изображения'
    );
    console.log(
      '     DELETE /admin/products/:id/images/:imageId - Удалить изображение'
    );
    console.log('   📂 Categories:');
    console.log('     GET    /admin/categories   - Список категорий');
    console.log('     POST   /admin/categories   - Создать категорию');
    console.log('   🏷️  Brands:');
    console.log('     GET    /admin/brands       - Список брендов');
    console.log('     POST   /admin/brands       - Создать бренд');
    console.log(
      '     POST   /admin/brands/category-relations - Связать категорию и бренд'
    );
  }
}
