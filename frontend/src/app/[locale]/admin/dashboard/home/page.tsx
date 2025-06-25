// app/[locale]/admin/dashboard/home/page.tsx
import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { AdminHomePage } from '@/pages/AdminHomePage';
import { getRequestConfig } from '@/shared/config/i18n/i18n';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';

interface AdminDashboardHomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboardHomePage({
  params,
}: AdminDashboardHomePageProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('AdminDashboardHomePage resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  return (
    <AdminRouteGuard redirectTo={`/admin/`}>
      <AdminHomePage locale={locale} messages={plainMessages} />
    </AdminRouteGuard>
  );
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uz', 'kr'].map((locale) => ({ locale }));
}
