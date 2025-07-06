FROM node:20-alpine

WORKDIR /app

# Установить системные зависимости для Sharp
RUN apk add --no-cache \
    libc6-compat \
    vips-dev \
    python3 \
    make \
    g++

# Копируем корневой package.json и yarn.lock для Yarn Workspaces
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/package.json

# Устанавливаем зависимости для всех рабочих пространств
RUN yarn install --frozen-lockfile

# Копируем весь проект
COPY . .

# Переходим в backend и генерируем Prisma Client
WORKDIR /app/backend

# Генерируем Prisma Client
RUN npx prisma generate

# Создаем директории для изображений
RUN mkdir -p /app/backend/public/images && \
    mkdir -p /app/backend/public/thumbnails && \
    chmod 755 /app/backend/public/images && \
    chmod 755 /app/backend/public/thumbnails

# Копируем сгенерированные файлы Prisma Client в node_modules/.prisma/client
RUN mkdir -p /app/node_modules/.prisma/client && \
    cp -r /app/backend/generated/prisma/client/* /app/node_modules/.prisma/client/ || echo "Prisma client copy failed, will generate at runtime"

EXPOSE 3000

# Healthcheck для проверки работы сервера
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["yarn", "start:dev"]