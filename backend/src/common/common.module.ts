// src/common/common.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CacheService } from './cache/cache.service';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
// import { UploadModule } from './upload/upload.module';
// import { UploadService } from './upload/upload.service';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule], // UploadModule
  providers: [PrismaService, CacheService], // UploadService
  exports: [
    PrismaService,
    CacheService,
    // UploadService,
    DatabaseModule,
    // UploadModule,
  ],
})
export class CommonModule {
  constructor() {
    console.log('🛠️ CommonModule initialized (Database + Cache + Upload)');
  }
}
