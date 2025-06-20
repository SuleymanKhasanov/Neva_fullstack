// frontend/src/features/ProductDescription/ui/ProductDescription.tsx
'use client';

import { useState } from 'react';
import { LuType } from 'react-icons/lu';
import styles from './ProductDescription.module.css';

interface ProductDescriptionProps {
  description: string;
  errors: Record<string, string>;
  onUpdate: (description: string) => void;
}

const ProductDescription = ({
  description,
  errors,
  onUpdate,
}: ProductDescriptionProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const charCount = description.length;
  const minLength = 20;
  const maxLength = 2000;
  const isValid = charCount >= minLength && charCount <= maxLength;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.label}>
          <LuType className={styles.labelIcon} />
          Описание продукта <span className={styles.required}>*</span>
        </label>
        <div className={styles.counter}>
          <span className={`${styles.count} ${!isValid ? styles.invalid : ''}`}>
            {charCount}
          </span>
          <span className={styles.maxCount}>/ {maxLength}</span>
        </div>
      </div>

      <div
        className={`${styles.textareaContainer} ${isFocused ? styles.focused : ''} ${errors.description ? styles.error : ''}`}
      >
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => onUpdate(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Введите подробное описание продукта...

Пример:
• Основные характеристики и возможности
• Преимущества и особенности
• Область применения
• Технические детали"
          maxLength={maxLength}
          rows={8}
        />
      </div>

      <div className={styles.hints}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.min((charCount / minLength) * 100, 100)}%`,
              backgroundColor:
                charCount >= minLength ? 'var(--primary)' : '#ffa500',
            }}
          />
        </div>

        <div className={styles.hintText}>
          {charCount < minLength ? (
            <span className={styles.warning}>
              Минимум {minLength} символов (осталось: {minLength - charCount})
            </span>
          ) : (
            <span className={styles.success}>
              ✓ Требования к длине выполнены
            </span>
          )}
        </div>
      </div>

      {errors.description && (
        <div className={styles.errorMessage}>{errors.description}</div>
      )}

      <div className={styles.tips}>
        <h4 className={styles.tipsTitle}>💡 Советы для хорошего описания:</h4>
        <ul className={styles.tipsList}>
          <li>Опишите ключевые функции и возможности</li>
          <li>Укажите преимущества перед конкурентами</li>
          <li>Добавьте информацию о совместимости</li>
          <li>Используйте понятные технические термины</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
