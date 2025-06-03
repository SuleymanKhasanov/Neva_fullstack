// app/[locale]/product/[id]/layout.tsx

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';
import { getProductById } from '@/shared/services/api/product';
import { ProductDetail } from '@/shared/types/product';
import { createProductMetadata } from '@/shared/types/metadata';
import { notFound } from 'next/navigation';
import { LoadingProvider } from '@/features/LoadingManager';

interface ProductLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('🏗️ ProductLayout:', {
    locale,
    productId: resolvedParams.id,
  });

  // Получаем переводы
  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  // Получаем данные продукта
  const product: ProductDetail | null = await getProductById(
    resolvedParams.id,
    locale
  );

  if (!product) {
    console.log('❌ Product not found:', resolvedParams.id);
    notFound();
  }

  console.log('✅ Product loaded in layout:', product.name);

  return (
    <LoadingProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={plainMessages}
        key={locale}
      >
        <div data-product-id={product.id.toString()}>{children}</div>
      </NextIntlClientProvider>
    </LoadingProvider>
  );
}

// Генерация метаданных для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  const product: ProductDetail | null = await getProductById(
    resolvedParams.id,
    locale
  );

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Используем SEO данные из API
  const title = product.seoTitle || `${product.name} | Neva App`;
  const description =
    product.seoDescription ||
    (product.description.length > 160
      ? `${product.description.substring(0, 157)}...`
      : product.description);

  const canonicalUrl = `/${locale}/product/${product.id}/${product.slug}`;

  return createProductMetadata({
    title,
    description,
    imageUrl: product.fullImage,
    canonicalUrl,
    locale,
    keywords: [
      product.name,
      product.brand.name,
      product.category.name,
      'products',
      'neva',
    ],
    brandName: product.brand.name,
    categoryName: product.category.name,
  });
}
