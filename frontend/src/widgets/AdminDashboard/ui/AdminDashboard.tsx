// frontend/src/widgets/AdminDashboard/ui/AdminDashboard.tsx
'use client';

import { ReactNode, useState } from 'react';
import { AdminSidebar } from '@/widgets/AdminSidebar';
import { AdminMainContentBox } from '@/entities/AdminMainContentBox';
import { AdminHeader } from '@/widgets/AdminHeader';
import { TranslationType } from '@/shared/config/i18n/types';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
  children: ReactNode;
  locale: string;
  messages: TranslationType;
}

const AdminDashboard = ({
  children,
  locale,
  messages,
}: AdminDashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboard}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        locale={locale}
        messages={messages}
        onToggle={toggleSidebar}
      />
      <div
        className={`${styles.mainArea} ${!isSidebarOpen ? styles.expanded : ''}`}
      >
        <AdminMainContentBox>
          <AdminHeader
            locale={locale}
            messages={messages}
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <div>{children}</div>
        </AdminMainContentBox>
      </div>
    </div>
  );
};

export default AdminDashboard;
