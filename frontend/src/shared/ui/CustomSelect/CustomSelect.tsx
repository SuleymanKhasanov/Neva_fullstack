'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import styles from './CustomSelect.module.css';

// ==================== СТРОГИЕ ТИПЫ ====================
export interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

export interface CustomSelectProps {
  readonly label?: string;
  readonly options: readonly SelectOption[];
  readonly value?: string | number;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly onChange?: (value: string | number) => void;
}

// ==================== КОМПОНЕНТ ====================
export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options = [],
  value,
  placeholder = 'Выберите опцию',
  disabled = false,
  onChange,
}) => {
  // ==================== СОСТОЯНИЕ ====================
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ==================== РЕФЫ ====================
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ==================== ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ====================
  const selectedOption = options.find((option: SelectOption): boolean => {
    // Приводим к строке для сравнения, чтобы избежать проблем с типами
    return String(option.value) === String(value);
  });

  const filteredOptions = options.filter((option: SelectOption): boolean =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== ОБРАБОТЧИКИ ====================
  const handleToggle = (): void => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchQuery('');
  };

  const handleOptionSelect = (option: SelectOption): void => {
    console.log('🎯 Опция выбрана:', option);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: SelectOption
  ): void => {
    if (e.key === 'Enter') {
      handleOptionSelect(option);
    }
  };

  // ==================== ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ ====================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // ==================== ФОКУС НА ПОИСК ПРИ ОТКРЫТИИ ====================
  useEffect(() => {
    if (isOpen && searchRef.current) {
      const timer = setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ==================== ОТЛАДКА ====================
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CustomSelect Debug:', {
        value,
        selectedOption,
        optionsCount: options.length,
        hasSelectedOption: Boolean(selectedOption),
      });
    }
  }, [value, selectedOption, options.length]);

  // ==================== РЕНДЕР ====================
  return (
    <div ref={containerRef} className={styles.container}>
      {/* Лейбл */}
      {label && <label className={styles.label}>{label}</label>}

      {/* Триггер селекта */}
      <div
        className={`${styles.trigger} ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label || placeholder}
      >
        <span className={styles.selectedText}>
          {selectedOption ? (
            <span className={styles.selectedValue}>{selectedOption.label}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>

        <LuChevronDown
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          aria-hidden="true"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {/* Поиск */}
          <div className={styles.searchContainer}>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск..."
              className={styles.searchInput}
              aria-label="Поиск по опциям"
            />
          </div>

          {/* Список опций */}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div
                className={styles.noResults}
                role="option"
                aria-disabled="true"
              >
                {searchQuery ? 'Ничего не найдено' : 'Нет данных'}
              </div>
            ) : (
              filteredOptions.map((option: SelectOption) => (
                <div
                  key={String(option.value)}
                  className={`${styles.option} ${
                    String(option.value) === String(value)
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  aria-selected={String(option.value) === String(value)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
