// shared/services/api/product.ts

import {
  ProductDetail,
  ProductApiResponse,
  AllProductsApiResponse,
  ProductPath,
} from '@/shared/types/product';
import {
  fetchWithCache,
  CACHE_SETTINGS,
  createProductTags,
} from '@/shared/utils/cache';

/**
 * Получение продукта по ID с поддержкой локализации
 */
export async function getProductById(
  id: string,
  locale: string
): Promise<ProductDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/product/${locale}/${id}`;

    console.log('🔍 Fetching product:', { id, locale, url });

    const data = await fetchWithCache<ProductApiResponse>(url, {
      ...CACHE_SETTINGS.PRODUCT_DETAIL,
      tags: createProductTags(id, locale),
    });

    if (!data.success || !data.data) {
      console.error('❌ Invalid product response:', data);
      return null;
    }

    console.log('✅ Product fetched successfully:', data.data.name);
    return data.data;
  } catch (error) {
    console.error('💥 Error fetching product:', error);
    return null;
  }
}

/**
 * Получение всех продуктов для генерации статических путей
 */
export async function getAllProductPaths(): Promise<ProductPath[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const locales = ['en', 'ru', 'uz', 'kr'];
    const allPaths: ProductPath[] = [];

    for (const locale of locales) {
      const url = `${baseUrl}/api/products/all/${locale}`;

      console.log(`🔍 Fetching all products for locale: ${locale}`);

      try {
        const data = await fetchWithCache<AllProductsApiResponse>(url, {
          revalidate: 86400, // 24 часа для статической генерации
          tags: [`all-products-${locale}`],
        });

        if (data.success && data.data.products) {
          data.data.products.forEach((product: ProductDetail) => {
            // Используем существующий slug или генерируем из названия
            const slug =
              product.slug && product.slug.trim().length > 0
                ? product.slug
                : createSlug(product.name);

            if (slug && slug.length > 0) {
              allPaths.push({
                locale,
                id: product.id.toString(),
                slug: slug,
              });
            } else {
              console.warn(
                `⚠️ Product ${product.id} (${product.name}) has no valid slug, skipping`
              );
            }
          });
        }
      } catch (error) {
        console.warn(
          `⚠️ Failed to fetch products for locale ${locale}:`,
          error
        );
      }
    }

    console.log(`📊 Generated ${allPaths.length} product paths`);
    return allPaths;
  } catch (error) {
    console.error('💥 Error fetching all product paths:', error);
    return [];
  }
}

/**
 * Создание SEO-friendly slug
 */
export function createSlug(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Убираем специальные символы
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .replace(/^-+|-+$/g, '') // Убираем дефисы в начале и конце
    .trim();
}

/**
 * Проверка корректности slug
 */
export function validateSlug(productSlug: string, urlSlug: string): boolean {
  // Сравниваем slug из API с slug из URL
  return productSlug === urlSlug;
}
