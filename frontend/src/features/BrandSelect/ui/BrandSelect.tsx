// frontend/src/features/BrandSelect/ui/BrandSelect.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { SearchableSelect } from '@/shared/ui/SearchableSelect/SearchableSelect';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
import { TranslationType } from '@/shared/config/i18n/types';
import styles from './BrandSelect.module.css';

interface Brand {
  id: number;
  name: string;
}

interface BrandSelectProps {
  categoryId: number | null;
  value: number | null;
  onChange: (value: number | null) => void;
  error?: string;
  disabled?: boolean;
  locale: string;
  messages: TranslationType;
}

const BrandSelect: React.FC<BrandSelectProps> = ({
  categoryId,
  value,
  onChange,
  error,
  disabled = false,
  locale,
}) => {
  const { adminApi } = useAdminApi();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка брендов при изменении категории
  useEffect(() => {
    if (categoryId) {
      loadBrands();
    } else {
      setBrands([]);
      onChange(null);
    }
  }, [categoryId]);

  const loadBrands = async () => {
    if (!categoryId) return;

    setIsLoading(true);
    setLoadError('');

    try {
      const params = `locale=${locale}`;
      const response = await adminApi.brands.getAll(params);

      if (!response.ok) {
        throw new Error('Ошибка загрузки брендов');
      }

      const data = await response.json();
      setBrands(data.brands || []);
    } catch (error) {
      console.error('Ошибка загрузки брендов:', error);
      setLoadError('Не удалось загрузить бренды');
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Фильтрация брендов по поиску
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const brandOptions = filteredBrands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const handleChange = (selectedValue: string | number | null) => {
    onChange(selectedValue as number | null);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  if (!categoryId) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Бренд</h3>
          <p className={styles.description}>Сначала выберите категорию</p>
        </div>
        <div className={styles.placeholder}>
          Выбор бренда будет доступен после выбора категории
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Бренд</h3>
        <p className={styles.description}>
          Выберите бренд продукта из доступных производителей
        </p>
      </div>

      <SearchableSelect
        options={brandOptions}
        value={value}
        placeholder="Выберите бренд"
        searchPlaceholder="Поиск бренда..."
        isLoading={isLoading}
        onChange={handleChange}
        onSearch={handleSearch}
        error={error || loadError}
        disabled={disabled || isLoading}
        className={styles.select}
      />

      <div className={styles.info}>
        {searchTerm ? (
          <span className={styles.searchResults}>
            Найдено брендов: {filteredBrands.length}
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className={styles.clearSearch}
              >
                Сбросить поиск
              </button>
            )}
          </span>
        ) : (
          <span className={styles.count}>
            Доступно брендов: {brands.length}
          </span>
        )}
      </div>

      {loadError && (
        <button
          type="button"
          onClick={loadBrands}
          className={styles.retryButton}
          disabled={isLoading}
        >
          Повторить загрузку
        </button>
      )}
    </div>
  );
};

export default BrandSelect;
