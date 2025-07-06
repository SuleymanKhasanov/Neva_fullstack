import { AuthVideoContainer } from '@/entities/AuthVideoContainer';
import { AdminAuth } from '@/features/AdminAuth';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  return (
    <div className={styles.container}>
      <AuthVideoContainer />
      <AdminAuth />
    </div>
  );
};

export default AdminLoginPage;
