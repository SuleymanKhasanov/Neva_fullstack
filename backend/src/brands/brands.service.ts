import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetBrandsDto } from './dto/get-brands.dto';
import { Section } from '@prisma/client';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async getAllBrands(dto: GetBrandsDto) {
    const { locale, page, limit = 20 } = dto;
    const skip = (page - 1) * limit;

    const [brands, total] = await Promise.all([
      this.prisma.brand.findMany({
        where: { locale },
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      this.prisma.brand.count({ where: { locale } }),
    ]);

    return {
      data: brands,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBrandsBySection(dto: GetBrandsDto, section: Section) {
    const { locale, page, limit = 20 } = dto;
    const skip = (page - 1) * limit;

    const [brands, total] = await Promise.all([
      this.prisma.brand.findMany({
        where: {
          locale,
          section,
        },
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      this.prisma.brand.count({
        where: {
          locale,
          section,
        },
      }),
    ]);

    return {
      data: brands,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
