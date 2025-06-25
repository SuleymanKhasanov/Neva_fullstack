// shared/config/i18n/loadTranslations.ts
export async function loadTranslations(locale: string) {
  const defaultTranslations = {
    header: {
      logo: 'Logo',
      search: 'Search',
      languageSwitcherLabel: 'Select language',
      contactUs: 'Contact Us',
    },
    card: {
      more_details: 'More details',
    },
    filters: {
      all: 'All',
      neva: 'NEVA',
      xSolution: 'X-SOLUTION',
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
      subtitle: 'Login to access management',
      username: 'Username',
      password: 'Password',
      usernameRequired: 'Username is required',
      usernameMinLength: 'Username must be at least 3 characters',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
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
    // Новые переводы для админ главной страницы
    admin_home: {
      title: 'Dashboard',
      subtitle: 'Manage products, categories and system',
      stats: {
        products: {
          title: 'Products',
          description: 'Total number of products in catalog',
        },
        categories: {
          title: 'Categories',
          description: 'Number of main categories',
        },
        subcategories: {
          title: 'Subcategories',
          description: 'Number of subcategories in all sections',
        },
        brands: {
          title: 'Brands',
          description: 'Total number of brands in system',
        },
      },
      loading: 'Loading...',
      error: {
        title: 'Loading Error',
        description: 'Failed to load statistics',
        demo: 'Demo data shown',
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

    // Загрузка новых переводов для админ главной страницы
    const adminHomeTranslations = await import(
      `@/shared/locales/${locale}/admin_home.json`
    ).then(
      (module) => module.default,
      () => defaultTranslations.admin_home
    );

    return {
      header: headerTranslations,
      card: cardTranslations,
      filters: filtersTranslations,
      products: productsTranslations,
      errors: errorsTranslations,
      auth: authTranslations,
      admin_home: adminHomeTranslations,
    };
  } catch (error) {
    console.error(
      `Unexpected error in loadTranslations for locale "${locale}":`,
      error
    );
    return defaultTranslations;
  }
}
