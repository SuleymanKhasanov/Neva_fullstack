// frontend/src/widgets/AdminHeader/ui/AdminHeader.tsx
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
// import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';
import { LuMenu, LuX, LuLogOut } from 'react-icons/lu';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  locale: string;
  messages: TranslationType;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const AdminHeader = ({
  locale,
  onToggleSidebar,
  isSidebarOpen,
}: AdminHeaderProps) => {
  const { logout, t } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Левая часть - кнопка меню */}
        <div className={styles.leftSection}>
          <button
            className={styles.menuButton}
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Скрыть меню' : 'Показать меню'}
          >
            {isSidebarOpen ? (
              <LuX className={styles.menuIcon} />
            ) : (
              <LuMenu className={styles.menuIcon} />
            )}
          </button>
        </div>

        {/* Правая часть - контролы */}
        <div className={styles.rightSection}>
          <ThemeSwitcher />
          {/* <LanguageSwitcher locale={locale} /> */}
          <Button
            variant="secondary"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <LuLogOut className={styles.logoutIcon} />
            <span className={styles.logoutText}>
              {t(TranslationKeys.AdminLogout)}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
