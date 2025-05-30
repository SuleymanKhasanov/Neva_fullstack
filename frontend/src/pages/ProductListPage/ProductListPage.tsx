'use client';

import { ApolloProvider } from '@apollo/client';
import { ProductList } from '@/widgets/ProductList';
import { FilterWidget } from '@/widgets/FilterWidget';
import client from '@/shared/lib/apollo/client';
import { TranslationType } from '@/shared/config/i18n/types';

interface ProductListPageProps {
  locale: string;
  messages: TranslationType;
}

export default function ProductListPage({
  locale,
  messages,
}: ProductListPageProps) {
  console.log('ProductListPage props:', { locale });
  return (
    <ApolloProvider client={client}>
      <FilterWidget locale={locale} messages={messages} />
      <ProductList locale={locale} messages={messages} />
    </ApolloProvider>
  );
}
