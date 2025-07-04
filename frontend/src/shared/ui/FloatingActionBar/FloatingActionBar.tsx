// frontend/src/shared/ui/FloatingActionBar/FloatingActionBar.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
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
  submitText,
  resetText,
  className,
}) => {
  const t = useTranslations();
  const isComplete = progress.percentage === 100;

  const defaultSubmitText = submitText || t(TranslationKeys.ActionBarSubmit);
  const defaultResetText = resetText || t(TranslationKeys.ActionBarReset);

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
              {progress.filled}/{progress.total}{' '}
              {t(TranslationKeys.ActionBarFilledText)}
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
            {defaultResetText}
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
                {t(TranslationKeys.ActionBarSaving)}
              </>
            ) : (
              <>
                {isComplete ? '✓ ' : ''}
                {defaultSubmitText}
              </>
            )}
          </button>
        </div>

        {/* Статус */}
        {!isComplete && (
          <div className={styles.statusMessage}>
            {t(TranslationKeys.ActionBarFillRequiredFields)}
          </div>
        )}
      </div>
    </div>
  );
};
