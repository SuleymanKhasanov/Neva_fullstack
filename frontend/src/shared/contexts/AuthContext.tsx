'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';

interface User {
  username: string;
  role: string;
}

// Типы для ошибок авторизации
interface LoginError {
  type: 'INVALID_CREDENTIALS' | 'SERVER_ERROR' | 'NETWORK_ERROR';
  message: string;
  details?: string; // Дополнительная информация об ошибке
}

// Типы для API ответов
interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  user?: User;
  message?: string;
  error?: string;
}

interface RefreshResponse {
  access_token?: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  locale: string;
  messages: TranslationType | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: LoginError }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  t: (key: string, params?: Record<string, string>) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
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

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  locale,
  messages,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Вычисляемое свойство для проверки авторизации
  const isAuthenticated = !!(accessToken && user);

  // Функция для перевода
  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      const keys = key.split('.');
      if (keys.length < 2) return key;

      let value: unknown = messages;

      // Проходим по цепочке ключей
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key; // Если ключ не найден, возвращаем исходный ключ
        }
      }

      if (typeof value === 'string') {
        // Заменяем параметры в строке типа {username}
        if (params) {
          return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
            return params[paramKey] || match;
          });
        }
        return value;
      }

      return key;
    },
    [messages]
  );

  // Сохранение токенов в хранилище
  const saveAuthData = useCallback(
    (accessToken: string, refreshToken: string, user: User) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_access_token', accessToken);
        sessionStorage.setItem('admin_refresh_token', refreshToken);
        sessionStorage.setItem('admin_user', JSON.stringify(user));
      }
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
    },
    []
  );

  // Очистка данных авторизации
  const clearAuthData = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_access_token');
      sessionStorage.removeItem('admin_refresh_token');
      sessionStorage.removeItem('admin_user');
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  // Инициализация - загрузка токенов из хранилища
  useEffect(() => {
    const initAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedAccessToken =
            sessionStorage.getItem('admin_access_token');
          const storedRefreshToken = sessionStorage.getItem(
            'admin_refresh_token'
          );
          const storedUser = sessionStorage.getItem('admin_user');

          if (storedAccessToken && storedUser) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [clearAuthData]);

  // Логин с улучшенной обработкой ошибок
  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: LoginError }> => {
    console.log('🔄 Starting login request...');

    try {
      // НЕ устанавливаем isLoading здесь, так как это может повлиять на UI
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      // Пытаемся получить JSON ответ
      let responseData: LoginResponse = {};
      try {
        const textResponse = await response.text();
        console.log('📝 Raw response text:', textResponse);

        if (textResponse) {
          responseData = JSON.parse(textResponse) as LoginResponse;
        }
      } catch (parseError) {
        console.warn('⚠️ Failed to parse response JSON:', parseError);
        responseData = {};
      }

      console.log('📋 Parsed response data:', responseData);

      // Проверяем статус ответа
      if (response.status === 401) {
        console.log('🔴 401 Unauthorized - Invalid credentials');
        const errorMessage =
          responseData.message || 'Неверный логин или пароль';
        return {
          success: false,
          error: {
            type: 'INVALID_CREDENTIALS',
            message: errorMessage,
            details: `Status: ${response.status}, Error: ${responseData.error || 'Unauthorized'}`,
          },
        };
      }

      if (response.status >= 500) {
        console.log('🔴 Server error (5xx)');
        return {
          success: false,
          error: {
            type: 'SERVER_ERROR',
            message: responseData.message || t(TranslationKeys.AuthServerError),
            details: `Status: ${response.status}`,
          },
        };
      }

      if (!response.ok) {
        console.error(
          '🔴 Login failed with status:',
          response.status,
          responseData
        );
        return {
          success: false,
          error: {
            type: 'SERVER_ERROR',
            message: responseData.message || t(TranslationKeys.AuthServerError),
            details: `Status: ${response.status}, Response: ${JSON.stringify(responseData)}`,
          },
        };
      }

      // Проверяем наличие необходимых данных в ответе
      if (responseData.access_token && responseData.user) {
        console.log('✅ Login successful!');
        saveAuthData(
          responseData.access_token,
          responseData.refresh_token || '',
          responseData.user
        );
        return { success: true };
      }

      console.log('🔴 Missing required data in response');
      return {
        success: false,
        error: {
          type: 'SERVER_ERROR',
          message: t(TranslationKeys.AuthServerError),
          details: 'Missing access_token or user in response',
        },
      };
    } catch (error) {
      console.error('💥 Login network error:', error);

      // Определяем тип ошибки сети
      const isNetworkError =
        error instanceof TypeError && error.message.includes('fetch');

      return {
        success: false,
        error: {
          type: 'NETWORK_ERROR',
          message: isNetworkError
            ? 'Ошибка сети. Проверьте подключение к интернету.'
            : t(TranslationKeys.AuthNetworkError),
          details:
            error instanceof Error ? error.message : 'Unknown network error',
        },
      };
    }
  };

  // Обновление токена
  const refreshAuth = async (): Promise<boolean> => {
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        clearAuthData();
        return false;
      }

      const data: RefreshResponse = await response.json();

      if (data.access_token && user) {
        saveAuthData(data.access_token, refreshToken, user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      clearAuthData();
      return false;
    }
  };

  // Логаут с очисткой сессии на сервере
  const logout = useCallback(async () => {
    try {
      // Пытаемся отправить запрос на сервер для invalidation токена
      if (accessToken) {
        await fetch(`${baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }).catch((error) => {
          // Игнорируем ошибки logout на сервере
          console.warn('Logout request failed:', error);
        });
      }
    } finally {
      // В любом случае очищаем локальные данные
      clearAuthData();
    }
  }, [clearAuthData, accessToken, refreshToken, baseUrl]);

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isLoading,
    login,
    logout,
    refreshAuth,
    isAuthenticated,
    locale,
    messages,
    t,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
