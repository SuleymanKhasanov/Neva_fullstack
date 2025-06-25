'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import styles from './CustomSelect.module.css';

// ==================== ТИПЫ ====================
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ==================== РЕФЫ ====================
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ==================== ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ====================
  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== ОБРАБОТЧИКИ ====================
  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchQuery('');
  };

  const handleOptionSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // ==================== ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ ====================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // ==================== РЕНДЕР ====================
  return (
    <div ref={containerRef} className={styles.container}>
      {/* Лейбл */}
      {label && <label className={styles.label}>{label}</label>}

      {/* Триггер селекта */}
      <div
        className={`${styles.trigger} ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
      >
        <span className={styles.selectedText}>
          {selectedOption ? (
            <span className={styles.badge}>{selectedOption.label}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>

        <LuChevronDown
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Поиск */}
          <div className={styles.searchContainer}>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск"
              className={styles.searchInput}
            />
          </div>

          {/* Список опций */}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.noResults}>Нет результатов</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    option.value === value ? styles.selected : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
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
