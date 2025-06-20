// frontend/src/shared/ui/SearchableSelect/SearchableSelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { LuChevronDown, LuSearch, LuLoader, LuX } from 'react-icons/lu';
import styles from './SearchableSelect.module.css';

export interface SelectOption {
  value: string;
  label: string;
  searchText: string;
}

interface SearchableSelectProps {
  value?: string | null;
  options: SelectOption[];
  placeholder?: string;
  isLoading?: boolean;
  error?: string;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}

const SearchableSelect = ({
  value,
  options,
  placeholder = 'Выберите...',
  isLoading = false,
  error,
  disabled = false,
  onChange,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Найденная опция для отображения
  const selectedOption = options.find((option) => option.value === value);

  // Фильтрованные опции
  const filteredOptions = options.filter((option) =>
    option.searchText.includes(searchTerm.toLowerCase())
  );

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < filteredOptions.length
          ) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  // Фокус на input при открытии
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled || isLoading) return;
    setIsOpen(!isOpen);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div
      className={`${styles.container} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
      ref={containerRef}
    >
      {/* Основное поле */}
      <div
        className={`${styles.field} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
      >
        <div className={styles.valueContainer}>
          {selectedOption ? (
            <>
              <span className={styles.selectedValue}>
                {selectedOption.label}
              </span>
              {!disabled && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClear}
                  aria-label="Очистить"
                >
                  <LuX />
                </button>
              )}
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        <div className={styles.indicators}>
          {isLoading && (
            <LuLoader className={`${styles.icon} ${styles.loading}`} />
          )}
          <LuChevronDown
            className={`${styles.icon} ${styles.chevron} ${isOpen ? styles.rotated : ''}`}
          />
        </div>
      </div>

      {/* Выпадающий список */}
      {isOpen && (
        <div className={styles.dropdown} ref={optionsRef}>
          {/* Поле поиска */}
          <div className={styles.searchContainer}>
            <LuSearch className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(-1);
              }}
            />
          </div>

          {/* Список опций */}
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    index === highlightedIndex ? styles.highlighted : ''
                  } ${option.value === value ? styles.selected : ''}`}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>
                {isLoading ? 'Загрузка...' : 'Нет результатов'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default SearchableSelect;
