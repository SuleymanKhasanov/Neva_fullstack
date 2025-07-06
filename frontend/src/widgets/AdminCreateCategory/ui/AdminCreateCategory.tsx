// frontend/src/widgets/AdminCreateCategory/ui/AdminCreateCategory.tsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)

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
  useAdminCategoryActions,
  useProductTranslations, // Новый хук для переводов
} from '@/shared/store/adminCategoryStore';
import styles from './AdminCreateCategory.module.css';
import { CustomInput } from '@/shared/ui/CustomInput/CustomInput';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { useTranslations } from 'next-intl';

// ==================== СТРОГИЕ ТИПЫ ====================

interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

// ✅ ИСПРАВЛЕНО: Правильная типизация для пропсов
interface FormDataShape {
  readonly section: string;
  readonly categoryId: number | null;
  readonly subcategoryId: number | null;
  readonly brandId: number | null;
}

interface AdminCreateCategoryProps {
  readonly onFormChange?: (isValid: boolean, data: FormDataShape) => void;
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
  const t = useTranslations();

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

  // Переводы
  const productTranslations = useProductTranslations(); // Получаем переводы

  // Состояния
  const loading = useLoading();

  // Вычисляемые значения
  const formData: FormDataShape = useFormData();
  const isFormValid: boolean = useIsFormValid();

  // Действия
  const {
    setSelectedSection,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedBrand,
    clearError,
    setProductTranslation, // Добавляем действие для переводов
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

  // Обработчики для полей названия продукта на всех языках
  const handleProductNameChange = React.useCallback(
    (locale: 'ru' | 'en' | 'uz' | 'kr') =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        console.log(`📝 Название продукта (${locale}) изменено:`, value);
        setProductTranslation(locale, 'name', value);
      },
    [setProductTranslation]
  );

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
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>
          {t(TranslationKeys.ProductCreateSectionsBasicInfoTitle)}
        </h3>
        <span className={styles.sectionDescription}>
          {t(TranslationKeys.ProductCreateSectionsBasicInfoDescription)}
        </span>
      </div>

      {/* Форма в виде гридов 2x2 */}
      <div className={styles.formGrid}>
        {/* Секция */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.ProductCreateFieldsSectionLabel)}
            options={SECTION_OPTIONS}
            value={selectedSection}
            placeholder={t(
              TranslationKeys.ProductCreateFieldsSectionPlaceholder
            )}
            onChange={handleSectionChange}
          />
        </div>

        {/* Категория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.ProductCreateFieldsCategoryLabel)}
            options={categoryOptions}
            value={selectedCategory ?? ''}
            placeholder={getPlaceholder(
              loading.categories,
              Boolean(selectedSection),
              t(TranslationKeys.ProductCreateLoadingCategories),
              t(TranslationKeys.ProductCreateFieldsCategoryPlaceholder),
              t(TranslationKeys.ProductCreateFieldsCategorySelectSectionFirst)
            )}
            disabled={!selectedSection || loading.categories}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Субкатегория */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.ProductCreateFieldsSubcategoryLabel)}
            options={subcategoryOptions}
            value={selectedSubcategory ?? ''}
            placeholder={getPlaceholder(
              loading.subcategories,
              Boolean(selectedCategory),
              t(TranslationKeys.ProductCreateLoadingSubcategories),
              subcategoryOptions.length > 0
                ? t(TranslationKeys.ProductCreateFieldsSubcategoryPlaceholder)
                : t(TranslationKeys.ProductCreateFieldsSubcategoryNotAvailable),
              t(
                TranslationKeys.ProductCreateFieldsSubcategorySelectCategoryFirst
              )
            )}
            disabled={!selectedCategory || loading.subcategories}
            onChange={handleSubcategoryChange}
          />
        </div>

        {/* Бренд */}
        <div className={styles.fieldContainer}>
          <CustomSelect
            label={t(TranslationKeys.ProductCreateFieldsBrandLabel)}
            options={brandOptions}
            value={selectedBrand ?? ''}
            placeholder={getPlaceholder(
              loading.brands,
              Boolean(selectedSubcategory),
              t(TranslationKeys.ProductCreateLoadingBrands),
              brandOptions.length > 0
                ? t(
                    TranslationKeys.ProductCreateFieldsBrandSelectSubcategoryFirst
                  )
                : t(TranslationKeys.ProductCreateFieldsBrandNotAvailable),
              t(TranslationKeys.ProductCreateFieldsBrandSelectSubcategoryFirst)
            )}
            disabled={!selectedSubcategory || loading.brands}
            onChange={handleBrandChange}
          />
        </div>
      </div>

      {/* Названия продукта на всех языках */}
      <div className={styles.productNamesSection}>
        <div className={styles.productNamesGrid}>
          {/* Русский */}
          <div className={styles.fieldContainer}>
            <CustomInput
              label={t(TranslationKeys.ProductCreateFieldsProductNameLabelRu)}
              placeholder={t(
                TranslationKeys.ProductCreateFieldsProductNamePlaceholder
              )}
              value={productTranslations.ru.name}
              onChange={handleProductNameChange('ru')}
              required
            />
          </div>

          {/* Английский */}
          <div className={styles.fieldContainer}>
            <CustomInput
              label={t(TranslationKeys.ProductCreateFieldsProductNameLabelEn)}
              placeholder={t(
                TranslationKeys.ProductCreateFieldsProductNamePlaceholder
              )}
              value={productTranslations.en.name}
              onChange={handleProductNameChange('en')}
            />
          </div>

          {/* Узбекский */}
          <div className={styles.fieldContainer}>
            <CustomInput
              label={t(TranslationKeys.ProductCreateFieldsProductNameLabelUz)}
              placeholder={t(
                TranslationKeys.ProductCreateFieldsProductNamePlaceholder
              )}
              value={productTranslations.uz.name}
              onChange={handleProductNameChange('uz')}
            />
          </div>

          {/* Корейский */}
          <div className={styles.fieldContainer}>
            <CustomInput
              label={t(TranslationKeys.ProductCreateFieldsProductNameLabelKr)}
              placeholder={t(
                TranslationKeys.ProductCreateFieldsProductNamePlaceholder
              )}
              value={productTranslations.kr.name}
              onChange={handleProductNameChange('kr')}
            />
          </div>
        </div>
      </div>

      {/* Индикаторы загрузки */}
      {(loading.categories || loading.subcategories || loading.brands) && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner} />
          <span>
            {t(TranslationKeys.AdminHomeLoading)}{' '}
            {loading.categories &&
              t(TranslationKeys.ProductCreateLoadingCategories)}
            {loading.subcategories &&
              t(TranslationKeys.ProductCreateLoadingSubcategories)}
            {loading.brands && t(TranslationKeys.ProductCreateLoadingBrands)}
            ...
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminCreateCategory;
