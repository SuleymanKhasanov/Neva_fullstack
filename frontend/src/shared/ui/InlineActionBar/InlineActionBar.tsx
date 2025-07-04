// frontend/src/shared/ui/InlineActionBar/InlineActionBar.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
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
  submitText,
  resetText,
  className,
}) => {
  const t = useTranslations();
  const isComplete = progress.percentage === 100;

  const defaultSubmitText =
    submitText || t(TranslationKeys.InlineActionBarSubmit);
  const defaultResetText = resetText || t(TranslationKeys.InlineActionBarReset);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.backdrop} />

      <div className={styles.content}>
        {/* Прогресс */}
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <h3 className={styles.progressTitle}>
              {t(TranslationKeys.InlineActionBarProgressTitle)}
            </h3>
            <div className={styles.progressDetails}>
              <span className={styles.percentage}>{progress.percentage}%</span>
              <span className={styles.details}>
                {progress.filled} {t(TranslationKeys.InlineActionBarOf)}{' '}
                {progress.total}{' '}
                {t(TranslationKeys.InlineActionBarFieldsFilled)}
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
              {t(TranslationKeys.InlineActionBarFillRequiredFields)}
            </div>
          )}

          {isComplete && (
            <div className={styles.completeMessage}>
              {t(TranslationKeys.InlineActionBarAllFieldsFilled)}
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
                {t(TranslationKeys.InlineActionBarCreating)}
              </>
            ) : (
              <>
                {isComplete ? '✓ ' : ''}
                {defaultSubmitText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
