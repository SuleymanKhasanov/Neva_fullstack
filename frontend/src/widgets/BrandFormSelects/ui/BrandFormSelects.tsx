// frontend/src/widgets/BrandFormSelects/ui/BrandFormSelects.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';
import { CustomInput } from '@/shared/ui/CustomInput/CustomInput';
import {
  useBrandCategoryOptions,
  useBrandSubcategoryOptions,
  useBrandSelectedSection,
  useBrandSelectedCategory,
  useBrandSelectedSubcategory,
  useBrandLoading,
  useBrandActions,
} from '@/shared/store/brandCreateStore';
import styles from './BrandFormSelects.module.css';

// ==================== ТИПЫ ====================

interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

interface BrandFormSelectsProps {
  brandName: string;
  onBrandNameChange: (value: string) => void;
}

// ==================== КОНСТАНТЫ ====================

const SECTION_OPTIONS: readonly SelectOption[] = [
  { value: 'NEVA', label: 'Neva' },
  { value: 'X_SOLUTION', label: 'X-Solution' },
] as const;

// ==================== ОСНОВНОЙ КОМПОНЕНТ ====================

const BrandFormSelects: React.FC<BrandFormSelectsProps> = ({
  brandName,
  onBrandNameChange,
}) => {
  const t = useTranslations();
  // ==================== СОСТОЯНИЕ ИЗ BRAND STORE ====================

  // Выбранные значения
  const selectedSection = useBrandSelectedSection();
  const selectedCategory = useBrandSelectedCategory();
  const selectedSubcategory = useBrandSelectedSubcategory();

  // Данные
  const categoryOptions: SelectOption[] = useBrandCategoryOptions();
  const subcategoryOptions: SelectOption[] = useBrandSubcategoryOptions();

  // Состояния
  const loading = useBrandLoading();

  // Действия
  const {
    setSelectedSection,
    setSelectedCategory,
    setSelectedSubcategory,
    clearError,
  } = useBrandActions();

  // ==================== ОБРАБОТЧИКИ ====================

  const handleSectionChange = React.useCallback(
    (value: string | number): void => {
      console.log('📝 Секция изменена:', value);
      const sectionValue = typeof value === 'string' ? value : String(value);
      setSelectedSection(sectionValue);
      clearError();
    },
    [setSelectedSection, clearError]
  );

  const handleCategoryChange = React.useCallback(
    (value: string | number): void => {
      console.log('📝 Категория изменена:', value);
      const categoryId =
        typeof value === 'number' ? value : parseInt(String(value), 10);
      if (!isNaN(categoryId)) {
        setSelectedCategory(categoryId);
        clearError();
      }
    },
    [setSelectedCategory, clearError]
  );

  const handleSubcategoryChange = React.useCallback(
    (value: string | number): void => {
      const subcategoryId =
        typeof value === 'number' ? value : parseInt(String(value), 10);
      if (!isNaN(subcategoryId)) {
        setSelectedSubcategory(subcategoryId);
        clearError();
      }
    },
    [setSelectedSubcategory, clearError]
  );

  const handleBrandNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      console.log('📝 Название бренда изменено:', value);
      onBrandNameChange(value);
    },
    [onBrandNameChange]
  );

  // ==================== ПОМОЩНИКИ РЕНДЕРИНГА ====================

  const getPlaceholder = React.useCallback(
    (
      isLoading: boolean,
      hasPrerequisite: boolean,
      loadingText: string,
      normalText: string,
      prerequisiteText: string
    ): string => {
      if (isLoading) return loadingText;
      if (!hasPrerequisite) return prerequisiteText;
      return normalText;
    },
    []
  );

  // ==================== РЕНДЕР ====================

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>
          {t(TranslationKeys.BrandFormBasicInfo)}
        </h3>
        <span className={styles.sectionDescription}>
          {t(TranslationKeys.BrandFormDescription)}
        </span>
      </div>

      {/* Форма в виде гридов 2x2 */}
      <div className={styles.formGrid}>
        {/* Секция */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.BrandFormSectionLabel)}
            options={SECTION_OPTIONS}
            value={selectedSection}
            placeholder={t(TranslationKeys.BrandFormSelectSection)}
            onChange={handleSectionChange}
            className={styles.select}
          />
        </div>

        {/* Категория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.BrandFormCategoryLabel)}
            options={categoryOptions}
            value={selectedCategory || ''}
            placeholder={getPlaceholder(
              loading.categories,
              Boolean(selectedSection),
              t(TranslationKeys.BrandFormLoadingCategories),
              t(TranslationKeys.BrandFormSelectCategory),
              t(TranslationKeys.BrandFormSelectSectionFirst)
            )}
            onChange={handleCategoryChange}
            disabled={!selectedSection || loading.categories}
            className={styles.select}
          />
        </div>

        {/* Подкатегория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.BrandFormSubcategoryLabel)}
            options={subcategoryOptions}
            value={selectedSubcategory || ''}
            placeholder={getPlaceholder(
              loading.subcategories,
              Boolean(selectedCategory),
              t(TranslationKeys.BrandFormLoadingSubcategories),
              t(TranslationKeys.BrandFormSelectSubcategory),
              t(TranslationKeys.BrandFormSelectCategoryFirst)
            )}
            onChange={handleSubcategoryChange}
            disabled={!selectedCategory || loading.subcategories}
            className={styles.select}
          />
        </div>

        {/* Название бренда */}
        <div className={styles.fieldContainer}>
          <CustomInput
            label={t(TranslationKeys.BrandFormBrandNameLabel)}
            value={brandName}
            placeholder={t(TranslationKeys.BrandFormEnterBrandName)}
            onChange={handleBrandNameChange}
            className={styles.input}
            maxLength={100}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandFormSelects;
