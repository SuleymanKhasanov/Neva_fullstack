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

const ProductCard = ({ product, messages }: ProductProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

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
          />
        ) : (
          <div className={styles.placeholder}>Изображение отсутствует</div>
        )}
      </div>
      <div className={styles.textBlock}>
        <h4>{product.name}</h4>
        <p>{truncateText(product.description, 50)}</p>
        <div className={styles.buttonContainer}>
          <Button>{t(TranslationKeys.MoreDetails)}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
