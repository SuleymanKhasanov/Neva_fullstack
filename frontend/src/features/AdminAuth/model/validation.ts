// features/AdminAuth/model/validation.ts
export interface AuthFormData {
  username: string;
  password: string;
}

export interface ValidationErrors {
  username?: string;
  password?: string;
}

export const validateAuth = (data: AuthFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Валидация логина
  if (!data.username.trim()) {
    errors.username = 'Логин обязателен';
  } else if (data.username.length < 3) {
    errors.username = 'Минимум 3 символа';
  }

  // Валидация пароля
  if (!data.password) {
    errors.password = 'Пароль обязателен';
  } else if (data.password.length < 6) {
    errors.password = 'Минимум 6 символов';
  }

  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};
