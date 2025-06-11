'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './AdminAuth.module.css';

const AdminAuth = () => {
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
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Панель администратора</h1>
          <p className={styles.subtitle}>Войдите для доступа к управлению</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠</span>
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Логин
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ваш логин"
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !username || !password}
            className={styles.submitButton}
          >
            {isLoading ? (
              <>
                <span className={styles.loader}></span>
                Вход...
              </>
            ) : (
              'Войти в систему'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
