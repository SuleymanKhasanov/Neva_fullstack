// frontend/src/widgets/ProductCreateForm/model/useProductForm.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
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

  const { adminApi, isAuthenticated } = useAdminApi();

  // Автосохранение в localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('productFormDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData({ ...INITIAL_FORM_DATA, ...parsedData, images: [] }); // Изображения не сохраняем
        setIsDirty(true);
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
      }
    }
  }, []);

  // Сохранение черновика
  useEffect(() => {
    if (isDirty) {
      const dataToSave = { ...formData, images: [] }; // Исключаем файлы
      localStorage.setItem('productFormDraft', JSON.stringify(dataToSave));
    }
  }, [formData, isDirty]);

  const updateFormData = useCallback((updates: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setIsDirty(true);

    // Очищаем ошибки для обновленных полей
    const updatedFields = Object.keys(updates);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedFields.forEach((field) => {
        delete newErrors[field as keyof FormErrors];
      });
      return newErrors;
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Валидация обязательных полей
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
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Название должно содержать минимум 3 символа';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'Загрузите минимум 1 изображение';
    } else if (formData.images.length > 5) {
      newErrors.images = 'Максимум 5 изображений';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание продукта';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Описание должно содержать минимум 20 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitForm = useCallback(async () => {
    if (!isAuthenticated) {
      setErrors({ general: 'Необходима авторизация' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Подготавливаем данные для отправки
      const productData = {
        section: formData.section!,
        categoryId: formData.categoryId!,
        subcategoryId: formData.subcategoryId,
        brandId: formData.brandId!,
        isActive: true,
        translations: [
          {
            locale: 'ru',
            name: formData.name,
            description: formData.description,
          },
          {
            locale: 'en',
            name: formData.name,
            description: formData.description,
          },
        ],
        specifications: formData.specifications
          ? [
              {
                key: 'general',
                translations: [
                  {
                    locale: 'ru',
                    name: 'Характеристики',
                    value: formData.specifications,
                  },
                  {
                    locale: 'en',
                    name: 'Specifications',
                    value: formData.specifications,
                  },
                ],
              },
            ]
          : [],
      };

      // Создаем продукт
      const response = await adminApi.products.create(productData);

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const result = await response.json();

      // Если есть изображения, загружаем их
      if (formData.images.length > 0 && result.data?.id) {
        const formDataImages = new FormData();
        formData.images.forEach((image) => {
          formDataImages.append('images', image);
        });

        const imagesResponse = await fetch(
          `/admin/products/${result.data.id}/images`,
          {
            method: 'POST',
            body: formDataImages,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        if (!imagesResponse.ok) {
          console.error('Failed to upload images');
        }
      }

      // Очищаем форму и черновик
      setFormData(INITIAL_FORM_DATA);
      setIsDirty(false);
      localStorage.removeItem('productFormDraft');

      // Успешное создание
      alert('Продукт успешно создан!');
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'Произошла ошибка при создании продукта',
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, isAuthenticated, validateForm, adminApi]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsDirty(false);
    localStorage.removeItem('productFormDraft');
  }, []);

  return {
    formData,
    errors,
    isLoading,
    isDirty,
    updateFormData,
    validateForm,
    submitForm,
    resetForm,
  };
};
