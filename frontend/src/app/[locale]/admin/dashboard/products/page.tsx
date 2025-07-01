import React from 'react';
import { AdminProductsListPage } from '@/pages/AdminProductsListPage';
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
