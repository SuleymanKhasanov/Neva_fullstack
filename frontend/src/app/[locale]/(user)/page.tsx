import { getRequestConfig } from '@/shared/config/i18n/i18n';
import ProductListPage from '@/pages/ProductListPage/ProductListPage';
import { isValidLocale, Locale } from '@/shared/config/i18n/types';

interface UserHomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function UserHomePage({ params }: UserHomePageProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('UserHomePage resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });

  return (
    <div>
      <ProductListPage locale={locale} messages={messages} />
    </div>
  );
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uz', 'kr'].map((locale) => ({ locale }));
}
