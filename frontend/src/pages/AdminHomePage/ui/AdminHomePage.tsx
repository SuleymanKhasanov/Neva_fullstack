// frontend/src/pages/AdminHomePage/ui/AdminHomePage.tsx
'use client';

import React from 'react';
import { StatCard } from '@/entities/StatCard';
import { useAdminHomeData } from '../lib/hooks/useAdminHomeData';
import { AdminHomePageProps } from '../types';
import { TranslationKeys } from '@/shared/config/i18n/types';
import styles from './AdminHomePage.module.css';

const AdminHomePage: React.FC<AdminHomePageProps> = ({ messages }) => {
  const { stats, isLoading } = useAdminHomeData();

  // ==================== ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ПЕРЕВОДОВ ====================
  const getTranslation = (key: TranslationKeys): string => {
    try {
      const keyPath = key.split('.'); // например: 'admin_home.title'
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

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          {getTranslation(TranslationKeys.AdminHomeTitle)}
        </h1>
        <p className={styles.subtitle}>
          {getTranslation(TranslationKeys.AdminHomeSubtitle)}
        </p>
      </div>

      {/* Сетка карточек статистики */}
      <div className={styles.statsGrid}>
        <StatCard
          title={getTranslation(TranslationKeys.AdminHomeStatsProductsTitle)}
          description={getTranslation(
            TranslationKeys.AdminHomeStatsProductsDescription
          )}
          value={stats.products}
          icon="📦"
          isLoading={isLoading}
          variant="primary"
        />

        <StatCard
          title={getTranslation(TranslationKeys.AdminHomeStatsCategoriesTitle)}
          description={getTranslation(
            TranslationKeys.AdminHomeStatsCategoriesDescription
          )}
          value={stats.categories}
          icon="🏷️"
          isLoading={isLoading}
          variant="success"
        />

        <StatCard
          title={getTranslation(
            TranslationKeys.AdminHomeStatsSubcategoriesTitle
          )}
          description={getTranslation(
            TranslationKeys.AdminHomeStatsSubcategoriesDescription
          )}
          value={stats.subcategories}
          icon="📋"
          isLoading={isLoading}
          variant="warning"
        />

        <StatCard
          title={getTranslation(TranslationKeys.AdminHomeStatsBrandsTitle)}
          description={getTranslation(
            TranslationKeys.AdminHomeStatsBrandsDescription
          )}
          value={stats.brands}
          icon="🏢"
          isLoading={isLoading}
          variant="default"
        />
      </div>
    </div>
  );
};

export default AdminHomePage;
