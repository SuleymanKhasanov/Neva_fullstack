// src/shared/types/validation.ts

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  rules?: ValidationRule;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface TouchedFields {
  [key: string]: boolean;
}

// Типизированные правила валидации для конкретных форм
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserFormData {
  id?: string;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

// Хелперы для валидации
export class ValidationHelper {
  static validateField(value: string, rules?: ValidationRule): string {
    if (!rules) return '';

    // Проверка на обязательность
    if (rules.required && !value.trim()) {
      return 'Поле обязательно для заполнения';
    }

    // Если поле пустое и не обязательное - валидация пройдена
    if (!value.trim() && !rules.required) {
      return '';
    }

    // Проверка минимальной длины
    if (rules.minLength && value.length < rules.minLength) {
      return `Минимум ${rules.minLength} символов`;
    }

    // Проверка максимальной длины
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Максимум ${rules.maxLength} символов`;
    }

    // Проверка паттерна
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Неверный формат';
    }

    // Кастомная валидация
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) return customError;
    }

    return '';
  }

  static validateForm<T extends Record<string, string>>(
    values: T,
    rules: Partial<Record<keyof T, ValidationRule>>
  ): FormErrors {
    const errors: FormErrors = {};

    Object.keys(rules).forEach((key) => {
      const value = values[key];
      const fieldRules = rules[key];
      const error = this.validateField(value || '', fieldRules);

      if (error) {
        errors[key] = error;
      }
    });

    return errors;
  }

  static hasErrors(errors: FormErrors): boolean {
    return Object.values(errors).some((error) => !!error);
  }

  // Валидация специфичных типов данных
  static validateEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      return 'Email обязателен';
    }

    if (!emailRegex.test(email)) {
      return 'Введите корректный email';
    }

    return '';
  }

  static validatePassword(password: string, minLength: number = 6): string {
    if (!password) {
      return 'Пароль обязателен';
    }

    if (password.length < minLength) {
      return `Пароль должен содержать минимум ${minLength} символов`;
    }

    // Можно добавить дополнительные проверки
    // if (!/(?=.*[a-z])/.test(password)) {
    //   return 'Пароль должен содержать строчные буквы';
    // }

    // if (!/(?=.*[A-Z])/.test(password)) {
    //   return 'Пароль должен содержать заглавные буквы';
    // }

    // if (!/(?=.*\d)/.test(password)) {
    //   return 'Пароль должен содержать цифры';
    // }

    return '';
  }

  static validatePasswordConfirm(
    password: string,
    confirmPassword: string
  ): string {
    if (!confirmPassword) {
      return 'Подтверждение пароля обязательно';
    }

    if (password !== confirmPassword) {
      return 'Пароли не совпадают';
    }

    return '';
  }

  static validateUsername(username: string): string {
    if (!username.trim()) {
      return 'Логин обязателен';
    }

    if (username.length < 3) {
      return 'Логин должен содержать минимум 3 символа';
    }

    if (username.length > 50) {
      return 'Логин не может быть длиннее 50 символов';
    }

    // Проверка на допустимые символы
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Логин может содержать только буквы, цифры, дефис и подчеркивание';
    }

    return '';
  }

  static validatePhone(phone: string): string {
    if (!phone.trim()) {
      return ''; // Телефон может быть необязательным
    }

    // Убираем все нецифровые символы для проверки
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length < 10) {
      return 'Номер телефона слишком короткий';
    }

    if (cleanPhone.length > 15) {
      return 'Номер телефона слишком длинный';
    }

    return '';
  }
}

// Предопределенные правила с типизацией
export const CommonValidationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/,
  } satisfies ValidationRule,

  password: {
    required: true,
    minLength: 6,
    maxLength: 100,
  } satisfies ValidationRule,

  strongPassword: {
    required: true,
    minLength: 8,
    maxLength: 100,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Пароль должен содержать строчные буквы';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Пароль должен содержать заглавные буквы';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Пароль должен содержать цифры';
      }
      return null;
    },
  } satisfies ValidationRule,

  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !value.includes('@')) {
        return 'Введите корректный email';
      }
      return null;
    },
  } satisfies ValidationRule,

  phone: {
    pattern: /^[\+]?[\d\s\-\(\)]+$/,
    custom: (value: string) => {
      if (value && value.replace(/\D/g, '').length < 10) {
        return 'Номер телефона слишком короткий';
      }
      return null;
    },
  } satisfies ValidationRule,

  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
  } satisfies ValidationRule,

  required: {
    required: true,
  } satisfies ValidationRule,

  optional: {} satisfies ValidationRule,
} as const;

// Типизированные наборы правил для конкретных форм
export const FormValidationRules = {
  login: {
    username: CommonValidationRules.username,
    password: CommonValidationRules.password,
  } satisfies Record<keyof LoginFormData, ValidationRule>,

  register: {
    username: CommonValidationRules.username,
    email: CommonValidationRules.email,
    password: CommonValidationRules.strongPassword,
    confirmPassword: {
      required: true,
      custom: (value: string, formValues?: RegisterFormData) => {
        if (formValues && value !== formValues.password) {
          return 'Пароли не совпадают';
        }
        return null;
      },
    } satisfies ValidationRule,
  } satisfies Record<keyof RegisterFormData, ValidationRule>,

  userForm: {
    username: CommonValidationRules.username,
    email: CommonValidationRules.email,
    role: CommonValidationRules.required,
    firstName: CommonValidationRules.name,
    lastName: CommonValidationRules.name,
  } satisfies Partial<Record<keyof UserFormData, ValidationRule>>,
} as const;
