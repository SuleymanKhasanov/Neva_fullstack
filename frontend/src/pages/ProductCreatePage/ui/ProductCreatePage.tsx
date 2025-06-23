// frontend/src/pages/ProductCreatePage/ui/ProductCreatePage.tsx
'use client';

import { TranslationType } from '@/shared/config/i18n/types';
import { ProductCreateForm } from '@/widgets/ProductCreateForm';
import styles from './ProductCreatePage.module.css';

interface ProductCreatePageProps {
  locale: string;
  messages: TranslationType;
}

const ProductCreatePage = ({ locale, messages }: ProductCreatePageProps) => {
  return (
    <div className={styles.container}>
      <ProductCreateForm locale={locale} messages={messages} />
    </div>
  );
};

export default ProductCreatePage;
