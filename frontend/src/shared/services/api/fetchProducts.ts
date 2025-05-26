import { ProductsResponse } from '@/shared/types/product';

interface FetchProductsParams {
  locale: string;
  page?: number;
  limit?: number;
  section?: 'neva' | 'x_solution' | 'all';
  categoryId?: number;
  brandId?: number;
}

export async function fetchProducts({
  locale,
  page = 1,
  limit = 20,
  section,
  categoryId,
  brandId,
}: FetchProductsParams): Promise<ProductsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (section && !['neva', 'x_solution', 'all'].includes(section)) {
    console.error(`Invalid section: ${section}`);
    return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 1 } };
  }

  const endpoint = section
    ? section === 'x_solution'
      ? 'x-solution'
      : section
    : 'all';
  const url = new URL(`${baseUrl}/products/${endpoint}`);
  url.searchParams.append('locale', locale);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  if (categoryId) url.searchParams.append('categoryId', categoryId.toString());
  if (brandId) url.searchParams.append('brandId', brandId.toString());

  console.log(`Fetching products from: ${url.toString()}`, {
    locale,
    page,
    limit,
    section,
    categoryId,
    brandId,
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Fetch products failed:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(
        `Не удалось загрузить продукты: ${response.statusText} (${response.status}) - ${errorData}`
      );
    }

    const data = await response.json();
    console.log('Fetch products data:', {
      data,
      dataLength: data?.data?.length,
      meta: data?.meta,
      hasData: !!data?.data,
      isArray: Array.isArray(data?.data),
    });

    if (!data?.data || !Array.isArray(data.data)) {
      console.warn('Invalid or missing products data:', data);
      throw new Error('Получены некорректные данные о продуктах');
    }

    return data as ProductsResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Network error for products';
    console.error(`Error fetching products: ${errorMessage}`, {
      locale,
      page,
      limit,
      section,
      categoryId,
      brandId,
      error,
    });
    throw new Error(errorMessage);
  }
}
