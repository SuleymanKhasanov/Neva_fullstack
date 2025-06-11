'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

interface User {
  username: string;
  role: string;
}

// Типы для ошибок авторизации
interface LoginError {
  type: 'INVALID_CREDENTIALS' | 'SERVER_ERROR' | 'NETWORK_ERROR';
  message: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: LoginError }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
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
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Вычисляемое свойство для проверки авторизации
  const isAuthenticated = !!(accessToken && user);

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
    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Проверяем статус ответа
      if (response.status === 401) {
        return {
          success: false,
          error: {
            type: 'INVALID_CREDENTIALS',
            message: 'Неверный логин или пароль',
          },
        };
      }

      if (response.status >= 500) {
        return {
          success: false,
          error: {
            type: 'SERVER_ERROR',
            message: 'Ошибка сервера. Попробуйте позже',
          },
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed:', errorData);

        return {
          success: false,
          error: {
            type: 'SERVER_ERROR',
            message: errorData.message || 'Ошибка авторизации',
          },
        };
      }

      const data = await response.json();

      if (data.access_token && data.user) {
        saveAuthData(data.access_token, data.refresh_token, data.user);
        return { success: true };
      }

      return {
        success: false,
        error: {
          type: 'SERVER_ERROR',
          message: 'Неверный ответ сервера',
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: {
          type: 'NETWORK_ERROR',
          message: 'Ошибка соединения с сервером',
        },
      };
    } finally {
      setIsLoading(false);
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

      const data = await response.json();

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
