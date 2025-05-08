'use client';

import { useState } from 'react';
import { LuServer } from 'react-icons/lu';

import { ContentBox } from '@/entities/ContentBox';
import { InteractiveAccordionMenu } from '@/features/AccordionMenu'; // Используем новый компонент
import FloatingContactButton from '@/features/FloatingContactButton/ui/FloatingContactButton';
import { ProductCard } from '@/features/ProductCard';
import { Product, Category } from '@/shared/model/types';
import { Header } from '@/widgets/Header';

import { CategoryIcons } from '../assets/categoryIcons';

import styles from './HomePage.module.css';

interface HomePageProps {
  products: Product[];
  categories: Category[];
}

export default function HomePage({ products, categories }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const groupedProducts = products.reduce(
    (acc, product) => {
      const categoryId = product.category_id;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          products: [],
          categoryName: product.category,
        };
      }
      acc[categoryId].products.push(product);

      return acc;
    },
    {} as Record<string, { products: Product[]; categoryName: string }>
  );

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <InteractiveAccordionMenu
        isMenuOpen={isMenuOpen}
        categories={categories}
      />
      <ContentBox>
        <div className={styles.sections}>
          {Object.entries(groupedProducts).map(
            ([categoryId, { products: categoryProducts, categoryName }]) => (
              <div key={categoryId} className={styles.section}>
                <div className={styles.sectionHeader}>
                  {CategoryIcons[categoryId] ? (
                    <span className={styles.sectionIcon}>
                      {CategoryIcons[categoryId]}
                    </span>
                  ) : (
                    <LuServer className={styles.sectionIcon} />
                  )}
                  <h2 className={styles.sectionTitle}>{categoryName}</h2>
                </div>
                <div className={styles.productList}>
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </ContentBox>
      <div className={styles.bottomGlessBar}>
        <FloatingContactButton />
      </div>
    </>
  );
}
