export const locales = ['en', 'ru', 'uz', 'kr'] as const;
export type Locale = (typeof locales)[number];

export enum TranslationKeys {
  HeaderLogo = 'header.logo',
  Search = 'header.search',
  ContactUs = 'header.contactUs',
  MoreDetails = 'card.more_details',
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

export type TranslationType = {
  header: Header;
  card: Card;
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
