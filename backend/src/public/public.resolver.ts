// src/public/public.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Public } from '../auth/decorators/public.decorator';
import { PublicService } from './public.service';
import {
  ProductConnection,
  BrandsResponse,
  NevaProduct,
  NevaBrand,
  ProductEdge,
  PageInfo,
} from './dto/product.dto';

@Resolver()
@Public() // Делаем весь резолвер публичным
export class PublicResolver {
  constructor(private readonly publicService: PublicService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'GraphQL API is working! Use queries for products, categories, brands';
  }

  @Query(() => ProductConnection)
  async products(
    @Args('locale') locale: string,
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { nullable: true }) after?: string,
    @Args('section', { nullable: true }) section?: string,
    @Args('brandId', { type: () => Int, nullable: true }) brandId?: number
  ): Promise<ProductConnection> {
    // Parse cursor to get page number
    let page = 1;
    if (after) {
      try {
        const parsed = JSON.parse(Buffer.from(after, 'base64').toString());
        page = Math.max(1, Math.floor(parsed.offset / first) + 1);
      } catch {
        page = 1;
      }
    }

    const result = await this.publicService.getProducts({
      locale,
      section,
      brandId,
      page,
      limit: first,
    });

    // Transform REST response to GraphQL format
    const edges: ProductEdge[] = result.products.map(
      (product: any, index: number) => {
        const offset = (page - 1) * first + index + 1;
        const cursor = Buffer.from(JSON.stringify({ offset })).toString(
          'base64'
        );

        return {
          node: {
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            fullImage: product.image,
            locale,
            section: product.section,
            brand: product.brand
              ? {
                  id: product.brand.id,
                  name: product.brand.name,
                  locale,
                  section: product.section,
                }
              : null,
            category: {
              id: product.category.id,
              name: product.category.name,
              locale,
              section: product.section,
            },
          },
          cursor,
        };
      }
    );

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage: result.pagination.hasNextPage,
        endCursor,
      },
      totalCount: result.pagination.total,
    };
  }

  @Query(() => BrandsResponse)
  async brands(
    @Args('locale') locale: string,
    @Args('section', { nullable: true }) section?: string
  ): Promise<BrandsResponse> {
    const result = await this.publicService.getBrands({
      locale,
      section,
    });

    return {
      brands: result.brands.map((brand: any) => ({
        id: brand.id,
        name: brand.name,
        locale,
        section: section || '',
      })),
    };
  }
}
