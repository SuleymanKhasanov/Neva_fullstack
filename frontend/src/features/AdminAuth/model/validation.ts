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

// Дополнительные правила валидации
export const AuthValidationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/, // Только буквы, цифры, подчеркивание и дефис
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 100,
  },
};

// Улучшенная валидация с более детальными сообщениями
export const validateAuthDetailed = (data: AuthFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Валидация логина
  if (!data.username.trim()) {
    errors.username = 'Логин обязателен для заполнения';
  } else if (data.username.length < AuthValidationRules.username.minLength) {
    errors.username = `Логин должен содержать минимум ${AuthValidationRules.username.minLength} символа`;
  } else if (data.username.length > AuthValidationRules.username.maxLength) {
    errors.username = `Логин не может содержать более ${AuthValidationRules.username.maxLength} символов`;
  } else if (!AuthValidationRules.username.pattern.test(data.username)) {
    errors.username =
      'Логин может содержать только буквы, цифры, подчеркивание и дефис';
  }

  // Валидация пароля
  if (!data.password) {
    errors.password = 'Пароль обязателен для заполнения';
  } else if (data.password.length < AuthValidationRules.password.minLength) {
    errors.password = `Пароль должен содержать минимум ${AuthValidationRules.password.minLength} символов`;
  } else if (data.password.length > AuthValidationRules.password.maxLength) {
    errors.password = `Пароль не может содержать более ${AuthValidationRules.password.maxLength} символов`;
  }

  return errors;
};

// Утилиты для работы с ошибками
export const getFirstError = (errors: ValidationErrors): string | null => {
  const errorValues = Object.values(errors);
  return errorValues.find((error) => error !== undefined) || null;
};

export const clearErrorsForField = (
  errors: ValidationErrors,
  field: keyof ValidationErrors
): ValidationErrors => {
  const newErrors = { ...errors };
  delete newErrors[field];
  return newErrors;
};

// Функция для валидации отдельного поля
export const validateSingleField = (
  field: keyof AuthFormData,
  value: string
): string | undefined => {
  const tempData: AuthFormData = {
    username: field === 'username' ? value : '',
    password: field === 'password' ? value : '',
  };

  const errors = validateAuthDetailed(tempData);
  return errors[field];
};
