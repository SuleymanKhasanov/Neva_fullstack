// src/common/cache/cache.module.ts
import { Module } from '@nestjs/common';

import { CacheService } from './cache.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {
  constructor() {
    console.log('🔴 CacheModule initialized (Redis + TTL)');
  }
}
