// frontend/src/widgets/ProductCreateForm/ui/ProductCreateForm.tsx - РАБОЧАЯ ВЕРСИЯ
'use client';

import React, { useState } from 'react';
import { TranslationType } from '@/shared/config/i18n/types';
import { SectionSelect } from '@/features/SectionSelect';
import { CategorySelect } from '@/features/CategorySelect';
import { ProductImageUpload } from '@/features/ProductImageUpload';
import { FloatingActionBar } from '@/shared/ui/FloatingActionBar/FloatingActionBar';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
import styles from './ProductCreateForm.module.css';

interface ProductFormData {
  section: 'NEVA' | 'X_SOLUTION' | null;
  categoryId: number | null;
  subcategoryId: number | null;
  brandId: number | null;
  name: string;
  images: File[];
  description: string;
  specifications: string;
}

interface ProductCreateFormProps {
  locale: string;
  messages: TranslationType;
}

export const ProductCreateForm: React.FC<ProductCreateFormProps> = ({
  locale,
  messages,
}) => {
  const { adminApi, get, post } = useAdminApi();

  // Состояние формы
  const [formData, setFormData] = useState<ProductFormData>({
    section: null,
    categoryId: null,
    subcategoryId: null,
    brandId: null,
    name: '',
    images: [],
    description: '',
    specifications: '',
  });

  // Состояние UI
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Обновление данных формы
  const updateField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очистка ошибки для обновленного поля
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Сброс зависимых полей
    if (field === 'section') {
      setFormData((prev) => ({
        ...prev,
        categoryId: null,
        subcategoryId: null,
        brandId: null,
      }));
    } else if (field === 'categoryId') {
      setFormData((prev) => ({
        ...prev,
        subcategoryId: null,
        brandId: null,
      }));
    }
  };

  // Расчет прогресса
  const calculateProgress = () => {
    const requiredFields = [
      formData.section,
      formData.categoryId,
      formData.name.trim(),
      formData.images.length > 0,
      formData.description.trim(),
    ];

    const filled = requiredFields.filter(
      (field) => field !== null && field !== '' && field !== false
    ).length;

    return {
      filled,
      total: requiredFields.length,
      percentage: Math.round((filled / requiredFields.length) * 100),
    };
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.section) newErrors.section = 'Выберите секцию';
    if (!formData.categoryId) newErrors.categoryId = 'Выберите категорию';
    if (!formData.name.trim()) newErrors.name = 'Введите название продукта';
    if (formData.images.length === 0)
      newErrors.images = 'Загрузите минимум 1 изображение';
    if (!formData.description.trim())
      newErrors.description = 'Введите описание продукта';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Создание продукта
      const productData = {
        section: formData.section,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        brandId: formData.brandId || 1, // Временно используем ID 1
        isActive: true,
        translations: [
          {
            locale: locale,
            name: formData.name,
            description: formData.description,
            marketingDescription: formData.description,
          },
        ],
        specifications: formData.specifications
          ? [
              {
                key: 'general',
                translations: [
                  {
                    locale: locale,
                    name: 'Характеристики',
                    value: formData.specifications,
                  },
                ],
              },
            ]
          : [],
      };

      const response = await post('/admin/products', productData);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка создания продукта');
      }

      // Загрузка изображений
      if (result.id && formData.images.length > 0) {
        const imageFormData = new FormData();
        formData.images.forEach((image) => {
          imageFormData.append('images', image);
        });

        const imageResponse = await fetch(
          `/admin/products/${result.id}/images`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`,
            },
            body: imageFormData,
          }
        );

        if (!imageResponse.ok) {
          console.warn('Ошибка загрузки изображений');
        }
      }

      // Успех
      alert('Продукт успешно создан!');
      handleReset();
    } catch (error) {
      console.error('Ошибка создания продукта:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Неизвестная ошибка',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Сброс формы
  const handleReset = () => {
    setFormData({
      section: null,
      categoryId: null,
      subcategoryId: null,
      brandId: null,
      name: '',
      images: [],
      description: '',
      specifications: '',
    });
    setErrors({});
  };

  const progress = calculateProgress();

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>Создание продукта</h1>
        <p className={styles.subtitle}>
          Заполните все необходимые поля для создания нового продукта
        </p>
      </div>

      {/* Основная форма */}
      <div className={styles.form}>
        {/* Выбор секции */}
        <section className={styles.section}>
          <SectionSelect
            value={formData.section}
            onChange={(value) => updateField('section', value)}
            error={errors.section}
            disabled={isLoading}
            locale={locale}
            messages={messages}
          />
        </section>

        {/* Выбор категории */}
        {formData.section && (
          <section className={styles.section}>
            <CategorySelect
              section={formData.section}
              value={formData.categoryId}
              onChange={(value) => updateField('categoryId', value)}
              error={errors.categoryId}
              disabled={isLoading}
              locale={locale}
              messages={messages}
            />
          </section>
        )}

        {/* Название продукта */}
        {formData.categoryId && (
          <section className={styles.section}>
            <div className={styles.field}>
              <h3 className={styles.fieldTitle}>Название продукта</h3>
              <p className={styles.fieldDescription}>
                Введите четкое и понятное название продукта
              </p>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Введите название продукта"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>
          </section>
        )}

        {/* Загрузка изображений */}
        {formData.name && (
          <section className={styles.section}>
            <ProductImageUpload
              images={formData.images}
              onChange={(images) => updateField('images', images)}
              error={errors.images}
              disabled={isLoading}
              locale={locale}
              messages={messages}
            />
          </section>
        )}

        {/* Описание */}
        {formData.images.length > 0 && (
          <section className={styles.section}>
            <div className={styles.field}>
              <h3 className={styles.fieldTitle}>Описание продукта</h3>
              <p className={styles.fieldDescription}>
                Подробно опишите функции, характеристики и преимущества продукта
              </p>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Введите подробное описание продукта..."
                rows={5}
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>
          </section>
        )}

        {/* Характеристики */}
        {formData.description && (
          <section className={styles.section}>
            <div className={styles.field}>
              <h3 className={styles.fieldTitle}>
                Технические характеристики
                <span className={styles.optional}>(опционально)</span>
              </h3>
              <p className={styles.fieldDescription}>
                Укажите технические параметры, спецификации и дополнительную
                информацию
              </p>
              <textarea
                value={formData.specifications}
                onChange={(e) => updateField('specifications', e.target.value)}
                placeholder="Процессор: Intel Core i7&#10;Память: 16 ГБ DDR4&#10;Диск: SSD 512 ГБ&#10;Гарантия: 2 года"
                rows={4}
                className={styles.textarea}
                disabled={isLoading}
              />
              <div className={styles.hint}>
                💡 Можете использовать любой формат: списки, таблицы или
                свободный текст
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Глобальные ошибки */}
      {errors.general && (
        <div className={styles.globalError}>
          <strong>Ошибка:</strong> {errors.general}
        </div>
      )}

      {/* Плавающий бар действий */}
      <FloatingActionBar
        progress={progress}
        isLoading={isLoading}
        canSubmit={progress.percentage === 100}
        onSubmit={handleSubmit}
        onReset={handleReset}
        submitText="Создать продукт"
        resetText="Сбросить"
      />
    </div>
  );
};
