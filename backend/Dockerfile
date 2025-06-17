# backend/Dockerfile
FROM node:18-alpine

# Установка переменных окружения
ENV NODE_ENV=development
ENV PORT=3001

# Создание рабочей директории
WORKDIR /app

# Установка системных зависимостей
RUN apk add --no-cache \
    bash \
    curl \
    netcat-openbsd \
    postgresql-client

# Копирование файлов зависимостей
COPY package*.json ./
COPY tsconfig.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Копирование схемы Prisma
COPY prisma ./prisma

# Генерация Prisma клиента
RUN npx prisma generate

# Создание директории для логов
RUN mkdir -p /app/logs

# Установка правильных прав доступа
RUN chown -R node:node /app
USER node

# Открытие порта
EXPOSE 3001

# Команда по умолчанию (будет переопределена в docker-compose)
CMD ["npm", "run", "dev"]