// frontend/src/shared/components/AdminRouteGuard/ui/AdminRouteGuard.tsx
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
  fallback,
  redirectTo = 'admin', // ИСПРАВЛЕНИЕ: убираем слеш в конце для корректного redirectToLocalized
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    // Ждем пока AuthContext загрузится
    if (isLoading) return;

    // ИСПРАВЛЕНИЕ: Если пользователь не авторизован - перенаправляем на логин
    if (!isAuthenticated) {
      console.log('🔒 User not authenticated, redirecting to login page...');
      redirectToLocalized(redirectTo);
      return;
    }

    // Проверяем роль пользователя (опционально)
    if (user && user.role !== 'admin') {
      console.warn(
        '🚫 Access denied: insufficient permissions. User role:',
        user.role
      );
      redirectToLocalized(redirectTo);
      return;
    }
  }, [isAuthenticated, isLoading, user, redirectTo]);

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return (
      fallback || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '1.5rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <div style={{ fontSize: '1.6rem', fontWeight: '500' }}>
            Проверка доступа...
          </div>
        </div>
      )
    );
  }

  // ИСПРАВЛЕНИЕ: Если пользователь не авторизован - показываем экран перенаправления
  if (!isAuthenticated) {
    return (
      fallback || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0,
            }}
          >
            Требуется авторизация
          </h2>
          <p
            style={{
              fontSize: '1.4rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            Перенаправление на страницу входа в админ панель...
          </p>
        </div>
      )
    );
  }

  // Если нет нужной роли - показываем экран отказа в доступе
  if (user && user.role !== 'admin') {
    return (
      fallback || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--destructive)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: 'var(--destructive)',
              margin: 0,
            }}
          >
            Доступ запрещен
          </h2>
          <p
            style={{
              fontSize: '1.4rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            У вас недостаточно прав для доступа к админ панели.
            <br />
            Перенаправление на страницу входа...
          </p>
        </div>
      )
    );
  }

  // Если все проверки пройдены - показываем защищенный контент
  return <>{children}</>;
};

// Хук для использования в компонентах страниц
export const useAdminGuard = (redirectTo: string = 'admin') => {
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
