// src/shared/components/ProtectedRoute/ProtectedRoute.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { createLocalizedUrl } from '@/shared/utils/redirect';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
  redirectTo = 'admin',
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Ждем завершения загрузки
    if (isLoading) return;

    // Если не авторизован, перенаправляем на страницу логина
    if (!isAuthenticated) {
      setShouldRedirect(true);
      // Небольшая задержка для плавности
      const timer = setTimeout(() => {
        const localizedRedirectUrl = createLocalizedUrl(redirectTo);
        router.push(localizedRedirectUrl);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Показываем загрузку
  if (isLoading) {
    return (
      fallback || (
        <div className="protected-route-loading">
          <div className="loading-content">
            <div className="loading-spinner" />
            Проверка авторизации...
          </div>
          <style jsx>{`
            .protected-route-loading {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: 'Inter', sans-serif;
            }

            .loading-content {
              display: flex;
              align-items: center;
              gap: 1rem;
              font-size: 1.4rem;
              color: var(--muted-foreground);
            }

            .loading-spinner {
              width: 2rem;
              height: 2rem;
              border: 2px solid transparent;
              border-top: 2px solid var(--primary);
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )
    );
  }

  // Если перенаправляем
  if (shouldRedirect || !isAuthenticated) {
    return (
      fallback || (
        <div className="protected-route-redirect">
          <div className="redirect-content">
            <div className="redirect-title">Требуется авторизация</div>
            <div className="redirect-subtitle">
              Перенаправление на страницу входа...
            </div>
          </div>
          <style jsx>{`
            .protected-route-redirect {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: 'Inter', sans-serif;
            }

            .redirect-content {
              text-align: center;
              color: var(--muted-foreground);
            }

            .redirect-title {
              font-size: 1.6rem;
              font-weight: 600;
              margin-bottom: 1rem;
              color: var(--foreground);
            }

            .redirect-subtitle {
              font-size: 1.4rem;
            }
          `}</style>
        </div>
      )
    );
  }

  // Если авторизован, показываем содержимое
  return <>{children}</>;
};

export default ProtectedRoute;
