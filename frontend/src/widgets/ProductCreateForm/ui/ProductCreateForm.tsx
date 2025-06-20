// frontend/src/widgets/ProductCreateForm/ui/ProductCreateForm.tsx
'use client';

import { TranslationType } from '@/shared/config/i18n/types';
import { ProductBasicInfo } from '@/features/ProductBasicInfo';
import { ProductImageUpload } from '@/features/ProductImageUpload';
import { ProductDescription } from '@/features/ProductDescription';
import { ProductSpecifications } from '@/features/ProductSpecifications';
import { ProductFormActions } from '@/features/ProductFormActions';
import { useProductForm } from '../model/useProductForm';
import styles from './ProductCreateForm.module.css';

interface ProductCreateFormProps {
  locale: string;
  messages: TranslationType;
}

export interface ProductFormData {
  // Основные данные
  section: string | null;
  categoryId: number | null;
  subcategoryId: number | null;
  brandId: number | null;
  name: string;

  // Медиа
  images: File[];

  // Контент
  description: string;
  specifications: string;
}

const ProductCreateForm = ({ locale, messages }: ProductCreateFormProps) => {
  const {
    formData,
    errors,
    isLoading,
    isDirty,
    updateFormData,
    validateForm,
    submitForm,
    resetForm,
  } = useProductForm();

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Секция 1: Базовая информация */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Основная информация</h2>
          <ProductBasicInfo
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            locale={locale}
            messages={messages}
            onUpdate={updateFormData}
          />
        </section>

        {/* Секция 2: Загрузка изображений */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Изображения</h2>
          <ProductImageUpload
            images={formData.images}
            errors={errors}
            onUpdate={(images) => updateFormData({ images })}
          />
        </section>

        {/* Секция 3: Описание */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Описание</h2>
          <ProductDescription
            description={formData.description}
            errors={errors}
            onUpdate={(description) => updateFormData({ description })}
          />
        </section>

        {/* Секция 4: Характеристики */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Характеристики</h2>
          <ProductSpecifications
            specifications={formData.specifications}
            errors={errors}
            onUpdate={(specifications) => updateFormData({ specifications })}
          />
        </section>

        {/* Секция 5: Действия */}
        <section className={styles.actionsSection}>
          <ProductFormActions
            isLoading={isLoading}
            isDirty={isDirty}
            onSubmit={submitForm}
            onReset={resetForm}
            onCancel={() => window.history.back()}
          />
        </section>
      </form>
    </div>
  );
};

export default ProductCreateForm;
