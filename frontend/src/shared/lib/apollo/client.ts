import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Типы для продуктов
interface Product {
  id: string;
  name: string;
  description: string;
  image: string | null;
  brand: {
    id: number;
    name: string;
  };
}

interface ProductEdge {
  node: Product;
  cursor: string;
}

interface ProductsConnection {
  edges: ProductEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
  totalCount: number;
}

// Типы для брендов
interface Brand {
  id: number;
  name: string;
  locale: string;
  section: string;
}

interface BrandsResponse {
  brands: Brand[];
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ['locale', 'section', 'brandId'],
            merge(
              existing: ProductsConnection | undefined,
              incoming: ProductsConnection,
              { args }
            ): ProductsConnection {
              const isFirstLoad = !existing || !args?.after;

              console.log('🔧 Simple Apollo merge:', {
                isFirstLoad,
                existingCount: existing?.edges.length || 0,
                incomingCount: incoming.edges.length,
                after: args?.after,
              });

              // Если первая загрузка - просто возвращаем новые данные
              if (isFirstLoad) {
                console.log('📝 First load - replacing all data');
                return incoming;
              }

              // Если fetchMore - добавляем к существующим (без фильтрации дубликатов)
              console.log('➕ Adding to existing data');
              return {
                ...incoming,
                edges: [...(existing?.edges || []), ...incoming.edges],
              };
            },
          },
          brands: {
            keyArgs: ['locale', 'section'],
            merge(
              _existing: BrandsResponse | undefined,
              incoming: BrandsResponse
            ): BrandsResponse {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
