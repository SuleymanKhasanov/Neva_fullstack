// frontend/src/widgets/AdminSidebar/ui/AdminSidebar.tsx
'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { TranslationType } from '@/shared/config/i18n/types';
import {
  LuHouse,
  LuPackage,
  LuTag,
  LuDatabase,
  LuUsers,
  LuSettings,
} from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  isOpen: boolean;
  locale: string;
  messages: TranslationType;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  disabled?: boolean;
}

const AdminSidebar = ({ isOpen, locale }: AdminSidebarProps) => {
  const { user } = useAuth();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Главная',
      icon: LuHouse,
      href: `/${locale}/admin/dashboard`,
    },
    {
      id: 'products',
      label: 'Продукты',
      icon: LuPackage,
      href: `/${locale}/admin/products`,
      disabled: true,
    },
    {
      id: 'categories',
      label: 'Категории',
      icon: LuTag,
      href: `/${locale}/admin/categories`,
      disabled: true,
    },
    {
      id: 'brands',
      label: 'Бренды',
      icon: LuTag,
      href: `/${locale}/admin/brands`,
      disabled: true,
    },
    {
      id: 'cache',
      label: 'Кеш',
      icon: LuDatabase,
      href: `/${locale}/admin/cache`,
      disabled: true,
    },
    {
      id: 'users',
      label: 'Пользователи',
      icon: LuUsers,
      href: `/${locale}/admin/users`,
      disabled: true,
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: LuSettings,
      href: `/${locale}/admin/settings`,
      disabled: true,
    },
  ];

  const isActiveItem = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <div className={styles.sidebarContent}>
        {/* Заголовок */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>A</div>
            {isOpen && (
              <div className={styles.logoText}>
                <h2 className={styles.logoTitle}>Admin Panel</h2>
                <p className={styles.logoSubtitle}>Neva</p>
              </div>
            )}
          </div>
        </div>

        {/* Информация о пользователе */}
        {isOpen && user && (
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        )}

        {/* Навигационное меню */}
        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveItem(item.href);

              return (
                <li key={item.id} className={styles.menuItem}>
                  {item.disabled ? (
                    <div className={`${styles.menuLink} ${styles.disabled}`}>
                      <Icon className={styles.menuIcon} />
                      {isOpen && (
                        <span className={styles.menuLabel}>{item.label}</span>
                      )}
                      {isOpen && (
                        <span className={styles.comingSoon}>Скоро</span>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                    >
                      <Icon className={styles.menuIcon} />
                      {isOpen && (
                        <span className={styles.menuLabel}>{item.label}</span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
