import { ReactNode } from 'react';
import { MainContentBox } from '@/entities/MainContentBox';
import { Header } from '@/widgets/Header';
import { LoadingProvider } from '@/features/LoadingManager';
import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';

interface UserLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function UserLayout({
  children,
  params,
}: UserLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('UserLayout resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  return (
    <LoadingProvider>
      <MainContentBox locale={locale} messages={plainMessages}>
        <Header locale={locale} messages={plainMessages} />
        {children}
      </MainContentBox>
    </LoadingProvider>
  );
}
