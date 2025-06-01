'use client';

import { ReactNode, useRef } from 'react';
import styles from './MainContentBox.module.css';
import { useScrollStore } from '@/shared/store/useScrollStore';
import { TranslationType } from '@/shared/config/i18n/types';

interface MainContentBoxProps {
  children: ReactNode;
  locale: string;
  messages: TranslationType;
}

const MainContentBox = ({ children }: MainContentBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrollEnd, isLoadingNext } = useScrollStore();

  console.log('💫 MainContentBox glow state:', { isScrollEnd, isLoadingNext });

  return (
    <main className={styles.contentBox}>
      <div className={styles.container} ref={containerRef}>
        {children}
      </div>
      {(isScrollEnd || isLoadingNext) && (
        <div
          className={styles.glowEffect}
          style={{
            opacity: isScrollEnd ? 0.7 : 0.4,
            filter: isScrollEnd ? 'blur(30px)' : 'blur(20px)',
            transform: isScrollEnd ? 'scaleY(1)' : 'scaleY(0.8)',
            transition:
              'opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease',
          }}
        />
      )}
    </main>
  );
};

export default MainContentBox;
