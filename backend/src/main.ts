// src/main.ts (исправленный)
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    const configService = app.get(ConfigService);
    const port = configService.get('PORT', 3000);
    const environment = configService.get('NODE_ENV', 'development');

    // ==================== CORS ====================
    app.enableCors({
      origin: [
        'http://localhost:3001', // Next.js фронтенд
        'http://localhost:3000', // Для разработки
        configService.get('FRONTEND_URL', 'http://localhost:3001'),
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // ==================== VALIDATION ====================
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    // ==================== SWAGGER ====================
    if (environment !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Neva Backend API v2.1')
        .setDescription(
          'Чистая архитектура для каталога продуктов NEVA и X-SOLUTION'
        )
        .setVersion('2.1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth'
        )
        .addTag('Public Catalog API', 'Публичные API для каталога')
        .addTag('Admin - Products Management', 'Управление продуктами')
        .addTag('Admin - Categories & Subcategories', 'Управление категориями')
        .addTag('Admin - Brands', 'Управление брендами')
        .addTag('Admin - System', 'Системные операции')
        .addTag('Authentication', 'Авторизация')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
          persistAuthorization: true,
          tagsSorter: 'alpha',
          operationsSorter: 'alpha',
        },
        customSiteTitle: 'Neva Backend API Documentation',
      });

      logger.log(
        `📖 Swagger UI available at: http://localhost:${port}/api-docs`
      );
    }

    // ==================== ЗАПУСК СЕРВЕРА ====================
    await app.listen(port, '0.0.0.0');

    logger.log(`🚀 Neva Backend v2.1 started successfully!`);
    logger.log(`🌐 Server running on: http://localhost:${port}`);
    logger.log(`📋 Environment: ${environment}`);
    logger.log(`🎯 GraphQL Playground: http://localhost:${port}/graphql`);

    if (environment !== 'production') {
      logger.log(`📖 API Documentation: http://localhost:${port}/api-docs`);
    }

    // Вывод всех зарегистрированных роутов для отладки
    if (environment === 'development') {
      setTimeout(() => {
        const router = app.getHttpAdapter().getInstance()._router;
        if (router && router.stack) {
          logger.debug('📋 Registered routes:');
          const routes = router.stack
            .filter((layer: any) => layer.route)
            .map((layer: any) => ({
              path: layer.route?.path || 'unknown',
              method: layer.route?.stack[0]?.method?.toUpperCase() || 'unknown',
            }))
            .sort((a: any, b: any) => a.path.localeCompare(b.path));

          routes.forEach((route: any) => {
            logger.debug(`  ${route.method.padEnd(6)} ${route.path}`);
          });
        }
      }, 1000);
    }
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Обработка неперехваченных ошибок
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
