'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonSkeleton } from '@/entities/ButtonSkeleton';
import { SectionSelect } from '@/features/SectionSelect';
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
      section: section === 'all' ? null : section,
    },
    skip: !validLocale,
    fetchPolicy: 'cache-and-network',
  });

  const handleSectionChange = useCallback(
    (newSection: string) => {
      console.log('Section changed:', newSection);
      setSection(newSection);
      setSelectedBrandId(null);
      setBrandId(null);
    },
    [setSection, setBrandId]
  );

  const handleBrandClick = useCallback(
    (brandId: number) => {
      const newBrandId = selectedBrandId === brandId ? null : brandId;
      console.log('Brand selected:', newBrandId);
      setSelectedBrandId(newBrandId);
      setBrandId(newBrandId);
    },
    [selectedBrandId, setBrandId]
  );

  if (error) {
    console.error('Error fetching brands:', {
      message: error.message || 'No message provided',
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
      variables: { locale: validLocale, section },
    });
    return (
      <div className={styles.filterContainer}>
        <SectionSelect
          value={section}
          onChange={handleSectionChange}
          messages={messages}
        />
        <div className={styles.divider} />
        <div className={styles.error}>{messages.errors.brands}</div>
      </div>
    );
  }

  const brands = data?.brands.brands || [];

  console.log('GET_BRANDS response:', { section, brands });

  return (
    <div className={styles.filterContainer}>
      <SectionSelect
        value={section}
        onChange={handleSectionChange}
        messages={messages}
      />
      <div className={styles.divider} />
      <div className={styles.categoriesContainer}>
        {loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <ButtonSkeleton
              key={`skeleton-${index}`}
              variant="secondary"
              className={styles.categoryButton}
            />
          ))
        ) : brands.length === 0 && !loading ? (
          <div className={styles.noBrands}>{messages.filters.noBrands}</div>
        ) : (
          brands.map((brand: Brand) => (
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
