import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Section } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from '../../prisma/prisma.service';

import { NevaProduct } from './dto/product.dto';

interface ProductsResult {
  products: NevaProduct[];
  hasNextPage: boolean;
  totalCount: number;
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getProducts(params: {
    locale: string;
    page?: number;
    limit?: number;
    after?: string;
    section?: Section;
    categoryId?: number | string;
    brandId?: number | string;
  }): Promise<ProductsResult> {
    const { locale, page = 1, limit = 20, after, section } = params;
    const categoryId = params.categoryId
      ? parseInt(String(params.categoryId), 10)
      : undefined;
    const brandId = params.brandId
      ? parseInt(String(params.brandId), 10)
      : undefined;

    const cacheKey = `products:locale:${locale}:page:${page}:limit:${limit}:after:${after || 'null'}:section:${section || 'all'}:categoryId:${categoryId || 'all'}:brandId:${brandId || 'all'}`;

    try {
      const cached = await this.cacheManager.get<ProductsResult>(cacheKey);
      if (cached) {
        this.logger.log(`Cache hit for ${cacheKey}`);

        return cached;
      }

      this.logger.log(
        `Validating categoryId: ${categoryId}, brandId: ${brandId}`
      );
      if (categoryId && !isNaN(categoryId)) {
        const categoryExists = await this.prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!categoryExists) {
          this.logger.warn(`Category ID ${categoryId} not found`);

          return { products: [], hasNextPage: false, totalCount: 0 };
        }
      }

      if (brandId && !isNaN(brandId)) {
        const brandExists = await this.prisma.brand.findUnique({
          where: { id: brandId },
        });
        if (!brandExists) {
          this.logger.warn(`Brand ID ${brandId} not found`);

          return { products: [], hasNextPage: false, totalCount: 0 };
        }
      }

      const afterId = after
        ? parseInt(Buffer.from(after, 'base64').toString(), 10)
        : undefined;
      const where = {
        locale,
        ...(section && { section }),
        ...(categoryId && !isNaN(categoryId) && { categoryId }),
        ...(brandId && !isNaN(brandId) && { brandId }),
        ...(afterId && { id: { gt: afterId } }),
      };

      this.logger.log(
        `Fetching products with filters: ${JSON.stringify(where)}`
      );

      const skip = afterId ? undefined : (page - 1) * limit;
      const take = limit;

      const [products, totalCount] = await Promise.all([
        this.prisma.product.findMany({
          where,
          skip,
          take,
          orderBy: { id: 'asc' },
          include: {
            category: {
              select: { id: true, name: true, locale: true, section: true },
            },
            brand: {
              select: { id: true, name: true, locale: true, section: true },
            },
          },
        }),
        this.prisma.product.count({ where }),
      ]);

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const productsWithUrls = products.map((product) => {
        const imageFileName = product.image
          ? product.image.split('/').pop()
          : null;
        const fullImageFileName = product.fullImage
          ? product.fullImage.split('/').pop()
          : null;

        return {
          id: product.id,
          name: product.name,
          locale: product.locale,
          section: product.section,
          description: product.description,
          image: imageFileName
            ? `${baseUrl}/public/images/${imageFileName}`
            : null,
          fullImage: fullImageFileName
            ? `${baseUrl}/public/images/${fullImageFileName}`
            : null,
          brand: product.brand,
          category: product.category,
        };
      });

      const result: ProductsResult = {
        products: productsWithUrls,
        hasNextPage: products.length === limit,
        totalCount,
      };

      await this.cacheManager.set(cacheKey, result, 300);
      this.logger.log(`Cached products for ${cacheKey}`);

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch products: ${message}`, stack);
      throw new Error(message);
    }
  }

  async getCategories(locale: string, section?: Section) {
    const cacheKey = `categories:locale:${locale}:section:${section || 'all'}`;
    try {
      const cacheStore = (this.cacheManager as any).store;
      if (cacheStore.keys) {
        const keys = await cacheStore.keys();
        for (const key of keys) {
          if (key.startsWith('categories:')) {
            await this.cacheManager.del(key);
          }
        }
        this.logger.log('Cleared category cache keys');
      }

      const cached = await this.cacheManager.get(cacheKey);
      if (cached) {
        this.logger.log(`Cache hit for ${cacheKey}`);

        return cached;
      }

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

      await this.cacheManager.set(cacheKey, { categories }, 300);
      this.logger.log(`Cached categories for ${cacheKey}`);

      return { categories };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch categories: ${message}`, stack);
      throw new Error(message);
    }
  }

  async getBrands(locale: string, section?: Section) {
    const cacheKey = `brands:locale:${locale}:section:${section || 'all'}`;
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) {
        this.logger.log(`Cache hit for ${cacheKey}`);

        return cached;
      }

      const brands = await this.prisma.brand.findMany({
        where: {
          locale,
          ...(section && { section }),
        },
        select: {
          id: true,
          name: true,
          locale: true,
          section: true,
        },
      });

      await this.cacheManager.set(cacheKey, brands, 300);
      this.logger.log(`Cached brands for ${cacheKey}`);

      return brands;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to fetch brands: ${message}`, stack);
      throw new Error(message);
    }
  }
}
