// frontend/src/shared/ui/CustomTextarea/CustomTextarea.tsx
'use client';

import React, { forwardRef } from 'react';
import styles from './CustomTextarea.module.css';

// ==================== ТИПЫ ====================

type TextareaVariant = 'description' | 'specifications';

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string;
  readonly placeholder: string;
  readonly variant?: TextareaVariant;
  readonly error?: string;
}

// ==================== ОСНОВНОЙ КОМПОНЕНТ ====================

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      label,
      placeholder,
      variant = 'description',
      error,
      className = '',
      ...props
    },
    ref
  ) => {
    const textareaClasses = [
      styles.textarea,
      styles[variant],
      error ? styles.error : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.textareaWrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <textarea
          ref={ref}
          className={textareaClasses}
          placeholder={placeholder}
          {...props}
        />

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

CustomTextarea.displayName = 'CustomTextarea';

export { CustomTextarea };
export type { TextareaVariant, CustomTextareaProps };
