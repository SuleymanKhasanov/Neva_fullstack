'use client';

import React, { forwardRef } from 'react';
import styles from './input.module.css';

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${className || ''}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
