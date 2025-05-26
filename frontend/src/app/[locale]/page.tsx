import { ProductList } from '@/widgets/ProductList';
import { getRequestConfig } from '@/shared/config/i18n/i18n';

type PageProps = {
  params: { locale: string };
};

export default async function Home({ params }: PageProps) {
  const { locale } = await getRequestConfig({
    locale: params.locale,
  });
  const { messages } = await getRequestConfig({ locale });
  const section = 'all'; // or 'neva' based on your requirements
  return (
    <div>
      <ProductList locale={locale} section={section} messages={messages} />
    </div>
  );
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uz', 'kr'].map((locale) => ({ locale }));
}
