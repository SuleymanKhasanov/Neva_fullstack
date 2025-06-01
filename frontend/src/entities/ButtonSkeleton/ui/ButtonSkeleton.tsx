'use client';

import React from 'react';
import styles from './ButtonSkeleton.module.css';

interface ButtonSkeletonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const ButtonSkeleton = ({
  className,
  variant = 'secondary',
}: ButtonSkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${variant === 'primary' ? styles.primary : styles.secondary} ${className || ''}`}
    >
      <div className={styles.content} />
    </div>
  );
};

export default ButtonSkeleton;
