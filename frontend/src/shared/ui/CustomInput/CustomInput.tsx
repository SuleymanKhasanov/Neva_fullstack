// frontend/src/shared/ui/CustomInput/CustomInput.tsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)

'use client';

import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  error?: string;
  required?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder, error, required, className, ...rest }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label
            className={`${styles.label} ${required ? styles.required : ''}`}
          >
            {label}
            {required && <span className={styles.requiredAsterisk}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
          placeholder={placeholder}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export { CustomInput };
