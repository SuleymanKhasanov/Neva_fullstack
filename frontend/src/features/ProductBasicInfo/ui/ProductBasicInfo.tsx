// frontend/src/features/ProductBasicInfo/ui/ProductBasicInfo.tsx
'use client';

import { TranslationType } from '@/shared/config/i18n/types';
import { ProductFormData } from '@/widgets/ProductCreateForm';
import { SearchableSelect } from '@/shared/ui/SearchableSelect';
import { Input } from '@/shared/ui/Input/Input';
import { useSelectors } from '../model/useSelectors';
import styles from './ProductBasicInfo.module.css';

interface ProductBasicInfoProps {
  formData: ProductFormData;
  errors: Record<string, string>;
  isLoading: boolean;
  locale: string;
  messages: TranslationType;
  onUpdate: (updates: Partial<ProductFormData>) => void;
}

const ProductBasicInfo = ({
  formData,
  errors,
  isLoading,
  locale,
  messages,
  onUpdate,
}: ProductBasicInfoProps) => {
  const {
    sectionOptions,
    categoryOptions,
    subcategoryOptions,
    brandOptions,
    isLoadingSections,
    isLoadingCategories,
    isLoadingSubcategories,
    isLoadingBrands,
  } = useSelectors(formData.section, formData.categoryId, locale);

  return (
    <div className={styles.container}>
      {/* Первый ряд: Секция и Категория */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>
            Секция <span className={styles.required}>*</span>
          </label>
          <SearchableSelect
            value={formData.section}
            options={sectionOptions}
            placeholder="Выберите секцию..."
            isLoading={isLoadingSections}
            error={errors.section}
            onChange={(value) =>
              onUpdate({
                section: value,
                categoryId: null, // Сбрасываем зависимые поля
                subcategoryId: null,
                brandId: null,
              })
            }
            disabled={isLoading}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Категория <span className={styles.required}>*</span>
          </label>
          <SearchableSelect
            value={formData.categoryId?.toString()}
            options={categoryOptions}
            placeholder="Выберите категорию..."
            isLoading={isLoadingCategories}
            error={errors.categoryId}
            onChange={(value) =>
              onUpdate({
                categoryId: value ? parseInt(value) : null,
                subcategoryId: null, // Сбрасываем зависимые поля
              })
            }
            disabled={isLoading || !formData.section}
          />
        </div>
      </div>

      {/* Второй ряд: Подкатегория и Бренд */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Подкатегория</label>
          <SearchableSelect
            value={formData.subcategoryId?.toString()}
            options={subcategoryOptions}
            placeholder="Выберите подкатегорию..."
            isLoading={isLoadingSubcategories}
            error={errors.subcategoryId}
            onChange={(value) =>
              onUpdate({
                subcategoryId: value ? parseInt(value) : null,
              })
            }
            disabled={isLoading || !formData.categoryId}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Бренд <span className={styles.required}>*</span>
          </label>
          <SearchableSelect
            value={formData.brandId?.toString()}
            options={brandOptions}
            placeholder="Выберите бренд..."
            isLoading={isLoadingBrands}
            error={errors.brandId}
            onChange={(value) =>
              onUpdate({
                brandId: value ? parseInt(value) : null,
              })
            }
            disabled={isLoading || !formData.section}
          />
        </div>
      </div>

      {/* Третий ряд: Название продукта */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>
            Название продукта <span className={styles.required}>*</span>
          </label>
          <Input
            type="text"
            value={formData.name}
            placeholder="Введите название продукта..."
            error={errors.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            disabled={isLoading}
            maxLength={255}
          />
          <div className={styles.fieldHint}>
            Минимум 3 символа, максимум 255 символов
          </div>
        </div>
      </div>

      {/* Индикатор прогресса */}
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${getProgressPercentage(formData)}%`,
            }}
          />
        </div>
        <span className={styles.progressText}>
          {getFilledFieldsCount(formData)} из 4 обязательных полей заполнено
        </span>
      </div>
    </div>
  );
};

// Утилитарные функции
function getFilledFieldsCount(formData: ProductFormData): number {
  let count = 0;
  if (formData.section) count++;
  if (formData.categoryId) count++;
  if (formData.brandId) count++;
  if (formData.name.trim()) count++;
  return count;
}

function getProgressPercentage(formData: ProductFormData): number {
  return (getFilledFieldsCount(formData) / 4) * 100;
}

export default ProductBasicInfo;
