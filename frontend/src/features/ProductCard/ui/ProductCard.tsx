import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Button } from '@/shared/ui/Button/Button';
import { TranslationType, TranslationKeys } from '@/shared/config/i18n/types';

type ProductProps = {
  product: {
    image: string | null;
    name: string;
    description: string;
  };
  messages: TranslationType;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const ProductCard = memo<ProductProps>(({ product, messages }) => {
  const truncatedDescription = useMemo(
    () => truncateText(product.description, 50),
    [product.description]
  );

  const truncatedName = useMemo(
    () => truncateText(product.name, 60),
    [product.name]
  );

  const t = (key: string) => {
    const keyPart = key.split('.')[1];
    return messages?.card?.[keyPart] || keyPart;
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
          <Button>{t(TranslationKeys.MoreDetails)}</Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
