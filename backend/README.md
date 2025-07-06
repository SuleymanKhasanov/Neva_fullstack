# Neva Backend API v2.1

**Автор:** SuleymanKhasanov  
**Лицензия:** MIT  
**Версия:** 2.1.0

Современная backend система для управления каталогом продуктов NEVA и X-SOLUTION с поддержкой многоязычности, кеширования и административной панели.

## 📋 Содержание

- [Описание проекта](#-описание-проекта)
- [Технологический стек](#-технологический-стек)
- [Архитектура](#-архитектура)
- [Быстрый старт](#-быстрый-старт)
- [API документация](#-api-документация)
- [Структура проекта](#-структура-проекта)
- [Развертывание](#-развертывание)
- [Разработка](#-разработка)
- [Конфигурация](#-конфигурация)
- [Примеры использования](#-примеры-использования)
- [Мониторинг и отладка](#-мониторинг-и-отладка)
- [Безопасность](#-безопасность)
- [FAQ](#-faq)

## 🎯 Описание проекта

Neva Backend - это высокопроизводительная система управления каталогом продуктов, построенная на современных технологиях. Система поддерживает:

### 🌟 Ключевые возможности

- **Многоязычность**: Поддержка русского, английского, узбекского и корейского языков
- **Мультисекционность**: Отдельные каталоги для NEVA и X-SOLUTION
- **Иерархическая структура**: Категории → Субкатегории → Продукты
- **Интеллектуальное кеширование**: Redis с автоматической инвалидацией
- **Обработка изображений**: Автоматическая оптимизация и создание превью
- **REST + GraphQL API**: Гибкие интерфейсы для различных клиентов
- **Административная панель**: Полнофункциональная система управления
- **Поиск и фильтрация**: Мощные возможности поиска по каталогу

### 🎨 Основные домены

1. **Продукты** - управление товарами с характеристиками и изображениями
2. **Категории** - иерархическая организация каталога
3. **Бренды** - управление производителями
4. **Медиа** - обработка и хранение изображений
5. **Поиск** - полнотекстовый поиск по каталогу

## 🔧 Технологический стек

### Backend Framework

- **NestJS 11.x** - Прогрессивный Node.js фреймворк
- **TypeScript 5.x** - Строгая типизация
- **Node.js 20+** - Runtime окружение

### База данных и ORM

- **PostgreSQL 15+** - Основная реляционная БД
- **Prisma 6.x** - Современный ORM с автогенерацией типов
- **Redis 7+** - Кеширование и сессии

### API и документация

- **REST API** - Основной интерфейс
- **GraphQL** - Гибкие запросы для фронтенда
- **Swagger/OpenAPI** - Автоматическая документация

### Обработка медиа

- **Sharp** - Высокопроизводительная обработка изображений
- **Multer** - Загрузка файлов
- **WebP** - Оптимизированный формат изображений

### Безопасность и авторизация

- **JWT** - Токены доступа
- **Passport** - Аутентификация
- **class-validator** - Валидация данных

### DevOps и мониторинг

- **Docker** - Контейнеризация
- **Docker Compose** - Оркестрация сервисов
- **Jest** - Тестирование

## 🏗 Архитектура

### Модульная архитектура

```
src/
├── common/           # Общие сервисы
│   ├── cache/        # Redis кеширование
│   ├── database/     # Prisma конфигурация
│   └── upload/       # Обработка файлов
├── auth/             # JWT авторизация
├── public/           # Публичные API
├── admin/            # Административные API
└── main.ts          # Точка входа
```

### Слои приложения

1. **Контроллеры** - HTTP endpoints и валидация
2. **Сервисы** - Бизнес-логика
3. **Репозитории** - Доступ к данным через Prisma
4. **Модели** - Типы и DTO

### Схема базы данных

```mermaid
erDiagram
    Category ||--o{ Subcategory : contains
    Category ||--o{ Product : belongs_to
    Subcategory ||--o{ Product : belongs_to
    Brand ||--o{ Product : belongs_to
    Product ||--o{ ProductImage : has
    Product ||--o{ ProductSpecification : has
    Category ||--o{ CategoryBrand : links
    Brand ||--o{ CategoryBrand : links
```

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js 20+**
- **Docker & Docker Compose**
- **Git**

### 1. Клонирование репозитория

```bash
git clone https://github.com/SuleymanKhasanov/neva-backend.git
cd neva-backend/backend
```

### 2. Установка зависимостей

```bash
# Используем Yarn (рекомендуется)
yarn install

# Или NPM
npm install
```

### 3. Настройка окружения

```bash
# Копируем файл конфигурации
cp .env.example .env

# Редактируем переменные окружения
nano .env
```

### 4. Запуск инфраструктуры

```bash
# Запускаем PostgreSQL и Redis
docker-compose up -d postgres redis adminer

# Ждем готовности сервисов
sleep 10
```

### 5. Инициализация базы данных

```bash
# Генерируем Prisma клиент
yarn prisma:generate

# Применяем миграции
yarn migrate:apply

# Заполняем тестовыми данными
yarn db:seed:all
```

### 6. Запуск приложения

```bash
# Режим разработки
yarn start:dev

# Продакшн режим
yarn build
yarn start:prod
```

### 7. Проверка работы

- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api-docs
- **GraphQL**: http://localhost:3000/graphql
- **Adminer**: http://localhost:8080

## 📚 API документация

### Публичные API

#### Продукты

```http
GET /api/products
```

**Параметры запроса:**

- `locale` - Язык интерфейса (ru, en, uz, kr)
- `section` - Секция (NEVA, X_SOLUTION)
- `categoryId` - ID категории
- `subcategoryId` - ID субкатегории
- `brandId` - ID бренда
- `page` - Номер страницы (по умолчанию: 1)
- `limit` - Количество на странице (по умолчанию: 20)
- `search` - Поисковый запрос

**Пример ответа:**

```json
{
  "products": [
    {
      "id": 1,
      "name": "Dell PowerEdge R740",
      "description": "Серверное решение для дата-центра",
      "section": "NEVA",
      "image": "https://api.neva.uz/public/images/product_1_small.webp",
      "brand": {
        "id": 1,
        "name": "Dell"
      },
      "category": {
        "id": 1,
        "name": "Серверное оборудование"
      },
      "subcategory": {
        "id": 101,
        "name": "Серверы"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Категории

```http
GET /api/categories
```

**Параметры:**

- `locale` - Язык интерфейса
- `section` - Секция каталога
- `withSubcategories` - Включить субкатегории
- `withBrands` - Включить связанные бренды

#### Поиск

```http
GET /api/search?q=server&locale=ru
```

**Возвращает:**

- Релевантные продукты
- Подходящие категории
- Подходящие бренды

### Административные API

Все административные API требуют JWT авторизации.

#### Авторизация

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Ответ:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

#### Управление продуктами

```http
POST /admin/products
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "section": "NEVA",
  "categoryId": 1,
  "subcategoryId": 101,
  "brandId": 1,
  "isActive": true,
  "translations": [
    {
      "locale": "ru",
      "name": "Dell PowerEdge R740",
      "description": "Мощный серверный комплекс"
    },
    {
      "locale": "en",
      "name": "Dell PowerEdge R740",
      "description": "Powerful server solution"
    }
  ],
  "specifications": [
    {
      "key": "cpu",
      "translations": [
        {
          "locale": "ru",
          "name": "Процессор",
          "value": "Intel Xeon Gold 6248R"
        }
      ]
    }
  ]
}
```

#### Загрузка изображений

```http
POST /admin/products/{id}/images
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

images: [file1.jpg, file2.png]
```

### GraphQL API

Доступен по адресу `/graphql` с GraphQL Playground.

**Пример запроса:**

```graphql
query GetProducts($locale: String!, $section: String) {
  products(locale: $locale, section: $section, first: 10) {
    edges {
      node {
        id
        name
        description
        brand {
          id
          name
        }
        category {
          id
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

## 📁 Структура проекта

```
backend/
├── src/
│   ├── common/                 # Общие модули
│   │   ├── cache/             # Redis кеширование
│   │   │   ├── cache.service.ts
│   │   │   └── cache.module.ts
│   │   ├── database/          # Prisma подключение
│   │   │   ├── prisma.service.ts
│   │   │   └── database.module.ts
│   │   └── upload/            # Обработка файлов
│   │       ├── upload.service.ts
│   │       ├── image.service.ts
│   │       └── upload.module.ts
│   ├── auth/                  # Авторизация
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── guards/
│   │   ├── decorators/
│   │   └── dto/
│   ├── public/               # Публичные API
│   │   ├── public.controller.ts
│   │   ├── public.service.ts
│   │   ├── public.resolver.ts
│   │   ├── public.module.ts
│   │   └── dto/
│   ├── admin/                # Админские API
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── system/
│   │   ├── admin.module.ts
│   │   ├── types/
│   │   └── dto/
│   ├── app.module.ts         # Корневой модуль
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts              # Точка входа
├── prisma/                  # Схема БД
│   ├── schema.prisma
│   └── migrations/
├── scripts/                 # Утилиты
│   ├── seed-categories.ts
│   └── parse-catalog-json.ts
├── data/                    # Исходные данные
│   └── catalog_json.json
├── public/                  # Статические файлы
│   └── images/
├── docker-compose.yml       # Docker окружение
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🐳 Развертывание

### Development окружение

```bash
# Полный запуск с нуля
yarn dev:full

# Перезапуск с очисткой
yarn dev:reset
```

### Production развертывание

#### Docker Compose (рекомендуется)

```bash
# Клонируем репозиторий
git clone https://github.com/SuleymanKhasanov/neva-backend.git
cd neva-backend

# Настраиваем переменные окружения
cp .env.example .env
nano .env

# Запускаем продакшн
docker-compose -f docker-compose.prod.yml up -d

# Инициализируем БД
docker-compose exec backend yarn db:setup
```

#### Системные требования для продакшн

- **CPU**: 2+ ядра
- **RAM**: 4GB+
- **Диск**: 20GB+ SSD
- **Сеть**: 100Mbps+

### Мониторинг состояния

```bash
# Проверка здоровья системы
curl http://localhost:3000/admin/system/health

# Статистика кеша
curl http://localhost:3000/admin/system/cache/stats

# Общая статистика
curl http://localhost:3000/admin/system/stats
```

## 👨‍💻 Разработка

### Настройка среды разработки

```bash
# Установка зависимостей для разработки
yarn install

# Настройка pre-commit хуков
npx husky install

# Запуск в режиме разработки
yarn start:dev
```

### Полезные команды

```bash
# Генерация Prisma клиента
yarn prisma:generate

# Просмотр БД в браузере
yarn prisma:studio

# Создание новой миграции
yarn migrate:create

# Применение миграций
yarn migrate:apply

# Сброс БД
yarn db:setup:fresh

# Парсинг каталога из JSON
yarn catalog:parse

# Очистка кеша
yarn cache:clear
```

### Работа с базой данных

#### Создание миграции

```bash
# После изменения schema.prisma
yarn prisma:generate
yarn migrate:create --name add_new_feature
```

#### Заполнение тестовыми данными

```bash
# Загрузка категорий
yarn db:seed:categories

# Загрузка брендов
yarn db:seed:brands

# Загрузка всех данных
yarn db:seed:all
```

### Работа с кешем

```bash
# Очистка всего кеша
curl -X POST http://localhost:3000/admin/system/cache/clear

# Очистка по паттерну
curl -X DELETE "http://localhost:3000/admin/system/cache/pattern?pattern=products:*"

# Инвалидация кеша продуктов
curl -X POST http://localhost:3000/admin/system/cache/invalidate/products
```

### Отладка

```bash
# Режим отладки
yarn start:debug

# Логи контейнеров
yarn docker:logs

# Анализ производительности
NODE_ENV=development yarn start:dev
```

## ⚙️ Конфигурация

### Переменные окружения

```bash
# .env файл

# Основные настройки
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001

# База данных PostgreSQL
DATABASE_URL=postgresql://neva_user:neva_password@localhost:5432/neva_db

# Redis кеширование
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=300
CACHE_MAX_ITEMS=1000

# JWT токены
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d

# Администратор
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Файлы и изображения
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Внешние сервисы
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
```

### Конфигурация Docker

#### docker-compose.yml (development)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: neva_db
      POSTGRES_USER: neva_user
      POSTGRES_PASSWORD: neva_password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  backend:
    build: .
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: development
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
  redis_data:
```

### Настройка Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Модели данных
model Product {
  id            Int      @id @default(autoincrement())
  brandId       Int?     @map("brand_id")
  categoryId    Int      @map("category_id")
  subcategoryId Int?     @map("subcategory_id")
  section       Section
  slug          String?  @db.VarChar(255)
  isActive      Boolean  @default(true) @map("is_active")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  // Связи
  brand           Brand?                   @relation(fields: [brandId], references: [id])
  category        Category                 @relation(fields: [categoryId], references: [id])
  subcategory     Subcategory?             @relation(fields: [subcategoryId], references: [id])
  translations    ProductTranslation[]
  images          ProductImage[]
  specifications  ProductSpecification[]

  @@map("products")
}
```

## 💡 Примеры использования

### Создание продукта через API

```javascript
// Создание продукта с переводами
const createProduct = async () => {
  const response = await fetch('/admin/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      section: 'NEVA',
      categoryId: 1,
      subcategoryId: 101,
      brandId: 5,
      translations: [
        {
          locale: 'ru',
          name: 'Dell PowerEdge R750',
          description: 'Серверное решение нового поколения',
        },
        {
          locale: 'en',
          name: 'Dell PowerEdge R750',
          description: 'Next-generation server solution',
        },
      ],
      specifications: [
        {
          key: 'cpu',
          translations: [
            {
              locale: 'ru',
              name: 'Процессор',
              value: 'Intel Xeon Gold 6348',
            },
            {
              locale: 'en',
              name: 'CPU',
              value: 'Intel Xeon Gold 6348',
            },
          ],
        },
      ],
    }),
  });

  const product = await response.json();
  console.log('Создан продукт:', product);
};
```

### Загрузка изображений

```javascript
// Загрузка изображений продукта
const uploadImages = async (productId, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await fetch(`/admin/products/${productId}/images`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const result = await response.json();
  console.log('Изображения загружены:', result);
};
```

### Работа с кешем

```javascript
// Инвалидация кеша после обновления
const invalidateCache = async () => {
  await fetch('/admin/system/cache/invalidate/products', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log('Кеш продуктов очищен');
};
```

### GraphQL запросы

```javascript
// Получение продуктов через GraphQL
const fetchProducts = async () => {
  const query = `
    query GetProducts($locale: String!, $first: Int!) {
      products(locale: $locale, first: $first) {
        edges {
          node {
            id
            name
            description
            image
            brand {
              id
              name
            }
            category {
              id  
              name
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  `;

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        locale: 'ru',
        first: 20,
      },
    }),
  });

  const data = await response.json();
  return data.data.products;
};
```

## 🔍 Мониторинг и отладка

### Логирование

Приложение использует встроенную систему логирования NestJS:

```typescript
// Уровни логирования
const logger = new Logger('ServiceName');

logger.log('Информационное сообщение');
logger.warn('Предупреждение');
logger.error('Ошибка');
logger.debug('Отладочная информация');
```

### Мониторинг производительности

```bash
# Мониторинг системных ресурсов
docker stats

# Анализ логов
docker-compose logs -f backend

# Мониторинг Redis
redis-cli monitor

# Мониторинг PostgreSQL
docker-compose exec postgres psql -U neva_user -d neva_db -c "SELECT * FROM pg_stat_activity;"
```

### Отладка кеша

```bash
# Просмотр ключей кеша
redis-cli keys "*"

# Получение информации о кеше
curl http://localhost:3000/admin/system/cache/stats

# Проверка работы кеша
curl http://localhost:3000/admin/system/cache/health
```

### Health checks

Система предоставляет endpoints для проверки состояния:

```bash
# Общее состояние системы
curl http://localhost:3000/admin/system/health

# Статистика системы
curl http://localhost:3000/admin/system/stats
```

## 🔒 Безопасность

### Аутентификация

- **JWT токены** с коротким временем жизни
- **Refresh токены** для обновления доступа
- **Глобальная защита** всех административных endpoints

### Валидация данных

```typescript
// Строгая валидация всех входящих данных
export class CreateProductDto {
  @IsEnum(Section)
  section!: Section;

  @IsInt()
  @Min(1)
  categoryId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations!: TranslationDto[];
}
```

### Загрузка файлов

- Ограничение типов файлов (только изображения)
- Максимальный размер файла (10MB)
- Автоматическая конвертация в безопасный формат WebP

### CORS и заголовки безопасности

```typescript
// Настройка CORS
app.enableCors({
  origin: ['http://localhost:3001', process.env.FRONTEND_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```

### Рекомендации по безопасности

1. **Изменить дефолтные пароли** в продакшене
2. **Использовать HTTPS** для всех соединений
3. **Настроить firewall** для ограничения доступа
4. **Регулярно обновлять зависимости**
5. **Мониторить логи** на предмет подозрительной активности

## ❓ FAQ

### Общие вопросы

**Q: Как добавить новый язык?**
A: Добавьте новую локаль в enum `Locale` в `schema.prisma`, выполните миграцию и добавьте переводы.

**Q: Как изменить структуру продукта?**
A: Измените модель `Product` в `schema.prisma`, создайте миграцию и обновите соответствующие DTO.

**Q: Как настроить email уведомления?**
A: Создайте новый модуль `notifications` и интегрируйте с почтовым сервисом (SendGrid, Mailgun).

### Производительность

**Q: Как оптимизировать скорость ответа API?**
A:

- Увеличьте TTL кеша для стабильных данных
- Используйте индексы БД для часто запрашиваемых полей
- Настройте CDN для статических файлов

**Q: Как масштабировать систему?**
A:

- Добавьте Redis Cluster для кеширования
- Используйте read replicas для PostgreSQL
- Настройте load balancer для multiple instances

### Разработка

**Q: Как добавить новый endpoint?**
A:

1. Создайте DTO в папке `dto/`
2. Добавьте метод в соответствующий сервис
3. Создайте endpoint в контроллере
4. Добавьте документацию Swagger

**Q: Как изменить схему кеширования?**
A: Модифицируйте `CacheService` и обновите ключи кеша в соответствующих сервисах.

### Развертывание

**Q: Как обновить продакшн версию?**
A:

```bash
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
docker-compose exec backend yarn migrate:apply
```

**Q: Как сделать backup базы данных?**
A:

```bash
docker-compose exec postgres pg_dump -U neva_user neva_db > backup.sql
```

### Troubleshooting

**Q: Ошибка подключения к базе данных**
A: Проверьте:

- Запущен ли PostgreSQL контейнер
- Правильность строки подключения в `.env`
- Доступность сети между контейнерами

**Q: Кеш не работает**
A: Проверьте:

- Запущен ли Redis контейнер
- Конфигурацию Redis в `app.module.ts`
- Логи на наличие ошибок подключения

**Q: Изображения не загружаются**
A: Проверьте:

- Права доступа к папке `public/images/`
- Размер загружаемых файлов
- Тип файлов (только изображения)

## 🤝 Участие в разработке

### Внесение изменений

1. Fork репозитория
2. Создайте feature branch: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add amazing feature'`
4. Push в branch: `git push origin feature/amazing-feature`
5. Откройте Pull Request

### Стандарты кода

- **TypeScript** строгий режим
- **ESLint** для статического анализа
- **Prettier** для форматирования
- **Conventional Commits** для сообщений коммитов

### Тестирование

```bash
# Запуск юнит тестов
yarn test

# Тесты с покрытием
yarn test:cov

# E2E тесты
yarn test:e2e
```

## 📞 Поддержка

- **Автор**: SuleymanKhasanov
- **GitHub**: [@SuleymanKhasanov](https://github.com/SuleymanKhasanov)

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для деталей.
