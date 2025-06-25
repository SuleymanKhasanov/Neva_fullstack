'use client';

import React, { memo } from 'react';
import { StatCardProps } from '../types';
import styles from './StatCard.module.css';

const StatCard = memo<StatCardProps>(
  ({
    title,
    value,
    description,
    trend,
    isLoading = false,
    icon,
    variant = 'default',
  }) => {
    const cardClasses = [
      styles.card,
      variant !== 'default' ? styles[variant] : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={cardClasses}>
        <h3 className={styles.cardTitle}>
          {icon && <span className={styles.cardIcon}>{icon}</span>}
          {title}
        </h3>
        <p className={styles.cardDescription}>{description}</p>
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <span>Загрузка...</span>
          </div>
        ) : (
          <div className={styles.cardStats}>
            <span className={styles.statsNumber}>
              {typeof value === 'number'
                ? value.toLocaleString('ru-RU')
                : value}
            </span>
            {trend && (
              <span>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export default StatCard;
