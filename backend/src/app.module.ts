// 🔧 backend/src/app.module.ts
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { PrismaService } from '../prisma/prisma.service';

// Существующие модули
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { NevaProductsModule } from './products/products.module';
import { ProductModule } from './product/product.module';
import { CacheServiceModule } from './common/cache.module';

// 🔐 Авторизация
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

// Админ модуль
import { AdminModule } from './admin/admin.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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

    // Модули
    CacheServiceModule,
    AuthModule, // 🔐 JWT авторизация
    NevaProductsModule,
    ProductModule,
    CategoriesModule,
    BrandsModule,
    AdminModule, // 🔒 Защищенная админ панель
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // 🔒 Глобальная защита админских роутов
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
