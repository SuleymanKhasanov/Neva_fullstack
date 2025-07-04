// frontend/src/pages/BrandCreatePage/ui/BrandCreatePage.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
import styles from './BrandCreatePage.module.css';
import { BrandFormSelects } from '@/widgets/BrandFormSelects';
import { FormProgress } from '@/shared/ui/FormProgress';
import {
  useBrandSelectedSection,
  useBrandSelectedCategory,
  useBrandSelectedSubcategory,
  useBrandActions,
} from '@/shared/store/brandCreateStore';

const BrandCreatePage = () => {
  const t = useTranslations();

  // ==================== ЛОКАЛЬНОЕ СОСТОЯНИЕ ====================
  const [brandName, setBrandName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temporaryMessage, setTemporaryMessage] = useState('');
  const [showTemporaryMessage, setShowTemporaryMessage] = useState(false);

  // ==================== СОСТОЯНИЕ ИЗ BRAND STORE ====================
  const selectedSection = useBrandSelectedSection();
  const selectedCategory = useBrandSelectedCategory();
  const selectedSubcategory = useBrandSelectedSubcategory();

  // Действия
  const { resetForm } = useBrandActions();

  // ==================== ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ====================

  // Валидация формы
  const isFormValid = useMemo(() => {
    return Boolean(
      selectedSection && selectedCategory && brandName.trim().length >= 2
    );
  }, [selectedSection, selectedCategory, brandName]);

  // Расчет прогресса заполнения (3 обязательных поля = 100%)
  const progress = useMemo(() => {
    const requiredFields = [
      Boolean(selectedSection), // Секция выбрана
      Boolean(selectedCategory), // Категория выбрана
      Boolean(brandName.trim().length >= 2), // Название бренда введено
    ];

    const optionalFields = [
      Boolean(selectedSubcategory), // Подкатегория выбрана (опционально)
    ];

    const filledRequired = requiredFields.filter(Boolean).length;
    const totalRequired = requiredFields.length;
    const filledOptional = optionalFields.filter(Boolean).length;
    const totalOptional = optionalFields.length;

    const percentage = Math.round((filledRequired / totalRequired) * 100);

    return {
      filled: filledRequired,
      total: totalRequired,
      percentage,
      additionalFilled: filledOptional,
      totalAdditional: totalOptional,
      hasAllLanguages: filledRequired === totalRequired,
    };
  }, [selectedSection, selectedCategory, selectedSubcategory, brandName]);

  // ==================== ОБРАБОТЧИКИ ====================

  const handleBrandNameChange = useCallback((value: string) => {
    setBrandName(value);
    setError(null); // Очищаем ошибку при изменении
  }, []);

  const showMessage = useCallback((message: string, duration = 3000) => {
    setTemporaryMessage(message);
    setShowTemporaryMessage(true);
    setTimeout(() => {
      setShowTemporaryMessage(false);
      setTemporaryMessage('');
    }, duration);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      console.warn('⚠️ Форма не валидна');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      console.log('🚀 Начинаем создание бренда...');

      // Подготавливаем данные для отправки
      const brandData = {
        section: selectedSection,
        categoryIds: [selectedCategory],
        subcategoryIds: selectedSubcategory ? [selectedSubcategory] : [],
        translations: [
          {
            locale: 'ru' as const,
            name: brandName.trim(),
          },
          {
            locale: 'en' as const,
            name: brandName.trim(),
          },
          {
            locale: 'uz' as const,
            name: brandName.trim(),
          },
          {
            locale: 'kr' as const,
            name: brandName.trim(),
          },
        ],
      };

      // Получаем токен авторизации
      const token =
        localStorage.getItem('admin_access_token') ||
        localStorage.getItem('accessToken') ||
        localStorage.getItem('access_token');

      console.log('🔑 Найденный токен:', token ? 'есть' : 'отсутствует');

      if (!token) {
        throw new Error(t(TranslationKeys.BrandCreateAuthTokenNotFound));
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      console.log('🌐 Base URL:', baseUrl);

      // Отправляем запрос на создание бренда
      const url = `${baseUrl}/admin/brands/create-with-categories`;
      console.log('📤 Отправляем запрос на:', url);
      console.log('📦 Данные бренда:', brandData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(brandData),
      });

      console.log(
        `📡 Ответ создания бренда: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        let errorData: { message?: string | string[] } = {};
        try {
          const text = await response.text();
          console.log('📄 Ответ сервера (текст):', text);

          if (text) {
            errorData = JSON.parse(text);
          }
        } catch (parseError) {
          console.error('❌ Ошибка парсинга ответа:', parseError);
          errorData = {
            message: `HTTP ${response.status}: ${response.statusText}`,
          };
        }

        console.error('🚨 Ошибка создания бренда:', errorData);

        let errorMessage = t(TranslationKeys.BrandCreateCreateError);
        if (errorData.message) {
          if (Array.isArray(errorData.message)) {
            errorMessage = errorData.message.join(', ');
          } else {
            errorMessage = errorData.message;
          }
        } else {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Бренд успешно создан:', result);

      // Показываем сообщение об успехе
      showMessage(t(TranslationKeys.BrandCreateCreateSuccess));

      // Сбрасываем форму
      handleReset();
    } catch (error) {
      console.error('💥 Ошибка создания бренда:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  }, [
    isFormValid,
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    brandName,
    showMessage,
    t,
  ]);

  const handleReset = useCallback(() => {
    resetForm();
    setBrandName('');
    setError(null);
    showMessage(t(TranslationKeys.BrandCreateFormReset));
    console.log('🔄 Форма сброшена');
  }, [resetForm, showMessage, t]);

  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  // ==================== РЕНДЕР ====================

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t(TranslationKeys.BrandCreateTitle)}</h1>
        <p className={styles.subtitle}>
          {t(TranslationKeys.BrandCreateSubtitle)}
        </p>
      </div>

      {/* Форма создания бренда */}
      <BrandFormSelects
        brandName={brandName}
        onBrandNameChange={handleBrandNameChange}
      />

      {/* Компонент прогресса с фиксированной позицией */}
      <FormProgress
        progress={progress}
        isFormValid={isFormValid}
        isSubmitting={isCreating}
        submitText={t(TranslationKeys.BrandCreateSubmitButton)}
        resetText={t(TranslationKeys.BrandCreateResetButton)}
        progressTitle={t(TranslationKeys.BrandCreateProgressTitle)}
        submittingText={t(TranslationKeys.BrandCreateCreating)}
        error={error}
        temporaryMessage={temporaryMessage}
        showTemporaryMessage={showTemporaryMessage}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onClearError={handleClearError}
      />
    </div>
  );
};

export default BrandCreatePage;
