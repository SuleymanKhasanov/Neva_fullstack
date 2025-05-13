#!/bin/bash
export NODE_ENV=test
yarn install
npx dotenv -e .env.test -- npx prisma migrate reset --force