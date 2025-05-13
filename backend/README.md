# Neva API

Neva API — это RESTful бэкенд для управления продуктами с поддержкой мультиязычности (локали: `ru`, `en`, `kr`, `uz`). API предоставляет эндпоинты для получения данных о продуктах, разделённых по секциям (`NEVA` и `X_SOLUTION`), с пагинацией и документацией через Swagger.

Проект построен на **NestJS** с использованием **Prisma** для работы с PostgreSQL и развернут в **Docker** для упрощения разработки и деплоя.

## Основные возможности

- Получение всех продуктов с фильтрацией по локали и пагинацией (`/products/all`).
- Получение продуктов по секциям `NEVA` (`/products/neva`) и `X_SOLUTION` (`/products/x-solution`).
- Поддержка мультиязычности (`ru`, `en`, `kr`, `uz`).
- Автоматическая загрузка данных из JSON-файлов в БД через скрипт `mergeAndProcessData.ts`.
- Интерактивная документация API через Swagger (`/api`).
- Развёртывание в Docker с PostgreSQL и Adminer для управления БД.

## Технологии

- **NestJS**: Фреймворк для создания масштабируемых серверных приложений.
- **Prisma**: ORM для работы с PostgreSQL.
- **PostgreSQL**: База данных для хранения продуктов, брендов и категорий.
- **Docker**: Контейнеризация для упрощения развёртывания.
- **Swagger**: Документация и тестирование API.
- **TypeScript**: Типизация для надёжного кода.
- **Yarn Workspaces**: Управление монорепозиторием (`backend`, `frontend`).

## Структура проекта

```
neva_fullstack/
├── backend/                  # Бэкенд (NestJS)
│   ├── src/                  # Исходный код
│   │   ├── products/         # Модуль продуктов (контроллер, сервис, DTO)
│   │   ├── prisma/           # Prisma сервис и конфигурация
│   │   └── app.module.ts     # Главный модуль приложения
│   ├── scripts/              # Скрипты для обработки данных
│   │   └── mergeAndProcessData.ts  # Скрипт загрузки данных из JSON
│   ├── data/                 # JSON-файлы с данными (categories_*.json, products_*.json)
│   ├── prisma/               # Prisma схема и миграции
│   ├── Dockerfile            # Конфигурация Docker для бэкенда
│   └── package.json          # Зависимости бэкенда
├── frontend/                 # Фронтенд (пока не реализован)
├── docker-compose.yml        # Конфигурация Docker Compose
├── package.json              # Корневой package.json (Yarn Workspaces)
└── README.md                 # Документация проекта
```

## Установка и запуск

### Предварительные требования

- **Node.js**: v18.x
- **Yarn**: v1.x
- **Docker**: Для контейнеризации
- **PostgreSQL**: Для локального запуска без Docker
- **Git**: Для клонирования репозитория

### Локальный запуск

1. **Клонируй репозиторий**:

   ```bash
   git clone <repository-url>
   cd neva_fullstack
   ```

2. **Установи зависимости**:

   ```bash
   yarn install
   ```

3. **Настрой PostgreSQL**:

   - Убедись, что PostgreSQL запущен и доступен.
   - Создай базу данных:

     ```bash
     createdb -U user neva
     ```

4. **Настрой `.env`**:

   Создай файл `backend/.env`:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/neva"
   PRISMA_CLIENT_OUTPUT="./generated/prisma/client"
   ```

   Замени `user` и `password` на свои учетные данные PostgreSQL.

5. **Сгенерируй Prisma Client**:

   ```bash
   cd backend
   npx prisma generate
   ```

6. **Загрузи данные в БД**:

   ```bash
   yarn ts-node scripts/mergeAndProcessData.ts
   ```

   Это загрузит данные из `backend/data/*.json` в базу.

7. **Запусти сервер**:

   ```bash
   yarn workspace backend start:dev
   ```

8. **Открой API**:
   - API: `http://localhost:3000`
   - Swagger: `http://localhost:3000/api`

### Запуск в Docker

1. **Клонируй репозиторий** (если ещё не сделал):

   ```bash
   git clone <repository-url>
   cd neva_fullstack
   ```

2. **Убедись, что Docker установлен и работает**:

   ```bash
   docker --version
   ```

3. **Настрой `.env`**:

   Убедись, что `backend/.env` содержит:

   ```env
   DATABASE_URL="postgresql://user:password@db:5432/neva"
   PRISMA_CLIENT_OUTPUT="/app/backend/generated/prisma/client"
   ```

4. **Запусти Docker Compose**:

   ```bash
   docker-compose up --build
   ```

   Это запустит:
   - Бэкенд (NestJS) на `http://localhost:3000`.
   - PostgreSQL на `5432` (внутри сети Docker).
   - Adminer на `http://localhost:8080` для управления БД.

5. **Открой API**:
   - API: `http://localhost:3000`
   - Swagger: `http://localhost:3000/api`
   - Adminer: `http://localhost:8080` (логин: `user`, пароль: `password`, база: `neva`).

## Эндпоинты API

API предоставляет следующие эндпоинты, задокументированные в Swagger (`http://localhost:3000/api`):

| Метод | Эндпоинт                | Описание                              | Параметры                                   |
|-------|-------------------------|---------------------------------------|---------------------------------------------|
| GET   | `/products/all`         | Получить все продукты с пагинацией    | `locale` (ru, en, kr, uz), `page`, `limit` (опционально, по умолчанию 20) |
| GET   | `/products/neva`        | Получить продукты секции NEVA         | `locale` (ru, en, kr, uz), `page`, `limit` (опционально, по умолчанию 20) |
| GET   | `/products/x-solution`  | Получить продукты секции X_SOLUTION   | `locale` (ru, en, kr, uz), `page`, `limit` (опционально, по умолчанию 20) |

### Пример запроса

```bash
curl "http://localhost:3000/products/all?locale=uz&page=1&limit=10"
```

### Пример ответа

```json
{
  "data": [
    {
      "id": 1099,
      "name": "ASUS Vivobook 15",
      "image": "/images/product_4_1747056565657.webp",
      "description": "Intel Core i5-1235U/ DDR4 8GB/ SSD 512GB/ 15.6» FHD IPS/ Intel UHD Graphics/ NoOS/ RU",
      "section": "NEVA",
      "locale": "uz",
      "brand": {
        "id": 130,
        "name": "Noutbuklar",
        "locale": "uz",
        "section": "NEVA"
      },
      "category": {
        "id": 170,
        "name": "Asus, Lenovo, Acer, HP",
        "locale": "uz",
        "section": "NEVA"
      }
    }
  ],
  "meta": {
    "total": 366,
    "page": 1,
    "limit": 10,
    "totalPages": 37
  }
}
```

## Документация Swagger

Swagger UI доступен по адресу:

```
http://localhost:3000/api
```

Swagger предоставляет:
- Интерактивный интерфейс для тестирования эндпоинтов.
- Описание параметров (`locale`, `page`, `limit`).
- Примеры ответов и ошибок (например, 400 для неверного `locale`).

## Разработка

### Полезные команды

- **Локальный запуск бэкенда**:

  ```bash
  cd backend
  yarn start:dev
  ```

- **Генерация Prisma Client**:

  ```bash
  cd backend
  npx prisma generate
  ```

- **Запуск скрипта загрузки данных**:

  ```bash
  cd backend
  yarn ts-node scripts/mergeAndProcessData.ts
  ```

- **Линтинг и форматирование**:

  ```bash
  yarn lint
  yarn format
  ```

- **Запуск Docker**:

  ```bash
  docker-compose up --build
  ```

### Структура данных

База данных (PostgreSQL) содержит следующие таблицы:

- **Product**: Продукты с полями `id`, `brandId`, `categoryId`, `locale`, `name`, `image`, `description`, `section`.
- **Brand**: Бренды с полями `id`, `categoryId`, `name`, `locale`, `section`.
- **Category**: Категории с полями `id`, `locale`, `name`, `section`.

Схема определена в `backend/prisma/schema.prisma`.

## Продакшен

Для продакшен-сборки:

1. Скомпилируй проект:

   ```bash
   cd backend
   yarn build
   ```

2. Запусти продакшен:

   ```bash
   yarn start:prod
   ```

3. Для Docker используй продакшен-образ:

   Обнови `Dockerfile` для продакшена:

   ```dockerfile
   FROM node:18

   WORKDIR /app

   COPY package.json yarn.lock ./
   COPY backend/package.json ./backend/package.json
   RUN yarn install --frozen-lockfile --production

   COPY . .
   WORKDIR /app/backend
   RUN yarn build
   RUN npx prisma generate
   RUN mkdir -p /app/node_modules/.prisma/client && \
       cp -r /app/backend/generated/prisma/client/* /app/node_modules/.prisma/client/

   EXPOSE 3000

   CMD ["node", "dist/main"]
   ```

4. Обнови `docker-compose.yml` для продакшена, если нужно.

## Устранение неполадок

- **Ошибка Prisma Client**:

  ```bash
  docker exec <backend_container_name> npx prisma generate
  ```

- **Отсутствие данных в БД**:

  Проверь `backend/data/*.json` и запусти:

  ```bash
  docker exec <backend_container_name> yarn ts-node /app/backend/scripts/mergeAndProcessData.ts
  ```

- **Порт занят**:

  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

- **Swagger UI не работает**:

  Проверь `main.ts` и зависимости:

  ```bash
  docker exec <backend_container_name> yarn list --pattern @nestjs/swagger
  ```

## Контрибьютинг

1. Форкни репозиторий.
2. Создай ветку: `git checkout -b feature/имя-фичи`.
3. Внеси изменения и закоммить: `git commit -m "Добавлена фича"`.
4. Запушь: `git push origin feature/имя-фичи`.
5. Создай Pull Request.

## Лицензия

MIT License

## Контакты

- Email: <your-email>
- GitHub: <your-github>