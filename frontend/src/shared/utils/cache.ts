// shared/utils/cache.ts
// Импорт только для серверных компонентов App Router
// import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Утилиты для управления кешем Next.js ISR
 */

export interface RevalidateOptions {
  readonly tags?: readonly string[];
  readonly paths?: readonly string[];
}

/**
 * Очистка кеша по тегам и путям (только для серверных компонентов)
 */
export async function invalidateCache(
  options: RevalidateOptions
): Promise<void> {
  try {
    // Эта функция работает только в серверных компонентах App Router
    if (typeof window === 'undefined') {
      const { revalidateTag, revalidatePath } = await import('next/cache');

      // Инвалидация по тегам
      if (options.tags) {
        for (const tag of options.tags) {
          revalidateTag(tag);
          console.log(`🗑️ Revalidated tag: ${tag}`);
        }
      }

      // Инвалидация по путям
      if (options.paths) {
        for (const path of options.paths) {
          revalidatePath(path);
          console.log(`🗑️ Revalidated path: ${path}`);
        }
      }
    } else {
      console.warn('⚠️ Cache invalidation only works in server components');
    }
  } catch (error) {
    console.error('❌ Cache invalidation failed:', error);
  }
}

/**
 * Создание стандартных тегов для продукта
 */
export function createProductTags(
  productId: string | number,
  locale: string
): readonly string[] {
  return [
    `product-${productId}`,
    `locale-${locale}`,
    'products',
    'all-products',
  ] as const;
}

/**
 * Создание стандартных тегов для категории
 */
export function createCategoryTags(
  categoryId: string | number,
  locale: string,
  section?: string
): readonly string[] {
  const tags = [
    `category-${categoryId}`,
    `locale-${locale}`,
    'categories',
    'all-categories',
  ];

  if (section) {
    tags.push(`section-${section}`);
  }

  return tags as const;
}

/**
 * Создание стандартных тагов для бренда
 */
export function createBrandTags(
  brandId: string | number,
  locale: string
): readonly string[] {
  return [
    `brand-${brandId}`,
    `locale-${locale}`,
    'brands',
    'all-brands',
  ] as const;
}

/**
 * Оптимальные настройки кеширования для разных типов данных
 */
export const CACHE_SETTINGS = {
  // Продукты - обновляются редко
  PRODUCT_DETAIL: {
    revalidate: 1800, // 30 минут
    tags: ['products'],
  },

  // Списки продуктов - обновляются чаще
  PRODUCT_LIST: {
    revalidate: 600, // 10 минут
    tags: ['products', 'all-products'],
  },

  // Категории - очень стабильны
  CATEGORIES: {
    revalidate: 3600, // 1 час
    tags: ['categories', 'all-categories'],
  },

  // Бренды - очень стабильны
  BRANDS: {
    revalidate: 3600, // 1 час
    tags: ['brands', 'all-brands'],
  },

  // Поиск - может изменяться
  SEARCH: {
    revalidate: 300, // 5 минут
    tags: ['search'],
  },

  // Меню - крайне стабильно
  MENU: {
    revalidate: 7200, // 2 часа
    tags: ['menu', 'navigation'],
  },
} as const;

/**
 * Обертка для fetch с оптимальным кешированием
 */
export async function fetchWithCache<T>(
  url: string,
  options: {
    readonly revalidate?: number;
    readonly tags?: readonly string[];
    readonly headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const { revalidate = 300, tags = [], headers = {} } = options;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    next: {
      revalidate,
      tags: Array.from(tags),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Fetch failed: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
}
