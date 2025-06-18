// src/public/public.module.ts
import { Module } from '@nestjs/common';

import { PublicController } from './public.controller';
import { PublicResolver } from './public.resolver';
import { PublicService } from './public.service';

@Module({
  controllers: [PublicController],
  providers: [PublicService, PublicResolver],
  exports: [PublicService],
})
export class PublicModule {
  constructor() {
    console.log('🌐 PublicModule initialized (REST + GraphQL)');
    console.log('📋 Public REST API endpoints:');
    console.log('   GET  /api/products              - Список продуктов');
    console.log('   GET  /api/products/:id          - Детальная страница');
    console.log(
      '   GET  /api/categories            - Категории с субкатегориями'
    );
    console.log('   GET  /api/brands                - Бренды');
    console.log('   GET  /api/search                - Поиск');
    console.log('   GET  /api/menu                  - Навигация');
    console.log('');
    console.log('🎯 GraphQL endpoint:');
    console.log('   /graphql                        - GraphQL Playground');
  }
}
