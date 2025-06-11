'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/contexts/AuthContext';
import { AdminLoginPage } from '@/pages/AdminLogin';
import { TranslationKeys } from '@/shared/config/i18n/types';

const AdminPage = () => {
  const { isAuthenticated, isLoading, t } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace('/ru/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

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
        }}
      >
        {t(TranslationKeys.AuthLoading)}
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <AdminLoginPage />;
};

export default AdminPage;
