import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, CategoriesModule, BrandsModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
