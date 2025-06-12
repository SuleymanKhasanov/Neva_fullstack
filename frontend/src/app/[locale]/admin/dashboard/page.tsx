// src/app/[locale]/admin/dashboard/page.tsx
'use client';

import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Button } from '@/shared/ui/Button/Button';
import { redirectToLocalized } from '@/shared/utils/redirect';

// Компонент содержимого дашборда
const DashboardContent = () => {
  const { logout } = useAuth();

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
    <Button variant="primary" onClick={handleLogout}>
      Выйти
    </Button>
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
