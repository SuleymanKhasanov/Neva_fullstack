// frontend/src/entities/AdminMainContentBox/ui/AdminMainContentBox.tsx
'use client';

import { ReactNode } from 'react';
import styles from './AdminMainContentBox.module.css';

interface AdminMainContentBoxProps {
  children: ReactNode;
}

const AdminMainContentBox = ({ children }: AdminMainContentBoxProps) => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.contentWrapper}>{children}</div>
    </main>
  );
};

export default AdminMainContentBox;
