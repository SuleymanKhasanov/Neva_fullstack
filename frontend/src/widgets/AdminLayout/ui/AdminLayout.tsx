// Путь: src/widgets/admin-layout/ui/admin-layout-client.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, TranslationType } from '@/shared/config/i18n/types';
import styles from './AdminLayout.module.css';

interface AdminLayoutClientProps {
  children: ReactNode;
  locale: Locale;
  messages: TranslationType;
}

const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({
  children,
  locale,
}) => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Проверяем, находимся ли мы на странице логина
  // Добавляем проверку на null для pathname
  const isLoginPage = pathname ? pathname.endsWith('/admin') : false;

  useEffect(() => {
    // Добавляем проверку pathname на null
    if (!pathname) return;

    // Если не на странице логина и не авторизован, перенаправляем на логин
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push(`/${locale}/admin`);
    }

    // Если авторизован и на странице логина, перенаправляем в дашборд
    if (!isLoading && isAuthenticated && isLoginPage) {
      router.push(`/${locale}/admin/dashboard`);
    }
  }, [isAuthenticated, isLoading, isLoginPage, router, locale, pathname]);

  // Показываем лоадер во время проверки авторизации или если pathname null
  if (isLoading || !pathname) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован и не на странице логина, показываем лоадер
  if (!isAuthenticated && !isLoginPage) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Перенаправление...</p>
        </div>
      </div>
    );
  }

  // Если на странице логина или не авторизован - показываем без админского layout
  if (isLoginPage || !isAuthenticated) {
    return <div className={styles.loginContainer}>{children}</div>;
  }

  // Если авторизован - показываем админский layout
  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Neva Admin Panel</div>

        <div className={styles.userInfo}>
          <span className={styles.username}>
            Добро пожаловать, {user?.username}
          </span>
          <button onClick={logout} className={styles.logoutButton}>
            Выйти
          </button>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AdminLayoutClient;
