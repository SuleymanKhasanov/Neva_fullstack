// frontend/src/widgets/ProductCreateForm/model/useProductForm.ts
// ✅ МИНИМАЛЬНАЯ ВЕРСИЯ для быстрого тестирования без всех зависимостей

'use client';

import { useState, useCallback } from 'react';
import { ProductFormData } from '../ui/ProductCreateForm';

interface FormErrors {
  [key: string]: string;
}

const INITIAL_FORM_DATA: ProductFormData = {
  section: null,
  categoryId: null,
  subcategoryId: null,
  brandId: null,
  name: '',
  images: [],
  description: '',
  specifications: '',
};

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved] = useState<number>(0); // Пока без автосохранения

  // ✅ МИНИМАЛЬНАЯ РЕАЛИЗАЦИЯ: Простое обновление данных
  const updateFormData = useCallback((updates: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setIsDirty(true);

    // Очищаем ошибки для обновленных полей
    const updatedFields = Object.keys(updates);
    if (updatedFields.length > 0) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        updatedFields.forEach((field) => {
          delete newErrors[field];
        });
        return newErrors;
      });
    }
  }, []);

  // ✅ МИНИМАЛЬНАЯ РЕАЛИЗАЦИЯ: Базовая валидация
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.section) {
      newErrors.section = 'Выберите секцию';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Выберите категорию';
    }
    if (!formData.brandId) {
      newErrors.brandId = 'Выберите бренд';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Введите название продукта';
    }
    if (formData.images.length === 0) {
      newErrors.images = 'Загрузите минимум 1 изображение';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание продукта';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // ✅ МИНИМАЛЬНАЯ РЕАЛИЗАЦИЯ: Простая отправка
  const submitForm = useCallback(async () => {
    if (isLoading) return;

    if (!validateForm()) {
      console.warn('Form validation failed');
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Имитируем API запрос
      console.log('📤 Submitting form data:', formData);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация задержки

      // Имитируем успешный ответ
      alert('Продукт успешно создан! (демо режим)');

      // Сбрасываем форму
      setFormData(INITIAL_FORM_DATA);
      setIsDirty(false);
    } catch (error) {
      console.error('❌ Submit error:', error);
      setErrors({ general: 'Произошла ошибка при создании продукта' });
    } finally {
      setIsLoading(false);
    }
  }, [formData, isLoading, validateForm]);

  // ✅ МИНИМАЛЬНАЯ РЕАЛИЗАЦИЯ: Простой сброс
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsDirty(false);
  }, []);

  return {
    // Основные данные
    formData,
    errors,
    isLoading,
    isDirty,
    lastSaved,

    // Функции
    updateFormData,
    validateForm,
    submitForm,
    resetForm,
  };
};
