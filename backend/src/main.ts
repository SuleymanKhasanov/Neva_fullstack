import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Включение CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  // Настройка раздачи статических файлов
  console.log('Static files path: /app/backend/public');
  app.useStaticAssets('/app/backend/public', {
    prefix: '/public/',
  });
  app.use('/public', (req: Request, _res: Response, next: NextFunction) => {
    console.log('Static file request:', req.url);
    next();
  });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Neva API')
    .setDescription('API for Neva products with multilingual support')
    .setVersion('1.0')
    .addTag('Products', 'Endpoints for retrieving product data')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
