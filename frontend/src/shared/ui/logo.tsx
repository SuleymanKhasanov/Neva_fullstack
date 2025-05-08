'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { useLoading } from '@/entities/Loading/ui/LoadingContext';
import darkLogoSrc from '@/shared/assets/icons/est-dark-logo.svg';
import lightLogoSrc from '@/shared/assets/icons/est-light-logo.svg';

import { TranslationKeys } from '../config/i18n/translations';

const Logo = () => {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    setIsLoading(true);
    router.push(`/${locale}`);
    setTimeout(() => setIsLoading(false), 500); // Задержка для имитации загрузки
  };

  return (
    <div>
      <button onClick={handleLogoClick} className="cursor-pointer">
        <Image
          src={isDark ? darkLogoSrc : lightLogoSrc}
          alt={t(TranslationKeys.HeaderLogo)}
          className="h-13 w-13"
          width={52}
          height={52}
        />
      </button>
    </div>
  );
};

export default Logo;
