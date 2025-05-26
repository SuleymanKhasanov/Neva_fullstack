'use client';

import { useState, useEffect, forwardRef, useRef } from 'react';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Input } from '@/shared/ui/Input/Input';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { LuSearch } from 'react-icons/lu';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className }, ref) => {
    const t = useTranslations();
    const [isMac, setIsMac] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Определяем ОС пользователя
    useEffect(() => {
      const platform = navigator.platform || navigator.userAgent;
      setIsMac(platform.toLowerCase().includes('mac'));
    }, []);

    // Обработчики фокуса и потери фокуса
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Добавляем шорткат для фокуса (⌘+K или Ctrl+K)
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          (isMac && event.metaKey && event.key === 'k') ||
          (!isMac && event.ctrlKey && event.key === 'k')
        ) {
          event.preventDefault();
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMac]);

    return (
      <div className={styles.searchContainer}>
        <Input
          type="search"
          placeholder={t(TranslationKeys.Search)}
          ref={ref || inputRef}
          className={`${styles.searchInput} ${className || ''}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={styles.iconsContainer}>
          {!isFocused && (
            <Badge className={styles.badge}>{isMac ? '⌘+K' : 'Ctrl+K'}</Badge>
          )}
          <LuSearch className={styles.searchIcon} />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
