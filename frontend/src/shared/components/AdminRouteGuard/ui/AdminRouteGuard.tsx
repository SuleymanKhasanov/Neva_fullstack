// src/shared/components/AdminRouteGuard/AdminRouteGuard.tsx
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { useEffect } from 'react';
import { redirectToLocalized } from '@/shared/utils/redirect';

interface AdminRouteGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Компонент для защиты админских маршрутов
 * Проверяет авторизацию пользователя и его роль
 */
const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
  fallback = <div>Загрузка...</div>,
  redirectTo = 'admin/',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    // Ждем пока AuthContext загрузится
    if (isLoading) return;

    // Если пользователь не авторизован - перенаправляем на логин
    if (!isAuthenticated) {
      redirectToLocalized(redirectTo);
      return;
    }

    // Проверяем роль пользователя (опционально)
    if (user && user.role !== 'admin') {
      console.warn('Access denied: insufficient permissions');
      redirectToLocalized(redirectTo);
      return;
    }
  }, [isAuthenticated, isLoading, user, redirectTo]);

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Если пользователь не авторизован или нет нужной роли - показываем fallback
  if (!isAuthenticated || (user && user.role !== 'admin')) {
    return <>{fallback}</>;
  }

  // Если все проверки пройдены - показываем защищенный контент
  return <>{children}</>;
};

// Хук для использования в компонентах страниц
export const useAdminGuard = (redirectTo: string = 'admin/') => {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || (user && user.role !== 'admin')) {
      redirectToLocalized(redirectTo);
    }
  }, [isAuthenticated, isLoading, user, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    hasAccess: isAuthenticated && user?.role === 'admin',
  };
};

export default AdminRouteGuard;
