import {
  ApiResponseWithBrands,
  Category,
  CategoryWithBrands,
} from '@/shared/types/category';

interface FetchCategoriesParams {
  locale: string;
  section: 'neva' | 'x_solution';
}

export async function fetchCategories({
  locale,
  section,
}: FetchCategoriesParams): Promise<ApiResponseWithBrands> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!section || !['neva', 'x_solution'].includes(section)) {
    console.error(`Invalid section: ${section}`);
    return {
      data: [],
      meta: { total: 0, page: 1, limit: null, totalPages: 1 },
    };
  }

  const endpoint = section === 'x_solution' ? 'x-solution' : section;
  const url = new URL(`${baseUrl}/categories/${endpoint}`);
  url.searchParams.append('locale', locale);

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store',
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Categories fetch failed: HTTP ${response.status} - ${response.statusText} - ${errorText}`
      );
    }

    const categoriesData = await response.json();
    const categories = categoriesData.data || categoriesData.categories || [];
    if (!Array.isArray(categories)) {
      throw new Error('Invalid categories response format');
    }

    const enrichedCategories: CategoryWithBrands[] = categories.map(
      (category: Category) => ({
        ...category,
        brands: category.brands || [],
      })
    );

    console.log(`Fetched categories for ${section}:`, {
      count: enrichedCategories.length,
      locale,
      brands: enrichedCategories.map((c) => c.brands.length),
    });

    return {
      data: enrichedCategories,
      meta: categoriesData.meta || {
        total: enrichedCategories.length,
        page: 1,
        limit: null,
        totalPages: 1,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Failed to fetch categories: ${error.message}`
        : 'Unknown error fetching categories';
    console.error(errorMessage, { url: url.toString(), locale, section });
    return {
      data: [],
      meta: { total: 0, page: 1, limit: null, totalPages: 1 },
    };
  }
}
