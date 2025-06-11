'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useAuth } from '@/shared/contexts/AuthContext';
import { redirectToLocalized } from '@/shared/utils/redirect';
import { TranslationKeys } from '@/shared/config/i18n/types';
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

  const { login, t } = useAuth();

  // Валидация полей
  const validateField = (
    field: 'username' | 'password',
    value: string
  ): string => {
    switch (field) {
      case 'username':
        if (!value.trim()) {
          return t(TranslationKeys.AuthUsernameRequired);
        }
        if (value.length < 3) {
          return t(TranslationKeys.AuthUsernameMinLength);
        }
        return '';

      case 'password':
        if (!value.trim()) {
          return t(TranslationKeys.AuthPasswordRequired);
        }
        if (value.length < 6) {
          return t(TranslationKeys.AuthPasswordMinLength);
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

    // Очищаем ошибки при вводе если поле уже было тронуто
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

    // Очищаем ошибки при вводе если поле уже было тронуто
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

    // Очищаем все ошибки перед валидацией
    setErrors({});

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

        // Обрабатываем разные типы ошибок
        if (result.error?.type === 'INVALID_CREDENTIALS') {
          // При неверных учетных данных показываем ошибки под полями
          setErrors({
            username: 'Неверный логин',
            password: 'Неверный пароль',
          });
        } else {
          // Для других ошибок показываем общую ошибку
          setErrors({
            general:
              result.error?.message ||
              t(TranslationKeys.AuthInvalidCredentials),
          });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: t(TranslationKeys.AuthUnexpectedError),
      });
    } finally {
      setIsLoading(false);
      console.log('Login process completed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t(TranslationKeys.AuthTitle)}</h1>
          <p className={styles.subtitle}>{t(TranslationKeys.AuthSubtitle)}</p>
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
              {t(TranslationKeys.AuthUsername)} *
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              onBlur={() => handleBlur('username')}
              placeholder={t(TranslationKeys.AuthUsernamePlaceholder)}
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
              {t(TranslationKeys.AuthPassword)} *
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              placeholder={t(TranslationKeys.AuthPasswordPlaceholder)}
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
            disabled={isLoading}
            className={styles.submitButton}
            aria-describedby={errors.general ? 'general-error' : undefined}
          >
            {isLoading ? (
              <>
                <span className={styles.loader} aria-hidden="true"></span>
                {t(TranslationKeys.AuthLoggingIn)}
              </>
            ) : (
              t(TranslationKeys.AuthLoginButton)
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
