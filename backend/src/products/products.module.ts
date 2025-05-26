import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { NevaProductsController } from './products.controller'; // Переименовано
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, ProductsResolver, PrismaService],
  controllers: [NevaProductsController],
})
export class NevaProductsModule {
  // Переименовано
  constructor() {
    console.log('NevaProductsModule initialized');
    console.log('Controllers:', [NevaProductsController]);
  }
}
