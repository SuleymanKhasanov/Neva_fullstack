'use client';

import { useLoading } from './LoadingContext';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  return (
    <div className={styles.loadingBar}>
      {isLoading && <div className={styles.loadingProgress} />}
    </div>
  );
};

export default LoadingIndicator;
