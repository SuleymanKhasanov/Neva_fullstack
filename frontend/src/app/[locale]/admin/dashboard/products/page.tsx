import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт AdminProductsListPage для улучшения производительности
const AdminProductsListPage = dynamic(
  () =>
    import('@/pages/AdminProductsListPage').then((mod) => ({
      default: mod.AdminProductsListPage,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Загрузка списка продуктов...</p>
        </div>
      </div>
    ),
  }
);
import { loadTranslations } from '@/shared/config/i18n/loadTranslations';

interface AdminProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    section?: string;
    brandId?: string;
  }>;
}

export default async function AdminProductsPage({
  params,
  searchParams,
}: AdminProductsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { locale } = resolvedParams;
  const { section, brandId } = resolvedSearchParams;

  return (
    <AdminProductsListPage
      locale={locale}
      section={section}
      brandId={brandId ? parseInt(brandId) : undefined}
    />
  );
}

export async function generateMetadata({ params }: AdminProductsPageProps) {
  const resolvedParams = await params;
  const translations = await loadTranslations(resolvedParams.locale);

  return {
    title: `${translations.admin_products_list.title} | ${translations.auth.title}`,
    description: translations.admin_products_list.title,
  };
}
