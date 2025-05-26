import { Injectable } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async getBrands(dto: { locale?: string; section?: Section }) {
    return this.prisma.brand.findMany({
      where: {
        locale: dto.locale,
        section: dto.section,
      },
      select: {
        id: true,
        name: true,
        locale: true,
        section: true,
        categoryId: true,
      },
    });
  }
}
