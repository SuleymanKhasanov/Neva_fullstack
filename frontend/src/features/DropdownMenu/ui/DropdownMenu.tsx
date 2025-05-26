'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { loadMenuData, MenuSection, MenuState } from '../model/menuModel';
import BrandList from './BrandList';
import styles from './DropdownMenu.module.css';
import { LoadingIndicator } from '@/features/LoadingManager';
import { CategoryWithBrands } from '@/shared/types/category';

type DropdownMenuProps = {
  locale: string;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ locale }) => {
  const [menuState, setMenuState] = useState<MenuState>({
    nevaCategories: [],
    xSolutionCategories: [],
    isLoading: true,
    error: null,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<MenuSection | null>(null);

  useEffect(() => {
    console.log(`Loading menu for locale: ${locale}`);
    loadMenuData(locale)
      .then((data) => {
        console.log('Menu data loaded:', {
          nevaCategories: data.nevaCategories.length,
          xSolutionCategories: data.xSolutionCategories.length,
          error: data.error,
        });
        setMenuState(data);
      })
      .catch((error) => {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to load menu data:', errorMessage, error);
        setMenuState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      });
  }, [locale]);

  const { nevaCategories, xSolutionCategories, isLoading, error } = menuState;

  const handleMouseLeave = () => {
    setActiveSection(null);
    setSelectedCategoryId(null);
  };

  const renderCategoryContent = (categories: CategoryWithBrands[]) => {
    console.log('Rendering categories:', {
      count: categories.length,
      isLoading,
      error,
      section: activeSection,
    });

    if (isLoading) {
      return (
        <div className={styles.loading}>
          <LoadingIndicator />
        </div>
      );
    }
    if (error) {
      console.error('Menu error:', error);
      return <p className={styles.error}>Ошибка: {error}</p>;
    }
    if (!categories.length) {
      console.warn('No categories available');
      return <p className={styles.empty}>Нет категорий</p>;
    }

    const selectedCategory = selectedCategoryId
      ? categories.find((cat) => cat.id === selectedCategoryId)
      : null;

    return (
      <div
        className={`${styles.content} ${selectedCategory ? styles.slideFade : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        {selectedCategory ? (
          <BrandList
            category={selectedCategory}
            onBack={() => setSelectedCategoryId(null)}
          />
        ) : (
          <CategoryList
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={setSelectedCategoryId}
          />
        )}
      </div>
    );
  };

  return (
    <nav className={styles.navigationMenu}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <div
            className={`${styles.trigger} ${activeSection === 'neva' ? styles.active : ''}`}
            onMouseEnter={() => setActiveSection('neva')}
            onFocus={() => setActiveSection('neva')}
          >
            <span>Neva</span>
            <ChevronDown
              className={`${styles.arrow} ${activeSection === 'neva' ? styles.arrowOpen : ''}`}
            />
          </div>
          {activeSection === 'neva' && (
            <div
              className={`${styles.contentWrapper} ${
                activeSection === 'neva'
                  ? styles.slideInFromLeft
                  : styles.slideOutToRight
              }`}
            >
              {renderCategoryContent(nevaCategories)}
            </div>
          )}
        </li>
        <li className={styles.navItem}>
          <div
            className={`${styles.trigger} ${activeSection === 'x_solution' ? styles.active : ''}`}
            onMouseEnter={() => setActiveSection('x_solution')}
            onFocus={() => setActiveSection('x_solution')}
          >
            <span>X-Solution</span>
            <ChevronDown
              className={`${styles.arrow} ${activeSection === 'x_solution' ? styles.arrowOpen : ''}`}
            />
          </div>
          {activeSection === 'x_solution' && (
            <div
              className={`${styles.contentWrapper} ${
                activeSection === 'x_solution'
                  ? styles.slideInFromRight
                  : styles.slideOutToLeft
              }`}
            >
              {renderCategoryContent(xSolutionCategories)}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const CategoryList: React.FC<{
  categories: CategoryWithBrands[];
  selectedCategoryId: number | null;
  onCategorySelect: (id: number) => void;
}> = ({ categories, selectedCategoryId, onCategorySelect }) => (
  <ul className={styles.categoryList}>
    {categories.map((category) => (
      <li
        key={category.id}
        className={`${styles.categoryItem} ${
          selectedCategoryId === category.id ? styles.active : ''
        }`}
        onClick={() => {
          if (category.brands.length > 0) {
            onCategorySelect(category.id);
          } else {
            console.log(`No brands for category ${category.id}, redirecting`);
            window.location.href = `/categories/${category.id}`;
          }
        }}
      >
        <span>{category.name}</span>
        {category.brands.length > 0 && (
          <ChevronRight className={styles.arrowIcon} />
        )}
      </li>
    ))}
  </ul>
);

export default DropdownMenu;
