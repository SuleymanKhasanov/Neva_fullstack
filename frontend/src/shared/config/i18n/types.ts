// shared/config/i18n/types.ts
export const locales = ['en', 'ru', 'uz', 'kr'] as const;
export type Locale = (typeof locales)[number];

export enum TranslationKeys {
  // Header
  HeaderLogo = 'header.logo',
  Search = 'header.search',
  ContactUs = 'header.contactUs',

  // Card
  MoreDetails = 'card.more_details',

  // Filters
  FiltersAll = 'filters.all',
  FiltersNeva = 'filters.neva',
  FiltersXSolution = 'filters.xSolution',
  FiltersNoBrands = 'filters.noBrands',

  // Products
  ProductsNoMore = 'products.noMore',
  ProductsLoading = 'products.loading',

  // Errors
  ErrorsBrands = 'errors.brands',
  ErrorsUnknown = 'errors.unknown',

  // Auth
  AuthTitle = 'auth.title',
  AuthSubtitle = 'auth.subtitle',
  AuthUsername = 'auth.username',
  AuthPassword = 'auth.password',
  AuthUsernameRequired = 'auth.usernameRequired',
  AuthUsernameMinLength = 'auth.usernameMinLength',
  AuthPasswordRequired = 'auth.passwordRequired',
  AuthPasswordMinLength = 'auth.passwordMinLength',
  AuthLoginButton = 'auth.loginButton',
  AuthLoggingIn = 'auth.loggingIn',
  AuthInvalidCredentials = 'auth.invalidCredentials',
  AuthServerError = 'auth.serverError',
  AuthNetworkError = 'auth.networkError',
  AuthUnexpectedError = 'auth.unexpectedError',
  AuthUsernamePlaceholder = 'auth.usernamePlaceholder',
  AuthPasswordPlaceholder = 'auth.passwordPlaceholder',
  AuthLoading = 'auth.loading',

  // Admin
  AdminLogout = 'auth.dashboard.logout',

  // Admin Home
  AdminHomeTitle = 'admin_home.title',
  AdminHomeSubtitle = 'admin_home.subtitle',
  AdminHomeStatsProductsTitle = 'admin_home.stats.products.title',
  AdminHomeStatsProductsDescription = 'admin_home.stats.products.description',
  AdminHomeStatsCategoriesTitle = 'admin_home.stats.categories.title',
  AdminHomeStatsCategoriesDescription = 'admin_home.stats.categories.description',
  AdminHomeStatsSubcategoriesTitle = 'admin_home.stats.subcategories.title',
  AdminHomeStatsSubcategoriesDescription = 'admin_home.stats.subcategories.description',
  AdminHomeStatsBrandsTitle = 'admin_home.stats.brands.title',
  AdminHomeStatsBrandsDescription = 'admin_home.stats.brands.description',
  AdminHomeLoading = 'admin_home.loading',
  AdminHomeErrorTitle = 'admin_home.error.title',
  AdminHomeErrorDescription = 'admin_home.error.description',
  AdminHomeErrorDemo = 'admin_home.error.demo',

  SidebarDashboard = 'sidebar.dashboard',
  SidebarProductsCreate = 'sidebar.productsCreate',
  SidebarProductsList = 'sidebar.productsList',
}

export type Header = {
  logo: string;
  search: string;
  contactUs: string;
  [key: string]: string;
};

export type Card = {
  more_details: string;
  [key: string]: string;
};

export type Filters = {
  all: string;
  neva: string;
  xSolution: string;
  noBrands: string;
  [key: string]: string;
};

export type Products = {
  noMore: string;
  loading: string;
  [key: string]: string;
};

export type Errors = {
  brands: string;
  unknown: string;
  [key: string]: string;
};

export type Auth = {
  title: string;
  subtitle: string;
  username: string;
  password: string;
  usernameRequired: string;
  usernameMinLength: string;
  passwordRequired: string;
  passwordMinLength: string;
  loginButton: string;
  loggingIn: string;
  invalidCredentials: string;
  serverError: string;
  networkError: string;
  unexpectedError: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loading: string;
  dashboard: {
    title: string;
    welcome: string;
    logout: string;
    users: string;
    usersDescription: string;
    settings: string;
    settingsDescription: string;
    reports: string;
    reportsDescription: string;
    statistics: string;
    statisticsDescription: string;
    systemStatus: string;
  };
  [key: string]: unknown;
};

// Новый тип для admin_home переводов
export type AdminHome = {
  title: string;
  subtitle: string;
  stats: {
    products: {
      title: string;
      description: string;
    };
    categories: {
      title: string;
      description: string;
    };
    subcategories: {
      title: string;
      description: string;
    };
    brands: {
      title: string;
      description: string;
    };
  };
  loading: string;
  error: {
    title: string;
    description: string;
    demo: string;
  };
  [key: string]: unknown;
};

export type Sidebar = {
  dashboard: string;
  productsCreate: string;
  productsList: string;
  [key: string]: unknown;
};

export type ProductCreate = {
  title: string;
  subtitle: string;
  sections: {
    basicInfo: {
      title: string;
      description: string;
    };
    images: {
      title: string;
      description: string;
    };
    details: {
      title: string;
      description: string;
    };
  };
  fields: {
    section: {
      label: string;
      placeholder: string;
      required: string;
    };
    category: {
      label: string;
      placeholder: string;
      loading: string;
      selectSectionFirst: string;
      required: string;
    };
    subcategory: {
      label: string;
      placeholder: string;
      loading: string;
      selectCategoryFirst: string;
      notAvailable: string;
    };
    brand: {
      label: string;
      placeholder: string;
      loading: string;
      selectSubcategoryFirst: string;
      notAvailable: string;
    };
    productName: {
      label: string;
      placeholder: string;
      required: string;
    };
    articleNumber: {
      label: string;
      placeholder: string;
    };
    price: {
      label: string;
      placeholder: string;
    };
  };
  sections_names: {
    neva: string;
    x_solution: string;
  };
  loading: {
    categories: string;
    subcategories: string;
    brands: string;
  };
  [key: string]: unknown;
};

export type TranslationType = {
  header: Header;
  card: Card;
  filters: Filters;
  products: Products;
  errors: Errors;
  auth: Auth;
  admin_home: AdminHome;
  sidebar: Sidebar;
  product_create: ProductCreate;
  [key: string]: unknown;
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
