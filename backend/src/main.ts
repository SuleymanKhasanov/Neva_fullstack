import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Router } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Neva API')
    .setDescription('API for Neva and X-Solution catalog')
    .setVersion('1.0')
    .addTag('Products')
    .addTag('Categories')
    .addTag('Brands')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  const router = app.getHttpAdapter().getInstance()._router as Router;
  if (router && router.stack) {
    console.log(
      'Registered routes:',
      router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
          path: layer.route?.path || 'unknown',
          method: layer.route?.stack[0]?.method || 'unknown',
        }))
    );
  } else {
    console.log('Router not initialized yet');
  }
}

bootstrap();
