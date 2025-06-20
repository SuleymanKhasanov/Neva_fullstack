// app/[locale]/product/[id]/[productName]/page.tsx

import { notFound, redirect } from 'next/navigation';
import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  isValidLocale,
  Locale,
  TranslationType,
} from '@/shared/config/i18n/types';
import {
  getProductById,
  getAllProductPaths,
  validateSlug,
} from '@/shared/services/api/product';
import { ProductDetail, ProductPath } from '@/shared/types/product';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { createProductMetadata } from '@/shared/types/metadata';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    id: string;
    productName: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('📄 ProductPage:', {
    locale,
    productId: resolvedParams.id,
    productName: resolvedParams.productName,
  });

  // Получаем продукт
  const product: ProductDetail | null = await getProductById(
    resolvedParams.id,
    locale
  );

  if (!product) {
    console.log('❌ Product not found in page:', resolvedParams.id);
    notFound();
  }

  // Проверяем корректность slug в URL (используем slug из API)
  const isValidSlugMatch = validateSlug(
    product.slug,
    resolvedParams.productName
  );

  if (!isValidSlugMatch) {
    console.log('🔄 Invalid slug, redirecting:', {
      current: resolvedParams.productName,
      expected: product.slug,
    });

    // Редирект на корректный URL с slug из API
    redirect(`/${locale}/product/${resolvedParams.id}/${product.slug}`);
  }

  // Получаем переводы
  const { messages }: { messages: TranslationType } = await getRequestConfig({
    locale,
  });

  console.log('✅ ProductPage rendered for:', product.name);

  return (
    <ProductDetailPage product={product} locale={locale} messages={messages} />
  );
}

// Генерация статических параметров для ISR
export async function generateStaticParams(): Promise<
  Array<{
    locale: string;
    id: string;
    productName: string;
  }>
> {
  console.log('🏗️ Generating static params for products...');

  try {
    // Получаем все возможные пути продуктов
    const allPaths: ProductPath[] = await getAllProductPaths();

    console.log(`📊 Generated ${allPaths.length} static paths`);

    // Возвращаем параметры для статической генерации
    return allPaths.map(({ locale, id, slug }) => ({
      locale,
      id,
      productName: slug,
    }));
  } catch (error) {
    console.error('💥 Error generating static params:', error);
    return [];
  }
}

// Настройка ISR
export const revalidate = 3600; // Revalidate каждый час
export const dynamicParams = true; // Разрешить динамические параметры
export const fetchCache = 'default-cache';

// Генерация метаданных на уровне страницы
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string; productName: string }>;
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
  const title =
    product.seoTitle || `${product.name} - ${product.brand.name} | Neva App`;
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
      locale === 'ru' ? 'товары' : 'products',
    ].filter(Boolean),
    brandName: product.brand.name,
    categoryName: product.category.name,
  });
}
