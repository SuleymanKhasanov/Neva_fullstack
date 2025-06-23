// frontend/src/shared/ui/FloatingActionBar/FloatingActionBar.tsx
'use client';

import React from 'react';
import styles from './FloatingActionBar.module.css';

interface ProgressInfo {
  filled: number;
  total: number;
  percentage: number;
}

interface FloatingActionBarProps {
  progress: ProgressInfo;
  isLoading?: boolean;
  canSubmit?: boolean;
  onSubmit: () => void;
  onReset: () => void;
  submitText?: string;
  resetText?: string;
  className?: string;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  progress,
  isLoading = false,
  canSubmit = true,
  onSubmit,
  onReset,
  submitText = 'Сохранить',
  resetText = 'Сбросить',
  className,
}) => {
  const isComplete = progress.percentage === 100;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.backdrop} />

      <div className={styles.content}>
        {/* Прогресс */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className={styles.progressText}>
            <span className={styles.percentage}>{progress.percentage}%</span>
            <span className={styles.details}>
              {progress.filled}/{progress.total} заполнено
            </span>
          </div>
        </div>

        {/* Действия */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onReset}
            className={styles.resetButton}
            disabled={isLoading}
          >
            {resetText}
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className={`${styles.submitButton} ${
              isComplete ? styles.complete : styles.incomplete
            }`}
            disabled={isLoading || !canSubmit}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Сохранение...
              </>
            ) : (
              <>
                {isComplete ? '✓ ' : ''}
                {submitText}
              </>
            )}
          </button>
        </div>

        {/* Статус */}
        {!isComplete && (
          <div className={styles.statusMessage}>
            Заполните все обязательные поля для сохранения
          </div>
        )}
      </div>
    </div>
  );
};
