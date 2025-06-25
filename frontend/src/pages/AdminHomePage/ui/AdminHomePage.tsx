'use client';

import React from 'react';
import { StatCard } from '@/entities/StatCard';
import { useAdminHomeData } from '../lib/hooks/useAdminHomeData';
import { AdminHomePageProps } from '../types';
import styles from './AdminHomePage.module.css';

const AdminHomePage: React.FC<AdminHomePageProps> = ({ messages }) => {
  const { stats, isLoading } = useAdminHomeData();

  const t = messages.admin_home;

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      {/* Сетка карточек статистики */}
      <div className={styles.statsGrid}>
        <StatCard
          title={t.stats.products.title}
          description={t.stats.products.description}
          value={stats.products}
          icon="📦"
          isLoading={isLoading}
          variant="primary"
        />

        <StatCard
          title={t.stats.categories.title}
          description={t.stats.categories.description}
          value={stats.categories}
          icon="🏷️"
          isLoading={isLoading}
          variant="success"
        />

        <StatCard
          title={t.stats.subcategories.title}
          description={t.stats.subcategories.description}
          value={stats.subcategories}
          icon="📋"
          isLoading={isLoading}
          variant="warning"
        />

        <StatCard
          title={t.stats.brands.title}
          description={t.stats.brands.description}
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
