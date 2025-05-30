'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@/shared/ui/Button/Button';
import styles from './FilterWidget.module.css';
import { TranslationType } from '@/shared/config/i18n/types';
import { GET_BRANDS } from '../lib/queries';
import { useFilterStore } from '@/shared/store/useFilterStore';

interface Brand {
  id: number;
  name: string;
  locale: string;
  section: string;
}

interface BrandsResponse {
  brands: {
    brands: Brand[];
  };
}

interface FilterWidgetProps {
  locale: string;
  messages: TranslationType;
}

export default function FilterWidget({ locale, messages }: FilterWidgetProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const { section, setSection, setBrandId } = useFilterStore();

  const validLocale = locale || 'ru';
  const { data, loading, error } = useQuery<BrandsResponse>(GET_BRANDS, {
    variables: {
      locale: validLocale,
      section: section === 'all' ? null : section, // Используем section напрямую
    },
    skip: !validLocale,
    fetchPolicy: 'network-only',
  });

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSection = event.target.value;
    console.log('Section changed:', newSection);
    setSection(newSection);
    setSelectedBrandId(null);
  };

  const handleBrandClick = (brandId: number) => {
    const newBrandId = selectedBrandId === brandId ? null : brandId;
    console.log('Brand selected:', newBrandId);
    setSelectedBrandId(newBrandId);
    setBrandId(newBrandId);
  };

  if (error) {
    console.error('Error fetching brands:', {
      message: error.message || 'No message provided',
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
      variables: { locale: validLocale, section },
    });
    return (
      <div className={styles.filterContainer}>
        <select
          className={styles.sectionSelect}
          value={section}
          onChange={handleSectionChange}
        >
          <option value="all">{messages.filters?.all || 'All'}</option>
          <option value="NEVA">{messages.filters?.neva || 'Neva'}</option>
          <option value="X_SOLUTION">
            {messages.filters?.xSolution || 'X-Solution'}
          </option>
        </select>
        <div className={styles.divider} />
        <div className={styles.error}>
          {messages.errors?.brands || 'Ошибка загрузки брендов'}
        </div>
      </div>
    );
  }

  const brands = data?.brands.brands || [];

  console.log('GET_BRANDS response:', { section, brands });

  return (
    <div className={styles.filterContainer}>
      <select
        className={styles.sectionSelect}
        value={section}
        onChange={handleSectionChange}
      >
        <option value="all">{messages.filters?.all || 'All'}</option>
        <option value="NEVA">{messages.filters?.neva || 'Neva'}</option>
        <option value="X_SOLUTION">
          {messages.filters?.xSolution || 'X-Solution'}
        </option>
      </select>
      <div className={styles.divider} />
      <div className={styles.categoriesContainer}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Button
              key={`skeleton-${index}`}
              variant="secondary"
              className={styles.categoryButton}
              disabled
            >
              Загрузка...
            </Button>
          ))
        ) : brands.length === 0 && !loading ? (
          <div className={styles.noBrands}>
            {messages.filters?.noBrands || 'Нет доступных брендов'}
          </div>
        ) : (
          brands.map((brand) => (
            <Button
              key={brand.id}
              variant={selectedBrandId === brand.id ? 'primary' : 'secondary'}
              className={styles.categoryButton}
              onClick={() => handleBrandClick(brand.id)}
            >
              {brand.name}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
