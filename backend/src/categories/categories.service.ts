import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { Section } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesBySection(dto: GetCategoriesDto, section: Section) {
    const { locale, page, limit = 20 } = dto;
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where: {
          locale,
          section,
        },
        skip,
        take: limit,
        include: {
          brands: true, // Включаем связанные бренды
        },
      }),
      this.prisma.category.count({
        where: {
          locale,
          section,
        },
      }),
    ]);

    return {
      data: categories,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
