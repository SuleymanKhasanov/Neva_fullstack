'use client';

import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={styles.input} placeholder={placeholder} />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export { CustomInput };
