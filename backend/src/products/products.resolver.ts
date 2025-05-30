import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Section } from '@prisma/client';

import { BrandsResponse } from './dto/brands-response.dto';
import { CategoriesResponse } from './dto/categories-response.dto';
import { NevaProduct } from './dto/product.dto';
import { ProductsResponse } from './dto/products-response.dto';
import { ProductsService } from './products.service';

interface ProductsResult {
  products: NevaProduct[];
  hasNextPage: boolean;
  totalCount: number;
}

@Resolver(() => NevaProduct)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductsResponse)
  async products(
    @Args('locale', { type: () => String }) locale: string,
    @Args('first', { type: () => Int, defaultValue: 20 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('section', { type: () => String, nullable: true }) section?: string,
    @Args('categoryId', { type: () => Int, nullable: true })
    categoryId?: number,
    @Args('brandId', { type: () => Int, nullable: true }) brandId?: number
  ): Promise<ProductsResponse> {
    const sectionEnum: Section | undefined =
      section && ['NEVA', 'X_SOLUTION'].includes(section.toUpperCase())
        ? (section.toUpperCase() as Section)
        : undefined;

    console.log('ProductsResolver.products:', {
      locale,
      first,
      after,
      section: sectionEnum,
      categoryId,
      brandId,
    });

    const result: ProductsResult = await this.productsService.getProducts({
      locale,
      limit: first,
      after,
      section: sectionEnum,
      categoryId,
      brandId,
    });

    return {
      edges: result.products.map((product) => ({
        node: product,
        cursor: Buffer.from(product.id.toString()).toString('base64'),
      })),
      pageInfo: {
        hasNextPage: result.hasNextPage,
        endCursor:
          result.products.length > 0
            ? Buffer.from(
                result.products[result.products.length - 1].id.toString()
              ).toString('base64')
            : null,
      },
      totalCount: result.totalCount,
    };
  }

  @Query(() => CategoriesResponse)
  async categories(
    @Args('locale', { type: () => String }) locale: string,
    @Args('section', { type: () => String, nullable: true }) section?: string
  ) {
    const sectionEnum: Section | undefined =
      section && ['NEVA', 'X_SOLUTION'].includes(section.toUpperCase())
        ? (section.toUpperCase() as Section)
        : undefined;

    console.log('ProductsResolver.categories:', {
      locale,
      section: sectionEnum,
    });

    const categories = await this.productsService.getCategories(
      locale,
      sectionEnum
    );

    return { categories };
  }

  @Query(() => BrandsResponse)
  async brands(
    @Args('locale', { type: () => String }) locale: string,
    @Args('section', { type: () => String, nullable: true }) section?: string
  ) {
    const sectionEnum: Section | undefined =
      section && ['NEVA', 'X_SOLUTION'].includes(section.toUpperCase())
        ? (section.toUpperCase() as Section)
        : undefined;

    console.log('ProductsResolver.brands:', { locale, section: sectionEnum });

    const brands = await this.productsService.getBrands(locale, sectionEnum);

    console.log('ProductsResolver.brands response:', brands);

    return { brands };
  }
}
