// frontend/src/pages/ProductCreatePage/ui/ProductCreatePage.tsx
'use client';

import React, { useMemo } from 'react';
import styles from './ProductCreatePage.module.css';
import { AdminCreateCategory } from '@/widgets/AdminCreateCategory';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { useTranslations } from 'next-intl';
import { ProductImagesUpload } from '@/widgets/ProductImagesUpload';
import { ProductDetails } from '@/widgets/ProductDetails';
import {
  useSelectedSection,
  useSelectedCategory,
  useProductTranslations,
  useProductImages,
  useAdminCategoryActions,
  useIsCreatingProduct,
  useProductCreationError,
  useIsFormValid,
} from '@/shared/store/adminCategoryStore';

const ProductCreatePage = () => {
  const t = useTranslations();

  // Состояние из zustand store
  const selectedSection = useSelectedSection();
  const selectedCategory = useSelectedCategory();
  const productTranslations = useProductTranslations();
  const productImages = useProductImages();
  const isCreatingProduct = useIsCreatingProduct();
  const productCreationError = useProductCreationError();
  const isFormValid = useIsFormValid();

  // Действия
  const { createProduct, resetForm, clearProductCreationError } =
    useAdminCategoryActions();

  // Расчет прогресса заполнения
  const progress = useMemo(() => {
    const fields = [
      Boolean(selectedSection), // Секция выбрана
      Boolean(selectedCategory), // Категория выбрана
      Boolean(productTranslations.ru.name.trim()), // Название на русском (обязательно)
      Boolean(productTranslations.ru.description.trim()), // Описание на русском
      productImages.length > 0, // Минимум одно изображение
    ];

    const filled = fields.filter(Boolean).length;
    const total = fields.length;
    const percentage = Math.round((filled / total) * 100);

    // Дополнительные поля (необязательные, но желательные)
    const additionalFields = [
      Boolean(productTranslations.en.name.trim()), // Название на английском
      Boolean(productTranslations.uz.name.trim()), // Название на узбекском
      Boolean(productTranslations.kr.name.trim()), // Название на корейском
    ];

    const additionalFilled = additionalFields.filter(Boolean).length;
    const totalAdditional = additionalFields.length;

    return {
      filled,
      total,
      percentage,
      additionalFilled,
      totalAdditional,
      hasAllLanguages: additionalFilled === totalAdditional,
    };
  }, [selectedSection, selectedCategory, productTranslations, productImages]);

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
        alert('🎉 Продукт успешно создан!');
      } else {
        console.error('❌ Создание продукта не удалось');
      }
    } catch (error) {
      console.error('💥 Ошибка создания продукта:', error);
    }
  };

  // Обработчик сброса формы
  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить все данные?')) {
      resetForm();
      console.log('🔄 Форма сброшена');
    }
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

      {/* ВРЕМЕННАЯ ПАНЕЛЬ ДЕЙСТВИЙ */}
      <div className={styles.actionPanel}>
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <h3 className={styles.progressTitle}>Прогресс заполнения</h3>
            <div className={styles.progressDetails}>
              <span className={styles.percentage}>{progress.percentage}%</span>
              <span className={styles.details}>
                {progress.filled} из {progress.total} обязательных полей
                заполнено
              </span>
              <span className={styles.additionalDetails}>
                Названия на языках: {progress.additionalFilled} из{' '}
                {progress.totalAdditional}
                {progress.hasAllLanguages && ' ✅'}
              </span>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>

          {!isFormValid && (
            <div className={styles.statusMessage}>
              ⚠️ Заполните все обязательные поля для создания продукта
            </div>
          )}

          {isFormValid && !progress.hasAllLanguages && (
            <div className={styles.warningMessage}>
              ⚠️ Рекомендуется заполнить названия на всех языках
            </div>
          )}

          {isFormValid && progress.hasAllLanguages && (
            <div className={styles.completeMessage}>
              ✅ Все поля заполнены! Продукт готов к созданию
            </div>
          )}
        </div>

        {/* Кнопки действий */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={isCreatingProduct}
          >
            🔄 Сбросить форму
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className={`${styles.submitButton} ${
              isFormValid ? styles.complete : styles.incomplete
            }`}
            disabled={isCreatingProduct || !isFormValid}
          >
            {isCreatingProduct ? (
              <>
                <span className={styles.spinner} />
                Создание...
              </>
            ) : (
              <>
                {isFormValid ? '✅ ' : '❌ '}
                Создать продукт
              </>
            )}
          </button>
        </div>
      </div>

      {/* Отображение ошибок */}
      {productCreationError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          <span>{productCreationError}</span>
          <button
            className={styles.closeError}
            onClick={clearProductCreationError}
          >
            ✕
          </button>
        </div>
      )}

      {/* Отладочная информация */}
      <details className={styles.debugInfo}>
        <summary>🔍 Отладочная информация</summary>
        <pre className={styles.debugData}>
          {JSON.stringify(
            {
              selectedSection,
              selectedCategory,
              hasImages: productImages.length,
              hasRuName: Boolean(productTranslations.ru.name.trim()),
              hasRuDescription: Boolean(
                productTranslations.ru.description.trim()
              ),
              isFormValid,
              isCreatingProduct,
              progress,
            },
            null,
            2
          )}
        </pre>
      </details>
    </div>
  );
};

export default ProductCreatePage;
