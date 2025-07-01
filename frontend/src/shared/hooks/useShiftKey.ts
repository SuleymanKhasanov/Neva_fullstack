import { useState, useEffect } from 'react';

/**
 * Hook для отслеживания состояния клавиши Shift
 * Используется для активации режима удаления продуктов (как в macOS Launchpad)
 */
export const useShiftKey = (): boolean => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift' && !event.repeat) {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    // Сброс состояния при потере фокуса окна
    const handleBlur = () => {
      setIsShiftPressed(false);
    };

    // Сброс состояния при переключении вкладок
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsShiftPressed(false);
      }
    };

    // Добавляем слушатели
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isShiftPressed;
};
