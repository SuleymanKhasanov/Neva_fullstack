import { CustomTextarea } from '@/shared/ui/CustomTextarea/CustomTextarea';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>
          Описание и характеристики продукта
        </h3>
        <span className={styles.sectionDescription}>
          Заполните описание и характеристики продукта для лучшего понимания его
          особенностей и преимуществ.
        </span>
      </div>
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder="Введите описание продукта"
          variant="description"
          label="Описание продукта (Ru)"
        />
        <CustomTextarea
          placeholder="Введите характеристики продукта"
          variant="specifications"
          label="Характеристики продукта (Ru)"
        />
      </div>
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder="Введите описание продукта"
          variant="description"
          label="Описание продукта (En)"
        />
        <CustomTextarea
          placeholder="Введите характеристики продукта"
          variant="specifications"
          label="Характеристики продукта (En)"
        />
      </div>
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder="Введите описание продукта"
          variant="description"
          label="Описание продукта (Uz)"
        />
        <CustomTextarea
          placeholder="Введите характеристики продукта"
          variant="specifications"
          label="Характеристики продукта (Uz)"
        />
      </div>
      <div className={styles.wrapper}>
        <CustomTextarea
          placeholder="Введите описание продукта"
          variant="description"
          label="Описание продукта (Kr)"
        />
        <CustomTextarea
          placeholder="Введите характеристики продукта"
          variant="specifications"
          label="Характеристики продукта (Kr)"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
