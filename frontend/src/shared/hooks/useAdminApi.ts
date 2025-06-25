// frontend/src/shared/hooks/useAdminApi.ts
'use client';

import { useCallback, useMemo } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';

// Минимальные типы для работы
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
 * ✅ ИСПРАВЛЕННЫЙ хук для работы с админским API
 */
export const useAdminApi = () => {
  const { accessToken } = useAuth();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // ✅ МЕМОИЗИРОВАННАЯ функция для выполнения запросов
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

        // ✅ УПРОЩЕННАЯ обработка AbortController
        let finalSignal = signal;
        let controller: AbortController | undefined;
        let timeoutId: NodeJS.Timeout | undefined;

        if (!signal) {
          controller = new AbortController();
          finalSignal = controller.signal;
          timeoutId = setTimeout(() => {
            console.log(`⏰ Request timeout for ${method} ${endpoint}`);
            controller?.abort();
          }, 10000); // Увеличили timeout до 10 секунд
        }

        const response = await fetch(`${baseUrl}${endpoint}`, {
          method,
          headers: requestHeaders,
          body,
          signal: finalSignal,
        });

        // Очищаем timeout
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

          // Если токен недействителен, не очищаем автоматически
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
        return data;
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
            error.message.includes('Failed to fetch') ||
            error.message.includes('NetworkError')
          ) {
            return {
              success: false,
              error:
                'Сервер недоступен. Проверьте подключение к серверу и убедитесь что backend запущен.',
            };
          }
        }

        return {
          success: false,
          error: 'Ошибка соединения с сервером',
        };
      }
    },
    [accessToken, baseUrl] // ✅ Только стабильные зависимости
  );

  // ✅ МЕМОИЗИРОВАННЫЕ базовые HTTP методы
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

  // ✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Мемоизированный adminApi объект
  const adminApi = useMemo(
    () => ({
      // ==================== ПРОДУКТЫ ====================
      products: {
        getAll: (): Promise<ApiResponse> => get('/admin/products'),
        getById: (id: string): Promise<ApiResponse> =>
          get(`/admin/products/${id}`),
        create: (data: unknown): Promise<ApiResponse> =>
          post('/admin/products', data),
        update: (id: string, data: unknown): Promise<ApiResponse> =>
          put(`/admin/products/${id}`, data),
        delete: (id: string): Promise<ApiResponse> =>
          del(`/admin/products/${id}`),
      },

      // ==================== КАТЕГОРИИ ====================
      categories: {
        getAll: (params?: string): Promise<ApiResponse> => {
          const endpoint = `/admin/categories${params ? `?${params}` : ''}`;
          return get(endpoint);
        },
        getById: (id: string): Promise<ApiResponse> =>
          get(`/admin/categories/${id}`),
        create: (data: unknown): Promise<ApiResponse> =>
          post('/admin/categories', data),
        getSubcategories: (
          categoryId: number,
          locale: string
        ): Promise<ApiResponse> => {
          const endpoint = `/admin/categories/subcategories/all?categoryId=${categoryId}&locale=${locale}`;
          return get(endpoint);
        },
      },

      // ==================== БРЕНДЫ ====================
      brands: {
        getAll: (params?: string): Promise<ApiResponse> => {
          const endpoint = `/admin/brands${params ? `?${params}` : ''}`;
          return get(endpoint);
        },
        getById: (id: string): Promise<ApiResponse> =>
          get(`/admin/brands/${id}`),
        create: (data: unknown): Promise<ApiResponse> =>
          post('/admin/brands', data),
      },

      // ==================== КЕШИРОВАНИЕ ====================
      cache: {
        getStats: (): Promise<ApiResponse> => get('/admin/system/cache/stats'),
        getHealth: (): Promise<ApiResponse> =>
          get('/admin/system/cache/health'),
        clear: (): Promise<ApiResponse> => post('/admin/system/cache/clear'),
        invalidateProducts: (): Promise<ApiResponse> =>
          post('/admin/system/cache/invalidate/products'),
        invalidateCategories: (): Promise<ApiResponse> =>
          post('/admin/system/cache/invalidate/categories'),
        invalidateBrands: (): Promise<ApiResponse> =>
          post('/admin/system/cache/invalidate/brands'),
      },

      // ==================== СИСТЕМНАЯ ИНФОРМАЦИЯ ====================
      system: {
        getHealth: (): Promise<ApiResponse> => get('/admin/system/health'),
        getStats: (): Promise<ApiResponse> => get('/admin/system/stats'),
        getLogs: (): Promise<ApiResponse> => get('/admin/system/logs'),
      },
    }),
    [get, post, put, del]
  ); // ✅ Стабильные зависимости

  // ✅ МЕМОИЗИРОВАННЫЙ возвращаемый объект
  return useMemo(
    () => ({
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
    }),
    [get, post, put, del, makeRequest, adminApi, accessToken]
  );
};
