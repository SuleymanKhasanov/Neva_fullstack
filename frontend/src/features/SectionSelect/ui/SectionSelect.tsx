'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './SectionSelect.module.css';
import { TranslationType } from '@/shared/config/i18n/types';

interface SectionOption {
  value: string;
  label: string;
}

interface SectionSelectProps {
  value: string;
  onChange: (value: string) => void;
  messages: TranslationType;
}

const SectionSelect = ({ value, onChange, messages }: SectionSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const options: SectionOption[] = [
    { value: 'all', label: messages.filters.all },
    { value: 'NEVA', label: messages.filters.neva },
    { value: 'X_SOLUTION', label: messages.filters.xSolution },
  ];

  const currentOption =
    options.find((option) => option.value === value) || options[0];

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
      setFocusedIndex(-1);
      // Возвращаем фокус на триггер
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.findIndex((option) => option.value === value));
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleOptionClick(options[focusedIndex].value);
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Закрытие при нажатии Escape глобально
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={styles.sectionSelect}
      onKeyDown={handleKeyDown}
    >
      {/* Триггер */}
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select section, current: ${currentOption.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="section-listbox"
      >
        <span className={styles.label}>{currentOption.label}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className={styles.dropdown}>
          <ul
            id="section-listbox"
            className={styles.list}
            role="listbox"
            aria-label="Section options"
            aria-activedescendant={
              focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
            }
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`option-${index}`}
                className={`${styles.option} ${
                  option.value === value ? styles.selected : ''
                } ${index === focusedIndex ? styles.focused : ''}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(-1)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectionSelect;
