'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../lib/queries';
import ProductCard from '@/features/ProductCard/ui/ProductCard';
import ProductCardSkeleton from '@/features/ProductCard/ui/ProductCardSkeleton';
import styles from './ProductList.module.css';
import { TranslationType } from '@/shared/config/i18n/types';
import { useScrollStore } from '@/shared/store/useScrollStore';
import { useFilterStore } from '@/shared/store/useFilterStore';

interface ProductListProps {
  locale: string;
  messages: TranslationType;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string | null;
  brand: {
    id: number;
    name: string;
  };
}

interface ProductsResponse {
  products: {
    edges: { node: Product; cursor: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    totalCount: number;
  };
}

export default function ProductList({ locale, messages }: ProductListProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { isScrollEnd, setIsScrollEnd, isLoadingNext, setIsLoadingNext } =
    useScrollStore();
  const { section, brandId } = useFilterStore();

  const validLocale = locale || 'ru';
  const { data, loading, error, fetchMore, networkStatus, refetch } =
    useQuery<ProductsResponse>(GET_PRODUCTS, {
      variables: {
        locale: validLocale,
        first: 20,
        section: section === 'all' ? null : section, // Используем section напрямую
        brandId,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      skip: !validLocale,
    });

  useEffect(() => {
    console.log('FilterStore state:', useFilterStore.getState());
    console.log('ProductList variables:', {
      locale: validLocale,
      section,
      brandId,
    });
    console.log('GET_PRODUCTS response:', data);
  }, [validLocale, section, brandId, data]);

  useEffect(() => {
    if (
      !data?.products.pageInfo.hasNextPage ||
      loading ||
      isLoadingNext ||
      !triggerRef.current
    ) {
      console.log('Skipping IntersectionObserver:', {
        hasNextPage: data?.products.pageInfo.hasNextPage,
        loading,
        isLoadingNext,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingNext) {
          console.log('IntersectionObserver triggered, showing glow effect');
          setIsScrollEnd(true);
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
  }, [data?.products.pageInfo.hasNextPage, loading, isLoadingNext]);

  useEffect(() => {
    if (isScrollEnd && data?.products.pageInfo.hasNextPage && !isLoadingNext) {
      console.log('Triggering next page fetch after glow effect');
      const timer = setTimeout(() => {
        console.log('Loading next page');
        setIsLoadingNext(true);
        fetchMore({
          variables: {
            after: data.products.pageInfo.endCursor,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            console.log('fetchMoreResult:', fetchMoreResult);
            const existingIds = new Set(
              prev.products.edges.map((edge) => edge.node.id)
            );
            const newEdges = fetchMoreResult.products.edges.filter(
              (edge) => !existingIds.has(edge.node.id)
            );
            return {
              products: {
                ...fetchMoreResult.products,
                edges: [...prev.products.edges, ...newEdges],
              },
            };
          },
        }).then(() => setIsLoadingNext(false));
        setIsScrollEnd(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [
    isScrollEnd,
    data?.products.pageInfo.hasNextPage,
    isLoadingNext,
    fetchMore,
  ]);

  useEffect(() => {
    console.log('Resetting scroll state due to filter change:', {
      locale: validLocale,
      section,
      brandId,
    });
    setIsScrollEnd(false);
    setIsLoadingNext(false);
    refetch();
  }, [validLocale, section, brandId, refetch]);

  if (error) {
    console.error('Error in ProductList:', error);
    return (
      <div className={styles.error}>
        Ошибка: {error.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  const products = data?.products.edges.map((edge) => edge.node) ?? [];

  const uniqueProducts = Array.from(
    new Map(products.map((product) => [product.id, product])).values()
  );

  console.log('Rendering products:', {
    productCount: uniqueProducts.length,
    hasNextPage: data?.products.pageInfo.hasNextPage,
    networkStatus,
  });

  return (
    <div className={styles.mainContentBox}>
      <div className={styles.productGrid}>
        {loading && !uniqueProducts.length
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-initial-${index}`} />
            ))
          : uniqueProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={{
                  image: product.image,
                  name: product.name,
                  description: product.description,
                }}
                messages={messages}
              />
            ))}
        {isLoadingNext &&
          uniqueProducts.length > 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-more-${index}`} />
          ))}
      </div>
      <div ref={triggerRef} style={{ height: '1px' }} />
      {!data?.products.pageInfo.hasNextPage && uniqueProducts.length > 0 && (
        <div className={styles.noMore}>Больше продуктов нет</div>
      )}
    </div>
  );
}
