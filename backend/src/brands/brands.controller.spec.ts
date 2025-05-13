import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { execSync } from 'child_process';

// Очищаем переменные окружения и загружаем .env.test
process.env = {};
dotenv.config({
  path: join(__dirname, '..', '..', '.env.test'),
  override: true,
});

describe('BrandsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService | undefined;

  beforeAll(async () => {
    // Генерируем Prisma Client перед тестами
    try {
      console.log('Generating Prisma Client...');
      execSync('npx prisma generate', {
        stdio: 'inherit',
        cwd: join(__dirname, '..', '..'),
      });
      console.log('Prisma Client generated successfully.');
    } catch (error) {
      console.error('Failed to generate Prisma Client:', error);
      throw error;
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    console.log('DATABASE_URL in test:', process.env.DATABASE_URL); // Отладка
    if (prisma) {
      await prisma.$connect();
    } else {
      console.error('PrismaService not initialized.');
    }
    await app.init();

    // Очистка и заполнение тестовой БД
    if (prisma) {
      await prisma.$executeRaw`TRUNCATE "Category", "Brand" RESTART IDENTITY CASCADE;`;
      await prisma.category.createMany({
        data: [
          {
            locale: 'uz',
            name: `Test Category NEVA ${Date.now()}`,
            section: 'NEVA',
          },
          {
            locale: 'uz',
            name: `Test Category X_SOLUTION ${Date.now()}`,
            section: 'X_SOLUTION',
          },
          {
            locale: 'ru',
            name: `Тестовая Категория NEVA ${Date.now()}`,
            section: 'NEVA',
          },
        ],
      });
      await prisma.brand.createMany({
        data: [
          {
            categoryId: 1,
            name: `Test Brand NEVA ${Date.now()}`,
            locale: 'uz',
            section: 'NEVA',
          },
          {
            categoryId: 2,
            name: `Test Brand X_SOLUTION ${Date.now()}`,
            locale: 'uz',
            section: 'X_SOLUTION',
          },
          {
            categoryId: 3,
            name: `Тестовый Бренд NEVA ${Date.now()}`,
            locale: 'ru',
            section: 'NEVA',
          },
        ],
      });
    }
  }, 30000);

  beforeEach(async () => {
    if (prisma) {
      await prisma.$executeRaw`TRUNCATE "Category", "Brand" RESTART IDENTITY CASCADE;`;
      await prisma.category.createMany({
        data: [
          {
            locale: 'uz',
            name: `Test Category NEVA ${Date.now()}`,
            section: 'NEVA',
          },
          {
            locale: 'uz',
            name: `Test Category X_SOLUTION ${Date.now()}`,
            section: 'X_SOLUTION',
          },
          {
            locale: 'ru',
            name: `Тестовая Категория NEVA ${Date.now()}`,
            section: 'NEVA',
          },
        ],
      });
      await prisma.brand.createMany({
        data: [
          {
            categoryId: 1,
            name: `Test Brand NEVA ${Date.now()}`,
            locale: 'uz',
            section: 'NEVA',
          },
          {
            categoryId: 2,
            name: `Test Brand X_SOLUTION ${Date.now()}`,
            locale: 'uz',
            section: 'X_SOLUTION',
          },
          {
            categoryId: 3,
            name: `Тестовый Бренд NEVA ${Date.now()}`,
            locale: 'ru',
            section: 'NEVA',
          },
        ],
      });
    }
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.$disconnect();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка 1 секунда
    }
    await app.close();
  });

  it('GET /brands/all should return brands with pagination for uz locale', async () => {
    const response = await request(app.getHttpServer())
      .get('/brands/all')
      .query({ locale: 'uz', page: 1, limit: 10 })
      .expect(200);

    expect(response.body).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.stringContaining('Test Brand'),
          section: expect.any(String),
          locale: 'uz',
          category: expect.any(Object),
        }),
      ]),
      meta: {
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    });
  });

  it('GET /brands/neva should return NEVA brands for uz locale', async () => {
    const response = await request(app.getHttpServer())
      .get('/brands/neva')
      .query({ locale: 'uz', page: 1, limit: 10 })
      .expect(200);

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          section: 'NEVA',
          name: expect.stringContaining('Test Brand NEVA'),
        }),
      ])
    );
    expect(response.body.meta.total).toBe(1);
  });

  it('GET /brands/x-solution should return X_SOLUTION brands for uz locale', async () => {
    const response = await request(app.getHttpServer())
      .get('/brands/x-solution')
      .query({ locale: 'uz', page: 1, limit: 10 })
      .expect(200);

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          section: 'X_SOLUTION',
          name: expect.stringContaining('Test Brand X_SOLUTION'),
        }),
      ])
    );
    expect(response.body.meta.total).toBe(1);
  });

  it('GET /brands/all with ru locale should return brands', async () => {
    const response = await request(app.getHttpServer())
      .get('/brands/all')
      .query({ locale: 'ru', page: 1, limit: 10 })
      .expect(200);

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          locale: 'ru',
          name: expect.stringContaining('Тестовый Бренд NEVA'),
        }),
      ])
    );
    expect(response.body.meta.total).toBe(1);
  });

  it('GET /brands/all with invalid locale should return 400', async () => {
    const response = await request(app.getHttpServer())
      .get('/brands/all')
      .query({ locale: 'invalid', page: 1, limit: 10 })
      .expect(400);

    expect(response.body).toEqual({
      statusCode: 400,
      message: ['locale must be one of the following values: ru, en, kr, uz'],
      error: 'Bad Request',
    });
  });
});
