import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { Section } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesBySection(dto: GetCategoriesDto, section: Section) {
    const { locale, page, limit = 20 } = dto;
    const numericLimit = parseInt(limit.toString(), 10);
    const skip = (page - 1) * numericLimit;

    if (isNaN(numericLimit)) {
      throw new Error('Limit must be a valid number');
    }

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where: {
          locale,
          section,
        },
        skip,
        take: numericLimit,
        include: {
          brands: true,
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
        limit: numericLimit,
        totalPages: Math.ceil(total / numericLimit),
      },
    };
  }
}
