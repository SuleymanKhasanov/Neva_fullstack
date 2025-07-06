// frontend/src/app/[locale]/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';

/**
 * Страница-перенаправитель с /admin/dashboard на /admin/dashboard/home
 * Это необходимо для правильной работы админ панели
 */
export default function AdminDashboardRedirectPage() {
  // ИСПРАВЛЕНИЕ: перенаправляем на home вместо корня
  redirect('./home');
}
