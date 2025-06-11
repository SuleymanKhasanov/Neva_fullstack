// src/shared/hooks/useForm.ts
'use client';

import { useState, useCallback } from 'react';
import {
  FormErrors,
  TouchedFields,
  ValidationRule,
  ValidationHelper,
} from '@/shared/types/validation';

// Типы для значений формы - используем union type вместо any
type FormValue = string | number | boolean | Date | null | undefined;

interface UseFormOptions<T extends Record<string, FormValue>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
  onSubmit?: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T extends Record<string, FormValue>> {
  values: T;
  errors: FormErrors;
  touched: TouchedFields;
  isSubmitting: boolean;

  // Методы для управления полями
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, touched: boolean) => void;

  // Методы для валидации
  validateField: (field: keyof T) => string;
  validateForm: () => boolean;

  // Обработчики событий
  handleChange: (
    field: keyof T
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;

  // Утилиты
  reset: () => void;
  hasErrors: boolean;
  isFieldInvalid: (field: keyof T) => boolean;
}

export function useForm<T extends Record<string, FormValue>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouchedFields] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Установка значения поля с типизированным значением
  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Очищаем ошибку при изменении значения (если поле уже было тронуто)
      if (touched[field as string]) {
        const rule = validationRules[field];
        const stringValue = value?.toString() || '';
        const error = ValidationHelper.validateField(stringValue, rule);
        setErrors((prev) => ({
          ...prev,
          [field as string]: error || undefined,
        }));
      }
    },
    [touched, validationRules]
  );

  // Установка ошибки для поля
  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field as string]: error }));
  }, []);

  // Отметка поля как тронутого
  const setTouched = useCallback((field: keyof T, isTouched: boolean) => {
    setTouchedFields((prev) => ({ ...prev, [field as string]: isTouched }));
  }, []);

  // Валидация отдельного поля
  const validateField = useCallback(
    (field: keyof T): string => {
      const value = values[field];
      const rule = validationRules[field];
      const stringValue = value?.toString() || '';
      return ValidationHelper.validateField(stringValue, rule);
    },
    [values, validationRules]
  );

  // Валидация всей формы
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field as keyof T);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Отмечаем все поля как тронутые
    const allTouched: TouchedFields = {};
    Object.keys(initialValues).forEach((field) => {
      allTouched[field] = true;
    });
    setTouchedFields(allTouched);

    return isValid;
  }, [validateField, validationRules, initialValues]);

  // Обработчик изменения поля
  const handleChange = useCallback(
    (field: keyof T) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as T[keyof T];
        setValue(field, value);
      };
    },
    [setValue]
  );

  // Обработчик потери фокуса
  const handleBlur = useCallback(
    (field: keyof T) => {
      return () => {
        setTouched(field, true);
        const error = validateField(field);
        setError(field, error);
      };
    },
    [setTouched, validateField, setError]
  );

  // Обработчик отправки формы
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validateForm, onSubmit, values]
  );

  // Сброс формы
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedFields({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Проверка наличия ошибок
  const hasErrors = ValidationHelper.hasErrors(errors);

  // Проверка, является ли поле невалидным
  const isFieldInvalid = useCallback(
    (field: keyof T): boolean => {
      return !!(touched[field as string] && errors[field as string]);
    },
    [touched, errors]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError,
    setTouched,
    validateField,
    validateForm,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    hasErrors,
    isFieldInvalid,
  };
}

// Пример использования хука в компоненте с типизацией:
// interface LoginFormData {
//   username: string;
//   password: string;
// }
//
// const form = useForm<LoginFormData>({
//   initialValues: { username: '', password: '' },
//   validationRules: {
//     username: CommonValidationRules.username,
//     password: CommonValidationRules.password,
//   },
//   onSubmit: async (values) => {
//     const result = await login(values.username, values.password);
//     if (result.success) {
//       router.push('/dashboard');
//     }
//   }
// });

export default useForm;
