'use client';

import { Button } from '@/shared/ui/Button/Button';
import { LuSave, LuX, LuRotateCcw, LuLoader } from 'react-icons/lu';
import styles from './ProductFormActions.module.css';

interface ProductFormActionsProps {
  isLoading: boolean;
  isDirty: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onCancel: () => void;
}

const ProductFormActions = ({
  isLoading,
  isDirty,
  onSubmit,
  onReset,
  onCancel,
}: ProductFormActionsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftActions}>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          className={styles.cancelButton}
        >
          <LuX className={styles.icon} />
          Отменить
        </Button>

        {isDirty && (
          <Button
            variant="secondary"
            onClick={onReset}
            disabled={isLoading}
            className={styles.resetButton}
          >
            <LuRotateCcw className={styles.icon} />
            Сбросить
          </Button>
        )}
      </div>

      <div className={styles.rightActions}>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? (
            <>
              <LuLoader className={`${styles.icon} ${styles.spinning}`} />
              Создание...
            </>
          ) : (
            <>
              <LuSave className={styles.icon} />
              Создать продукт
            </>
          )}
        </Button>
      </div>

      {isDirty && (
        <div className={styles.saveStatus}>
          <span className={styles.saveIndicator}>
            ● Есть несохраненные изменения
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductFormActions;
