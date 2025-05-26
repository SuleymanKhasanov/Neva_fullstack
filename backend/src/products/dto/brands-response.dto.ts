import { ObjectType, Field } from '@nestjs/graphql';

import { NevaBrand } from './product.dto';

@ObjectType()
export class BrandsResponse {
  @Field(() => [NevaBrand])
  brands: NevaBrand[] = [];
}
