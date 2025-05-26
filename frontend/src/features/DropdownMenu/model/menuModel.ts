import { fetchCategories } from '@/shared/services/api/fetchCategories';
import { CategoryWithBrands } from '@/shared/types/category';

export type MenuSection = 'neva' | 'x_solution';

export interface MenuState {
  nevaCategories: CategoryWithBrands[];
  xSolutionCategories: CategoryWithBrands[];
  isLoading: boolean;
  error: string | null;
}

export async function loadMenuData(locale: string): Promise<MenuState> {
  try {
    console.log(`Fetching menu data for locale: ${locale}`);
    const [nevaData, xSolutionData] = await Promise.all([
      fetchCategories({ locale, section: 'neva' }),
      fetchCategories({ locale, section: 'x_solution' }),
    ]);
    console.log('Menu data fetched:', {
      nevaCategories: nevaData.data.length,
      xSolutionCategories: xSolutionData.data.length,
    });
    return {
      nevaCategories: nevaData.data,
      xSolutionCategories: xSolutionData.data,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to load menu data:', errorMessage);
    return {
      nevaCategories: [],
      xSolutionCategories: [],
      isLoading: false,
      error: errorMessage,
    };
  }
}
