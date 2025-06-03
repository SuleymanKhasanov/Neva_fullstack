import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';
import { ProductListItem } from '@/shared/types/product';

interface ProductCardProps {
  product: ProductListItem;
  messages: TranslationType;
  locale: string;
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

const ProductCard = memo<ProductCardProps>(({ product, messages, locale }) => {
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

  const t = (key: string): string => {
    const keyPart = key.split('.')[1];
    const cardMessages = messages?.card;

    if (
      cardMessages &&
      typeof cardMessages === 'object' &&
      keyPart in cardMessages
    ) {
      const value = (cardMessages as Record<string, unknown>)[keyPart];
      return typeof value === 'string' ? value : keyPart;
    }

    return keyPart;
  };

  return (
    <div className={styles.productCard}>
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
          <div className={styles.placeholder}>Изображение отсутствует</div>
        )}
      </div>
      <div className={styles.textBlock}>
        <h4>{truncatedName}</h4>
        <p>{truncatedDescription}</p>
        <div className={styles.buttonContainer}>
          <Link href={productUrl} passHref>
            <Button>{t(TranslationKeys.MoreDetails)}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
