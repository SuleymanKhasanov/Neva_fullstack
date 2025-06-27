// frontend/src/components/ProductDetails/ProductDetails.tsx
'use client';

import React from 'react';
import { CustomTextarea } from '@/shared/ui/CustomTextarea/CustomTextarea';
import {
  useAdminCategoryActions,
  useProductTranslations,
} from '@/shared/store/adminCategoryStore';
import styles from './ProductDetails.module.css';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';

const ProductDetails = () => {
  // Получаем действия для обновления переводов
  const { setProductTranslation } = useAdminCategoryActions();
  // Получаем текущие переводы из store
  const translations = useProductTranslations();

  const t = useTranslations();

  // Функция для обработки изменений в textarea
  const handleTranslationChange = (
    locale: keyof typeof translations,
    field: keyof typeof translations.ru,
    value: string
  ) => {
    setProductTranslation(locale, field, value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>
          {t(TranslationKeys.ProductCreateSectionsDetailsTitle)}
        </h3>
        <span className={styles.sectionDescription}>
          {t(TranslationKeys.ProductCreateSectionsDetailsDescription)}
        </span>
      </div>

      {/* Русский язык */}
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="description"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionLabelRu
          )}
          value={translations.ru.description}
          onChange={(e) =>
            handleTranslationChange('ru', 'description', e.target.value)
          }
        />
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="specifications"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionSpecificationsLabel
          )}
          value={translations.ru.specifications}
          onChange={(e) =>
            handleTranslationChange('ru', 'specifications', e.target.value)
          }
        />
      </div>

      {/* Английский язык */}
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="description"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionLabelEn
          )}
          value={translations.en.description}
          onChange={(e) =>
            handleTranslationChange('en', 'description', e.target.value)
          }
        />
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="specifications"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionSpecificationsLabel
          )}
          value={translations.en.specifications}
          onChange={(e) =>
            handleTranslationChange('en', 'specifications', e.target.value)
          }
        />
      </div>

      {/* Узбекский язык */}
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="description"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionLabelUz
          )}
          value={translations.uz.description}
          onChange={(e) =>
            handleTranslationChange('uz', 'description', e.target.value)
          }
        />
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="specifications"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionSpecificationsLabel
          )}
          value={translations.uz.specifications}
          onChange={(e) =>
            handleTranslationChange('uz', 'specifications', e.target.value)
          }
        />
      </div>

      {/* Корейский язык */}
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="description"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionLabelKr
          )}
          value={translations.kr.description}
          onChange={(e) =>
            handleTranslationChange('kr', 'description', e.target.value)
          }
        />
        <CustomTextarea
          placeholder={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionPlaceholder
          )}
          variant="specifications"
          label={t(
            TranslationKeys.ProductCreateFieldsProductDescriptionSpecificationsLabel
          )}
          value={translations.kr.specifications}
          onChange={(e) =>
            handleTranslationChange('kr', 'specifications', e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ProductDetails;
