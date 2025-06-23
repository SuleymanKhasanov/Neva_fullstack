// frontend/src/shared/hooks/useAdminApi.ts - ИСПРАВЛЕННАЯ ВЕРСИЯ
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { useCallback } from 'react';

// Простой тип для JSON данных
type RequestData = Record<string, unknown>;

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

  // Базовые HTTP методы
  const get = useCallback(
    (endpoint: string) => makeRequest(endpoint, { method: 'GET' }),
    [makeRequest]
  );

  const post = useCallback(
    (endpoint: string, data?: RequestData) =>
      makeRequest(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [makeRequest]
  );

  const put = useCallback(
    (endpoint: string, data?: RequestData) =>
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

  // Структурированные методы API
  const adminApi = {
    // Продукты
    products: {
      getAll: () => get('/admin/products'),
      getById: (id: string) => get(`/admin/products/${id}`),
      create: (data: RequestData) => post('/admin/products', data),
      update: (id: string, data: RequestData) =>
        put(`/admin/products/${id}`, data),
      delete: (id: string) => del(`/admin/products/${id}`),
    },

    // Категории
    categories: {
      getAll: (params?: string) =>
        get(`/admin/categories${params ? `?${params}` : ''}`),
      getById: (id: string) => get(`/admin/categories/${id}`),
      create: (data: RequestData) => post('/admin/categories', data),
      getSubcategories: (categoryId: number, locale: string) =>
        get(
          `/admin/categories/subcategories/all?categoryId=${categoryId}&locale=${locale}`
        ),
    },

    // Бренды
    brands: {
      getAll: (params?: string) =>
        get(`/admin/brands${params ? `?${params}` : ''}`),
      getById: (id: string) => get(`/admin/brands/${id}`),
      create: (data: RequestData) => post('/admin/brands', data),
    },

    // Кеш
    cache: {
      getStats: () => get('/admin/system/cache/stats'),
      getHealth: () => get('/admin/system/cache/health'),
      clear: () => post('/admin/system/cache/clear'),
      invalidateProducts: () => post('/admin/system/cache/invalidate/products'),
    },
  };

  return {
    // Базовые методы (нужно для обратной совместимости)
    get,
    post,
    put,
    delete: del,
    makeRequest,

    // Структурированное API
    adminApi,

    // Статус
    isAuthenticated: !!accessToken,
  };
};
