// frontend/src/shared/types/admin.types.ts

/**
 * Типы для административной панели
 * Строгая типизация без использования any
 */

// ==================== ПОЛЬЗОВАТЕЛЬ И АВТОРИЗАЦИЯ ====================

export interface AdminUser {
  readonly id: number;
  readonly username: string;
  readonly role: 'admin' | 'moderator' | 'user';
  readonly email?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface LoginCredentials {
  readonly username: string;
  readonly password: string;
}

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface LoginResponse {
  readonly success: boolean;
  readonly user?: AdminUser;
  readonly tokens?: AuthTokens;
  readonly message?: string;
}

export interface RefreshResponse {
  readonly access_token?: string;
  readonly message?: string;
}

export interface LoginError {
  readonly type: 'INVALID_CREDENTIALS' | 'SERVER_ERROR' | 'NETWORK_ERROR';
  readonly message: string;
  readonly details?: string;
}

export interface LoginResult {
  readonly success: boolean;
  readonly error?: LoginError;
}

// ==================== API ОТВЕТЫ ====================

export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly error?: string;
  readonly statusCode?: number;
}

export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  readonly pagination: PaginationMeta;
}

// ==================== ПРОДУКТЫ ====================

export interface Product {
  readonly id: number;
  readonly name: Record<string, string>; // Многоязычные названия
  readonly description: Record<string, string>;
  readonly specifications: Record<string, string>;
  readonly images: string[];
  readonly categoryId: number;
  readonly brandId: number;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateProductRequest {
  readonly name: Record<string, string>;
  readonly description: Record<string, string>;
  readonly specifications: Record<string, string>;
  readonly categoryId: number;
  readonly brandId: number;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  readonly id: number;
}

// ==================== КАТЕГОРИИ ====================

export interface Category {
  readonly id: number;
  readonly name: Record<string, string>;
  readonly description: Record<string, string>;
  readonly parentId?: number;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive: boolean;
  readonly order: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly subcategories?: Category[];
}

export interface CreateCategoryRequest {
  readonly name: Record<string, string>;
  readonly description: Record<string, string>;
  readonly parentId?: number;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive?: boolean;
  readonly order?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  readonly id: number;
}

// ==================== БРЕНДЫ ====================

export interface Brand {
  readonly id: number;
  readonly name: string;
  readonly description: Record<string, string>;
  readonly logo?: string;
  readonly website?: string;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateBrandRequest {
  readonly name: string;
  readonly description: Record<string, string>;
  readonly logo?: string;
  readonly website?: string;
  readonly section: 'NEVA' | 'X_SOLUTION';
  readonly isActive?: boolean;
}

export interface UpdateBrandRequest extends Partial<CreateBrandRequest> {
  readonly id: number;
}

// ==================== КЕШИРОВАНИЕ И СИСТЕМА ====================

export interface CacheStats {
  readonly connected: boolean;
  readonly keyCount: number;
  readonly memoryUsage: {
    readonly used: number;
    readonly total: number;
    readonly percentage: number;
  };
  readonly hitRate: number;
  readonly operationsPerSecond: number;
}

export interface CacheHealth {
  readonly status: 'healthy' | 'degraded' | 'unhealthy';
  readonly responseTime: number;
  readonly uptime: number;
  readonly version: string;
}

export interface SystemHealth {
  readonly status: 'healthy' | 'degraded' | 'unhealthy';
  readonly uptime: number;
  readonly version: string;
  readonly environment: string;
  readonly database: {
    readonly connected: boolean;
    readonly responseTime: number;
  };
  readonly cache: CacheHealth;
}

export interface SystemStats {
  readonly products: {
    readonly total: number;
    readonly active: number;
    readonly bySection: Record<string, number>;
  };
  readonly categories: {
    readonly total: number;
    readonly active: number;
    readonly bySection: Record<string, number>;
  };
  readonly brands: {
    readonly total: number;
    readonly active: number;
    readonly bySection: Record<string, number>;
  };
}

// ==================== ФОРМЫ И ВАЛИДАЦИЯ ====================

export interface FormErrors {
  readonly [key: string]: string | undefined;
}

export interface FormTouched {
  readonly [key: string]: boolean;
}

export interface ValidationRule {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly custom?: (value: unknown) => string | null;
}

export interface FormField<T = string> {
  readonly value: T;
  readonly error?: string;
  readonly touched: boolean;
  readonly disabled?: boolean;
  readonly rules?: ValidationRule[];
}

// ==================== ФИЛЬТРЫ И ПОИСК ====================

export interface FilterOptions {
  readonly section?: 'NEVA' | 'X_SOLUTION';
  readonly isActive?: boolean;
  readonly categoryId?: number;
  readonly brandId?: number;
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  readonly query: string;
  readonly section?: 'NEVA' | 'X_SOLUTION';
  readonly categories?: number[];
  readonly brands?: number[];
  readonly page?: number;
  readonly limit?: number;
}

// ==================== УТИЛИТЫ ====================

export type Locale = 'en' | 'ru' | 'uz' | 'kr';

export type LocalizedContent = {
  [key in Locale]?: string;
};

export interface ApiRequestConfig {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly headers?: Record<string, string>;
  readonly body?: string;
  readonly signal?: AbortSignal;
}

// ==================== HOOKS И КОНТЕКСТ ====================

export interface AdminApiHookResult {
  readonly get: (endpoint: string) => Promise<ApiResponse>;
  readonly post: (endpoint: string, data?: unknown) => Promise<ApiResponse>;
  readonly put: (endpoint: string, data?: unknown) => Promise<ApiResponse>;
  readonly delete: (endpoint: string) => Promise<ApiResponse>;
  readonly makeRequest: (
    endpoint: string,
    config?: ApiRequestConfig
  ) => Promise<ApiResponse>;
  readonly adminApi: {
    readonly products: {
      readonly getAll: () => Promise<ApiResponse<Product[]>>;
      readonly getById: (id: string) => Promise<ApiResponse<Product>>;
      readonly create: (
        data: CreateProductRequest
      ) => Promise<ApiResponse<Product>>;
      readonly update: (
        id: string,
        data: UpdateProductRequest
      ) => Promise<ApiResponse<Product>>;
      readonly delete: (id: string) => Promise<ApiResponse>;
    };
    readonly categories: {
      readonly getAll: (params?: string) => Promise<ApiResponse<Category[]>>;
      readonly getById: (id: string) => Promise<ApiResponse<Category>>;
      readonly create: (
        data: CreateCategoryRequest
      ) => Promise<ApiResponse<Category>>;
      readonly getSubcategories: (
        categoryId: number,
        locale: string
      ) => Promise<ApiResponse<Category[]>>;
    };
    readonly brands: {
      readonly getAll: (params?: string) => Promise<ApiResponse<Brand[]>>;
      readonly getById: (id: string) => Promise<ApiResponse<Brand>>;
      readonly create: (
        data: CreateBrandRequest
      ) => Promise<ApiResponse<Brand>>;
    };
    readonly cache: {
      readonly getStats: () => Promise<ApiResponse<CacheStats>>;
      readonly getHealth: () => Promise<ApiResponse<CacheHealth>>;
      readonly clear: () => Promise<ApiResponse>;
      readonly invalidateProducts: () => Promise<ApiResponse>;
    };
  };
  readonly isAuthenticated: boolean;
}

// ==================== КОМПОНЕНТЫ ====================

export interface AdminRouteGuardProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly redirectTo?: string;
}

export interface DashboardCardProps {
  readonly title: string;
  readonly description: string;
  readonly value?: string | number;
  readonly icon?: React.ReactNode;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

export interface StatCardProps {
  readonly label: string;
  readonly value: string | number;
  readonly trend?: {
    readonly value: number;
    readonly isPositive: boolean;
  };
  readonly icon?: React.ReactNode;
}
