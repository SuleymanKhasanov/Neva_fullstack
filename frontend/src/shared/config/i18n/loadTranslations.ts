import { TranslationType } from './types';

export async function loadTranslations(
  locale: string
): Promise<TranslationType> {
  const defaultTranslations: TranslationType = {
    header: {
      logo: 'Logo',
      search: 'Search',
      contactUs: 'Contact Us',
    },
    card: {
      more_details: 'More details',
    },
    filters: {
      all: 'All',
      neva: 'Neva',
      xSolution: 'X-Solution',
      noBrands: 'No brands available',
    },
    products: {
      noMore: 'No more products',
      loading: 'Loading products...',
    },
    errors: {
      brands: 'Error loading brands',
      unknown: 'Unknown error occurred',
    },
  };

  try {
    const headerTranslations = await import(
      `@/shared/locales/${locale}/header.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.header
    );

    const cardTranslations = await import(
      `@/shared/locales/${locale}/card.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.card
    );

    const filtersTranslations = await import(
      `@/shared/locales/${locale}/filters.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.filters
    );

    const productsTranslations = await import(
      `@/shared/locales/${locale}/products.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.products
    );

    const errorsTranslations = await import(
      `@/shared/locales/${locale}/errors.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.errors
    );

    return {
      header: headerTranslations,
      card: cardTranslations,
      filters: filtersTranslations,
      products: productsTranslations,
      errors: errorsTranslations,
    };
  } catch (error) {
    console.error(
      `Unexpected error in loadTranslations for locale "${locale}":`,
      error
    );
    return defaultTranslations;
  }
}
