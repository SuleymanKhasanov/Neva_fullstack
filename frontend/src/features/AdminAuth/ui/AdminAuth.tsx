'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useAuth } from '@/shared/contexts/AuthContext';
import { redirectToLocalized } from '@/shared/utils/redirect';
import styles from './AdminAuth.module.css';

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

interface TouchedFields {
  username: boolean;
  password: boolean;
}

const AdminAuth = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    username: false,
    password: false,
  });

  const { login } = useAuth();

  // Валидация полей
  const validateField = (
    field: 'username' | 'password',
    value: string
  ): string => {
    switch (field) {
      case 'username':
        if (!value.trim()) {
          return 'Логин обязателен для заполнения';
        }
        if (value.length < 3) {
          return 'Логин должен содержать минимум 3 символа';
        }
        return '';

      case 'password':
        if (!value.trim()) {
          return 'Пароль обязателен для заполнения';
        }
        if (value.length < 6) {
          return 'Пароль должен содержать минимум 6 символов';
        }
        return '';

      default:
        return '';
    }
  };

  // Валидация всей формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);

    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка изменения поля логина
  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setUsername(value);

    // Очищаем ошибку при вводе если поле уже было тронуто
    if (touched.username) {
      const error = validateField('username', value);
      setErrors((prev) => ({
        ...prev,
        username: error || undefined,
        general: undefined, // Очищаем общую ошибку при вводе
      }));
    }
  };

  // Обработка изменения поля пароля
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setPassword(value);

    // Очищаем ошибку при вводе если поле уже было тронуто
    if (touched.password) {
      const error = validateField('password', value);
      setErrors((prev) => ({
        ...prev,
        password: error || undefined,
        general: undefined, // Очищаем общую ошибку при вводе
      }));
    }
  };

  // Обработка потери фокуса
  const handleBlur = (field: 'username' | 'password'): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const value = field === 'username' ? username : password;
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // Предотвращаем стандартную отправку формы
    e.preventDefault();
    e.stopPropagation();

    console.log('Form submitted, preventing default behavior');

    // Отмечаем все поля как "тронутые"
    setTouched({ username: true, password: true });

    // Очищаем только общую ошибку, оставляем ошибки полей
    setErrors((prev) => ({ ...prev, general: undefined }));

    // Проверяем валидность формы
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsLoading(true);
    console.log('Starting login process...');

    try {
      const result = await login(username, password);
      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful, redirecting...');
        // Успешная авторизация - перенаправляем на dashboard
        redirectToLocalized('admin/dashboard');
      } else {
        console.log('Login failed:', result.error);
        // Показываем конкретную ошибку от сервера
        setErrors({
          general: result.error?.message || 'Неверный логин или пароль',
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: 'Неожиданная ошибка. Попробуйте позже.',
      });
    } finally {
      setIsLoading(false);
      console.log('Login process completed');
    }
  };

  // Проверяем есть ли ошибки в полях (исключая общую ошибку)
  const hasFieldErrors = (): boolean => {
    return !!(errors.username || errors.password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Панель администратора</h1>
          <p className={styles.subtitle}>Войдите для доступа к управлению</p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          {errors.general && (
            <div className={styles.error} role="alert">
              <span className={styles.errorIcon}>⚠</span>
              <span>{errors.general}</span>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Логин *
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              onBlur={() => handleBlur('username')}
              placeholder="Введите ваш логин"
              disabled={isLoading}
              className={errors.username ? styles.inputError : ''}
              autoComplete="username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <span
                id="username-error"
                className={styles.fieldError}
                role="alert"
              >
                {errors.username}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль *
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              placeholder="Введите ваш пароль"
              disabled={isLoading}
              className={errors.password ? styles.inputError : ''}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span
                id="password-error"
                className={styles.fieldError}
                role="alert"
              >
                {errors.password}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || hasFieldErrors()}
            className={styles.submitButton}
            aria-describedby={errors.general ? 'general-error' : undefined}
          >
            {isLoading ? (
              <>
                <span className={styles.loader} aria-hidden="true"></span>
                Вход...
              </>
            ) : (
              'Войти в систему'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
