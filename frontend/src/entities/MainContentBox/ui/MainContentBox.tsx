'use client';

import { ReactNode, useRef } from 'react';
import styles from './MainContentBox.module.css';
import { TranslationType } from '@/shared/config/i18n/types';

interface MainContentBoxProps {
  locale: string;
  messages: TranslationType;
  children: ReactNode;
  isLoading?: boolean; // Новый пропс для свечения
}

const MainContentBox = ({ children, isLoading }: MainContentBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className={styles.contentBox}>
      <div className={styles.container} ref={containerRef}>
        {children}
      </div>
      {isLoading && (
        <div
          className={styles.glowEffect}
          style={{
            opacity: 0.4,
            filter: 'blur(20px)',
            transform: 'scaleY(0.8)',
          }}
        ></div>
      )}
    </main>
  );
};

export default MainContentBox;
