// backend/src/app.module.ts
import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';

import { PrismaService } from '../prisma/prisma.service';

// Существующие модули
import { AdminEnhancedModule } from './admin/admin-enhanced.module'; // 🆕
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesEnhancedModule } from './categories/categories-enhanced.module';
import { CategoriesModule } from './categories/categories.module';
import { CacheServiceModule } from './common/cache.module';
import { ProductModule } from './product/product.module';
import { NevaProductsModule } from './products/products.module';

// 🔐 Авторизация

// Админ модули

// 🆕 Расширенные публичные модули

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'redis'),
        port: parseInt(configService.get('REDIS_PORT', '6379')),
        ttl: parseInt(configService.get('CACHE_TTL', '300')),
        max: parseInt(configService.get('CACHE_MAX_ITEMS', '1000')),
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/public',
    }),

    // Общие модули
    CacheServiceModule,
    AuthModule, // 🔐 JWT авторизация

    // 🌐 Публичные API модули
    NevaProductsModule, // Продукты (существующий)
    ProductModule, // Индивидуальные продукты
    CategoriesModule, // Категории (существующий)
    CategoriesEnhancedModule, // 🆕 Категории с субкатегориями
    BrandsModule, // Бренды

    // 🔒 Защищенные админские модули
    AdminModule, // Существующая админка
    AdminEnhancedModule, // 🆕 Расширенная админка с субкатегориями
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  constructor() {
    console.log('🚀 NevaBackend initialized with enhanced categories support!');
    console.log('');
    console.log('📋 Available API endpoints:');
    console.log('');
    console.log('🌐 PUBLIC APIs (no auth required):');
    console.log('  📦 Products:');
    console.log('    GET /products/all                     - Все продукты');
    console.log('    GET /products/neva                    - NEVA продукты');
    console.log(
      '    GET /products/x-solution              - X-SOLUTION продукты'
    );
    console.log('    GET /product/:locale/:id              - Детали продукта');
    console.log(
      '    GET /product/:locale/:id/exists       - Проверка существования'
    );
    console.log('');
    console.log('  🏷️ Categories (Basic):');
    console.log(
      '    GET /categories/all                   - Все категории с брендами'
    );
    console.log('    GET /categories/neva                  - NEVA категории');
    console.log(
      '    GET /categories/x-solution            - X-SOLUTION категории'
    );
    console.log('');
    console.log('  ✨ Categories Enhanced (with subcategories):');
    console.log(
      '    GET /categories-enhanced/all          - Категории с субкатегориями'
    );
    console.log(
      '    GET /categories-enhanced/neva         - NEVA с субкатегориями'
    );
    console.log(
      '    GET /categories-enhanced/x-solution   - X-SOLUTION с субкатегориями'
    );
    console.log(
      '    GET /categories-enhanced/:id/subcategories - Субкатегории категории'
    );
    console.log('');
    console.log('  🏢 Brands:');
    console.log('    GET /brands/all                       - Все бренды');
    console.log('    GET /brands/neva                      - NEVA бренды');
    console.log(
      '    GET /brands/x-solution                - X-SOLUTION бренды'
    );
    console.log('');
    console.log('🔐 AUTHENTICATION:');
    console.log(
      '    POST /auth/login                      - Вход в админ панель'
    );
    console.log(
      '    POST /auth/refresh                    - Обновление токена'
    );
    console.log(
      '    GET  /auth/profile                    - Профиль администратора'
    );
    console.log('    GET  /auth/check                      - Проверка токена');
    console.log('');
    console.log('🔒 ADMIN APIs (JWT auth required):');
    console.log('  📦 Products Management:');
    console.log(
      '    Basic: /admin/products/*              - Существующие продукты'
    );
    console.log(
      '    Enhanced: /admin/products-enhanced/*  - 🆕 С поддержкой субкатегорий'
    );
    console.log('');
    console.log('  🏷️ Categories & Subcategories:');
    console.log(
      '    Basic: /admin/categories/*            - Существующие категории'
    );
    console.log(
      '    Enhanced: /admin/categories-enhanced/* - 🆕 С субкатегориями'
    );
    console.log('');
    console.log('  🏢 Brands:');
    console.log(
      '    /admin/brands/*                       - Управление брендами'
    );
    console.log('');
    console.log('  🗑️ Cache Management:');
    console.log('    /admin/cache/*                        - Управление кешем');
    console.log('');
    console.log('📚 Documentation:');
    console.log('  Swagger UI: http://localhost:3000/api-docs');
    console.log('  GraphQL Playground: http://localhost:3000/graphql');
    console.log('');
    console.log('🌍 Supported Locales: ru, en, kr, uz');
    console.log('⚡ Redis caching enabled for all APIs');
    console.log('🔐 JWT authentication for admin endpoints');
  }
}
