'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
  isAuthenticated: boolean;
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
  baseUrl = 'http://localhost:3000',
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Сохранение токенов в хранилище
  const saveAuthData = (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('admin_access_token', accessToken);
      sessionStorage.setItem('admin_refresh_token', refreshToken);
      sessionStorage.setItem('admin_user', JSON.stringify(user));
    }
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
  };

  // Очистка данных авторизации
  const clearAuthData = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_access_token');
      sessionStorage.removeItem('admin_refresh_token');
      sessionStorage.removeItem('admin_user');
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // Логин
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        return false;
      }

      const data = await response.json();

      if (data.access_token && data.user) {
        saveAuthData(data.access_token, data.refresh_token, data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
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

  // Логаут
  const logout = () => {
    clearAuthData();
  };

  const isAuthenticated = !!accessToken && !!user;

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
