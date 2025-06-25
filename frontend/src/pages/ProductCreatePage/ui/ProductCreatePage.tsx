// frontend/src/pages/ProductCreatePage/ui/ProductCreatePage.tsx
'use client';

import { TranslationType } from '@/shared/config/i18n/types';
import styles from './ProductCreatePage.module.css';
import { AdminCreateCategory } from '@/widgets/AdminCreateCategory';

interface ProductCreatePageProps {
  locale: string;
  messages: TranslationType;
}

const ProductCreatePage = ({ locale, messages }: ProductCreatePageProps) => {
  return (
    <div className={styles.container}>
      <AdminCreateCategory />
    </div>
  );
};

export default ProductCreatePage;
