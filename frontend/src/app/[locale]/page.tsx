import { getRequestConfig } from '@/shared/config/i18n/i18n';
import ProductListPage from '@/pages/ProductListPage/ProductListPage';

type PageProps = {
  params: { locale: string };
};

export default async function Home({ params }: PageProps) {
  const { locale } = await getRequestConfig({
    locale: params.locale,
  });
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
