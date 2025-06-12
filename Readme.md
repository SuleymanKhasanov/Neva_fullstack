# 🏢 Neva - Современная платформа каталога продуктов

Полноценный монорепозиторий с фронтенд и бэкенд приложениями для каталога продуктов компании Neva с мультиязычной поддержкой, защищенной админ панелью и высокопроизводительным API.

## 🎯 Обзор проекта

**Neva** - это современное веб-приложение для каталога продуктов с административной панелью, построенное как монорепозиторий с использованием передовых технологий и архитектурных решений.

### Основные возможности

- 🌐 **Мультиязычная поддержка** - 4 языка (RU, EN, UZ, KR) с полной локализацией
- 🔐 **JWT авторизация** - Безопасная защита админ панели без базы пользователей  
- 📱 **Адаптивный дизайн** - Полная поддержка мобильных устройств и планшетов
- ⚡ **Высокая производительность** - Redis кеширование с ускорением API в 3-6 раз
- 🎨 **Современный UI/UX** - Темная/светлая тема, анимации, интуитивная навигация
- 🔍 **Интеллектуальный поиск** - С горячими клавишами и автокомплитом
- 📊 **REST & GraphQL API** - Гибкие возможности запросов данных
- 🖼️ **Обработка изображений** - Автоматическое сжатие в WebP с созданием миниатюр

## 🏗 Архитектура монорепозитория

```
neva/
├── 📁 frontend/              # Next.js 15 приложение
│   ├── src/
│   │   ├── app/             # App Router с локализацией
│   │   ├── entities/        # Переиспользуемые компоненты  
│   │   ├── features/        # Функциональности
│   │   ├── widgets/         # Составные компоненты
│   │   ├── pages/           # Страницы приложения
│   │   └── shared/          # Общие ресурсы
│   └── README.md            # Детальная документация фронтенда
├── 📁 backend/               # NestJS API сервер
│   ├── src/
│   │   ├── auth/            # JWT авторизация
│   │   ├── admin/           # Защищенная админ панель
│   │   ├── products/        # Публичные API продуктов
│   │   ├── categories/      # Модуль категорий
│   │   └── brands/          # Модуль брендов
│   ├── prisma/              # Схема БД и миграции
│   └── README.md            # Детальная документация бэкенда
├── 📁 scripts/              # Общие скрипты
├── docker-compose.yml       # Docker конфигурация
├── package.json             # Workspaces конфигурация
└── README.md               # Этот файл
```

## 🛠 Технологический стек

### Frontend (Next.js)
| Технология | Версия | Назначение |
|------------|--------|------------|
| **Next.js** | 15.2.4 | React фреймворк с App Router |
| **TypeScript** | 5.6.3 | Типобезопасность |
| **Apollo Client** | 3.13.8 | GraphQL клиент |
| **Framer Motion** | 12.12.1 | Анимации |
| **Next-intl** | 4.0.2 | Интернационализация |
| **Zustand** | 5.0.5 | Управление состоянием |

### Backend (NestJS)
| Технология | Версия | Назначение |
|------------|--------|------------|
| **NestJS** | 11.1.0 | Node.js фреймворк |
| **TypeScript** | 5.7.2 | Типобезопасность |
| **PostgreSQL** | 15 | Основная база данных |
| **Prisma** | 6.7.0 | ORM и миграции |
| **Redis** | 7 | Кеширование |
| **JWT + Passport** | 10.2.0 | Авторизация |

### Infrastructure
- **Docker** & **Docker Compose** - Контейнеризация
- **Adminer** - Веб-интерфейс для PostgreSQL
- **Redis Commander** - Мониторинг Redis

## 🚀 Быстрый старт

### Предварительные требования

- **Docker** & **Docker Compose**
- **Node.js** 20+ (для локальной разработки)
- **Yarn** (рекомендуется)

### Установка и запуск

```bash
# 1. Клонируйте репозиторий
git clone <repository-url>
cd neva

# 2. Настройте переменные окружения для бэкенда
cp backend/.env.example backend/.env

# 3. Настройте JWT авторизацию в backend/.env
# JWT_SECRET="neva-super-secret-jwt-key-2024"
# ADMIN_USERNAME="admin"  
# ADMIN_PASSWORD="admin123"

# 4. Запустите весь стек через Docker
docker-compose up --build

# 5. Заполните тестовыми данными (после запуска контейнеров)
docker-compose exec backend yarn prisma:seed
```

### Доступные сервисы

| Сервис | URL | Описание |
|--------|-----|----------|
| **Frontend** | http://localhost:3001 | Next.js приложение |
| **Backend API** | http://localhost:3000 | NestJS API |
| **Swagger Docs** | http://localhost:3000/api-docs | API документация |
| **GraphQL Playground** | http://localhost:3000/graphql | GraphQL интерфейс |
| **Adminer** | http://localhost:8080 | База данных (user/password/neva) |
| **Redis Commander** | http://localhost:8081 | Мониторинг Redis (admin/admin123) |

## 🔐 Система авторизации

### Доступ к админ панели

Используйте данные по умолчанию для входа в систему:

```bash
# Логин через API
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Или через Swagger UI: http://localhost:3000/api-docs
# 1. Найдите раздел "Authentication" 
# 2. Используйте POST /auth/login
# 3. Скопируйте access_token и нажмите "Authorize"
```

### Защищенные функции

- **Управление продуктами** - Создание, редактирование, удаление
- **Управление категориями** - Организация каталога
- **Управление брендами** - Связывание с категориями
- **Загрузка изображений** - Автоматическая обработка в WebP
- **Управление кешем** - Мониторинг и очистка

## 🌍 Мультиязычность

### Поддерживаемые языки

| Язык | Код | URL пример | Статус |
|------|-----|------------|--------|
| Русский | `ru` | `/ru/` | ✅ Полностью |
| Английский | `en` | `/en/` | ✅ Полностью |
| Узбекский | `uz` | `/uz/` | ✅ Полностью |
| Корейский | `kr` | `/kr/` | ✅ Полностью |

### Примеры локализованных URL

```bash
# Главная страница каталога
http://localhost:3001/ru          # Русский
http://localhost:3001/en          # Английский  
http://localhost:3001/uz          # Узбекский
http://localhost:3001/kr          # Корейский

# Детальная страница продукта  
http://localhost:3001/ru/product/1/asus-vivobook-15
http://localhost:3001/en/product/1/asus-vivobook-15
```

## 💻 Разработка

### Команды для всего проекта

```bash
# Установка зависимостей для всех workspace
yarn install

# Форматирование кода
yarn format

# Проверка линтинга
yarn lint
yarn lint:fix

# Запуск отдельных сервисов
yarn backend:dev      # Только бэкенд
yarn frontend:dev     # Только фронтенд
```

### Работа с отдельными частями

```bash
# Frontend команды
cd frontend
yarn dev              # Запуск фронтенда на :3001  
yarn build            # Сборка для продакшена
yarn lint             # ESLint проверка

# Backend команды  
cd backend
yarn start:dev        # Запуск бэкенда на :3000
yarn prisma:seed      # Заполнение тестовыми данными
yarn prisma:studio    # Prisma Studio для БД
```

### Структура feature-based development

Проект использует **Feature-Sliced Design** для фронтенда и модульную архитектуру NestJS для бэкенда:

```bash
# Добавление новой функциональности во фронтенд
frontend/src/features/NewFeature/
├── ui/                    # Компоненты интерфейса
├── model/                 # Бизнес логика  
├── lib/                   # Утилиты
└── index.ts              # Экспорты

# Добавление нового модуля в бэкенд
backend/src/new-module/
├── new-module.controller.ts   # REST endpoints
├── new-module.service.ts      # Бизнес логика
├── new-module.module.ts       # NestJS модуль
└── dto/                       # Data Transfer Objects
```

## 📊 Производительность и мониторинг

### Кеширование (Redis)

| Операция | Без кеша | С кешем | Ускорение |
|----------|----------|---------|-----------|
| Список продуктов | 150ms | 25ms | **6x** |
| Категории с брендами | 90ms | 18ms | **5x** |
| Детальная страница | 120ms | 20ms | **6x** |

### SEO оптимизация

- **ISR (Incremental Static Regeneration)** для статических страниц
- **Структурированные данные JSON-LD** для поисковиков
- **Динамические метатеги** для каждого продукта
- **Sitemap генерация** для всех языков
- **Каноничные URL** для предотвращения дублирования

### Мониторинг

```bash
# Проверка здоровья сервисов
curl http://localhost:3000/        # Backend health
curl http://localhost:3001/        # Frontend health

# Мониторинг кеша (требует авторизации)
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/admin/cache/stats
```

## 📚 Документация

### Детальная документация

- **[Frontend README](frontend/README.md)** - Подробное описание Next.js приложения
- **[Backend README](backend/README.md)** - Полная документация NestJS API

### API документация

- **Swagger UI**: http://localhost:3000/api-docs (с авторизацией)
- **GraphQL Playground**: http://localhost:3000/graphql  

### Примеры API запросов

```bash
# Публичные API (без авторизации)
curl "http://localhost:3000/products/neva?locale=ru&page=1"
curl "http://localhost:3000/product/ru/1"
curl "http://localhost:3000/categories/all?locale=en"

# Защищенные API (требуют JWT токен)
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/admin/products"
```

## 🐳 Docker разработка

### Полный стек

```bash
# Запуск всех сервисов
docker-compose up --build

# Только инфраструктура (БД + Redis)  
docker-compose up -d db redis adminer

# С мониторингом Redis
docker-compose --profile tools up -d
```

### Отладка контейнеров

```bash
# Логи сервисов
docker-compose logs backend    # Бэкенд логи
docker-compose logs frontend   # Фронтенд логи  
docker-compose logs db         # PostgreSQL логи

# Выполнение команд в контейнерах
docker-compose exec backend yarn prisma:seed
docker-compose exec backend yarn prisma:studio
```

## 🧪 Тестирование

### Быстрая проверка системы

```bash
# 1. Проверка API
curl http://localhost:3000/

# 2. Проверка публичных данных
curl "http://localhost:3000/products/neva?locale=ru" 

# 3. Тест авторизации
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# 4. Проверка фронтенда
curl http://localhost:3001/
```

### Автоматическое тестирование

```bash
# Фронтенд тесты
cd frontend && yarn test

# Бэкенд тесты  
cd backend && yarn test

# E2E тесты (если настроены)
cd frontend && yarn test:e2e
```

## 🔧 Устранение неполадок

### Частые проблемы

#### 1. Ошибки Docker

```bash
# Пересборка контейнеров
docker-compose down -v
docker-compose up --build

# Очистка Docker кеша
docker system prune -a
```

#### 2. Ошибки базы данных

```bash
# Проверка состояния PostgreSQL
docker-compose exec db pg_isready -U user -d neva

# Пересоздание БД с миграциями
docker-compose exec backend yarn prisma migrate reset
docker-compose exec backend yarn prisma:seed
```

#### 3. Проблемы с авторизацией

```bash
# Проверка переменных окружения
docker-compose exec backend env | grep -E "(JWT|ADMIN)"

# Тест через Swagger
# Откройте http://localhost:3000/api-docs
# Используйте POST /auth/login с admin/admin123
```

## 🚢 Деплой в продакшен

### Переменные окружения

Обязательно измените следующие настройки для продакшена:

```bash
# backend/.env.production
JWT_SECRET="ваш-сложный-уникальный-ключ-минимум-32-символа"
JWT_REFRESH_SECRET="ваш-сложный-refresh-ключ-минимум-32-символа" 
ADMIN_USERNAME="ваш_админ_логин"
ADMIN_PASSWORD="ваш_сложный_пароль"
DATABASE_URL="postgresql://user:password@host:5432/neva"
REDIS_HOST="redis.example.com"
```

### Docker продакшен

```bash
# Сборка для продакшена
docker-compose -f docker-compose.prod.yml build

# Запуск
docker-compose -f docker-compose.prod.yml up -d

# Миграции
docker-compose -f docker-compose.prod.yml exec backend yarn prisma migrate deploy
```

## 🤝 Вклад в проект

### Git Flow

```bash
# Feature branch
git checkout -b feature/amazing-feature
git commit -m "feat [Neva-123]: Add amazing feature"  
git push origin feature/amazing-feature

# Bug fix  
git checkout -b bugfix/fix-issue
git commit -m "fix [Neva-124]: Fix critical issue"
```

### Коммиты

Используйте conventional commits с номерами задач:

```bash
feat [Neva-123]: Add user authentication
fix [Neva-124]: Resolve mobile navigation issue  
docs [Neva-125]: Update API documentation
refactor [Neva-126]: Improve performance
```

### Code Review checklist

- [ ] Функциональность работает корректно
- [ ] TypeScript типы корректны
- [ ] Тесты добавлены/обновлены  
- [ ] Документация обновлена
- [ ] Код соответствует стандартам проекта
- [ ] Нет проблем с производительностью
- [ ] Соблюдены принципы безопасности

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей.

---

## 🔗 Полезные ссылки

- **[Frontend документация](frontend/README.md)** - Детальное описание Next.js части
- **[Backend документация](backend/README.md)** - Полная документация NestJS API  
- **Next.js**: https://nextjs.org
- **NestJS**: https://docs.nestjs.com
- **Prisma**: https://www.prisma.io/docs
- **Feature-Sliced Design**: https://feature-sliced.design

---

**Создано с ❤️ для Neva Technologies**

*Современная платформа каталога продуктов с фокусом на производительность, безопасность и отличный пользовательский опыт.*