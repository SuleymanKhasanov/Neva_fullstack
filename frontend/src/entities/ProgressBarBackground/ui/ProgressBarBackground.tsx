import React from 'react';
import styles from './ProgressBarBackground.module.css';

interface ProgressBarBackgroundProps {
  children: React.ReactNode;
}

export const ProgressBarBackground: React.FC<ProgressBarBackgroundProps> = ({
  children,
}) => {
  return (
    <div className={styles.progressBackground}>
      <div className={styles.progressContent}>{children}</div>
    </div>
  );
};
