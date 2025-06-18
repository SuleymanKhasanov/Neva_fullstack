import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/database/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
