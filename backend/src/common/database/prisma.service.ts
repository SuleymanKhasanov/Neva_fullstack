// src/common/database/prisma.service.ts (исправленный)
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('🐘 PrismaService connected to PostgreSQL');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('🐘 PrismaService disconnected from PostgreSQL');
    } catch (error) {
      this.logger.error('❌ Error disconnecting from database:', error);
    }
  }

  // Помощник для отладки запросов (отключен для избежания ошибок типизации)
  async enableQueryLogging() {
    // Отключено из-за проблем с типизацией в новых версиях Prisma
    // this.$on('query', (e: any) => {
    //   this.logger.debug(`Query: ${e.query}`);
    //   this.logger.debug(`Params: ${e.params}`);
    //   this.logger.debug(`Duration: ${e.duration}ms`);
    // });
    this.logger.debug('Query logging is disabled');
  }
}
