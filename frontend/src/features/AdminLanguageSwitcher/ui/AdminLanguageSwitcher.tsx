// frontend/src/features/AdminLanguageSwitcher/ui/AdminLanguageSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AdminLanguageSwitcher.module.css';
import { Locale } from '@/shared/config/i18n/types';

interface AdminLanguageSwitcherProps {
  locale: string;
}

interface LanguageOption {
  code: Locale;
  name: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'EN' },
  { code: 'ru', name: 'RU' },
  { code: 'uz', name: 'UZ' },
  { code: 'kr', name: 'KR' },
];

const AdminLanguageSwitcher = ({ locale }: AdminLanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languageOptions.find((lang) => lang.code === locale) || languageOptions[0];

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(false);

    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[^\/]+/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}${window.location.search}${window.location.hash}`;

    // Перенаправление с небольшой задержкой
    setTimeout(() => {
      window.location.href = newPath;
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(
          languageOptions.findIndex((lang) => lang.code === locale)
        );
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < languageOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : languageOptions.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleLanguageChange(languageOptions[focusedIndex].code);
        }
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={styles.switcher}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Кнопка-триггер */}
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${isLoading ? styles.loading : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        disabled={isLoading}
      >
        <span className={styles.selected}>
          <span className={styles.name}>
            {isLoading ? '...' : currentLanguage.name}
          </span>
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && !isLoading && (
        <div className={styles.dropdown}>
          <ul
            className={styles.list}
            role="listbox"
            aria-label="Language options"
          >
            {languageOptions.map((option, index) => (
              <li
                key={option.code}
                className={`${styles.option} ${
                  option.code === locale ? styles.selected : ''
                } ${index === focusedIndex ? styles.focused : ''}`}
                role="option"
                aria-selected={option.code === locale}
                onClick={() => handleLanguageChange(option.code)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className={styles.name}>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminLanguageSwitcher;
