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
    auth: {
      title: 'Admin Panel',
      subtitle: 'Log in to access the management',
      username: 'Username',
      password: 'Password',
      usernameRequired: 'Username is required',
      usernameMinLength: 'Minimum 3 characters',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Minimum 6 characters',
      loginButton: 'Sign In',
      loggingIn: 'Signing in...',
      invalidCredentials: 'Invalid username or password',
      serverError: 'Server error. Please try again later',
      networkError: 'Connection error to server',
      unexpectedError: 'Unexpected error. Please try again later',
      usernamePlaceholder: 'Enter your username',
      passwordPlaceholder: 'Enter your password',
      loading: 'Loading...',
      dashboard: {
        title: 'Admin Panel',
        welcome: 'Welcome, {username}!',
        logout: 'Logout',
        users: 'Users',
        usersDescription: 'User management system',
        settings: 'Settings',
        settingsDescription: 'System configuration',
        reports: 'Reports',
        reportsDescription: 'View analytics and reports',
        statistics: 'Statistics',
        statisticsDescription: 'Charts and statistics will be displayed here',
        systemStatus: '✅ System is running',
      },
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

    const authTranslations = await import(
      `@/shared/locales/${locale}/auth.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.auth
    );

    return {
      header: headerTranslations,
      card: cardTranslations,
      filters: filtersTranslations,
      products: productsTranslations,
      errors: errorsTranslations,
      auth: authTranslations,
    };
  } catch (error) {
    console.error(
      `Unexpected error in loadTranslations for locale "${locale}":`,
      error
    );
    return defaultTranslations;
  }
}
