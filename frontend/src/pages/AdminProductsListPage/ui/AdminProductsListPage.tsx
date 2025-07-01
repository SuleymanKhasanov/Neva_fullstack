'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKeys } from '@/shared/config/i18n/types';
import styles from './AdminProductsListPage.module.css';
import ProductCard from '@/features/ProductCard/ui/ProductCard';
import ProductCardSkeleton from '@/features/ProductCard/ui/ProductCardSkeleton';
import { useShiftKey } from '@/shared/hooks/useShiftKey';
import { useAuth } from '@/shared/contexts/AuthContext';
import {
  useProducts,
  useTotalCount,
  useHasNextPage,
  useIsLoading,
  useShowDeleteConfirm,
  useProductToDelete,
  useDeletingProductIds,
  useAdminProductsActions,
} from '@/shared/store/adminProductsStoreGraphQL';
import { Button } from '@/shared/ui/Button/Button';

interface AdminProductsListPageProps {
  locale: string;
  section?: string;
  brandId?: number;
}

const AdminProductsListPage: React.FC<AdminProductsListPageProps> = ({
  locale,
  section,
  brandId,
}) => {
  const t = useTranslations();
  const isShiftPressed = useShiftKey();
  const { accessToken, isAuthenticated } = useAuth();

  // Состояние из store
  const products = useProducts();
  const totalCount = useTotalCount();
  const hasNextPage = useHasNextPage();
  const isLoading = useIsLoading();
  const showDeleteConfirm = useShowDeleteConfirm();
  const productToDelete = useProductToDelete();
  const deletingProductIds = useDeletingProductIds();

  // Действия
  const {
    loadProducts,
    loadMoreProducts,
    hideDeleteConfirmation,
    confirmDelete,
    showDeleteConfirmation,
  } = useAdminProductsActions();

  // Загрузка продуктов при монтировании и изменении параметров
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts(locale, section, brandId, true);
    }
  }, [loadProducts, locale, section, brandId, isAuthenticated]);

  // Показываем загрузку если пользователь не авторизован
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>{t(TranslationKeys.AdminProductsListAuthCheck)}</p>
        </div>
      </div>
    );
  }

  // Обработчик загрузки дополнительных продуктов
  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      loadMoreProducts(locale, section, brandId);
    }
  };

  // Обработчик подтверждения удаления
  const handleConfirmDelete = async () => {
    if (productToDelete && accessToken) {
      await confirmDelete(accessToken);
    }
  };

  // Рендер кнопки загрузки еще
  const renderLoadMoreButton = () => {
    if (!hasNextPage) return null;

    return (
      <div className={styles.loadMoreContainer}>
        <button
          className={styles.loadMoreButton}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading
            ? t(TranslationKeys.AdminProductsListLoading)
            : t(TranslationKeys.AdminProductsListLoadMore)}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t(TranslationKeys.AdminProductsListTitle)}
        </h1>
        <div className={styles.subtitle}>
          <span>
            {t(TranslationKeys.AdminProductsListTotalProducts)}: {totalCount}
          </span>
          <span>
            {products.length}{' '}
            {t(TranslationKeys.AdminProductsListLoadedProducts)}
          </span>
        </div>
      </div>

      {/* Сетка продуктов */}
      <div className={styles.productsGrid}>
        {isLoading && products.length === 0
          ? // Скелетоны при первой загрузке
            Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                messages={
                  t as unknown as import('@/shared/config/i18n/types').TranslationType
                }
                locale={locale}
                isAdminMode={true}
                isDeleteMode={isShiftPressed}
                isDeleting={deletingProductIds.has(product.id)}
                onDelete={showDeleteConfirmation}
              />
            ))}
      </div>

      {/* Индикатор загрузки при смене страницы */}
      {isLoading && products.length > 0 && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <span>{t(TranslationKeys.AdminProductsListLoading)}</span>
        </div>
      )}

      {/* Кнопка загрузки еще */}
      {renderLoadMoreButton()}

      {/* Модальное окно подтверждения удаления */}
      {showDeleteConfirm && productToDelete && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{t(TranslationKeys.AdminProductsListConfirmDeleteTitle)}</h3>
            <p>
              {t(TranslationKeys.AdminProductsListConfirmDeleteMessage)}{' '}
              <strong>&quot;{productToDelete.name}&quot;</strong>?
            </p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={hideDeleteConfirmation}>
                {t(TranslationKeys.AdminProductsListConfirmDeleteCancel)}
              </Button>
              <Button variant="primary" onClick={handleConfirmDelete}>
                {t(TranslationKeys.AdminProductsListConfirmDeleteConfirm)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsListPage;
