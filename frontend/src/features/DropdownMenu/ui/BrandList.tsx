import { ChevronRight } from 'lucide-react';
import styles from './DropdownMenu.module.css';
import { CategoryWithBrands } from '@/shared/types/category';

interface BrandListProps {
  category: CategoryWithBrands;
  onBack: () => void;
}

const BrandList: React.FC<BrandListProps> = ({ category, onBack }) => {
  console.log(
    'Rendering BrandList for category:',
    category.name,
    'Brands:',
    category.brands
  );

  return (
    <>
      <div className={styles.backButton} onClick={onBack}>
        <span className={styles.backArrow}>
          <ChevronRight className={styles.arrowIcon} />
        </span>
        Назад
      </div>
      <ul className={styles.brandList}>
        {category.brands.length > 0 ? (
          category.brands.map((brand) => (
            <li
              key={brand.id}
              className={styles.brandItem}
              onClick={() => {
                console.log(`Navigating to brand ${brand.id}`);
                window.location.href = `/brands/${brand.id}`;
              }}
            >
              {brand.name}
            </li>
          ))
        ) : (
          <p className={styles.empty}>Нет брендов</p>
        )}
      </ul>
    </>
  );
};

export default BrandList;
