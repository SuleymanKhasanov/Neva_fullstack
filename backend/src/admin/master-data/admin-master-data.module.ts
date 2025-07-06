import { Module } from '@nestjs/common';

import { PrismaService } from '../../common/database/prisma.service';
import { CacheService } from '../../common/cache/cache.service';
// import { UploadService } from '../../common/upload/upload.service';
import { AdminMasterDataController } from './admin-master-data.controller';
import { AdminMasterDataService } from './admin-master-data.service';

@Module({
  controllers: [AdminMasterDataController],
  providers: [AdminMasterDataService, PrismaService, CacheService], // UploadService
  exports: [AdminMasterDataService],
})
export class AdminMasterDataModule {}
