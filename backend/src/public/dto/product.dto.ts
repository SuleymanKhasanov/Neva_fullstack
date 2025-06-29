import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class NevaBrand {
  @Field(() => Int)
  id: number = 0;

  @Field(() => String)
  name: string = '';

  @Field(() => String)
  locale: string = '';

  @Field(() => String)
  section: string = '';
}

@ObjectType()
export class NevaCategory {
  @Field(() => Int)
  id: number = 0;

  @Field(() => String)
  name: string = '';

  @Field(() => String)
  locale: string = '';

  @Field(() => String)
  section: string = '';
}

@ObjectType()
export class NevaProduct {
  @Field(() => Int)
  id: number = 0;

  @Field(() => String)
  name: string = '';

  @Field(() => String, { nullable: true })
  image: string | null = null;

  @Field(() => String, { nullable: true })
  fullImage: string | null = null;

  @Field(() => String)
  description: string = '';

  @Field(() => String)
  locale: string = '';

  @Field(() => String)
  section: string = '';

  @Field(() => NevaBrand, { nullable: true })
  brand: NevaBrand | null = null;

  @Field(() => NevaCategory)
  category: NevaCategory = new NevaCategory();
}

// GraphQL Pagination Types
@ObjectType()
export class ProductEdge {
  @Field(() => NevaProduct)
  node: NevaProduct = new NevaProduct();

  @Field(() => String)
  cursor: string = '';
}

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean = false;

  @Field(() => String, { nullable: true })
  endCursor: string | null = null;
}

@ObjectType()
export class ProductConnection {
  @Field(() => [ProductEdge])
  edges: ProductEdge[] = [];

  @Field(() => PageInfo)
  pageInfo: PageInfo = new PageInfo();

  @Field(() => Int)
  totalCount: number = 0;
}

@ObjectType()
export class BrandsResponse {
  @Field(() => [NevaBrand])
  brands: NevaBrand[] = [];
}
