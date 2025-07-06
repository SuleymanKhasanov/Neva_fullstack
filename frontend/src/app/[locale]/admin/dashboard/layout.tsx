// frontend/src/app/[locale]/admin/dashboard/layout.tsx
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт AdminDashboard для улучшения производительности
const AdminDashboard = dynamic(
  () =>
    import('@/widgets/AdminDashboard').then((mod) => ({
      default: mod.AdminDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Загрузка панели администратора...</p>
        </div>
      </div>
    ),
  }
);
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
