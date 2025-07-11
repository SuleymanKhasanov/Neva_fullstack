import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './ProductCard.module.css';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationKeys } from '@/shared/config/i18n/types';
import { ProductListItem } from '@/shared/types/product';

interface ProductCardProps {
  product: ProductListItem;
  locale: string;
  // Админские пропсы (опциональные)
  isAdminMode?: boolean;
  isDeleteMode?: boolean;
  isDeleting?: boolean;
  onDelete?: (product: ProductListItem) => void;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Функция для создания SEO-friendly slug из названия продукта
// Временная функция, пока не получаем slug из GraphQL
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Убираем специальные символы
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .trim();
};

const ProductCard = memo<ProductCardProps>(
  ({
    product,
    locale,
    isAdminMode = false,
    isDeleteMode = false,
    isDeleting = false,
    onDelete,
  }) => {
    const t = useTranslations();
    const truncatedDescription = useMemo(
      () => truncateText(product.description, 50),
      [product.description]
    );

    const truncatedName = useMemo(
      () => truncateText(product.name, 60),
      [product.name]
    );

    // Используем slug из API, если доступен, иначе создаем временный
    const productSlug = useMemo(() => {
      // Если в GraphQL ответе будет slug - используем его
      // Пока создаем из названия
      return createSlug(product.name);
    }, [product.name]);

    const productUrl = useMemo(
      () => `/${locale}/product/${product.id}/${productSlug}`,
      [locale, product.id, productSlug]
    );

    // Обработчик удаления
    const handleDeleteClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onDelete && !isDeleting) {
        onDelete(product);
      }
    };

    // Классы для карточки
    const cardClasses = [
      styles.productCard,
      isAdminMode && isDeleteMode ? styles.deleteMode : '',
      isDeleting ? styles.deleting : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={cardClasses}>
        {/* Кнопка удаления (только в админ режиме при зажатом Shift) */}
        {isAdminMode && isDeleteMode && (
          <button
            className={styles.deleteButton}
            onClick={handleDeleteClick}
            disabled={isDeleting}
            aria-label={`${t(TranslationKeys.ProductCardDelete)} ${product.name}`}
          >
            <span className={styles.deleteIcon}>✕</span>
          </button>
        )}

        {/* Оверлей загрузки при удалении */}
        {isDeleting && (
          <div className={styles.deletingOverlay}>
            <div className={styles.deletingSpinner} />
          </div>
        )}

        <div className={styles.imageContainer}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              className={styles.image}
              loading="lazy"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1440px) 25vw, 20vw"
            />
          ) : (
            <div className={styles.placeholder}>
              {t(TranslationKeys.ProductCardNoImage)}
            </div>
          )}
        </div>
        <div className={styles.textBlock}>
          <h4>{truncatedName}</h4>
          <p>{truncatedDescription}</p>
          <div className={styles.buttonContainer}>
            <Link href={productUrl} passHref>
              <Button disabled={isDeleting}>
                {t(TranslationKeys.MoreDetails)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
