// src/app/[locale]/admin/dashboard/page.tsx
'use client';

import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Button } from '@/shared/ui/Button/Button';
import { redirectToLocalized } from '@/shared/utils/redirect';

// Компонент содержимого дашборда
const DashboardContent = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // После успешного выхода перенаправляем на корневую админскую страницу
      redirectToLocalized('admin/');
    } catch (error) {
      console.error('Logout error:', error);
      // В случае ошибки все равно перенаправляем
      redirectToLocalized('admin/');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
            Админ панель
          </h1>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>
            Добро пожаловать, {user?.username}!
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
          style={{ padding: '0.5rem 1rem' }}
        >
          Выйти
        </Button>
      </header>

      <main>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
              }}
            >
              Пользователи
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Управление пользователями системы
            </p>
          </div>

          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
              }}
            >
              Настройки
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>Конфигурация системы</p>
          </div>

          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
              }}
            >
              Отчеты
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Просмотр аналитики и отчетов
            </p>
          </div>
        </div>

        <section>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
          >
            Статистика
          </h2>
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          >
            <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
              Здесь будут отображаться графики и статистика
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

// Компонент загрузки
const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '3rem',
        height: '3rem',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    ></div>
    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Проверка доступа...</p>
    <style jsx>{`
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

// Главный компонент страницы
const AdminDashboardPage = () => {
  return (
    <AdminRouteGuard fallback={<LoadingFallback />} redirectTo="admin/">
      <DashboardContent />
    </AdminRouteGuard>
  );
};

export default AdminDashboardPage;
