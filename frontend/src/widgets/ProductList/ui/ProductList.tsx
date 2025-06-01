'use client';

import { useEffect, useRef, useMemo, memo, useCallback } from 'react';
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

interface ProductEdge {
  node: Product;
  cursor: string;
}

interface ProductsResponse {
  products: {
    edges: ProductEdge[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    totalCount: number;
  };
}

const MemoizedProductCard = memo(ProductCard);
const MemoizedProductCardSkeleton = memo(ProductCardSkeleton);

export default function ProductList({ locale, messages }: ProductListProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);

  const { isScrollEnd, setIsScrollEnd, isLoadingNext, setIsLoadingNext } =
    useScrollStore();
  const { section, brandId } = useFilterStore();

  const validLocale = locale || 'ru';

  const { data, loading, error, fetchMore, refetch } =
    useQuery<ProductsResponse>(GET_PRODUCTS, {
      variables: {
        locale: validLocale,
        first: 20,
        section: section === 'all' ? null : section,
        brandId,
      },
      fetchPolicy: 'cache-and-network',
      skip: !validLocale,
    });

  const uniqueProducts = useMemo(() => {
    if (!data?.products.edges) return [];
    const products = data.products.edges.map((edge) => edge.node);
    const uniqueMap = new Map(products.map((product) => [product.id, product]));
    return Array.from(uniqueMap.values());
  }, [data?.products.edges]);

  // Обновляем ref состояния для синхронного доступа
  useEffect(() => {
    isLoadingRef.current = loading || isLoadingNext;
  }, [loading, isLoadingNext]);

  // Функция загрузки следующей страницы
  const loadNextPage = useCallback(async () => {
    if (
      isLoadingRef.current ||
      !data?.products.pageInfo.hasNextPage ||
      !data?.products.pageInfo.endCursor
    ) {
      console.log('❌ Blocked loadNextPage:', {
        isLoading: isLoadingRef.current,
        hasNextPage: data?.products.pageInfo.hasNextPage,
        endCursor: Boolean(data?.products.pageInfo.endCursor),
      });
      return;
    }

    console.log('🚀 Starting loadNextPage');
    setIsLoadingNext(true);

    try {
      const result = await fetchMore({
        variables: {
          after: data.products.pageInfo.endCursor,
        },
      });

      console.log('✅ LoadNext success:', {
        newProducts: result.data.products.edges.length,
        hasNextPage: result.data.products.pageInfo.hasNextPage,
      });
    } catch (error) {
      console.error('💥 LoadNext error:', error);
    } finally {
      setIsLoadingNext(false);
      setIsScrollEnd(false); // Убираем свечение после загрузки
    }
  }, [data, fetchMore, setIsLoadingNext, setIsScrollEnd]);

  // IntersectionObserver для определения конца списка
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (
        entry.isIntersecting &&
        !isLoadingRef.current &&
        data?.products.pageInfo.hasNextPage
      ) {
        console.log('🎯 Reached end of list, showing glow...');
        setIsScrollEnd(true);

        // Запускаем загрузку через небольшую задержку для показа свечения
        setTimeout(() => {
          loadNextPage();
        }, 800);
      }
    },
    [data?.products.pageInfo.hasNextPage, loadNextPage, setIsScrollEnd]
  );

  // Настройка IntersectionObserver
  useEffect(() => {
    const triggerElement = triggerRef.current;

    // Очищаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Создаем observer только если есть триггер и следующая страница
    if (
      triggerElement &&
      data?.products.pageInfo.hasNextPage &&
      !isLoadingRef.current
    ) {
      console.log('🔭 Setting up IntersectionObserver');

      observerRef.current = new IntersectionObserver(handleIntersection, {
        rootMargin: '200px',
        threshold: 0.1,
      });

      observerRef.current.observe(triggerElement);
    } else {
      console.log('⏸️ Skipping observer setup:', {
        triggerElement: !!triggerElement,
        hasNextPage: data?.products.pageInfo.hasNextPage,
        isLoading: isLoadingRef.current,
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [
    data?.products.pageInfo.hasNextPage,
    loading,
    isLoadingNext,
    handleIntersection,
  ]);

  // Сброс состояния при изменении фильтров
  useEffect(() => {
    console.log('🔄 Filters changed, resetting state');
    setIsScrollEnd(false);
    setIsLoadingNext(false);

    // Отключаем observer при изменении фильтров
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    refetch();
  }, [
    validLocale,
    section,
    brandId,
    refetch,
    setIsScrollEnd,
    setIsLoadingNext,
  ]);

  // Логирование для отладки
  useEffect(() => {
    console.log('📊 ProductList state:', {
      productCount: uniqueProducts.length,
      hasNextPage: data?.products.pageInfo.hasNextPage,
      loading,
      isLoadingNext,
      isScrollEnd,
    });
  }, [
    uniqueProducts.length,
    data?.products.pageInfo.hasNextPage,
    loading,
    isLoadingNext,
    isScrollEnd,
  ]);

  if (error) {
    console.error('💥 ProductList error:', error);
    return (
      <div className={styles.error}>
        Ошибка: {error.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  const showInitialSkeletons = loading && uniqueProducts.length === 0;
  const hasNextPage = data?.products.pageInfo.hasNextPage;

  return (
    <div className={styles.mainContentBox}>
      <div className={styles.productGrid}>
        {showInitialSkeletons &&
          Array.from({ length: 20 }).map((_, index) => (
            <MemoizedProductCardSkeleton key={`skeleton-initial-${index}`} />
          ))}

        {uniqueProducts.map((product) => (
          <MemoizedProductCard
            key={product.id}
            product={{
              image: product.image,
              name: product.name,
              description: product.description,
            }}
            messages={messages}
          />
        ))}
      </div>

      {/* Невидимый триггер для IntersectionObserver */}
      {hasNextPage && (
        <div
          ref={triggerRef}
          style={{
            height: '1px',
            width: '100%',
            margin: '20px 0',
          }}
          data-testid="scroll-trigger"
        />
      )}

      {/* Сообщение о конце списка */}
      {!hasNextPage && uniqueProducts.length > 0 && (
        <div className={styles.noMore}>Больше продуктов нет</div>
      )}
    </div>
  );
}
