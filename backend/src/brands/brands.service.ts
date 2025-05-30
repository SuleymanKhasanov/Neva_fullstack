import { Injectable } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async getBrands(locale: string, section?: Section) {
    const where: Prisma.BrandWhereInput = { locale };
    if (section) {
      where.section = section; // Используем Section напрямую
    }

    const brands = await this.prisma.brand.findMany({
      where,
      select: {
        id: true,
        name: true,
        locale: true,
        section: true,
      },
    });

    console.log('Fetched brands:', brands);

    return brands;
  }
}
