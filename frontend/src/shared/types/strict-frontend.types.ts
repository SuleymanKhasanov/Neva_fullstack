// frontend/src/shared/types/strict-frontend.types.ts

/**
 * Строгие типы для фронтенда с полной типизацией
 */

// ==================== БАЗОВЫЕ СТРОГИЕ ТИПЫ ====================

export type StrictLocale = 'ru' | 'en' | 'uz' | 'kr';
export type StrictSection = 'neva' | 'x_solution';

// ==================== КОМПОНЕНТНЫЕ ТИПЫ ====================

export interface StrictComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export interface StrictFormProps extends StrictComponentProps {
  readonly onSubmit?: (data: unknown) => void | Promise<void>;
  readonly onError?: (error: Error) => void;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
}

// ==================== ТИПЫ ДЛЯ SELECT КОМПОНЕНТОВ ====================

export interface StrictSelectOption<T = string | number> {
  readonly value: T;
  readonly label: string;
  readonly disabled?: boolean;
  readonly description?: string;
}

export interface StrictSelectProps<T = string | number>
  extends StrictComponentProps {
  readonly options: readonly StrictSelectOption<T>[];
  readonly value?: T;
  readonly defaultValue?: T;
  readonly placeholder?: string;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly searchable?: boolean;
  readonly clearable?: boolean;
  readonly multiple?: boolean;
  readonly error?: string;
  readonly onChange?: (value: T | null) => void;
  readonly onSearch?: (query: string) => void;
}

export interface StrictMultiSelectProps<T = string | number>
  extends Omit<StrictSelectProps<T>, 'value' | 'onChange' | 'multiple'> {
  readonly value?: readonly T[];
  readonly onChange?: (values: readonly T[]) => void;
  readonly maxSelections?: number;
}

// ==================== ТИПЫ ДЛЯ INPUT КОМПОНЕНТОВ ====================

export interface StrictInputProps extends StrictComponentProps {
  readonly type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search';
  readonly value?: string;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly readOnly?: boolean;
  readonly autoFocus?: boolean;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly pattern?: string;
  readonly error?: string;
  readonly label?: string;
  readonly hint?: string;
  readonly onChange?: (value: string) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: () => void;
  readonly onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface StrictTextareaProps extends Omit<StrictInputProps, 'type'> {
  readonly rows?: number;
  readonly cols?: number;
  readonly resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  readonly autoResize?: boolean;
}

// ==================== ТИПЫ ДЛЯ ПЕРЕВОДОВ ====================

export interface StrictTranslationData {
  readonly ru: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
  };
  readonly en: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
  };
  readonly uz: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
  };
  readonly kr: {
    readonly name: string;
    readonly description: string;
    readonly marketingDescription: string;
  };
}

export interface StrictTranslationInput {
  readonly locale: StrictLocale;
  readonly name: string;
  readonly description?: string;
  readonly marketingDescription?: string;
}

// ==================== ТИПЫ ДЛЯ СПЕЦИФИКАЦИЙ ====================

export interface StrictSpecificationTranslationData {
  readonly ru: { readonly name: string; readonly value: string };
  readonly en: { readonly name: string; readonly value: string };
  readonly uz: { readonly name: string; readonly value: string };
  readonly kr: { readonly name: string; readonly value: string };
}

export interface StrictSpecificationData {
  readonly id: string;
  readonly key: string;
  readonly sortOrder: number;
  readonly translations: StrictSpecificationTranslationData;
}

export interface StrictSpecificationInput {
  readonly key: string;
  readonly sortOrder?: number;
  readonly translations: readonly {
    readonly locale: StrictLocale;
    readonly name: string;
    readonly value: string;
  }[];
}

// ==================== ТИПЫ ДЛЯ ПРОДУКТОВ ====================

export interface StrictProductImageData {
  readonly id: string;
  readonly file: File;
  readonly preview: string;
  readonly slotIndex: number;
  readonly isPrimary: boolean;
}

export interface StrictProductFormData {
  readonly section: StrictSection;
  readonly categoryId: number;
  readonly subcategoryId?: number;
  readonly brandId?: number;
  readonly isActive: boolean;
  readonly translations: StrictTranslationData;
  readonly specifications: readonly StrictSpecificationData[];
  readonly images: readonly StrictProductImageData[];
}

// ==================== ТИПЫ ДЛЯ СОСТОЯНИЯ ЗАГРУЗКИ ====================

export interface StrictLoadingState {
  readonly isLoading: boolean;
  readonly error: string | null;
}

export interface StrictAsyncState<T> extends StrictLoadingState {
  readonly data: T | null;
  readonly lastUpdated: Date | null;
}

// ==================== ТИПЫ ДЛЯ STORE ====================

export interface StrictStoreAction<T = void> {
  (payload: T): void | Promise<void>;
}

export interface StrictStoreSelector<T, R> {
  (state: T): R;
}

export interface StrictStoreSubscriber<T> {
  (state: T, prevState: T): void;
}

// ==================== ТИПЫ ДЛЯ API ОТВЕТОВ ====================

export interface StrictApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly error?: string;
}

export interface StrictPaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

export interface StrictPaginatedResponse<T> extends StrictApiResponse {
  readonly data: {
    readonly items: readonly T[];
    readonly pagination: StrictPaginationMeta;
  };
}

// ==================== ТИПЫ ДЛЯ ЯЗЫКОВОГО ПЕРЕКЛЮЧАТЕЛЯ ====================

export interface StrictLanguageOption {
  readonly code: StrictLocale;
  readonly name: string;
  readonly flag: string;
}

export interface StrictLanguageSwitcherProps extends StrictComponentProps {
  readonly currentLocale: StrictLocale;
  readonly options: readonly StrictLanguageOption[];
  readonly variant?: 'user' | 'admin';
  readonly onChange: (locale: StrictLocale) => void;
}

// ==================== ТИПЫ ДЛЯ ФОРМ ====================

export interface StrictFormField<T = string> {
  readonly name: string;
  readonly value: T;
  readonly error?: string;
  readonly touched: boolean;
  readonly required: boolean;
}

export interface StrictFormState<T extends Record<string, unknown>> {
  readonly fields: {
    readonly [K in keyof T]: StrictFormField<T[K]>;
  };
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
  readonly submitCount: number;
}

export interface StrictFormActions<T extends Record<string, unknown>> {
  readonly setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  readonly setFieldError: <K extends keyof T>(
    field: K,
    error: string | null
  ) => void;
  readonly setFieldTouched: <K extends keyof T>(
    field: K,
    touched: boolean
  ) => void;
  readonly validateField: <K extends keyof T>(
    field: K
  ) => Promise<string | null>;
  readonly validateForm: () => Promise<boolean>;
  readonly resetForm: () => void;
  readonly submitForm: () => Promise<void>;
}

// ==================== ТИПЫ ДЛЯ ХУКОВ ====================

export interface StrictUseApiResult<T> extends StrictAsyncState<T> {
  readonly refetch: () => Promise<void>;
  readonly reset: () => void;
}

export interface StrictUseAsyncResult<
  T,
  P extends readonly unknown[] = readonly [],
> extends StrictAsyncState<T> {
  readonly execute: (...params: P) => Promise<T>;
  readonly reset: () => void;
}

// ==================== GUARD ФУНКЦИИ ====================

export function isStrictLocale(value: string): value is StrictLocale {
  return ['ru', 'en', 'uz', 'kr'].includes(value);
}

export function isStrictSection(value: string): value is StrictSection {
  return ['neva', 'x_solution'].includes(value);
}

export function assertStrictLocale(value: string): StrictLocale {
  if (!isStrictLocale(value)) {
    throw new Error(`Invalid locale: ${value}. Must be one of: ru, en, uz, kr`);
  }
  return value;
}

export function assertStrictSection(value: string): StrictSection {
  if (!isStrictSection(value)) {
    throw new Error(
      `Invalid section: ${value}. Must be one of: neva, x_solution`
    );
  }
  return value;
}

// ==================== УТИЛИТНЫЕ ТИПЫ ====================

/**
 * Рекурсивно делает все свойства readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Извлекает тип из Promise
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/**
 * Делает все свойства опциональными, кроме указанных
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Извлекает типы параметров функции
 */
export type FunctionParams<T> = T extends (...args: infer P) => unknown
  ? P
  : never;

/**
 * Извлекает тип возвращаемого значения функции
 */
export type FunctionReturn<T> = T extends (
  ...args: readonly unknown[]
) => infer R
  ? R
  : never;
