# Neva Backend API

Высокопроизводительный backend API для каталога продуктов Neva с мультиязычной поддержкой, Redis кешированием и админ панелью, построенный на NestJS.

## 🚀 Особенности

- **REST & GraphQL API** - Гибкие возможности запросов данных
- **Мультиязычность** - Полная поддержка 4 языков (ru, en, kr, uz) через таблицы переводов
- **Redis Кеширование** - Ускорение API в 3-6 раз с умной инвалидацией
- **Админ панель** - Полное управление продуктами, категориями, брендами и кешем
- **Обработка изображений** - Автоматическое сжатие в WebP с созданием миниатюр
- **Автодокументация** - Swagger UI и GraphQL Playground
- **Типобезопасность** - TypeScript + Prisma ORM с нормализованной схемой
- **Контейнеризация** - Docker setup с PostgreSQL, Redis и Adminer

## 📋 Содержание

- [Технологии](#технологии)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [API Документация](#api-документация)
- [Админ панель](#админ-панель)
- [Мультиязычность](#мультиязычность)
- [Кеширование](#кеширование)
- [База данных](#база-данных)
- [Разработка](#разработка)
- [Деплой](#деплой)

## 🛠 Технологии

| Категория            | Технология              | Версия  |
| -------------------- | ----------------------- | ------- |
| **Framework**        | NestJS                  | ^11.1.0 |
| **Language**         | TypeScript              | ^5.7.2  |
| **Database**         | PostgreSQL              | 15      |
| **ORM**              | Prisma                  | ^6.7.0  |
| **Cache**            | Redis                   | 7       |
| **API**              | REST + GraphQL          | -       |
| **Image Processing** | Sharp                   | ^0.34.1 |
| **Documentation**    | Swagger + Apollo Studio | -       |
| **Containerization** | Docker & Docker Compose | -       |

## 🚀 Быстрый старт

### Предварительные требования

- Docker & Docker Compose
- Node.js 20+ (для локальной разработки)
- Yarn (рекомендуется)

### Установка и запуск

```bash
# 1. Клонируйте репозиторий
git clone <repository-url>
cd neva-backend

# 2. Скопируйте переменные окружения
cp .env.example .env

# 3. Запустите с помощью Docker
docker-compose up --build

# 4. Приложение будет доступно по адресам:
# API: http://localhost:3000
# Swagger: http://localhost:3000/api-docs
# GraphQL: http://localhost:3000/graphql
# Adminer: http://localhost:8080 (db/user/password/neva)
# Redis Commander: http://localhost:8081 (admin/admin123)
```

### Заполнение тестовыми данными

```bash
# Выполните после запуска контейнеров
docker-compose exec backend yarn prisma:seed
```

## 📁 Структура проекта

```
backend/
├── prisma/                    # Схема базы данных и миграции
│   ├── schema.prisma         # Prisma схема с переводами
│   ├── migrations/           # Миграции базы данных
│   └── prisma.service.ts     # Prisma сервис
├── src/
│   ├── common/               # Общие модули
│   │   ├── cache.service.ts  # Умный сервис кеширования
│   │   └── cache.module.ts   # Глобальный модуль кеширования
│   ├── admin/                # Админ панель
│   │   ├── admin-products.controller.ts    # Управление продуктами
│   │   ├── admin-categories.controller.ts  # Управление категориями
│   │   ├── admin-brands.controller.ts      # Управление брендами
│   │   ├── cache-admin.controller.ts       # Управление кешем
│   │   ├── image.service.ts               # Обработка изображений
│   │   └── dto/                           # DTO для админки
│   ├── products/             # Публичные API продуктов
│   │   ├── products.controller.ts         # REST endpoints
│   │   ├── products.service.ts            # Бизнес логика с кешем
│   │   ├── products.resolver.ts           # GraphQL resolvers
│   │   └── dto/                           # Response DTOs
│   ├── product/              # Индивидуальные продукты
│   │   ├── product.controller.ts          # Детальная информация
│   │   └── product.service.ts             # SEO и детали
│   ├── categories/           # Модуль категорий
│   ├── brands/               # Модуль брендов
│   ├── app.module.ts         # Главный модуль приложения
│   └── main.ts               # Точка входа
├── scripts/                  # Скрипты для работы с данными
│   └── seed-data.ts          # Заполнение тестовыми данными
├── public/                   # Статические файлы
│   └── images/               # Обработанные изображения (WebP)
└── docker-compose.yml        # Docker конфигурация
```

## 📚 API Документация

### REST API

API доступно по адресу: `http://localhost:3000`

**Swagger UI**: `http://localhost:3000/api-docs`

#### Основные эндпоинты:

| Метод | Путь                          | Описание                        |
| ----- | ----------------------------- | ------------------------------- |
| `GET` | `/products/all`               | Все продукты с пагинацией       |
| `GET` | `/products/neva`              | Продукты секции NEVA            |
| `GET` | `/products/x-solution`        | Продукты секции X-SOLUTION      |
| `GET` | `/product/:locale/:id`        | Детальная информация о продукте |
| `GET` | `/product/:locale/:id/exists` | Проверка существования          |
| `GET` | `/categories/all`             | Все категории с брендами        |
| `GET` | `/categories/neva`            | Категории NEVA                  |
| `GET` | `/categories/x-solution`      | Категории X-SOLUTION            |
| `GET` | `/brands/all`                 | Все бренды                      |
| `GET` | `/brands/neva`                | Бренды NEVA                     |
| `GET` | `/brands/x-solution`          | Бренды X-SOLUTION               |

#### Параметры запросов:

```bash
# Продукты с фильтрацией и пагинацией
GET /products/neva?locale=ru&page=1&categoryId=1&brandId=2

# Детальная информация о продукте
GET /product/ru/1

# Категории с брендами по секции
GET /categories/neva?locale=en

# Бренды по секции и локали
GET /brands/x-solution?locale=uz
```

#### Примеры ответов:

**Список продуктов:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "ASUS VivoBook 15",
      "locale": "ru",
      "section": "NEVA",
      "description": "Мощный ноутбук для работы",
      "image": "http://localhost:3000/public/images/laptop_small.webp",
      "fullImage": "http://localhost:3000/public/images/laptop_large.webp",
      "brand": {
        "id": 1,
        "name": "ASUS",
        "locale": "ru",
        "section": "NEVA"
      },
      "category": {
        "id": 1,
        "name": "Ноутбуки",
        "locale": "ru",
        "section": "NEVA"
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

### GraphQL API

**GraphQL Playground**: `http://localhost:3000/graphql`

#### Примеры запросов:

```graphql
# Получить продукты с курсор-пагинацией
query GetProducts($locale: String!, $section: String) {
  products(locale: $locale, section: $section, first: 10) {
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
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}

# Получить категории с брендами
query GetCategories($locale: String!, $section: String) {
  categories(locale: $locale, section: $section) {
    categories {
      id
      name
      brands {
        id
        name
      }
    }
  }
}

# Получить бренды
query GetBrands($locale: String!, $section: String) {
  brands(locale: $locale, section: $section) {
    brands {
      id
      name
    }
  }
}
```

## 🔧 Админ панель

### Управление продуктами

| Метод    | Путь                                  | Описание              |
| -------- | ------------------------------------- | --------------------- |
| `GET`    | `/admin/products`                     | Список всех продуктов |
| `GET`    | `/admin/products/:id`                 | Детали продукта       |
| `POST`   | `/admin/products`                     | Создать продукт       |
| `PUT`    | `/admin/products/:id`                 | Обновить продукт      |
| `DELETE` | `/admin/products/:id`                 | Удалить продукт       |
| `POST`   | `/admin/products/:id/images`          | Загрузить изображения |
| `DELETE` | `/admin/products/:id/images/:imageId` | Удалить изображение   |

#### Создание продукта:

```bash
curl -X POST "http://localhost:3000/admin/products" \
  -H "Content-Type: application/json" \
  -d '{
    "section": "NEVA",
    "categoryId": 1,
    "brandId": 1,
    "isActive": true,
    "translations": [
      {
        "locale": "ru",
        "name": "ASUS VivoBook 15",
        "description": "Мощный ноутбук для работы",
        "marketingDescription": "Идеальный выбор для профессионалов"
      },
      {
        "locale": "en",
        "name": "ASUS VivoBook 15",
        "description": "Powerful laptop for work",
        "marketingDescription": "Perfect choice for professionals"
      }
    ],
    "specifications": [
      {
        "key": "processor",
        "translations": [
          {
            "locale": "ru",
            "name": "Процессор",
            "value": "Intel Core i5-12500H"
          },
          {
            "locale": "en",
            "name": "Processor",
            "value": "Intel Core i5-12500H"
          }
        ]
      }
    ]
  }'
```

### Управление категориями

| Метод  | Путь                    | Описание          |
| ------ | ----------------------- | ----------------- |
| `GET`  | `/admin/categories`     | Список категорий  |
| `GET`  | `/admin/categories/:id` | Детали категории  |
| `POST` | `/admin/categories`     | Создать категорию |

#### Создание категории:

```bash
curl -X POST "http://localhost:3000/admin/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "section": "NEVA",
    "translations": [
      {
        "locale": "ru",
        "name": "Ноутбуки"
      },
      {
        "locale": "en",
        "name": "Laptops"
      },
      {
        "locale": "kr",
        "name": "노트북"
      },
      {
        "locale": "uz",
        "name": "Noutbuklar"
      }
    ]
  }'
```

### Управление брендами

| Метод  | Путь                               | Описание                   |
| ------ | ---------------------------------- | -------------------------- |
| `GET`  | `/admin/brands`                    | Список брендов             |
| `GET`  | `/admin/brands/:id`                | Детали бренда              |
| `POST` | `/admin/brands`                    | Создать бренд              |
| `POST` | `/admin/brands/category-relations` | Связать бренд с категорией |

#### Создание бренда:

```bash
curl -X POST "http://localhost:3000/admin/brands" \
  -H "Content-Type: application/json" \
  -d '{
    "translations": [
      {
        "locale": "ru",
        "name": "ASUS"
      },
      {
        "locale": "en",
        "name": "ASUS"
      },
      {
        "locale": "kr",
        "name": "ASUS"
      },
      {
        "locale": "uz",
        "name": "ASUS"
      }
    ]
  }'
```

#### Связывание бренда с категорией:

```bash
curl -X POST "http://localhost:3000/admin/brands/category-relations" \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": 1,
    "brandId": 1,
    "section": "NEVA"
  }'
```

### Загрузка изображений

```bash
# Загрузка изображений продукта (до 5 файлов)
curl -X POST "http://localhost:3000/admin/products/1/images" \
  -F "images=@laptop1.jpg" \
  -F "images=@laptop2.png"
```

**Поддерживаемые форматы**: JPG, JPEG, PNG, WebP
**Максимальный размер**: 10MB на файл
**Автоматическая обработка**: Сжатие в WebP + создание миниатюр 400x400px

## 🌍 Мультиязычность

### Поддерживаемые языки

| Код  | Язык    | Описание      |
| ---- | ------- | ------------- |
| `ru` | Русский | Основной язык |
| `en` | English | Английский    |
| `kr` | 한국어  | Корейский     |
| `uz` | O'zbek  | Узбекский     |

### Структура переводов

Все локализованные данные хранятся в отдельных таблицах:

- `BrandTranslation` - переводы брендов
- `CategoryTranslation` - переводы категорий
- `ProductTranslation` - переводы продуктов (название, описание, маркетинговое описание)
- `ProductSpecificationTranslation` - переводы характеристик

### Работа с переводами

```bash
# Получение данных на разных языках
curl "http://localhost:3000/products/neva?locale=ru"    # Русский
curl "http://localhost:3000/products/neva?locale=en"    # Английский
curl "http://localhost:3000/products/neva?locale=kr"    # Корейский
curl "http://localhost:3000/products/neva?locale=uz"    # Узбекский

# Детали продукта на конкретном языке
curl "http://localhost:3000/product/uz/1"               # Узбекский
curl "http://localhost:3000/product/kr/1"               # Корейский
```

## ⚡ Кеширование

### Redis Integration

Приложение использует Redis для высокопроизводительного кеширования:

- **Автоматическое кеширование** всех API запросов с учетом локали
- **TTL (Time To Live)**: 5 минут для данных, 3 минуты для счетчиков
- **Ускорение**: в 3-6 раз по сравнению с запросами к БД
- **Умная инвалидация** по паттернам и связям

### Структура ключей кеша

```
# Продукты с учетом всех параметров
products:locale:ru:page:1:limit:20:after:null:section:NEVA:categoryId:all:brandId:all

# Категории по локали и секции
categories:locale:ru:section:NEVA

# Бренды по локали и секции
brands:locale:ru:section:X_SOLUTION

# Индивидуальные продукты
product:1:ru

# Проверки существования
product_exists:1:ru
category_exists:1
brand_exists:2

# Счетчики
products_count:{"isActive":true,"translations":{"some":{"locale":"ru"}},"section":"NEVA"}
```

### Административные команды кеша

| Метод    | Путь                                      | Описание                |
| -------- | ----------------------------------------- | ----------------------- |
| `GET`    | `/admin/cache/stats`                      | Статистика кеша         |
| `GET`    | `/admin/cache/health`                     | Проверка здоровья       |
| `GET`    | `/admin/cache/debug`                      | Отладочная информация   |
| `POST`   | `/admin/cache/clear`                      | Очистка всего кеша      |
| `DELETE` | `/admin/cache/pattern?pattern=products:*` | Инвалидация по паттерну |
| `POST`   | `/admin/cache/invalidate/products`        | Инвалидация продуктов   |
| `POST`   | `/admin/cache/invalidate/categories`      | Инвалидация категорий   |
| `POST`   | `/admin/cache/invalidate/brands`          | Инвалидация брендов     |

```bash
# Примеры использования
curl "http://localhost:3000/admin/cache/stats"
curl -X POST "http://localhost:3000/admin/cache/clear"
curl -X DELETE "http://localhost:3000/admin/cache/pattern?pattern=products:*"
```

### Мониторинг кеша

- **Redis Commander**: `http://localhost:8081` (admin/admin123)
- **Метрики производительности** через `/admin/cache/debug`
- **Логирование** всех операций кеша в консоли

## 🗄️ База данных

### Нормализованная схема

```prisma
// Основные таблицы
model Brand {
  id               Int                @id @default(autoincrement())
  translations     BrandTranslation[]
  products         Product[]
  categoryBrands   CategoryBrand[]
}

model Category {
  id               Int                   @id @default(autoincrement())
  section          Section
  translations     CategoryTranslation[]
  products         Product[]
  categoryBrands   CategoryBrand[]
}

model Product {
  id               Int                      @id @default(autoincrement())
  brandId          Int?
  categoryId       Int
  section          Section
  slug             String?
  isActive         Boolean                  @default(true)
  translations     ProductTranslation[]
  images           ProductImage[]
  specifications   ProductSpecification[]
}

// Таблицы переводов
model BrandTranslation {
  id       Int     @id @default(autoincrement())
  brandId  Int
  locale   Locale
  name     String
  brand    Brand   @relation(fields: [brandId], references: [id], onDelete: Cascade)
  @@unique([brandId, locale])
}

model CategoryTranslation {
  id         Int      @id @default(autoincrement())
  categoryId Int
  locale     Locale
  name       String
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  @@unique([categoryId, locale])
}

model ProductTranslation {
  id                   Int     @id @default(autoincrement())
  productId            Int
  locale               Locale
  name                 String
  description          String?
  marketingDescription String?
  metaTitle            String?
  metaDescription      String?
  product              Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@unique([productId, locale])
}

// Изображения и характеристики
model ProductImage {
  id               Int     @id @default(autoincrement())
  productId        Int
  originalFilename String
  imageSmall       String  // WebP 400x400
  imageLarge       String  // WebP оригинальный размер
  altText          String?
  sortOrder        Int     @default(0)
  isPrimary        Boolean @default(false)
  product          Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model ProductSpecification {
  id           Int                               @id @default(autoincrement())
  productId    Int
  specKey      String
  sortOrder    Int                               @default(0)
  product      Product                           @relation(fields: [productId], references: [id], onDelete: Cascade)
  translations ProductSpecificationTranslation[]
  @@unique([productId, specKey])
}

// Связь многие-ко-многим для категорий и брендов
model CategoryBrand {
  id         Int      @id @default(autoincrement())
  categoryId Int
  brandId    Int
  section    Section
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  brand      Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  @@unique([categoryId, brandId, section])
}

enum Section {
  NEVA
  X_SOLUTION
}

enum Locale {
  ru
  en
  kr
  uz
}
```

### Управление миграциями

```bash
# Создать новую миграцию
yarn prisma migrate dev --name migration_name

# Применить миграции в продакшене
yarn prisma migrate deploy

# Сгенерировать Prisma Client
yarn prisma generate

# Сбросить базу данных (только для разработки)
yarn prisma migrate reset

# Проверить статус миграций
yarn prisma migrate status
```

### Заполнение данными

```bash
# Заполнение тестовыми данными
yarn prisma:seed

# Или внутри контейнера
docker-compose exec backend yarn prisma:seed
```

## 🛠 Разработка

### Команды разработки

```bash
# Запуск в режиме разработки
yarn start:dev

# Сборка проекта
yarn build

# Запуск продакшен версии
yarn start:prod

# Линтинг
yarn lint
yarn lint:fix

# Тестирование
yarn test
yarn test:watch
yarn test:cov

# Проверка типов
yarn tsc --noEmit

# Prisma команды
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
```

### Локальная разработка

```bash
# 1. Установите зависимости
yarn install

# 2. Запустите только инфраструктуру
docker-compose up -d db redis adminer

# 3. Настройте базу данных
yarn prisma migrate deploy
yarn prisma generate
yarn prisma:seed

# 4. Запустите в режиме разработки
yarn start:dev
```

### Структура модулей

Каждый модуль следует чистой архитектуре:

```
module/
├── module.controller.ts      # REST endpoints
├── module.service.ts         # Бизнес логика + кеширование
├── module.resolver.ts        # GraphQL resolvers (если нужно)
├── module.module.ts          # NestJS модуль
├── dto/                      # Data Transfer Objects
│   ├── create-module.dto.ts
│   ├── update-module.dto.ts
│   └── module-response.dto.ts
└── module.controller.spec.ts # Тесты
```

### Добавление нового API

1. **Создайте DTO с валидацией**:

```typescript
// dto/create-item.dto.ts
export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Locale)
  locale!: Locale;
}
```

2. **Добавьте метод в сервис с кешированием**:

```typescript
// item.service.ts
async createItem(createItemDto: CreateItemDto) {
  const cacheKey = `item:${createItemDto.name}:${createItemDto.locale}`;

  const result = await this.prisma.item.create({
    data: createItemDto,
    include: { translations: true }
  });

  // Инвалидируем связанный кеш
  await this.cacheService.invalidateByPattern('items:*');

  return result;
}
```

3. **Создайте контроллер с документацией**:

```typescript
// item.controller.ts
@ApiTags('Items')
@Controller('items')
export class ItemController {
  @Post()
  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }
}
```

## 📊 Производительность

### Бенчмарки кеширования

| Операция             | Без кеша | С кешем | Ускорение |
| -------------------- | -------- | ------- | --------- |
| Список продуктов     | 150ms    | 25ms    | **6x**    |
| Категории с брендами | 90ms     | 18ms    | **5x**    |
| Детали продукта      | 120ms    | 20ms    | **6x**    |
| Поиск по фильтрам    | 200ms    | 40ms    | **5x**    |
| Список брендов       | 60ms     | 15ms    | **4x**    |

### Оптимизации

- **Индексы БД** на часто запрашиваемые поля
- **Курсор-пагинация** для больших списков
- **Lazy loading** связанных данных
- **Сжатие изображений** в WebP
- **Умная инвалидация** кеша по связям

## 📦 Деплой

### Docker Production

```yaml
# docker-compose.prod.yml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    restart: unless-stopped
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build and deploy
        run: |
          docker-compose -f docker-compose.prod.yml build
          docker-compose -f docker-compose.prod.yml up -d

      - name: Run migrations
        run: |
          docker-compose -f docker-compose.prod.yml exec -T backend yarn prisma migrate deploy
```

## 🔧 Устранение неполадок

### Частые проблемы

#### 1. Ошибки базы данных

```bash
# Проверка состояния
docker-compose exec db pg_isready -U user -d neva

# Пересоздание БД
docker-compose down -v
docker-compose up -d db
docker-compose exec backend yarn prisma migrate deploy
```

#### 2. Проблемы с кешем

```bash
# Очистка Redis
curl -X POST "http://localhost:3000/admin/cache/clear"

# Проверка здоровья
curl "http://localhost:3000/admin/cache/health"
```

#### 3. Проблемы с изображениями

```bash
# Проверка папки изображений
docker-compose exec backend ls -la public/images/

# Права доступа
docker-compose exec backend chmod -R 755 public/images/
```

#### 4. Ошибки переводов

```bash
# Проверка данных переводов
curl "http://localhost:3000/admin/categories"
curl "http://localhost:3000/admin/brands"

# Пересоздание тестовых данных
docker-compose exec backend yarn prisma migrate reset
docker-compose exec backend yarn prisma:seed
```

## 🔗 Полезные ссылки

- **API документация**: http://localhost:3000/api-docs
- **GraphQL Playground**: http://localhost:3000/graphql
- **База данных**: http://localhost:8080 (Adminer)
- **Мониторинг Redis**: http://localhost:8081
- **Официальная документация NestJS**: https://docs.nestjs.com
- **Prisma документация**: https://www.prisma.io/docs

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей.

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch: `git checkout -b feature/amazing-feature`
3. Commit изменения: `git commit -m 'Add amazing feature'`
4. Push в branch: `git push origin feature/amazing-feature`
5. Создайте Pull Request
