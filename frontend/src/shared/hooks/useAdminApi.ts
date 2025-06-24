// frontend/src/shared/hooks/useAdminApi.ts
'use client';

import { useCallback } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';

// Минимальные типы для работы (без импорта из admin.types)
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

/**
 * Хук для работы с админским API
 */
export const useAdminApi = () => {
  const { accessToken } = useAuth();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Базовая функция для выполнения запросов
  const makeRequest = useCallback(
    async (
      endpoint: string,
      config: ApiRequestConfig = {}
    ): Promise<ApiResponse> => {
      const { method = 'GET', headers = {}, body, signal } = config;

      try {
        console.log(`🌐 ${method} ${endpoint}`);

        const requestHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          ...headers,
        };

        // Добавляем токен авторизации если есть
        if (accessToken) {
          requestHeaders['Authorization'] = `Bearer ${accessToken}`;
        }

        // Используем переданный signal или создаем новый с timeout
        let finalSignal = signal;
        let timeoutId: NodeJS.Timeout | undefined;

        if (!signal) {
          const controller = new AbortController();
          finalSignal = controller.signal;
          timeoutId = setTimeout(() => {
            console.log(`⏰ Request timeout for ${method} ${endpoint}`);
            controller.abort();
          }, 8000); // 8 секунд timeout
        }

        const response = await fetch(`${baseUrl}${endpoint}`, {
          method,
          headers: requestHeaders,
          body,
          signal: finalSignal,
        });

        // Очищаем timeout только если мы его создали
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        let data: ApiResponse;

        try {
          data = await response.json();
        } catch (parseError) {
          console.error('❌ Error parsing JSON response:', parseError);
          data = {
            success: false,
            error: 'Ошибка парсинга ответа сервера',
          };
        }

        if (!response.ok) {
          console.error(
            `❌ ${method} ${endpoint} failed:`,
            response.status,
            data
          );

          // Если токен недействителен, очищаем его
          if (response.status === 401) {
            console.warn('🔒 Unauthorized - token may be expired');
          }

          return {
            success: false,
            error: data.error || `HTTP ${response.status}`,
            statusCode: response.status,
          };
        }

        console.log(`✅ ${method} ${endpoint} success`);
        return data; // Возвращаем данные как есть
      } catch (error) {
        console.error(`💥 ${method} ${endpoint} error:`, error);

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            return {
              success: false,
              error: 'Запрос был отменен или превысил время ожидания',
            };
          }

          if (
            error.message.includes('fetch') ||
            error.message.includes('Failed to fetch')
          ) {
            return {
              success: false,
              error: 'Сервер недоступен. Проверьте подключение.',
            };
          }
        }

        return {
          success: false,
          error: 'Ошибка соединения с сервером',
        };
      }
    },
    [accessToken, baseUrl]
  );

  // Базовые HTTP методы
  const get = useCallback(
    (endpoint: string): Promise<ApiResponse> =>
      makeRequest(endpoint, { method: 'GET' }),
    [makeRequest]
  );

  const post = useCallback(
    (endpoint: string, data?: unknown): Promise<ApiResponse> =>
      makeRequest(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [makeRequest]
  );

  const put = useCallback(
    (endpoint: string, data?: unknown): Promise<ApiResponse> =>
      makeRequest(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [makeRequest]
  );

  const del = useCallback(
    (endpoint: string): Promise<ApiResponse> =>
      makeRequest(endpoint, { method: 'DELETE' }),
    [makeRequest]
  );

  // Структурированные методы API
  const adminApi = {
    // ==================== ПРОДУКТЫ ====================
    products: {
      getAll: async (): Promise<ApiResponse> => {
        return get('/admin/products');
      },

      getById: async (id: string): Promise<ApiResponse> => {
        return get(`/admin/products/${id}`);
      },

      create: async (data: unknown): Promise<ApiResponse> => {
        return post('/admin/products', data);
      },

      update: async (id: string, data: unknown): Promise<ApiResponse> => {
        return put(`/admin/products/${id}`, data);
      },

      delete: async (id: string): Promise<ApiResponse> => {
        return del(`/admin/products/${id}`);
      },
    },

    // ==================== КАТЕГОРИИ ====================
    categories: {
      getAll: async (params?: string): Promise<ApiResponse> => {
        const endpoint = `/admin/categories${params ? `?${params}` : ''}`;
        return get(endpoint);
      },

      getById: async (id: string): Promise<ApiResponse> => {
        return get(`/admin/categories/${id}`);
      },

      create: async (data: unknown): Promise<ApiResponse> => {
        return post('/admin/categories', data);
      },

      getSubcategories: async (
        categoryId: number,
        locale: string
      ): Promise<ApiResponse> => {
        const endpoint = `/admin/categories/subcategories/all?categoryId=${categoryId}&locale=${locale}`;
        return get(endpoint);
      },
    },

    // ==================== БРЕНДЫ ====================
    brands: {
      getAll: async (params?: string): Promise<ApiResponse> => {
        const endpoint = `/admin/brands${params ? `?${params}` : ''}`;
        return get(endpoint);
      },

      getById: async (id: string): Promise<ApiResponse> => {
        return get(`/admin/brands/${id}`);
      },

      create: async (data: unknown): Promise<ApiResponse> => {
        return post('/admin/brands', data);
      },
    },

    // ==================== КЕШИРОВАНИЕ ====================
    cache: {
      getStats: async (): Promise<ApiResponse> => {
        return get('/admin/system/cache/stats');
      },

      getHealth: async (): Promise<ApiResponse> => {
        return get('/admin/system/cache/health');
      },

      clear: async (): Promise<ApiResponse> => {
        return post('/admin/system/cache/clear');
      },

      invalidateProducts: async (): Promise<ApiResponse> => {
        return post('/admin/system/cache/invalidate/products');
      },

      invalidateCategories: async (): Promise<ApiResponse> => {
        return post('/admin/system/cache/invalidate/categories');
      },

      invalidateBrands: async (): Promise<ApiResponse> => {
        return post('/admin/system/cache/invalidate/brands');
      },
    },

    // ==================== СИСТЕМНАЯ ИНФОРМАЦИЯ ====================
    system: {
      getHealth: async (): Promise<ApiResponse> => {
        return get('/admin/system/health');
      },

      getStats: async (): Promise<ApiResponse> => {
        return get('/admin/system/stats');
      },

      getLogs: async (): Promise<ApiResponse> => {
        return get('/admin/system/logs');
      },
    },
  };

  return {
    // Базовые методы
    get,
    post,
    put,
    delete: del,
    makeRequest,

    // Структурированное API
    adminApi,

    // Статус авторизации
    isAuthenticated: !!accessToken,
  };
};
