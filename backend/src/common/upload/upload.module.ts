// src/common/upload/upload.module.ts
import { Module } from '@nestjs/common';

import { UploadService } from './upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {
  constructor() {
    console.log('📁 UploadModule initialized (File upload + Sharp)');
  }
}
