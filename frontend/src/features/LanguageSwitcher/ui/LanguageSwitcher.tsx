'use client';

import { ChangeEvent } from 'react';
import styles from './LanguageSwitcher.module.css';
import { locales, Locale } from '@/shared/config/i18n/types';
import { useLoading } from '@/features/LoadingManager/ui/LoadingContext';

interface LanguageSwitcherProps {
  locale: string;
}

const LanguageSwitcher = ({ locale }: LanguageSwitcherProps) => {
  const { setIsLoading } = useLoading();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const newLocale = e.target.value as Locale;
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[^\/]+/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}${window.location.search}${window.location.hash}`;

    // Задержка перед переходом, чтобы анимация успела завершиться
    setTimeout(() => {
      window.location.href = newPath;
      setIsLoading(false); // Сбрасываем isLoading после перехода
    }, 1000); // Соответствует длительности анимации (1 сек)
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <select
      className={styles.switcher}
      value={locale}
      onChange={handleLanguageChange}
    >
      {locales.map((loc: Locale) => (
        <option key={loc} value={loc}>
          {capitalizeFirstLetter(loc)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
