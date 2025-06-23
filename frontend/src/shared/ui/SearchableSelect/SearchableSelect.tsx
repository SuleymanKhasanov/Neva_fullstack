// frontend/src/shared/ui/SearchableSelect/SearchableSelect.tsx - ИСПРАВЛЕНО
'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchableSelect.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string | number | null;
  placeholder?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string | number | null) => void;
  onSearch?: (searchTerm: string) => void;
  className?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  placeholder = 'Выберите...',
  searchPlaceholder = 'Поиск...',
  isLoading = false,
  disabled = false,
  error,
  onChange,
  onSearch,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Фильтрация опций
  useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, onSearch]);

  // Обновление опций извне
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Фокус на поиск при открытии
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleOptionSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setSearchTerm('');
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={dropdownRef}>
      {/* Основная кнопка */}
      <div
        className={`${styles.trigger} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled || isLoading ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className={styles.value}>
          {isLoading ? 'Загрузка...' : selectedOption?.label || placeholder}
        </span>

        <div className={styles.actions}>
          {selectedOption && !disabled && (
            <span
              className={styles.clearButton}
              onClick={handleClear}
              role="button"
              tabIndex={-1}
              title="Очистить"
            >
              ✕
            </span>
          )}
          <span className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Поиск */}
          <div className={styles.searchContainer}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />
          </div>

          {/* Опции */}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.noOptions}>
                {isLoading ? 'Загрузка...' : 'Нет результатов'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    option.value === value ? styles.selected : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleOptionSelect(option);
                    }
                  }}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
