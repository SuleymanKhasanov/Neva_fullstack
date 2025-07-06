// frontend/src/widgets/AdminHeader/ui/AdminHeader.tsx
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';
import { LuLogOut, LuPanelsTopLeft } from 'react-icons/lu';
import styles from './AdminHeader.module.css';
import { AdminLanguageSwitcher } from '@/features/AdminLanguageSwitcher';

interface AdminHeaderProps {
  locale: string;
  messages: TranslationType;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const AdminHeader = ({ locale, onToggleSidebar }: AdminHeaderProps) => {
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
          <Button
            variant="secondary"
            onClick={onToggleSidebar}
            className={styles.menuButton}
          >
            <LuPanelsTopLeft />
          </Button>
        </div>

        {/* Правая часть - контролы */}
        <div className={styles.rightSection}>
          {/* ✅ ДОБАВИЛИ: Переключатель языков */}
          <ThemeSwitcher />
          <AdminLanguageSwitcher locale={locale} />

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
