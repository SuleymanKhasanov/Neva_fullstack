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
  redirectTo = 'admin', // По умолчанию перенаправляем на страницу входа
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    // Ждем пока AuthContext загрузится
    if (isLoading) return;

    // Если пользователь не авторизован - перенаправляем на логин
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

    console.log('✅ Access granted for admin user:', user?.username);
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
            fontFamily: 'Inter, sans-serif',
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
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )
    );
  }

  // Если пользователь не авторизован - показываем экран перенаправления
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
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
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
          <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: 0 }}>
            Доступ запрещен
          </h2>
          <p style={{ fontSize: '1.4rem', margin: 0, maxWidth: '40rem' }}>
            Для доступа к админ панели необходима авторизация.
            <br />
            Перенаправление на страницу входа...
          </p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )
    );
  }

  // Проверяем роль пользователя
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
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '4rem' }}>🚫</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: 0 }}>
            Недостаточно прав доступа
          </h2>
          <p style={{ fontSize: '1.4rem', margin: 0, maxWidth: '40rem' }}>
            У вас нет прав администратора для доступа к этой странице.
            <br />
            Текущая роль: <strong>{user.role}</strong>
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
