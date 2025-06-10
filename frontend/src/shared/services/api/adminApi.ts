// Путь: src/shared/api/admin-api.ts
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

  // Простые методы для HTTP запросов
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

  return {
    makeRequest,
    get,
    post,
    isAuthenticated: !!accessToken,
  };
};
