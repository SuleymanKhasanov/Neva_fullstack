import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';
import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { ProductCreatePage } from '@/pages/ProductCreatePage';

interface ProductCreatePageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminProductCreatePage({
  params,
}: ProductCreatePageProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('AdminProductCreatePage resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  return (
    <AdminRouteGuard redirectTo={`admin/`}>
      <ProductCreatePage locale={locale} messages={plainMessages} />
    </AdminRouteGuard>
  );
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uz', 'kr'].map((locale) => ({ locale }));
}
