// frontend/src/app/[locale]/admin/dashboard/brands/create/page.tsx

import { Locale, isValidLocale } from '@/shared/config/i18n/types';
import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import dynamic from 'next/dynamic';

// Динамический импорт BrandCreatePage для улучшения производительности
const BrandCreatePage = dynamic(
  () =>
    import('@/pages/BrandCreatePage').then((mod) => ({
      default: mod.BrandCreatePage,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Загрузка создания бренда...</p>
        </div>
      </div>
    ),
  }
);

interface BrandCreatePageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminBrandCreatePage({
  params,
}: BrandCreatePageProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('AdminBrandCreatePage resolved locale:', locale);

  return (
    <AdminRouteGuard redirectTo={`admin/`}>
      <BrandCreatePage />
    </AdminRouteGuard>
  );
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uz', 'kr'].map((locale) => ({ locale }));
}
