// Путь: src/app/[locale]/admin/layout.tsx
import { ReactNode } from 'react';
import { Locale, isValidLocale } from '@/shared/config/i18n/types';
import { AuthProvider } from '@/shared/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : 'en';

  console.log('AdminLayout resolved locale:', locale);

  // const { messages } = await getRequestConfig({ locale });
  // const plainMessages = JSON.parse(JSON.stringify(messages)) as TranslationType;

  return (
    <AuthProvider
      baseUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}
    >
      {children}
    </AuthProvider>
  );
}
