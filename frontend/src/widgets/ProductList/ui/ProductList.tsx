'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '@/shared/services/api/fetchProducts';
import { ProductsResponse } from '@/shared/types/product';
import ProductCard from '@/features/ProductCard/ui/ProductCard';
import ProductCardSkeleton from '@/features/ProductCard/ui/ProductCardSkeleton';
import styles from './ProductList.module.css';
import { TranslationType } from '@/shared/config/i18n/types';

interface ProductListProps {
  locale: string;
  section?: string;
  messages: TranslationType;
}

export default function ProductList({
  locale,
  section,
  messages,
}: ProductListProps) {
  const [products, setProducts] = useState<ProductsResponse['data']>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const loadProducts = async () => {
    if (!hasMore || loading) {
      console.log('Skipping loadProducts:', { hasMore, loading });
      return;
    }
    setLoading(true);

    try {
      console.log(
        `Loading products: page ${page}, section: ${section || 'all'}, locale: ${locale}`
      );
      const response = await fetchProducts({
        locale,
        page,
        limit: 20,
        section: section as 'neva' | 'x_solution' | 'all' | undefined,
      });

      console.log('Fetch products response:', {
        data: response.data,
        meta: response.meta,
        dataLength: response.data?.length,
      });

      if (!response.data || !Array.isArray(response.data)) {
        console.warn('No valid products data received:', response);
        setHasMore(false);
        setError('Получены некорректные данные о продуктах');
        return;
      }

      if (response.data.length === 0) {
        console.log('Empty products data received');
        setHasMore(false);
        return;
      }

      if (page > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setProducts((prev) => [...prev, ...response.data]);
      setHasMore(response.meta?.page < response.meta?.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Неизвестная ошибка';
      console.error('Failed to load products:', errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      console.log('Loading states updated:', {
        loading: false,
        initialLoading: false,
      });
    }
  };

  useEffect(() => {
    console.log('ProductList props:', { locale, section, messages });
    if (section && !['neva', 'x_solution', 'all'].includes(section)) {
      console.error(`Invalid section: ${section}`);
      setError('Неверная секция');
      setLoading(false);
      setInitialLoading(false);
      return;
    }
    setInitialLoading(true);
    loadProducts();
  }, [locale, section]);

  useEffect(() => {
    if (!hasMore || loading || !triggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          console.log('IntersectionObserver triggered, loading more products');
          loadProducts();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [hasMore, loading]);

  if (error) {
    console.log('Rendering error state:', error);
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.mainContentBox}>
      <div className={styles.productGrid}>
        {initialLoading && !products.length
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-initial-${index}`} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  image: product.image,
                  name: product.name,
                  description: product.description,
                }}
                messages={messages}
              />
            ))}
        {loading &&
          products.length > 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-more-${index}`} />
          ))}
      </div>
      <div ref={triggerRef} style={{ height: '1px' }} />
      {!hasMore && products.length > 0 && (
        <div className={styles.noMore}>Больше продуктов нет</div>
      )}
    </div>
  );
}
