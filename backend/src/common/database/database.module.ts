// src/common/database/database.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  constructor() {
    console.log('🐘 DatabaseModule initialized (PostgreSQL + Prisma)');
  }
}
