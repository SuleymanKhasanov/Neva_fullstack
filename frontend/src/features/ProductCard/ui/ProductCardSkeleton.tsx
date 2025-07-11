import React, { memo } from 'react';
import styles from './ProductCard.module.css';

const ProductCardSkeleton = memo(() => {
  return (
    <div className={`${styles.productCard} ${styles.skeleton}`}>
      <div className={`${styles.imageContainer} ${styles.skeletonImage}`}></div>
      <div className={styles.textBlock}>
        <div className={`${styles.skeletonText} ${styles.skeletonTitle}`}></div>
        <div
          className={`${styles.skeletonText} ${styles.skeletonDescription}`}
        ></div>
        <div className={`${styles.buttonContainer} ${styles.skeletonButton}`}>
          <div className={styles.skeletonButtonInner}></div>
        </div>
      </div>
    </div>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';

export default ProductCardSkeleton;
