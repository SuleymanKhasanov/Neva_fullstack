import React from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { ProgressBarBackground } from '@/entities/ProgressBarBackground';
import styles from './FormProgress.module.css';
import { Button } from '@/shared/ui/Button/Button';

interface ProgressData {
  filled: number;
  total: number;
  percentage: number;
  additionalFilled: number;
  totalAdditional: number;
  hasAllLanguages?: boolean;
}

interface FormProgressProps {
  progress: ProgressData;
  isFormValid: boolean;
  isSubmitting: boolean;
  submitText: string;
  resetText: string;
  progressTitle: string;
  submittingText?: string;
  error?: string | null;
  temporaryMessage?: string;
  showTemporaryMessage?: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onClearError?: () => void;
}

export const FormProgress: React.FC<FormProgressProps> = ({
  progress,
  isFormValid,
  isSubmitting,
  submitText,
  resetText,
  progressTitle,
  submittingText,
  error,
  temporaryMessage,
  showTemporaryMessage,
  onSubmit,
  onReset,
  onClearError,
}) => {
  const t = useTranslations();
  return (
    <ProgressBarBackground>
      <div className={styles.progressContainer}>
        <div className={styles.progressSection}>
          {showTemporaryMessage && temporaryMessage ? (
            // Показываем временное сообщение вместо прогресса
            <div className={styles.temporaryMessage}>
              <span className={styles.temporaryMessageText}>
                {temporaryMessage}
              </span>
            </div>
          ) : (
            // Показываем обычный прогресс
            <>
              <div className={styles.progressInfo}>
                <div className={styles.progressInfoWrapper}>
                  <h3 className={styles.progressTitle}>{progressTitle}</h3>
                  <div className={styles.progressDetails}>
                    <span className={styles.percentage}>
                      {progress.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* Отображение ошибки */}
        {error && (
          <div className={styles.errorSection}>
            <div className={styles.errorMessage}>
              <span className={styles.errorText}>{error}</span>
              {onClearError && (
                <button
                  className={styles.errorClose}
                  onClick={onClearError}
                  aria-label={t(TranslationKeys.FormProgressCloseError)}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className={styles.actionsSection}>
          <Button
            variant="secondary"
            onClick={onReset}
            className={styles.resetButton}
            disabled={isSubmitting}
          >
            {resetText}
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
            className={`${styles.submitButton} ${
              isFormValid ? styles.complete : styles.incomplete
            }`}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                {submittingText || `${submitText}...`}
              </>
            ) : (
              submitText
            )}
          </Button>
        </div>
      </div>
    </ProgressBarBackground>
  );
};

export default FormProgress;
