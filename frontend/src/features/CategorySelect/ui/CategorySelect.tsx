// frontend/src/features/CategorySelect/ui/CategorySelect.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { SearchableSelect } from '@/shared/ui/SearchableSelect/SearchableSelect';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
import { TranslationType } from '@/shared/config/i18n/types';
import styles from './CategorySelect.module.css';

interface Category {
  id: number;
  name: string;
  section: string;
}

interface CategorySelectProps {
  section: string | null;
  value: number | null;
  onChange: (value: number | null) => void;
  error?: string;
  disabled?: boolean;
  locale: string;
  messages: TranslationType;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  section,
  value,
  onChange,
  error,
  disabled = false,
  locale,
}) => {
  const { adminApi } = useAdminApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>('');

  // Загрузка категорий при изменении секции
  useEffect(() => {
    if (section) {
      loadCategories();
    } else {
      setCategories([]);
      onChange(null);
    }
  }, [section]);

  const loadCategories = async () => {
    if (!section) return;

    setIsLoading(true);
    setLoadError('');

    try {
      const params = `section=${section}&locale=${locale}`;
      const response = await adminApi.categories.getAll(params);

      if (!response.ok) {
        throw new Error('Ошибка загрузки категорий');
      }

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      setLoadError('Не удалось загрузить категории');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (selectedValue: string | number | null) => {
    onChange(selectedValue as number | null);
  };

  if (!section) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Категория</h3>
          <p className={styles.description}>Сначала выберите секцию</p>
        </div>
        <div className={styles.placeholder}>
          Выбор категории будет доступен после выбора секции
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Категория</h3>
        <p className={styles.description}>
          Выберите категорию продукта для секции {section}
        </p>
      </div>

      <SearchableSelect
        options={categoryOptions}
        value={value}
        placeholder="Выберите категорию"
        searchPlaceholder="Поиск категории..."
        isLoading={isLoading}
        onChange={handleChange}
        error={error || loadError}
        disabled={disabled || isLoading}
        className={styles.select}
      />

      {categories.length > 0 && (
        <div className={styles.info}>
          <span className={styles.count}>
            Доступно категорий: {categories.length}
          </span>
        </div>
      )}

      {loadError && (
        <button
          type="button"
          onClick={loadCategories}
          className={styles.retryButton}
          disabled={isLoading}
        >
          Повторить загрузку
        </button>
      )}
    </div>
  );
};

export default CategorySelect;
