import { Injectable } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(dto: GetProductsDto) {
    const { locale, page } = dto;
    const limit = 20;
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

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const productsWithFullImageUrls = products.map((product) => ({
      ...product,
      image: product.image
        ? `${baseUrl}/public/images/${product.image.split('/images/').pop()}`
        : null,
    }));

    return {
      data: productsWithFullImageUrls,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductsBySection(dto: GetProductsDto, section: Section) {
    const { locale, page } = dto;
    const limit = 20;
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

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const productsWithFullImageUrls = products.map((product) => ({
      ...product,
      image: product.image
        ? `${baseUrl}/public/images/${product.image.split('/images/').pop()}`
        : null,
    }));

    return {
      data: productsWithFullImageUrls,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
