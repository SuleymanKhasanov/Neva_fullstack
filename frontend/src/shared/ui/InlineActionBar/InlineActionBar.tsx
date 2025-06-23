// frontend/src/shared/ui/InlineActionBar/InlineActionBar.tsx
'use client';

import React from 'react';
import styles from './InlineActionBar.module.css';

interface ProgressInfo {
  filled: number;
  total: number;
  percentage: number;
}

interface InlineActionBarProps {
  progress: ProgressInfo;
  isLoading?: boolean;
  canSubmit?: boolean;
  onSubmit: () => void;
  onReset: () => void;
  submitText?: string;
  resetText?: string;
  className?: string;
}

export const InlineActionBar: React.FC<InlineActionBarProps> = ({
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
          <div className={styles.progressInfo}>
            <h3 className={styles.progressTitle}>Прогресс заполнения</h3>
            <div className={styles.progressDetails}>
              <span className={styles.percentage}>{progress.percentage}%</span>
              <span className={styles.details}>
                {progress.filled} из {progress.total} полей заполнено
              </span>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>

          {!isComplete && (
            <div className={styles.statusMessage}>
              Заполните все обязательные поля для создания продукта
            </div>
          )}

          {isComplete && (
            <div className={styles.completeMessage}>
              ✅ Все поля заполнены! Можно создавать продукт
            </div>
          )}
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
                Создание...
              </>
            ) : (
              <>
                {isComplete ? '✓ ' : ''}
                {submitText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
