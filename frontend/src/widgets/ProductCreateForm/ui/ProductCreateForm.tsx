// frontend/src/widgets/ProductCreateForm/ui/ProductCreateForm.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
import { TranslationType } from '@/shared/config/i18n/types';
import { useProductForm } from '../model/useProductForm';
import styles from './ProductCreateForm.module.css';

// ✅ ДИАГНОСТИКА: Проверяем каждый импорт по отдельности
console.log('🔍 Checking imports...');

let ProductBasicInfo: any = null;
let ProductImageUpload: any = null;
let ProductDescription: any = null;
let ProductSpecifications: any = null;
let ProductFormActions: any = null;

try {
  const basicInfoModule = require('@/features/ProductBasicInfo');
  ProductBasicInfo = basicInfoModule.ProductBasicInfo;
  console.log('✅ ProductBasicInfo imported:', !!ProductBasicInfo);
} catch (e) {
  console.error('❌ ProductBasicInfo import failed:', e);
}

try {
  const imageUploadModule = require('@/features/ProductImageUpload');
  ProductImageUpload = imageUploadModule.ProductImageUpload;
  console.log('✅ ProductImageUpload imported:', !!ProductImageUpload);
} catch (e) {
  console.error('❌ ProductImageUpload import failed:', e);
}

try {
  const descriptionModule = require('@/features/ProductDescription');
  ProductDescription = descriptionModule.ProductDescription;
  console.log('✅ ProductDescription imported:', !!ProductDescription);
} catch (e) {
  console.error('❌ ProductDescription import failed:', e);
}

try {
  const specificationsModule = require('@/features/ProductSpecifications');
  ProductSpecifications = specificationsModule.ProductSpecifications;
  console.log('✅ ProductSpecifications imported:', !!ProductSpecifications);
} catch (e) {
  console.error('❌ ProductSpecifications import failed:', e);
}

try {
  const formActionsModule = require('@/features/ProductFormActions');
  ProductFormActions = formActionsModule.ProductFormActions;
  console.log('✅ ProductFormActions imported:', !!ProductFormActions);
} catch (e) {
  console.error('❌ ProductFormActions import failed:', e);
}

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

// ✅ FALLBACK компоненты для отсутствующих
const FallbackBasicInfo = ({ formData, errors, onUpdate }: any) => (
  <div
    style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}
  >
    <h3>ProductBasicInfo (Fallback)</h3>
    <p>Компонент не найден или не импортирован корректно</p>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => onUpdate({ name: e.target.value })}
      placeholder="Название продукта"
      style={{ width: '100%', padding: '8px', margin: '8px 0' }}
    />
  </div>
);

const FallbackImageUpload = ({ images, errors, onUpdate }: any) => (
  <div
    style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}
  >
    <h3>ProductImageUpload (Fallback)</h3>
    <p>Компонент не найден или не импортирован корректно</p>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        onUpdate(files);
      }}
      style={{ width: '100%', padding: '8px', margin: '8px 0' }}
    />
    <p>Загружено файлов: {images.length}</p>
  </div>
);

const FallbackDescription = ({ description, errors, onUpdate }: any) => (
  <div
    style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}
  >
    <h3>ProductDescription (Fallback)</h3>
    <p>Компонент не найден или не импортирован корректно</p>
    <textarea
      value={description}
      onChange={(e) => onUpdate(e.target.value)}
      placeholder="Описание продукта"
      style={{
        width: '100%',
        height: '100px',
        padding: '8px',
        margin: '8px 0',
      }}
    />
  </div>
);

const FallbackSpecifications = ({ specifications, errors, onUpdate }: any) => (
  <div
    style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}
  >
    <h3>ProductSpecifications (Fallback)</h3>
    <p>Компонент не найден или не импортирован корректно</p>
    <textarea
      value={specifications}
      onChange={(e) => onUpdate(e.target.value)}
      placeholder="Технические характеристики"
      style={{ width: '100%', height: '80px', padding: '8px', margin: '8px 0' }}
    />
  </div>
);

const FallbackFormActions = ({
  isLoading,
  isDirty,
  onSubmit,
  onReset,
  onCancel,
}: any) => (
  <div
    style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}
  >
    <h3>ProductFormActions (Fallback)</h3>
    <p>Компонент не найден или не импортирован корректно</p>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {isLoading ? 'Создание...' : 'Создать продукт'}
      </button>
      <button
        onClick={onReset}
        style={{
          padding: '10px 20px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Сбросить
      </button>
      <button
        onClick={onCancel}
        style={{
          padding: '10px 20px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Отмена
      </button>
    </div>
  </div>
);

const ProductCreateForm = ({ locale, messages }: ProductCreateFormProps) => {
  const {
    formData,
    errors,
    isLoading,
    isDirty,
    lastSaved,
    updateFormData,
    validateForm,
    submitForm,
    resetForm,
  } = useProductForm();

  // ✅ ДИАГНОСТИКА: Выбираем компоненты или fallback
  const BasicInfoComponent = ProductBasicInfo || FallbackBasicInfo;
  const ImageUploadComponent = ProductImageUpload || FallbackImageUpload;
  const DescriptionComponent = ProductDescription || FallbackDescription;
  const SpecificationsComponent =
    ProductSpecifications || FallbackSpecifications;
  const FormActionsComponent = ProductFormActions || FallbackFormActions;

  console.log('🔍 Component status:', {
    BasicInfoComponent: !!BasicInfoComponent,
    ImageUploadComponent: !!ImageUploadComponent,
    DescriptionComponent: !!DescriptionComponent,
    SpecificationsComponent: !!SpecificationsComponent,
    FormActionsComponent: !!FormActionsComponent,
  });

  const handleBasicInfoUpdate = useCallback(
    (updates: Partial<ProductFormData>) => {
      updateFormData(updates);
    },
    [updateFormData]
  );

  const handleImageUpdate = useCallback(
    (images: File[]) => {
      updateFormData({ images });
    },
    [updateFormData]
  );

  const handleDescriptionUpdate = useCallback(
    (description: string) => {
      updateFormData({ description });
    },
    [updateFormData]
  );

  const handleSpecificationsUpdate = useCallback(
    (specifications: string) => {
      updateFormData({ specifications });
    },
    [updateFormData]
  );

  const handleCancel = useCallback(() => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?'
      );
      if (!confirmLeave) {
        return;
      }
    }
    window.history.back();
  }, [isDirty]);

  const handleReset = useCallback(() => {
    if (isDirty) {
      const confirmReset = window.confirm(
        'Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.'
      );
      if (!confirmReset) {
        return;
      }
    }
    resetForm();
  }, [isDirty, resetForm]);

  const progressInfo = useMemo(() => {
    const requiredFields = [
      formData.section,
      formData.categoryId,
      formData.brandId,
      formData.name.trim(),
      formData.images.length > 0,
      formData.description.trim(),
    ];

    const filledCount = requiredFields.filter(Boolean).length;
    const totalCount = requiredFields.length;
    const percentage = (filledCount / totalCount) * 100;

    return {
      filledCount,
      totalCount,
      percentage: Math.round(percentage),
      isComplete: filledCount === totalCount,
    };
  }, [
    formData.section,
    formData.categoryId,
    formData.brandId,
    formData.name,
    formData.images.length,
    formData.description,
  ]);

  return (
    <div className={styles.container}>
      {/* Диагностическая информация */}
      <div
        style={{
          padding: '20px',
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>🔍 Диагностика компонентов</h3>
        <ul>
          <li>ProductBasicInfo: {ProductBasicInfo ? '✅ OK' : '❌ Missing'}</li>
          <li>
            ProductImageUpload: {ProductImageUpload ? '✅ OK' : '❌ Missing'}
          </li>
          <li>
            ProductDescription: {ProductDescription ? '✅ OK' : '❌ Missing'}
          </li>
          <li>
            ProductSpecifications:{' '}
            {ProductSpecifications ? '✅ OK' : '❌ Missing'}
          </li>
          <li>
            ProductFormActions: {ProductFormActions ? '✅ OK' : '❌ Missing'}
          </li>
        </ul>
        <p>
          <strong>Прогресс:</strong> {progressInfo.filledCount}/
          {progressInfo.totalCount} полей заполнено
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Секция 1: Базовая информация */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Основная информация</h2>
          <BasicInfoComponent
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            locale={locale}
            messages={messages}
            onUpdate={handleBasicInfoUpdate}
          />
        </section>

        {/* Секция 2: Загрузка изображений */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Изображения</h2>
          <ImageUploadComponent
            images={formData.images}
            errors={errors}
            onUpdate={handleImageUpdate}
          />
        </section>

        {/* Секция 3: Описание */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Описание</h2>
          <DescriptionComponent
            description={formData.description}
            errors={errors}
            onUpdate={handleDescriptionUpdate}
          />
        </section>

        {/* Секция 4: Характеристики */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Характеристики</h2>
          <SpecificationsComponent
            specifications={formData.specifications}
            errors={errors}
            onUpdate={handleSpecificationsUpdate}
          />
        </section>

        {/* Секция 5: Действия */}
        <section style={{ marginBottom: '30px' }}>
          <FormActionsComponent
            isLoading={isLoading}
            isDirty={isDirty}
            canSubmit={progressInfo.isComplete && !isLoading}
            onSubmit={submitForm}
            onReset={handleReset}
            onCancel={handleCancel}
          />
        </section>

        {/* Глобальные ошибки */}
        {errors.general && (
          <div
            style={{
              padding: '15px',
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24',
              marginTop: '20px',
            }}
          >
            <strong>Ошибка:</strong> {errors.general}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductCreateForm;
