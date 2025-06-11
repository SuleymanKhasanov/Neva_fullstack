'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button/Button';
import styles from './AdminDashboard.module.css';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

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
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Панель администратора</h1>
            <p className={styles.subtitle}>
              Добро пожаловать в панель администратора Neva
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Выйти
          </Button>
        </div>
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
            <Button variant="primary" disabled>
              Скоро доступно
            </Button>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Категории</h3>
            <p className={styles.cardDescription}>
              Управление категориями товаров
            </p>
            <Button variant="primary" disabled>
              Скоро доступно
            </Button>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Бренды</h3>
            <p className={styles.cardDescription}>Управление брендами</p>
            <Button variant="primary" disabled>
              Скоро доступно
            </Button>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Кеш</h3>
            <p className={styles.cardDescription}>Управление кешированием</p>
            <Button variant="primary" disabled>
              Скоро доступно
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
