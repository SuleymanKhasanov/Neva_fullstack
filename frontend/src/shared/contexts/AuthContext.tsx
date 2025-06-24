// frontend/src/shared/contexts/AuthContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { TranslationType } from '@/shared/config/i18n/types';
import {
  AdminUser,
  LoginResult,
  LoginError,
  RefreshResponse,
} from '@/shared/types/admin.types';

interface AuthContextType {
  user: AdminUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  locale: string;
  messages: TranslationType | null;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  t: (key: string, params?: Record<string, string>) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  baseUrl?: string;
  locale: string;
  messages: TranslationType;
}

// Типы для API ответов с бекенда
interface BackendLoginResponse {
  access_token?: string;
  refresh_token?: string;
  user?: AdminUser;
  message?: string;
  error?: string;
}

// Используем типизированный RefreshResponse из admin.types
type BackendRefreshResponse = RefreshResponse;

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  locale,
  messages,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Вычисляемое свойство для проверки авторизации
  const isAuthenticated = !!(accessToken && user);

  // Функция для перевода
  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      const keys = key.split('.');
      let value: string | Record<string, unknown> = messages;

      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = value[k] as string | Record<string, unknown>;
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key; // Возвращаем ключ, если перевод не найден
        }
      }

      let result = typeof value === 'string' ? value : key;

      // Заменяем параметры в строке
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          result = result.replace(`{${paramKey}}`, paramValue);
        });
      }

      return result;
    },
    [messages]
  );

  // Сохранение токенов в localStorage
  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string): void => {
      if (typeof window === 'undefined') return;

      localStorage.setItem('admin_access_token', accessToken);
      localStorage.setItem('admin_refresh_token', refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    []
  );

  // Очистка токенов
  const clearTokens = useCallback((): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  // Функция для обновления токена
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    const storedRefreshToken =
      refreshToken ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('admin_refresh_token')
        : null);

    if (!storedRefreshToken) {
      console.log('❌ No refresh token available');
      return false;
    }

    try {
      console.log('🔄 Attempting to refresh access token...');

      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: storedRefreshToken }),
      });

      if (!response.ok) {
        console.log('❌ Token refresh failed:', response.status);
        clearTokens();
        return false;
      }

      const data: BackendRefreshResponse = await response.json();

      if (data.access_token) {
        console.log('✅ Token refreshed successfully');
        setAccessToken(data.access_token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_access_token', data.access_token);
        }
        return true;
      } else {
        console.log('❌ No access token in refresh response');
        clearTokens();
        return false;
      }
    } catch (error) {
      console.error('💥 Error refreshing token:', error);
      clearTokens();
      return false;
    }
  }, [baseUrl, refreshToken, clearTokens]);

  // Функция входа в систему
  const login = useCallback(
    async (username: string, password: string): Promise<LoginResult> => {
      try {
        console.log('🚀 Attempting login for username:', username);

        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data: BackendLoginResponse = await response.json();
        console.log('📋 Login response status:', response.status);

        if (
          response.ok &&
          data.access_token &&
          data.refresh_token &&
          data.user
        ) {
          console.log('✅ Login successful');

          // Сохраняем токены и пользователя
          saveTokens(data.access_token, data.refresh_token);
          setUser(data.user);

          return { success: true };
        } else {
          console.log('❌ Login failed:', data.message || data.error);

          // Определяем тип ошибки
          let errorType: LoginError['type'] = 'INVALID_CREDENTIALS';
          if (response.status >= 500) {
            errorType = 'SERVER_ERROR';
          } else if (!response.ok && response.status === 0) {
            errorType = 'NETWORK_ERROR';
          }

          const error: LoginError = {
            type: errorType,
            message: data.message || data.error || 'Неизвестная ошибка',
          };

          return { success: false, error };
        }
      } catch (err) {
        console.error('💥 Login network error:', err);

        const error: LoginError = {
          type: 'NETWORK_ERROR',
          message: 'Ошибка соединения с сервером',
          details: err instanceof Error ? err.message : 'Unknown error',
        };

        return { success: false, error };
      }
    },
    [baseUrl, saveTokens]
  );

  // Функция выхода из системы
  const logout = useCallback(async (): Promise<void> => {
    console.log('👋 Logging out...');
    clearTokens();
  }, [clearTokens]);

  // Загрузка сохраненных токенов при инициализации
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      console.log('🔄 Initializing authentication...');

      const storedAccessToken = localStorage.getItem('admin_access_token');
      const storedRefreshToken = localStorage.getItem('admin_refresh_token');

      if (!storedAccessToken || !storedRefreshToken) {
        console.log('❌ No stored tokens found');
        setIsLoading(false);
        return;
      }

      console.log('📋 Found stored tokens, verifying...');

      try {
        // Проверяем действительность access token через запрос профиля
        const response = await fetch(`${baseUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (response.ok) {
          const userData: AdminUser = await response.json();
          console.log(
            '✅ Valid tokens, user authenticated:',
            userData.username
          );

          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          setUser(userData);
        } else if (response.status === 401) {
          console.log('🔄 Access token expired, trying to refresh...');

          // Пробуем обновить токен
          setRefreshToken(storedRefreshToken);
          const refreshSuccess = await refreshAuth();

          if (refreshSuccess) {
            // После успешного обновления, снова запрашиваем профиль
            const profileResponse = await fetch(`${baseUrl}/auth/profile`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`,
              },
            });

            if (profileResponse.ok) {
              const userData: AdminUser = await profileResponse.json();
              setUser(userData);
              console.log('✅ Token refreshed and user authenticated');
            }
          }
        } else {
          console.log('❌ Token verification failed');
          clearTokens();
        }
      } catch (error) {
        console.error('💥 Error during auth initialization:', error);
        clearTokens();
      } finally {
        setIsLoading(false);
        console.log('🏁 Auth initialization completed');
      }
    };

    initializeAuth();
  }, [baseUrl, refreshAuth, clearTokens]);

  const contextValue: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isLoading,
    isAuthenticated,
    locale,
    messages,
    login,
    logout,
    refreshAuth,
    t,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
