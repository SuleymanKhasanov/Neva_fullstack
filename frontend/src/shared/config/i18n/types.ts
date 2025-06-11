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
    [key: string]: string;
  };
  [key: string]: string | object;
};

export type TranslationType = {
  header: Header;
  card: Card;
  filters: Filters;
  products: Products;
  errors: Errors;
  auth: Auth;
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
