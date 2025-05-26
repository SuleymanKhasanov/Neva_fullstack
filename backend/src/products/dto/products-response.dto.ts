import { ObjectType, Field, Int } from '@nestjs/graphql';

import { NevaProduct } from './product.dto';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean = false;

  @Field(() => String, { nullable: true })
  endCursor: string | null = null;
}

@ObjectType()
export class ProductEdge {
  @Field(() => NevaProduct)
  node: NevaProduct = new NevaProduct();

  @Field(() => String)
  cursor: string = '';
}

@ObjectType()
export class ProductsResponse {
  @Field(() => [ProductEdge])
  edges: ProductEdge[] = [];

  @Field(() => PageInfo)
  pageInfo: PageInfo = new PageInfo();

  @Field(() => Int)
  totalCount: number = 0;
}
