import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Section } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from '../../prisma/prisma.service';

import { GetCategoriesDto } from './dto/get-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getCategories(dto: GetCategoriesDto): Promise<{
    categories: {
      id: number;
      name: string;
      locale: string;
      section: Section;
      brands: { id: number; name: string; locale: string; section: Section }[];
    }[];
  }> {
    const { locale, section } = dto;
    const cacheKey = `categories:locale:${locale}:section:${section || 'all'}`;
    const cached = await this.cacheManager.get<{
      categories: {
        id: number;
        name: string;
        locale: string;
        section: Section;
        brands: {
          id: number;
          name: string;
          locale: string;
          section: Section;
        }[];
      }[];
    }>(cacheKey);
    if (cached) return cached;

    const categories = await this.prisma.category.findMany({
      where: {
        locale,
        ...(section && { section }),
      },
      select: {
        id: true,
        name: true,
        locale: true,
        section: true,
        brands: {
          select: {
            id: true,
            name: true,
            locale: true,
            section: true,
          },
        },
      },
    });

    const result = { categories };
    await this.cacheManager.set(cacheKey, result, 300);

    return result;
  }
}
