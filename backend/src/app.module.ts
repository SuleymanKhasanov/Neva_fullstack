// src/app.module.ts (исправленный)
import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';

// Основные модули приложения
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CommonModule } from './common/common.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    // ==================== КОНФИГУРАЦИЯ ====================
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ==================== КЕШИРОВАНИЕ (Redis) ====================
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

    // ==================== GRAPHQL ====================
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: true,
      context: ({ req, res }: { req?: any; res?: any }) => ({
        req: req || {},
        res: res || {},
      }),
      formatError: (error) => {
        console.error('GraphQL Error:', error);

        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          path: error.path,
        };
      },
    }),

    // ==================== СТАТИЧЕСКИЕ ФАЙЛЫ ====================
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        cacheControl: true,
        maxAge: 86400000, // 24 часа для изображений
      },
    }),

    // ==================== ОСНОВНЫЕ МОДУЛИ ПРИЛОЖЕНИЯ ====================

    // Общие сервисы (база данных, кеш, загрузка файлов)
    CommonModule,

    // JWT авторизация
    AuthModule,

    // Публичный каталог (объединенные products + categories + brands)
    PublicModule,

    // Защищенная админ панель (сгруппированная по доменам)
    AdminModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    // Глобальный JWT Guard - автоматически защищает все роуты кроме @Public
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const environment = this.configService.get('NODE_ENV', 'development');
    const port = this.configService.get('PORT', 3000);

    console.log(
      '🚀 Neva Backend v2.1 - Clean Architecture (правильная логика)'
    );
    console.log(`📋 Environment: ${environment}`);
    console.log(`🌐 Port: ${port}`);
    console.log('');
    console.log('🎯 Чистые модули (убрано дублирование):');
    console.log('  🛠️  CommonModule   - Общие сервисы (DB, Cache, Upload)');
    console.log('  🔐  AuthModule     - JWT авторизация');
    console.log(
      '  🌐  PublicModule   - Весь публичный каталог (REST + GraphQL)'
    );
    console.log('  🔒  AdminModule    - Защищенная админка (сгруппированная)');
    console.log('');
    console.log('🌐 Публичные API (без авторизации):');
    console.log(
      '  GET  /api/products              - Список продуктов с фильтрами'
    );
    console.log(
      '  GET  /api/products/:id          - Детальная страница продукта'
    );
    console.log(
      '  GET  /api/categories            - Категории с субкатегориями'
    );
    console.log('  GET  /api/brands                - Бренды с фильтрацией');
    console.log('  GET  /api/search                - Поиск по каталогу');
    console.log('  GET  /api/menu                  - Данные для навигации');
    console.log('');
    console.log('🔒 Защищенные API (требуют JWT):');
    console.log('  📦  /admin/products/*           - Управление продуктами');
    console.log('  🏷️  /admin/categories/*         - Управление категориями');
    console.log('  🏢  /admin/brands/*             - Управление брендами');
    console.log('  🔧  /admin/system/*             - Системные операции');
    console.log('');
    console.log('🔐 Авторизация:');
    console.log('  POST /auth/login                - Вход в админ панель');
    console.log('  POST /auth/refresh              - Обновление токена');
    console.log('  GET  /auth/profile              - Профиль администратора');
    console.log('');
    console.log('🎯 GraphQL:');
    console.log('  📊  /graphql                    - GraphQL Playground');
    console.log('  📖  /api-docs                   - Swagger UI');
    console.log('');
    console.log('💾 Инфраструктура:');
    console.log('  🐘  PostgreSQL                 - Основная база данных');
    console.log('  🔴  Redis                       - Кеширование');
    console.log('  🔧  Adminer                     - Веб-интерфейс БД');
    console.log('');
    console.log('✅ Убрано дублирование:');
    console.log('  ❌ products/ + product/         → ✅ public/ (объединено)');
    console.log(
      '  ❌ categories/ + enhanced/      → ✅ public/ (только enhanced)'
    );
    console.log('  ❌ 6+ админских контроллеров   → ✅ 4 логичные группы');
    console.log('  ❌ legacy + enhanced версии    → ✅ только enhanced');
    console.log('');
    console.log('🎉 Чистая архитектура готова!');
  }
}
