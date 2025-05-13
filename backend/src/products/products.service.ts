import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';
import { Section } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(dto: GetProductsDto) {
    const { locale, page, limit = 20 } = dto;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { locale },
        skip,
        take: limit,
        include: {
          brand: true,
          category: true,
        },
      }),
      this.prisma.product.count({ where: { locale } }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductsBySection(dto: GetProductsDto, section: Section) {
    const { locale, page, limit = 20 } = dto;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          locale,
          section,
        },
        skip,
        take: limit,
        include: {
          brand: true,
          category: true,
        },
      }),
      this.prisma.product.count({
        where: {
          locale,
          section,
        },
      }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
