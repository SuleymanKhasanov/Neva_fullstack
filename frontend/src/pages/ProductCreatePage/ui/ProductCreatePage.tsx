// frontend/src/pages/ProductCreatePage/ui/ProductCreatePage.tsx
'use client';

import React, { useMemo } from 'react';
import styles from './ProductCreatePage.module.css';
import { AdminCreateCategory } from '@/widgets/AdminCreateCategory';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { useTranslations } from 'next-intl';
import { ProductImagesUpload } from '@/widgets/ProductImagesUpload';
import { ProductDetails } from '@/widgets/ProductDetails';
import { ProductFormProgress } from '@/widgets/ProductFormProgress';
import {
  useSelectedSection,
  useSelectedCategory,
  useSelectedSubcategory,
  useSelectedBrand,
  useProductTranslations,
  useProductImages,
  useAdminCategoryActions,
  useIsCreatingProduct,
  useProductCreationError,
  useIsFormValid,
  useTemporaryMessage,
  useShowTemporaryMessage,
} from '@/shared/store/adminCategoryStore';

const ProductCreatePage = () => {
  const t = useTranslations();

  // Состояние из zustand store
  const selectedSection = useSelectedSection();
  const selectedCategory = useSelectedCategory();
  const selectedSubcategory = useSelectedSubcategory();
  const selectedBrand = useSelectedBrand();
  const productTranslations = useProductTranslations();
  const productImages = useProductImages();
  const isCreatingProduct = useIsCreatingProduct();
  const productCreationError = useProductCreationError();
  const isFormValid = useIsFormValid();
  const temporaryMessage = useTemporaryMessage();
  const isShowingTemporaryMessage = useShowTemporaryMessage();

  // Действия
  const {
    createProduct,
    resetForm,
    clearProductCreationError,
    showTemporaryMessage,
  } = useAdminCategoryActions();

  // Расчет прогресса заполнения
  const progress = useMemo(() => {
    // Структура формы: 17 полей = 100%
    const fields = [
      // 4 поля выбора
      Boolean(selectedSection), // Секция выбрана
      Boolean(selectedCategory), // Категория выбрана
      Boolean(selectedSubcategory), // Подкатегория выбрана
      Boolean(selectedBrand), // Бренд выбран

      // 1 поле изображений
      productImages.length > 0, // Минимум одно изображение

      // 4 поля названий для всех локалей (ru, en, uz, kr)
      Boolean(productTranslations.ru.name.trim()),
      Boolean(productTranslations.en.name.trim()),
      Boolean(productTranslations.uz.name.trim()),
      Boolean(productTranslations.kr.name.trim()),

      // 4 поля описаний для всех локалей (ru, en, uz, kr)
      Boolean(productTranslations.ru.description.trim()),
      Boolean(productTranslations.en.description.trim()),
      Boolean(productTranslations.uz.description.trim()),
      Boolean(productTranslations.kr.description.trim()),

      // 4 поля характеристик для всех локалей (ru, en, uz, kr)
      Boolean(productTranslations.ru.specifications.trim()),
      Boolean(productTranslations.en.specifications.trim()),
      Boolean(productTranslations.uz.specifications.trim()),
      Boolean(productTranslations.kr.specifications.trim()),
    ];

    const filled = fields.filter(Boolean).length;
    const total = fields.length;
    const percentage = Math.round((filled / total) * 100);

    return {
      filled,
      total,
      percentage,
      additionalFilled: 0,
      totalAdditional: 0,
      hasAllLanguages: filled === total,
    };
  }, [
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    productTranslations,
    productImages,
  ]);

  // Обработчик создания продукта
  const handleSubmit = async () => {
    if (!isFormValid) {
      console.warn('⚠️ Форма не валидна');
      return;
    }

    // Очищаем предыдущие ошибки
    clearProductCreationError();

    try {
      console.log('🚀 Начинаем создание продукта...');
      const success = await createProduct();

      if (success) {
        console.log('✅ Продукт успешно создан!');
        showTemporaryMessage(
          t(TranslationKeys.ProgressIndicatorSuccessMessage)
        );
      } else {
        console.error('❌ Создание продукта не удалось');
      }
    } catch (error) {
      console.error('💥 Ошибка создания продукта:', error);
    }
  };

  // Обработчик сброса формы
  const handleReset = () => {
    resetForm();
    showTemporaryMessage(t(TranslationKeys.ProgressIndicatorResetMessage));
    console.log('🔄 Форма сброшена');
  };

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

      {/* Форма создания продукта */}
      <AdminCreateCategory />
      <ProductImagesUpload />
      <ProductDetails />

      {/* Компонент прогресса с фиксированной позицией */}
      <ProductFormProgress
        progress={progress}
        isFormValid={isFormValid}
        isCreatingProduct={isCreatingProduct}
        productCreationError={productCreationError}
        temporaryMessage={temporaryMessage}
        showTemporaryMessage={isShowingTemporaryMessage}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onClearError={clearProductCreationError}
      />
    </div>
  );
};

export default ProductCreatePage;
