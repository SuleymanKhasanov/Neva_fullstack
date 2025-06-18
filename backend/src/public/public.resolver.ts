// src/public/public.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';

import { PublicService } from './public.service';

@Resolver()
export class PublicResolver {
  constructor(private readonly publicService: PublicService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'GraphQL API is working! Use queries for products, categories, brands';
  }

  // TODO: Добавить GraphQL схемы и резолверы для продуктов
  // Пока оставляем базовую реализацию
}
