// frontend/src/app/[locale]/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { AdminLoginPage } from '@/pages/AdminLogin';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { redirectToLocalized } from '@/shared/utils/redirect';

const AdminPage = () => {
  const { isAuthenticated, isLoading, t } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Ждем пока AuthContext загрузится
    if (isLoading) return;

    // Если пользователь авторизован и мы еще не перенаправляли
    if (isAuthenticated && !hasRedirected) {
      console.log('✅ User is authenticated, redirecting to dashboard home...');
      setHasRedirected(true);

      // ИСПРАВЛЕНИЕ: перенаправляем на admin/dashboard/home вместо admin/dashboard
      redirectToLocalized('admin/dashboard/home');
    }
  }, [isAuthenticated, isLoading, hasRedirected]);

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
          gap: '1.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid var(--border)',
            borderTop: '4px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div>{t(TranslationKeys.AuthLoading)}</div>
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
