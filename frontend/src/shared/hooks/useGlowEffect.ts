'use client';

import { useState, useEffect, RefObject, useRef } from 'react';

interface GlowEffect {
  showGlow: boolean;
  glowIntensity: number;
}

export const useGlowEffect = (
  containerRef: RefObject<HTMLDivElement | null> // Изменяем тип
): GlowEffect => {
  const [showGlow, setShowGlow] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return; // Проверка на null

      const maxScroll = container.scrollHeight - container.clientHeight;
      const isAtBottom = container.scrollTop >= maxScroll - 1;
      const overscroll = Math.max(0, container.scrollTop - maxScroll);
      const intensity = Math.min(overscroll / 50, 1);

      if (isAtBottom) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setShowGlow(true);
          setGlowIntensity(intensity);
        }, 300);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setShowGlow(false);
        setGlowIntensity(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [containerRef]);

  return { showGlow, glowIntensity };
};
