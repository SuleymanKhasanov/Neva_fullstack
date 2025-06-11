'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/contexts/AuthContext';
import { AdminLoginPage } from '@/pages/AdminLogin';
import { TranslationKeys } from '@/shared/config/i18n/types';

const AdminPage = () => {
  const { isAuthenticated, isLoading, t } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Ждем пока AuthContext загрузится
    if (isLoading) return;

    // Если пользователь авторизован и мы еще не перенаправляли
    if (isAuthenticated && !hasRedirected) {
      console.log('✅ User is authenticated, redirecting to dashboard...');
      setHasRedirected(true);
      router.replace('/ru/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router, hasRedirected]);

  // Показываем загрузку во время инициализации AuthContext
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.6rem',
          color: 'var(--text-secondary)',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        {t(TranslationKeys.AuthLoading)}
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Если пользователь авторизован, но мы еще перенаправляем
  if (isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.6rem',
          color: 'var(--text-secondary)',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        Перенаправление...
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Если пользователь не авторизован, показываем форму входа
  return <AdminLoginPage />;
};

export default AdminPage;
