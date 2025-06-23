// frontend/src/features/SectionSelect/ui/SectionSelect.tsx
'use client';

import React from 'react';
import { SearchableSelect } from '@/shared/ui/SearchableSelect/SearchableSelect';
import { TranslationType } from '@/shared/config/i18n/types';
import styles from './SectionSelect.module.css';

type SectionValue = 'NEVA' | 'X_SOLUTION';

interface SectionOption {
  value: SectionValue;
  label: string;
}

interface SectionSelectProps {
  value: SectionValue | null;
  onChange: (value: SectionValue | null) => void;
  error?: string;
  disabled?: boolean;
  locale: string;
  messages: TranslationType;
}

const sections: SectionOption[] = [
  { value: 'NEVA', label: 'NEVA' },
  { value: 'X_SOLUTION', label: 'X-SOLUTION' },
];

const SectionSelect: React.FC<SectionSelectProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const handleChange = (selectedValue: string | number | null) => {
    onChange(selectedValue as SectionValue | null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Секция</h3>
        <p className={styles.description}>
          Выберите секцию для которой создается продукт
        </p>
      </div>

      <SearchableSelect
        options={sections}
        value={value}
        placeholder="Выберите секцию"
        onChange={handleChange}
        error={error}
        disabled={disabled}
        className={styles.select}
      />

      {value && (
        <div className={styles.selectedInfo}>
          <span className={styles.badge}>
            {sections.find((s) => s.value === value)?.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default SectionSelect;
