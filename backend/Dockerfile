FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

WORKDIR /app/backend
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]