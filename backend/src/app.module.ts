import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ProductsModule, CategoriesModule, BrandsModule],
  providers: [PrismaService],
})
export class AppModule {}
