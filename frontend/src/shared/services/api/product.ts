// shared/services/api/product.ts

import {
  ProductDetail,
  ProductApiResponse,
  AllProductsApiResponse,
  ProductPath,
} from '@/shared/types/product';

/**
 * Получение продукта по ID с поддержкой локализации
 */
export async function getProductById(
  id: string,
  locale: string
): Promise<ProductDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const url = `${baseUrl}/product/${locale}/${id}`;

    console.log('🔍 Fetching product:', { id, locale, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // Кеширование для ISR
      next: {
        revalidate: 3600, // Revalidate каждый час
        tags: [`product-${id}`, `locale-${locale}`],
      },
    });

    if (!response.ok) {
      console.error('❌ Product fetch failed:', {
        status: response.status,
        statusText: response.statusText,
        url,
      });

      if (response.status === 404) {
        return null; // Продукт не найден
      }

      throw new Error(
        `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
      );
    }

    const responseText = await response.text();
    console.log('📝 Raw response:', responseText);

    let data: ProductApiResponse;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      console.error('❌ Response text:', responseText);
      throw new Error('Invalid JSON response from server');
    }

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
      const url = `${baseUrl}/products/all/${locale}`;

      console.log(`🔍 Fetching all products for locale: ${locale}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Кеширование для сборки
        next: {
          revalidate: 86400, // 24 часа
        },
      });

      if (response.ok) {
        const responseText = await response.text();
        const data: AllProductsApiResponse = JSON.parse(responseText);

        if (data.success && data.data.products) {
          data.data.products.forEach((product: ProductDetail) => {
            allPaths.push({
              locale,
              id: product.id.toString(),
              slug: product.slug,
            });
          });
        }
      } else {
        console.warn(
          `⚠️ Failed to fetch products for locale ${locale}:`,
          response.status
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
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Убираем специальные символы
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .trim();
}

/**
 * Проверка корректности slug
 */
export function validateSlug(productSlug: string, urlSlug: string): boolean {
  // Сравниваем slug из API с slug из URL
  return productSlug === urlSlug;
}
