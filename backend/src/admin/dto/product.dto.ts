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
