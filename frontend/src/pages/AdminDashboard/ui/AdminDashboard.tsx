'use client';

import { useAuth } from '@/shared/contexts/AuthContext';
import styles from './AdminDashboard.module.css';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Админ панель</h1>
      <p className={styles.subtitle}>
        Добро пожаловать в панель администратора Neva
      </p>

      <div className={styles.content}>
        <h2 className={styles.welcome}>Привет, {user?.username}!</h2>
        <p className={styles.description}>
          Вы успешно авторизованы в админ панели. <br />
          Здесь будет функциональность управления продуктами, категориями и
          брендами.
        </p>
        <div className={styles.status}>✅ Система работает</div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
