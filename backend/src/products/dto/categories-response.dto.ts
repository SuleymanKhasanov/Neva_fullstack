import { ObjectType, Field } from '@nestjs/graphql';

import { NevaCategory } from './product.dto';

@ObjectType()
export class CategoriesResponse {
  @Field(() => [NevaCategory])
  categories: NevaCategory[] = [];
}
