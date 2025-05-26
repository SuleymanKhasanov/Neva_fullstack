'use client';

import React from 'react';
import styles from './badge.module.css';

const Badge: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.badge} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

Badge.displayName = 'Badge';

export { Badge };
