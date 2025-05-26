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

    return {
      header: headerTranslations,
      card: cardTranslations,
    };
  } catch (error) {
    console.error(
      `Unexpected error in loadTranslations for locale "${locale}":`,
      error
    );
    return defaultTranslations;
  }
}
