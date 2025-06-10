// Путь: src/shared/api/admin-api.ts
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { useCallback } from 'react';

// Типы для API данных
interface BaseApiResponse {
  success: boolean;
  message?: string;
}

interface ProductCreateData {
  section: string;
  categoryId: number;
  brandId: number;
  isActive: boolean;
  translations: Array<{
    locale: string;
    name: string;
    description?: string;
    marketingDescription?: string;
  }>;
  specifications?: Array<{
    key: string;
    translations: Array<{
      locale: string;
      name: string;
      value: string;
    }>;
  }>;
}

interface ProductUpdateData extends Partial<ProductCreateData> {
  id?: number;
}

interface CategoryCreateData {
  section: string;
  translations: Array<{
    locale: string;
    name: string;
  }>;
}

interface BrandCreateData {
  translations: Array<{
    locale: string;
    name: string;
  }>;
}

// Тип для произвольных данных JSON
type JsonData = Record<string, unknown>;

interface UseAdminApiOptions {
  baseUrl?: string;
}

export const useAdminApi = (options: UseAdminApiOptions = {}) => {
  const { accessToken, refreshAuth, logout } = useAuth();
  const baseUrl =
    options.baseUrl ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:3000';

  const makeRequest = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const url = `${baseUrl}${endpoint}`;

      const config: RequestInit = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
      };

      try {
        const response = await fetch(url, config);

        // Если токен истек, пытаемся обновить
        if (response.status === 401) {
          const refreshSuccess = await refreshAuth();

          if (refreshSuccess) {
            // Повторяем запрос с новым токеном
            const newConfig = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };
            return fetch(url, newConfig);
          } else {
            // Если обновить токен не удалось, выходим
            logout();
            throw new Error('Session expired');
          }
        }

        return response;
      } catch (error) {
        console.error('API Request failed:', error);
        throw error;
      }
    },
    [accessToken, refreshAuth, logout, baseUrl]
  );

  // Удобные методы для разных HTTP методов
  const get = useCallback(
    (endpoint: string) => makeRequest(endpoint, { method: 'GET' }),
    [makeRequest]
  );

  const post = useCallback(
    <T = JsonData>(endpoint: string, data?: T) =>
      makeRequest(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [makeRequest]
  );

  const put = useCallback(
    <T = JsonData>(endpoint: string, data?: T) =>
      makeRequest(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [makeRequest]
  );

  const del = useCallback(
    (endpoint: string) => makeRequest(endpoint, { method: 'DELETE' }),
    [makeRequest]
  );

  // Специфичные методы для вашего API
  const adminApi = {
    // Продукты
    products: {
      getAll: () => get('/admin/products'),
      getById: (id: string) => get(`/admin/products/${id}`),
      create: (data: ProductCreateData) => post('/admin/products', data),
      update: (id: string, data: ProductUpdateData) =>
        put(`/admin/products/${id}`, data),
      delete: (id: string) => del(`/admin/products/${id}`),
    },

    // Категории
    categories: {
      getAll: () => get('/admin/categories'),
      getById: (id: string) => get(`/admin/categories/${id}`),
      create: (data: CategoryCreateData) => post('/admin/categories', data),
    },

    // Бренды
    brands: {
      getAll: () => get('/admin/brands'),
      getById: (id: string) => get(`/admin/brands/${id}`),
      create: (data: BrandCreateData) => post('/admin/brands', data),
    },

    // Кеш
    cache: {
      getStats: () => get('/admin/cache/stats'),
      getHealth: () => get('/admin/cache/health'),
      clear: () => post('/admin/cache/clear'),
      invalidateProducts: () => post('/admin/cache/invalidate/products'),
    },
  };

  return {
    makeRequest,
    get,
    post,
    put,
    delete: del,
    adminApi,
    isAuthenticated: !!accessToken,
  };
};

// Экспортируем типы для использования в компонентах
export type {
  ProductCreateData,
  ProductUpdateData,
  CategoryCreateData,
  BrandCreateData,
  BaseApiResponse,
  JsonData,
};
