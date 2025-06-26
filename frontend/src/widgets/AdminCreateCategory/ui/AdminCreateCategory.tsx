'use client';

import React from 'react';
import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';
import {
  useCategoryOptions,
  useSubcategoryOptions,
  useBrandOptions,
  useFormData,
  useIsFormValid,
  useSelectedSection,
  useSelectedCategory,
  useSelectedSubcategory,
  useSelectedBrand,
  useLoading,
  useError,
  useAdminCategoryActions,
  type FormData,
} from '@/shared/store/adminCategoryStore';
import styles from './AdminCreateCategory.module.css';

// ==================== СТРОГИЕ ТИПЫ ====================

interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

interface AdminCreateCategoryProps {
  readonly onFormChange?: (isValid: boolean, data: FormData) => void;
}

// ==================== КОНСТАНТЫ ====================

const SECTION_OPTIONS: readonly SelectOption[] = [
  { value: 'NEVA', label: 'Neva' },
  { value: 'X_SOLUTION', label: 'X-Solution' },
] as const;

// ==================== ОСНОВНОЙ КОМПОНЕНТ ====================

const AdminCreateCategory: React.FC<AdminCreateCategoryProps> = ({
  onFormChange,
}) => {
  // ==================== СОСТОЯНИЕ ИЗ STORE ====================

  // Выбранные значения
  const selectedSection = useSelectedSection();
  const selectedCategory = useSelectedCategory();
  const selectedSubcategory = useSelectedSubcategory();
  const selectedBrand = useSelectedBrand();

  // Данные
  const categoryOptions: SelectOption[] = useCategoryOptions();
  const subcategoryOptions: SelectOption[] = useSubcategoryOptions();
  const brandOptions: SelectOption[] = useBrandOptions();

  // Состояния
  const loading = useLoading();
  const error = useError();

  // Вычисляемые значения
  const formData: FormData = useFormData();
  const isFormValid: boolean = useIsFormValid();

  // Действия
  const {
    setSelectedSection,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedBrand,
    clearError,
  } = useAdminCategoryActions();

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
      console.log('📝 Субкатегория изменена:', value);
      const subcategoryId =
        typeof value === 'number' ? value : parseInt(String(value), 10);
      if (!isNaN(subcategoryId)) {
        setSelectedSubcategory(subcategoryId);
        clearError();
      }
    },
    [setSelectedSubcategory, clearError]
  );

  const handleBrandChange = React.useCallback(
    (value: string | number): void => {
      console.log('📝 Бренд изменен:', value);
      const brandId =
        typeof value === 'number' ? value : parseInt(String(value), 10);
      if (!isNaN(brandId)) {
        setSelectedBrand(brandId);
        clearError();
      }
    },
    [setSelectedBrand, clearError]
  );

  const handleErrorDismiss = React.useCallback((): void => {
    clearError();
  }, [clearError]);

  // ==================== ЭФФЕКТЫ ====================

  React.useEffect(() => {
    if (onFormChange) {
      onFormChange(isFormValid, formData);
    }
  }, [onFormChange, isFormValid, formData]);

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
      {/* Отображение ошибок */}
      {error && (
        <div className={styles.error}>
          <span>⚠️ {error}</span>
          <button
            type="button"
            onClick={handleErrorDismiss}
            className={styles.errorClose}
            aria-label="Закрыть ошибку"
          >
            ✕
          </button>
        </div>
      )}

      {/* Форма в виде гридов 2x2 */}
      <div className={styles.formGrid}>
        {/* Секция */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label="Секция *"
            options={SECTION_OPTIONS}
            value={selectedSection}
            placeholder="Выберите секцию"
            onChange={handleSectionChange}
          />
        </div>

        {/* Категория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label="Категория *"
            options={categoryOptions}
            value={selectedCategory ?? ''}
            placeholder={getPlaceholder(
              loading.categories,
              Boolean(selectedSection),
              'Загрузка категорий...',
              'Выберите категорию',
              'Сначала выберите секцию'
            )}
            disabled={!selectedSection || loading.categories}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Субкатегория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label="Субкатегория"
            options={subcategoryOptions}
            value={selectedSubcategory ?? ''}
            placeholder={getPlaceholder(
              loading.subcategories,
              Boolean(selectedCategory),
              'Загрузка субкатегорий...',
              subcategoryOptions.length > 0
                ? 'Выберите субкатегорию'
                : 'Субкатегории отсутствуют',
              'Сначала выберите категорию'
            )}
            disabled={!selectedCategory || loading.subcategories}
            onChange={handleSubcategoryChange}
          />
        </div>

        {/* Бренд */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label="Бренд"
            options={brandOptions}
            value={selectedBrand ?? ''}
            placeholder={getPlaceholder(
              loading.brands,
              Boolean(selectedSubcategory),
              'Загрузка брендов...',
              brandOptions.length > 0 ? 'Выберите бренд' : 'Бренды отсутствуют',
              'Сначала выберите субкатегорию'
            )}
            disabled={!selectedSubcategory || loading.brands}
            onChange={handleBrandChange}
          />
        </div>
      </div>

      {/* Индикаторы загрузки */}
      {(loading.categories || loading.subcategories || loading.brands) && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner} />
          <span>
            Загрузка {loading.categories && 'категорий'}
            {loading.subcategories && 'субкатегорий'}
            {loading.brands && 'брендов'}
            ...
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminCreateCategory;
