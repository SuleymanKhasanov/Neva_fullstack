// Путь: src/pages/admin-login/ui/admin-login-page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        router.refresh();
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError(`Ошибка авторизации. Попробуйте еще раз. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Neva Admin</h1>
        <p className={styles.subtitle}>Войдите в панель администратора</p>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            Логин
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="Введите логин"
            disabled={isLoading}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Введите пароль"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !username || !password}
          className={styles.button}
        >
          {isLoading ? (
            <>
              <span className={styles.loader}></span>
              Вход...
            </>
          ) : (
            'Войти'
          )}
        </button>

        <div className={styles.testData}>
          <strong>Тестовые данные:</strong>
          <br />
          Логин: <code>admin</code> | Пароль: <code>admin123</code>
        </div>

        <div className={styles.backLink}>
          <button
            type="button"
            onClick={() => router.push('/ru')}
            className={styles.backButton}
          >
            ← Вернуться на сайт
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
