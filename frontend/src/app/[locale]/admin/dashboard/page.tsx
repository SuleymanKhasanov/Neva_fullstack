// frontend/src/app/[locale]/admin/dashboard/page.tsx
'use client';

import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { useAuth } from '@/shared/contexts/AuthContext';
import styles from './page.module.css';

// Компонент содержимого дашборда
const DashboardContent = () => {
  const { user } = useAuth();

  const getCurrentTime = () => {
    return new Date().toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать в админ панель</h1>
        <p className={styles.subtitle}>
          Управляйте продуктами, категориями и системой
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.welcome}>Привет, {user?.username}! 👋</h2>
          <p className={styles.description}>
            Вы успешно авторизованы в админ панели. <br />
            Здесь будет функциональность управления продуктами, категориями и
            брендами.
          </p>
          <div className={styles.userInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Роль:</span>
              <span className={styles.infoValue}>{user?.role}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Время входа:</span>
              <span className={styles.infoValue}>{getCurrentTime()}</span>
            </div>
          </div>
          <div className={styles.status}>✅ Система работает</div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Продукты</h3>
            <p className={styles.cardDescription}>
              Управление каталогом продуктов
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statsNumber}>1,234</span>
              <span className={styles.statsLabel}>Всего продуктов</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Категории</h3>
            <p className={styles.cardDescription}>
              Управление категориями товаров
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statsNumber}>42</span>
              <span className={styles.statsLabel}>Активных категорий</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Бренды</h3>
            <p className={styles.cardDescription}>Управление брендами</p>
            <div className={styles.cardStats}>
              <span className={styles.statsNumber}>156</span>
              <span className={styles.statsLabel}>Партнерских брендов</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Кеш</h3>
            <p className={styles.cardDescription}>Управление кешированием</p>
            <div className={styles.cardStats}>
              <span className={styles.statsNumber}>98%</span>
              <span className={styles.statsLabel}>Эффективность кеша</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Главный компонент страницы
const AdminDashboardPage = () => {
  return (
    <AdminRouteGuard redirectTo="admin/">
      <DashboardContent />
    </AdminRouteGuard>
  );
};

export default AdminDashboardPage;
