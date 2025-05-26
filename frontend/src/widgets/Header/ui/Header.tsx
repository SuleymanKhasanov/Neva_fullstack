'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchInput } from '@/features/SearchInput';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { SearchDrawer } from '@/entities/SearchDrawer';
import { LoadingIndicator } from '@/features/LoadingManager';
import { CategoryModal } from '@/entities/CategoryModal';
import AppLogo from '@/shared/ui/AppLogo/AppLogo';
import { LuSearch } from 'react-icons/lu';
import styles from './Header.module.css';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationKeys, TranslationType } from '@/shared/config/i18n/types';
import { DropdownMenu } from '@/features/DropdownMenu';

type LocaleProps = {
  locale: string;
  messages: TranslationType;
};

const Header = ({ locale, messages }: LocaleProps) => {
  const t = (key: string) => {
    const keyPart = key.split('.')[1];
    return messages.header && messages.header[keyPart]
      ? messages.header[keyPart]
      : keyPart;
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const platform = navigator.platform || navigator.userAgent;
    setIsMac(platform.toLowerCase().includes('mac'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;
      if (isCtrlOrCmd && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        event.stopPropagation();
        if (window.innerWidth <= 768) {
          console.log('Opening search drawer via keyboard shortcut');
          setIsSearchOpen(true);
        } else if (desktopInputRef.current) {
          desktopInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isMac]);

  const toggleSearch = () => {
    console.log('Toggling search, current state:', isSearchOpen);
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <LoadingIndicator />
        <div className={styles.controlsWrapper}>
          <AppLogo
            locale={locale}
            logoTranslation={t(TranslationKeys.HeaderLogo)}
          />
          <div className={styles.dropDownWrapper}>
            <DropdownMenu locale={locale} />
          </div>
        </div>
        <div className={styles.searchWrapper}>
          <SearchInput ref={desktopInputRef} />
        </div>
        <div className={styles.controlsWrapper}>
          <button
            className={styles.searchButton}
            onClick={toggleSearch}
            onTouchStart={toggleSearch}
          >
            <LuSearch className={styles.searchIcon} />
          </button>
          <Button variant="primary" className={styles.contactButton}>
            {t(TranslationKeys.ContactUs)}
          </Button>
          <ThemeSwitcher />
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        locale={locale}
      />
    </header>
  );
};

export default Header;
