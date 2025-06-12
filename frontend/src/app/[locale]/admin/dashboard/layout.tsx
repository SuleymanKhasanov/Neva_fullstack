// frontend/src/app/[locale]/admin/dashboard/layout.tsx
import { ReactNode } from 'react';
import { AdminDashboard } from '@/widgets/AdminDashboard';
import {
  Locale,
  TranslationType,
  isValidLocale,
} from '@/shared/config/i18n/types';
import { getRequestConfig } from '@/shared/config/i18n/i18n';

interface AdminDashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboardLayout({
  children,
  params,
}: AdminDashboardLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('AdminDashboardLayout resolved locale:', locale);

  const { messages } = await getRequestConfig({ locale });
  const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  return (
    <AdminDashboard locale={locale} messages={plainMessages}>
      {children}
    </AdminDashboard>
  );
}
