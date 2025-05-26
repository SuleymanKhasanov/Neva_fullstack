import { NextIntlClientProvider } from 'next-intl';
import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';
import '@/shared/styles/globals.css';
import { ReactNode } from 'react';
import { MainContentBox } from '@/entities/MainContentBox';
import { Header } from '@/widgets/Header';
import { LoadingProvider } from '@/features/LoadingManager';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('LocaleLayout resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  console.log('Messages in LocaleLayout:', plainMessages);

  return (
    <main>
      <LoadingProvider>
        <NextIntlClientProvider
          locale={locale}
          messages={plainMessages}
          key={locale}
        >
          <MainContentBox locale={locale} messages={plainMessages}>
            <Header locale={locale} messages={plainMessages} />
            {children}
          </MainContentBox>
        </NextIntlClientProvider>
      </LoadingProvider>
    </main>
  );
}
