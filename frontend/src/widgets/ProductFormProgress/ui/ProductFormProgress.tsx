import React from 'react';
import { ProgressBarBackground } from '@/entities/ProgressBarBackground';
import styles from './ProductFormProgress.module.css';
import { Button } from '@/shared/ui/Button/Button';

interface ProgressData {
  filled: number;
  total: number;
  percentage: number;
  additionalFilled: number;
  totalAdditional: number;
  hasAllLanguages: boolean;
}

interface ProductFormProgressProps {
  progress: ProgressData;
  isFormValid: boolean;
  isCreatingProduct: boolean;
  productCreationError?: string | null;
  temporaryMessage: string;
  showTemporaryMessage: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onClearError?: () => void;
}

export const ProductFormProgress: React.FC<ProductFormProgressProps> = ({
  progress,
  isFormValid,
  isCreatingProduct,
  productCreationError,
  temporaryMessage,
  showTemporaryMessage,
  onSubmit,
  onReset,
  onClearError,
}) => {
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
                  <h3 className={styles.progressTitle}>Прогресс заполнения</h3>
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

        {/* Кнопки действий */}
        <div className={styles.actionsSection}>
          <Button
            variant="secondary"
            onClick={onReset}
            className={styles.resetButton}
            disabled={isCreatingProduct}
          >
            Сбросить форму
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
            className={`${styles.submitButton} ${
              isFormValid ? styles.complete : styles.incomplete
            }`}
            disabled={isCreatingProduct || !isFormValid}
          >
            {isCreatingProduct ? (
              <>
                <span className={styles.spinner} />
                Создание...
              </>
            ) : (
              <>Создать продукт</>
            )}
          </Button>
        </div>
      </div>

      {/* Отображение ошибок */}
      {productCreationError && onClearError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          <span>{productCreationError}</span>
          <button className={styles.closeError} onClick={onClearError}>
            ✕
          </button>
        </div>
      )}
    </ProgressBarBackground>
  );
};
