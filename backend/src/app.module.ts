import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';

import { PrismaService } from '../prisma/prisma.service';

import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { NevaProductsModule } from './products/products.module';
import { CacheServiceModule } from './common/cache.module';
import { CacheAdminController } from './admin/cache-admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config: any = {
          store: redisStore,
          host: configService.get('REDIS_HOST', 'redis'),
          port: parseInt(configService.get('REDIS_PORT', '6379')),
          ttl: parseInt(configService.get('CACHE_TTL', '300')),
          max: parseInt(configService.get('CACHE_MAX_ITEMS', '1000')),
          // Основные настройки для совместимости
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 3,
          lazyConnect: true,
        };

        // Добавляем пароль только если он задан
        const password = configService.get('REDIS_PASSWORD');
        if (password) {
          config.password = password;
        }

        // Добавляем номер БД только если он задан
        const db = configService.get('REDIS_DB');
        if (db) {
          config.db = parseInt(db);
        }

        console.log('🔧 Redis Cache Config:', {
          host: config.host,
          port: config.port,
          ttl: config.ttl,
          max: config.max,
          hasPassword: !!password,
          db: db || 0,
        });

        return config;
      },
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
    // Импорт нашего модуля кеширования
    CacheServiceModule,
    NevaProductsModule,
    CategoriesModule,
    BrandsModule,
  ],
  controllers: [CacheAdminController],
  providers: [PrismaService],
})
export class AppModule {
  constructor() {
    console.log('✅ AppModule initialized with Redis caching');
    console.log('🔧 Cache configuration:', {
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379,
      ttl: process.env.CACHE_TTL || 300,
    });
  }
}
