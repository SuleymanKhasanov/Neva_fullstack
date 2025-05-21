FROM node:20

WORKDIR /app

# Копируем корневой package.json и yarn.lock для Yarn Workspaces
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/package.json

# Устанавливаем зависимости для всех рабочих пространств
RUN yarn install --frozen-lockfile

# Копируем весь проект
COPY . .

# Переходим в backend и генерируем Prisma Client
WORKDIR /app/backend
RUN npx prisma generate

# Копируем сгенерированные файлы Prisma Client в node_modules/.prisma/client
RUN mkdir -p /app/node_modules/.prisma/client && \
    cp -r /app/backend/generated/prisma/client/* /app/node_modules/.prisma/client/

EXPOSE 3000

CMD ["yarn", "start:dev"]