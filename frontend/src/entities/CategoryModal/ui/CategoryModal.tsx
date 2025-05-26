'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { fetchCategories } from '@/shared/services/api/fetchCategories';
import { CategoryWithBrands } from '@/shared/types/category';
import { Button } from '@/shared/ui/Button/Button';
import styles from './CategoryModal.module.css';
import { LoadingIndicator } from '@/features/LoadingManager';
import { LuX } from 'react-icons/lu';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  locale,
}) => {
  const [nevaCategories, setNevaCategories] = useState<CategoryWithBrands[]>(
    []
  );
  const [xSolutionCategories, setXSolutionCategories] = useState<
    CategoryWithBrands[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<
    'neva' | 'x_solution' | null
  >(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const [nevaResponse, xSolutionResponse] = await Promise.all([
            fetchCategories({ locale, section: 'neva' }),
            fetchCategories({ locale, section: 'x_solution' }),
          ]);
          setNevaCategories(nevaResponse.data);
          setXSolutionCategories(xSolutionResponse.data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Failed to load categories'
          );
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isOpen, locale]);

  if (!isOpen) return null;

  const toggleSection = (section: 'neva' | 'x_solution') => {
    setExpandedSection(expandedSection === section ? null : section);
    setSelectedCategoryId(null);
  };

  const renderCategories = (categories: CategoryWithBrands[]) => {
    if (isLoading) {
      return (
        <div className={styles.loading}>
          <LoadingIndicator />
        </div>
      );
    }
    if (error) {
      return <p className={styles.error}>{error}</p>;
    }
    if (!categories.length) {
      return <p className={styles.empty}>Нет категорий</p>;
    }

    const selectedCategory = selectedCategoryId
      ? categories.find((cat) => cat.id === selectedCategoryId)
      : null;

    return (
      <ul className={styles.categoryList}>
        {selectedCategory ? (
          <>
            <Button
              variant="secondary"
              onClick={() => setSelectedCategoryId(null)}
              className={styles.backButton}
            >
              <ChevronRight className={styles.backArrow} />
              Назад
            </Button>
            <ul className={styles.brandList}>
              {selectedCategory.brands.length > 0 ? (
                selectedCategory.brands.map((brand) => (
                  <li key={brand.id} className={styles.brandItem}>
                    {brand.name}
                  </li>
                ))
              ) : (
                <p className={styles.empty}>Нет брендов</p>
              )}
            </ul>
          </>
        ) : (
          categories.map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              <Button
                variant="secondary"
                onClick={() =>
                  category.brands.length > 0
                    ? setSelectedCategoryId(category.id)
                    : (window.location.href = `/categories/${category.id}`)
                }
                className={styles.categoryButton}
              >
                <span>{category.name}</span>
                {category.brands.length > 0 && (
                  <ChevronRight className={styles.arrowIcon} />
                )}
              </Button>
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Категории</h2>
          <Button
            variant="secondary"
            onClick={onClose}
            className={styles.closeButton}
          >
            <LuX className={styles.closeIcon} />
          </Button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.section}>
            <Button
              variant="secondary"
              onClick={() => toggleSection('neva')}
              className={styles.sectionButton}
            >
              <span>Neva</span>
              <ChevronDown
                className={`${styles.sectionArrow} ${expandedSection === 'neva' ? styles.arrowOpen : ''}`}
              />
            </Button>
            {expandedSection === 'neva' && renderCategories(nevaCategories)}
          </div>
          <div className={styles.section}>
            <Button
              variant="secondary"
              onClick={() => toggleSection('x_solution')}
              className={styles.sectionButton}
            >
              <span>X-Solution</span>
              <ChevronDown
                className={`${styles.sectionArrow} ${expandedSection === 'x_solution' ? styles.arrowOpen : ''}`}
              />
            </Button>
            {expandedSection === 'x_solution' &&
              renderCategories(xSolutionCategories)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
