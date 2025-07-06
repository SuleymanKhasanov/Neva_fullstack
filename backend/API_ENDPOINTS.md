# API Эндпоинты - Новая архитектура

## 🔒 Админские эндпоинты (требуют авторизации)

### Мастер-данные для админ-панели
```
GET /admin/master-data/categories?locale=ru&section=NEVA
GET /admin/master-data/subcategories?categoryId=1&locale=ru
GET /admin/master-data/brands?locale=ru&categoryId=1&section=NEVA
GET /admin/master-data/categories/1/brands?locale=ru&section=NEVA
GET /admin/master-data/stats
```

### Создание продуктов из админских данных
```
POST /admin/products-enhanced/from-admin-data
Content-Type: application/json
{
  "section": "NEVA",
  "adminCategoryId": 1,
  "adminSubcategoryId": 10,
  "adminBrandId": 5,
  "translations": [
    {
      "locale": "ru",
      "name": "Тестовый продукт",
      "description": "Описание продукта"
    }
  ],
  "isActive": true
}
```

### Данные для формы создания продукта
```
GET /admin/products-enhanced/admin-data/form-data?section=NEVA&locale=ru
GET /admin/products-enhanced/admin-data/subcategories/1?locale=ru
GET /admin/products-enhanced/admin-data/brands/1?locale=ru&section=NEVA
```

### Управление продуктами
```
GET /admin/products-enhanced
GET /admin/products-enhanced/1
PUT /admin/products-enhanced/1
DELETE /admin/products-enhanced/1
```

## 🌐 Публичные эндпоинты (без авторизации)

### Каталог продуктов (только с созданными продуктами)
```
GET /public/categories?locale=ru&section=NEVA
GET /public/brands?locale=ru&section=NEVA&categoryId=1
GET /public/products?locale=ru&section=NEVA&page=1&limit=20
GET /public/products/1?locale=ru
```

### Поиск
```
GET /public/search?query=котел&locale=ru&section=NEVA
```

## 📋 Скрипты управления данными

### Импорт данных
```bash
# Импорт JSON в админские таблицы
npm run catalog:parse:admin

# Очистка публичных таблиц (сохраняет продукты)
npm run catalog:clear-public

# Устаревший скрипт (больше не используется)
npm run catalog:parse
```

## 🔄 Рабочий процесс

1. **Импорт данных**: `npm run catalog:parse:admin` → Админские таблицы
2. **Создание продукта**: `POST /admin/products-enhanced/from-admin-data` → Автоматическое копирование в публичные таблицы
3. **Публичный доступ**: `GET /public/categories` → Только категории с продуктами

## 🗂️ Структура данных

### Админские таблицы (приватные)
- `admin_categories` + переводы
- `admin_subcategories` + переводы  
- `admin_brands` + переводы
- `admin_category_brands`

### Публичные таблицы (только с продуктами)
- `categories` + переводы (только связанные с продуктами)
- `subcategories` + переводы (только связанные с продуктами)
- `brands` + переводы (только связанные с продуктами)
- `products` (основные данные)

## 🔑 Авторизация

Для админских эндпоинтов используйте JWT токен:
```
Authorization: Bearer YOUR_JWT_TOKEN
```