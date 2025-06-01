import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { NevaProductsController } from './products.controller';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, ProductsResolver, PrismaService],
  controllers: [NevaProductsController],
})
export class NevaProductsModule {
  constructor() {
    console.log('NevaProductsModule initialized with Redis caching');
    console.log('Controllers:', [NevaProductsController]);
  }
}
