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
      <div className={styles.header}>
        <h1 className={styles.title}>Создание продукта</h1>
        <p className={styles.subtitle}>
          Заполните форму для добавления нового продукта в каталог
        </p>
      </div>

      <div className={styles.content}>
        <ProductCreateForm locale={locale} messages={messages} />
      </div>
    </div>
  );
};

export default ProductCreatePage;
