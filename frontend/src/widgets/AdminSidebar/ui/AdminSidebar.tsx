// frontend/src/widgets/AdminSidebar/ui/AdminSidebar.tsx
'use client';

import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';
import { LuHouse, LuPlus, LuList } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import styles from './AdminSidebar.module.css';
import Image from 'next/image';
import Logo from '@/shared/assets/Logo-light.svg';

interface AdminSidebarProps {
  isOpen: boolean;
  locale: string;
  messages: TranslationType;
  onToggle?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  disabled?: boolean;
}

const AdminSidebar = ({
  isOpen,
  locale,
  messages,
  onToggle,
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Проверка на мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ==================== ПОЛУЧЕНИЕ ПЕРЕВОДОВ ЧЕРЕЗ ENUM (ИСПРАВЛЕНО) ====================
  const getTranslation = (key: TranslationKeys): string => {
    try {
      const keyPath = key.split('.'); // например: 'sidebar.dashboard'
      let value: unknown = messages; // 👈 ИСПРАВЛЕНО: any → unknown

      for (const k of keyPath) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key; // fallback если путь не найден
        }
      }

      return typeof value === 'string' ? value : key;
    } catch {
      return key; // fallback к ключу если перевод не найден
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: getTranslation(TranslationKeys.SidebarDashboard), // 👈 ИСПОЛЬЗОВАНИЕ ENUM
      icon: LuHouse,
      href: `/${locale}/admin/dashboard/home`,
    },
    {
      id: 'products-create',
      label: getTranslation(TranslationKeys.SidebarProductsCreate), // 👈 ИСПОЛЬЗОВАНИЕ ENUM
      icon: LuPlus,
      href: `/${locale}/admin/dashboard/create`,
    },
    {
      id: 'products-list',
      label: getTranslation(TranslationKeys.SidebarProductsList), // 👈 ИСПОЛЬЗОВАНИЕ ENUM
      icon: LuList,
      href: `/${locale}/admin/dashboard/products`,
      disabled: false, // Активируем список продуктов
    },
  ];

  const isActiveItem = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );

  const handleMenuItemClick = useCallback(
    (item: MenuItem, e: React.MouseEvent) => {
      if (item.disabled) {
        e.preventDefault();
        return;
      }

      // Закрываем сайдбар на мобильных устройствах после клика
      if (isMobile && onToggle) {
        setTimeout(onToggle, 150);
      }
    },
    [isMobile, onToggle]
  );

  const handleOverlayClick = useCallback(() => {
    if (onToggle) {
      onToggle();
    }
  }, [onToggle]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Overlay для мобильных устройств */}
      {isOpen && isMobile && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          role="button"
          tabIndex={0}
          aria-label="Закрыть меню"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOverlayClick();
            }
          }}
        />
      )}

      <aside
        className={`${styles.sidebar} ${!isOpen ? styles.closed : ''} ${isMobile && isOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Административная навигация"
      >
        <div className={styles.sidebarContent}>
          {/* Заголовок с логотипом */}
          <header className={styles.sidebarHeader}>
            <div className={styles.logo}>
              <div className={styles.logoIcon} aria-hidden="true">
                <Image src={Logo} alt="Logo" priority />
              </div>
              {isOpen && (
                <div className={styles.logoText}>
                  <h1 className={styles.logoTitle}>East Telecom</h1>
                  <p className={styles.logoSubtitle}>B2B Catalog Admin Panel</p>
                </div>
              )}
            </div>
          </header>

          {/* Основное навигационное меню */}
          <nav className={styles.navigation}>
            <ul className={styles.menuList} role="none">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveItem(item.href);

                return (
                  <li
                    key={item.id}
                    className={styles.menuItem}
                    data-tooltip={!isOpen ? item.label : ''}
                    role="none"
                  >
                    {item.disabled ? (
                      <div
                        className={`${styles.menuLink} ${styles.disabled}`}
                        role="menuitem"
                        aria-disabled="true"
                      >
                        <Icon className={styles.menuIcon} aria-hidden="true" />
                        {isOpen && (
                          <span className={styles.menuLabel}>{item.label}</span>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                        onClick={(e) => handleMenuItemClick(item, e)}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className={styles.menuIcon} aria-hidden="true" />
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
    </>
  );
};

export default AdminSidebar;
