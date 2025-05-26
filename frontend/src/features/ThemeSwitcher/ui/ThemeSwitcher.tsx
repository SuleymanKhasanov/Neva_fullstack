'use client';

import { useState, useEffect } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Обработчик переключения темы
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button className={styles.switcher} onClick={toggleTheme}>
      {isDark ? <LuSun /> : <LuMoon />}
    </button>
  );
};

export default ThemeSwitcher;
