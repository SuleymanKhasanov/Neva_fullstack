// frontend/src/widgets/ProductImagesUpload/ui/ProductImagesUpload.tsx
'use client';

import React from 'react';
import { ImageSlot } from '@/features/ImageSlot';
import {
  useProductImages,
  useAdminCategoryActions,
} from '@/shared/store/adminCategoryStore';
import styles from './ProductImagesUpload.module.css';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { useTranslations } from 'next-intl';

// ==================== ТИПЫ ====================

interface ProductImagesUploadProps {
  readonly className?: string;
  readonly disabled?: boolean;
}

// ==================== КОНСТАНТЫ ====================

const IMAGE_SLOTS = [0, 1, 2, 3, 4] as const; // 5 слотов

// ==================== КОМПОНЕНТ ====================

const ProductImagesUpload: React.FC<ProductImagesUploadProps> = ({
  className = '',
  disabled = false,
}) => {
  const productImages = useProductImages();
  const { setProductImage, removeProductImage, setPrimaryProductImage } =
    useAdminCategoryActions();

  const t = useTranslations();

  // ==================== КОМПОНЕНТ СЛОТА ====================

  const renderImageSlot = (slotIndex: number) => {
    const imageData = productImages.find((img) => img.slotIndex === slotIndex);

    return (
      <ImageSlot
        key={slotIndex}
        slotIndex={slotIndex}
        image={imageData?.file || null}
        preview={imageData?.preview || null}
        isPrimary={imageData?.isPrimary || false}
        disabled={disabled}
        onImageSelect={setProductImage}
        onImageRemove={removeProductImage}
        onSetPrimary={setPrimaryProductImage}
        className={styles.slot}
      />
    );
  };

  // ==================== RENDER ====================

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Заголовок */}
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>
          {t(TranslationKeys.ProductCreateSectionsImagesTitle)}
        </h3>
        <span className={styles.sectionDescription}>
          {t(TranslationKeys.ProductCreateSectionsImagesDescription)}
        </span>
      </div>

      {/* Сетка изображений */}
      <div className={styles.grid}>{IMAGE_SLOTS.map(renderImageSlot)}</div>
    </div>
  );
};

export default ProductImagesUpload;
