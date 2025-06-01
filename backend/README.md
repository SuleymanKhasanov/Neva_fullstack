# Neva Backend API

Высокопроизводительный backend API для каталога продуктов Neva с интеграцией Redis кеширования, построенный на NestJS.

## 🚀 Особенности

- **REST & GraphQL API** - Гибкие возможности запросов данных
- **Redis Кеширование** - Ускорение API в 2-6 раз
- **Многоязычность** - Поддержка ru, en, kr, uz локалей
- **Автодокументация** - Swagger UI и GraphQL Playground
- **Типобезопасность** - TypeScript + Prisma ORM
- **Административная панель** - Управление кешем и мониторинг
- **Контейнеризация** - Docker setup для разработки и продакшена

## 📋 Содержание

- [Технологии](#технологии)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [API Документация](#api-документация)
- [Кеширование](#кеширование)
- [База данных](#база-данных)
- [Разработка](#разработка)
- [Конфигурация](#конфигурация)
- [Деплой](#деплой)

## 🛠 Технологии

| Категория | Технология | Версия |
|-----------|------------|---------|
| **Framework** | NestJS | ^11.1.0 |
| **Language** | TypeScript | ^5.7.2 |
| **Database** | PostgreSQL | 15 |
| **ORM** | Prisma | ^6.7.0 |
| **Cache** | Redis | 7 |
| **API** | REST + GraphQL | - |
| **Documentation** | Swagger + Apollo Studio | - |
| **Containerization** | Docker & Docker Compose | - |

## 🚀 Быстрый старт

### Предварительные требования

- Docker & Docker Compose
- Node.js 20+ (для локальной разработки)
- Yarn (рекомендуется)

### Установка

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
# Redis Commander: http://localhost:8081 (admin/admin123)
# Adminer: http://localhost:8080
```

### Локальная разработка

```bash
# 1. Установите зависимости
yarn install

# 2. Запустите инфраструктуру (PostgreSQL + Redis)
docker-compose up -d db redis

# 3. Примените миграции
yarn prisma migrate deploy
yarn prisma generate

# 4. Заполните тестовыми данными
yarn ts-node scripts/mergeAndProcessData.ts

# 5. Запустите в режиме разработки
yarn start:dev
```

## 📁 Структура проекта

```
backend/
├── prisma/                    # Схема базы данных и миграции
│   ├── schema.prisma         # Prisma схема
│   ├── migrations/           # Миграции базы данных
│   └── prisma.service.ts     # Prisma сервис
├── src/
│   ├── common/               # Общие модули
│   │   ├── cache.service.ts  # Сервис кеширования
│   │   └── cache.module.ts   # Модуль кеширования
│   ├── admin/                # Административные эндпоинты
│   │   └── cache-admin.controller.ts
│   ├── products/             # Модуль продуктов
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   ├── products.resolver.ts
│   │   └── dto/              # Data Transfer Objects
│   ├── categories/           # Модуль категорий
│   ├── brands/               # Модуль брендов
│   ├── app.module.ts         # Главный модуль приложения
│   └── main.ts               # Точка входа
├── scripts/                  # Скрипты для работы с данными
├── public/                   # Статические файлы (изображения)
├── data/                     # Исходные данные для импорта
└── docker-compose.yml        # Docker конфигурация
```

## 📚 API Документация

### REST API

API доступно по адресу: `http://localhost:3000`

**Swagger UI**: `http://localhost:3000/api-docs`

#### Основные эндпоинты:

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/products/all` | Все продукты с пагинацией |
| `GET` | `/products/neva` | Продукты секции NEVA |
| `GET` | `/products/x-solution` | Продукты секции X-SOLUTION |
| `GET` | `/categories/all` | Все категории с брендами |
| `GET` | `/brands/all` | Все бренды |

#### Параметры запросов:

```bash
# Продукты с фильтрацией
GET /products/all?locale=ru&page=1&categoryId=1&brandId=2

# Категории по секции
GET /categories/neva?locale=en

# Бренды по локали
GET /brands/all?locale=uz
```

### GraphQL API

**GraphQL Playground**: `http://localhost:3000/graphql`

#### Примеры запросов:

```graphql
# Получить продукты
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
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}

# Получить категории
query GetCategories($locale: String!) {
  categories(locale: $locale) {
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
```

## ⚡ Кеширование

### Redis Integration

Приложение использует Redis для высокопроизводительного кеширования:

- **Автоматическое кеширование** всех API запросов
- **TTL (Time To Live)**: 5 минут для большинства данных
- **Ускорение**: в 2-6 раз по сравнению с запросами к БД
- **Умная инвалидация** по паттернам

### Административные команды

```bash
# Статистика кеша
curl http://localhost:3000/admin/cache/stats

# Проверка здоровья
curl http://localhost:3000/admin/cache/health

# Очистка всего кеша
curl -X POST http://localhost:3000/admin/cache/clear

# Инвалидация по паттерну
curl -X DELETE "http://localhost:3000/admin/cache/pattern?pattern=products:*"

# Инвалидация продуктов
curl -X POST http://localhost:3000/admin/cache/invalidate/products

# Инвалидация категорий
curl -X POST http://localhost:3000/admin/cache/invalidate/categories
```

### Структура ключей кеша

```
products:locale:ru:page:1:limit:20:section:NEVA:categoryId:all:brandId:all
categories:locale:ru:section:all
brands:locale:ru:section:NEVA
category_exists:1
brand_exists:2
products_count:{"locale":"ru","section":"NEVA"}
```

### Мониторинг

- **Redis Commander**: `http://localhost:8081` (admin/admin123)
- **Метрики производительности** через `/admin/cache/debug`

## 🗄️ База данных

### Схема данных

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  brandId     Int?
  categoryId  Int
  locale      String
  name        String
  image       String?
  fullImage   String?
  description String
  section     Section
  brand       Brand?   @relation(fields: [brandId], references: [id])
  category    Category @relation(fields: [categoryId], references: [id])
}

model Brand {
  id         Int       @id @default(autoincrement())
  categoryId Int
  name       String
  locale     String
  section    Section
  category   Category  @relation(fields: [categoryId], references: [id])
  products   Product[]
  @@unique([name, locale])
}

model Category {
  id       Int       @id @default(autoincrement())
  locale   String
  name     String
  section  Section
  brands   Brand[]
  products Product[]
}

enum Section {
  NEVA
  X_SOLUTION
}
```

### Миграции

```bash
# Создать новую миграцию
yarn prisma migrate dev --name migration_name

# Применить миграции
yarn prisma migrate deploy

# Сгенерировать Prisma Client
yarn prisma generate

# Сбросить базу данных
yarn prisma migrate reset
```

### Заполнение данными

```bash
# Импорт данных из JSON файлов
yarn ts-node scripts/mergeAndProcessData.ts

# Обработка изображений и создание миниатюр
# Автоматически при импорте данных
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
```

### Структура модулей

Каждый модуль следует структуре:

```
module/
├── module.controller.ts      # REST endpoints
├── module.service.ts         # Бизнес логика
├── module.resolver.ts        # GraphQL resolvers
├── module.module.ts          # NestJS модуль
├── dto/                      # Data Transfer Objects
│   ├── create-module.dto.ts
│   ├── update-module.dto.ts
│   └── module-response.dto.ts
└── entities/                 # TypeScript типы
    └── module.entity.ts
```

### Добавление новых эндпоинтов

1. **Создайте DTO**:
```typescript
// dto/create-item.dto.ts
export class CreateItemDto {
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  description?: string;
}
```

2. **Добавьте метод в сервис**:
```typescript
// item.service.ts
async createItem(createItemDto: CreateItemDto) {
  return this.cacheService.getOrSet(
    `item:${createItemDto.name}`,
    () => this.prisma.item.create({ data: createItemDto }),
    { ttl: 300 }
  );
}
```

3. **Создайте контроллер**:
```typescript
// item.controller.ts
@Post()
@ApiOperation({ summary: 'Create new item' })
async create(@Body() createItemDto: CreateItemDto) {
  return this.itemService.createItem(createItemDto);
}
```

## ⚙️ Конфигурация

### Переменные окружения

```bash
# База данных
DATABASE_URL=postgresql://user:password@db:5432/neva

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Кеширование
CACHE_TTL=300
CACHE_MAX_ITEMS=2000

# Приложение
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
PORT=3000

# Prisma
PRISMA_CLIENT_OUTPUT=/app/backend/generated/prisma/client
```

### Docker конфигурация

#### Development
```bash
# Запуск для разработки
docker-compose up

# Только инфраструктура
docker-compose up -d db redis
```

#### Production
```bash
# Билд продакшен образов
docker-compose -f docker-compose.prod.yml build

# Запуск в продакшене
docker-compose -f docker-compose.prod.yml up -d
```

## 📦 Деплой

### Docker Production

1. **Создайте production docker-compose.yml**:
```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_HOST=${REDIS_HOST}
    restart: unless-stopped
```

2. **Настройте CI/CD**:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          docker-compose -f docker-compose.prod.yml up -d --build
```

### Мониторинг в продакшене

```bash
# Логи
docker-compose logs -f backend

# Метрики контейнеров
docker stats

# Состояние Redis
docker-compose exec redis redis-cli info

# Состояние PostgreSQL
docker-compose exec db pg_isready
```

## 🔧 Устранение неполадок

### Часто встречающиеся проблемы

#### 1. Ошибки подключения к базе данных
```bash
# Проверьте состояние PostgreSQL
docker-compose exec db pg_isready -U user -d neva

# Пересоздайте базу данных
docker-compose down
docker-compose up db
yarn prisma migrate reset
```

#### 2. Проблемы с Redis
```bash
# Проверьте подключение к Redis
docker-compose exec redis redis-cli ping

# Очистите Redis
docker-compose exec redis redis-cli flushall

# Перезапустите Redis
docker-compose restart redis
```

#### 3. Ошибки Prisma
```bash
# Пересгенерируйте Prisma Client
yarn prisma generate

# Проверьте статус миграций
yarn prisma migrate status

# Сбросите базу данных
yarn prisma migrate reset
```

#### 4. Проблемы с кешированием
```bash
# Проверьте статус кеша
curl http://localhost:3000/admin/cache/health

# Очистите кеш
curl -X POST http://localhost:3000/admin/cache/clear

# Проверьте логи кеширования
docker-compose logs backend | grep -E "(CACHE|Cache)"
```

## 📊 Производительность

### Бенчмарки

| Операция | Без кеша | С кешем | Ускорение |
|----------|----------|---------|-----------|
| Получение продуктов | 120ms | 20ms | **6x** |
| Список категорий | 80ms | 15ms | **5.3x** |
| Список брендов | 45ms | 12ms | **3.8x** |
| Поиск по фильтрам | 200ms | 35ms | **5.7x** |

### Оптимизация

1. **Используйте индексы в базе данных**
2. **Настройте TTL кеша в зависимости от данных**
3. **Мониторьте hit/miss ratio кеша**
4. **Оптимизируйте размер возвращаемых данных**

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей.

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch: `git checkout -b feature/amazing-feature`
3. Commit изменения: `git commit -m 'Add amazing feature'`
4. Push в branch: `git push origin feature/amazing-feature`
5. Создайте Pull Request

## 📞 Поддержка

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [API Docs](http://localhost:3000/api-docs)
- **Email**: support@neva.com

---

**Сделано с ❤️ командой Neva**