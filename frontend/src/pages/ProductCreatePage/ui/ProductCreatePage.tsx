// frontend/src/pages/ProductCreatePage/ui/ProductCreatePage.tsx
'use client';

import styles from './ProductCreatePage.module.css';
import { AdminCreateCategory } from '@/widgets/AdminCreateCategory';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { useTranslations } from 'next-intl';
import { ProductImagesUpload } from '@/widgets/ProductImagesUpload';

const ProductCreatePage = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t(TranslationKeys.ProductCreateTitle)}
        </h1>
        <p className={styles.subtitle}>
          {t(TranslationKeys.ProductCreateSubtitle)}
        </p>
      </div>
      <AdminCreateCategory />
      <ProductImagesUpload />
    </div>
  );
};

export default ProductCreatePage;
