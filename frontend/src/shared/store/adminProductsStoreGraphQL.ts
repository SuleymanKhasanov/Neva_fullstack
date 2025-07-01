import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ProductListItem } from '@/shared/types/product';
import { gql } from '@apollo/client';
import client from '@/shared/lib/apollo/client';

// ==================== ТИПЫ ====================

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ProductListItem;
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    totalCount: number;
  };
}

interface AdminProductsState {
  // Состояние данных
  products: ProductListItem[];
  totalCount: number;
  hasNextPage: boolean;
  endCursor: string | null;
  isLoading: boolean;
  error: string;

  // Состояние удаления
  deletingProductIds: Set<string>;
  showDeleteConfirm: boolean;
  productToDelete: ProductListItem | null;

  // Временные сообщения
  temporaryMessage: string;
  isShowingTempMessage: boolean;

  // Действия
  loadProducts: (
    locale: string,
    section?: string,
    brandId?: number,
    reset?: boolean
  ) => Promise<void>;
  loadMoreProducts: (
    locale: string,
    section?: string,
    brandId?: number
  ) => Promise<void>;
  deleteProduct: (productId: string, accessToken: string) => Promise<void>;
  setError: (error: string) => void;
  clearError: () => void;

  // Управление модальным окном удаления
  showDeleteConfirmation: (product: ProductListItem) => void;
  hideDeleteConfirmation: () => void;
  confirmDelete: (accessToken: string) => Promise<void>;

  // Временные сообщения
  showTemporaryMessage: (message: string, duration?: number) => void;
  hideTemporaryMessage: () => void;
}

// ==================== GRAPHQL ЗАПРОСЫ ====================

export const GET_ADMIN_PRODUCTS = gql`
  query GetAdminProducts(
    $locale: String!
    $first: Int!
    $after: String
    $section: String
    $brandId: Int
  ) {
    products(
      locale: $locale
      first: $first
      after: $after
      section: $section
      brandId: $brandId
    ) {
      edges {
        node {
          id
          name
          description
          image
          brand {
            id
            name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

// Используем REST API для удаления, так как GraphQL мутация может не быть реализована
// export const DELETE_PRODUCT = gql`
//   mutation DeleteProduct($id: ID!) {
//     deleteProduct(id: $id) {
//       success
//       message
//     }
//   }
// `;

// ==================== API ФУНКЦИИ ====================

const fetchProductsGraphQL = async (
  locale: string,
  first: number = 20,
  after?: string,
  section?: string,
  brandId?: number
): Promise<ProductsResponse> => {
  const { data } = await client.query({
    query: GET_ADMIN_PRODUCTS,
    variables: {
      locale,
      first,
      after,
      section,
      brandId,
    },
    fetchPolicy: 'network-only', // Всегда загружаем свежие данные для админки
  });

  return data;
};

const deleteProductAPI = async (
  productId: string,
  accessToken: string
): Promise<void> => {
  // Используем реальный API endpoint из бэкенда
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const response = await fetch(`${backendUrl}/admin/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Ошибка авторизации. Пожалуйста, войдите в систему.');
    }
    if (response.status === 404) {
      throw new Error('Продукт не найден.');
    }
    if (response.status === 403) {
      throw new Error('Недостаточно прав для удаления продукта.');
    }
    throw new Error(
      `Ошибка удаления продукта: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Неизвестная ошибка удаления');
  }

  console.log(`✅ Продукт ${productId} успешно удален из БД`);
};

// ==================== ZUSTAND STORE ====================

export const useAdminProductsStore = create<AdminProductsState>()(
  subscribeWithSelector((set, get) => ({
    // Начальное состояние
    products: [],
    totalCount: 0,
    hasNextPage: false,
    endCursor: null,
    isLoading: false,
    error: '',

    deletingProductIds: new Set(),
    showDeleteConfirm: false,
    productToDelete: null,

    temporaryMessage: '',
    isShowingTempMessage: false,

    // Загрузка продуктов (первая страница или сброс)
    loadProducts: async (
      locale: string,
      section?: string,
      brandId?: number,
      reset = true
    ) => {
      set({ isLoading: true, error: '' });

      try {
        const data = await fetchProductsGraphQL(
          locale,
          20, // Загружаем 20 продуктов для админки
          reset ? undefined : get().endCursor,
          section,
          brandId
        );

        const newProducts = data.products.edges.map((edge) => edge.node);

        set({
          products: reset ? newProducts : [...get().products, ...newProducts],
          totalCount: data.products.totalCount,
          hasNextPage: data.products.pageInfo.hasNextPage,
          endCursor: data.products.pageInfo.endCursor,
          isLoading: false,
        });

        console.log(
          `✅ Загружено ${newProducts.length} продуктов (всего: ${data.products.totalCount})`
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Неизвестная ошибка';

        set({
          isLoading: false,
          error: errorMessage,
        });

        console.error('❌ Ошибка загрузки продуктов:', error);
      }
    },

    // Загрузка дополнительных продуктов (пагинация)
    loadMoreProducts: async (
      locale: string,
      section?: string,
      brandId?: number
    ) => {
      const { hasNextPage, endCursor, isLoading } = get();

      if (!hasNextPage || isLoading) {
        return;
      }

      await get().loadProducts(locale, section, brandId, false);
    },

    // Удаление продукта
    deleteProduct: async (productId: string, accessToken: string) => {
      const { deletingProductIds } = get();

      // Добавляем ID в список удаляемых
      set({
        deletingProductIds: new Set([...deletingProductIds, productId]),
      });

      try {
        await deleteProductAPI(productId, accessToken);

        // Убираем продукт из списка
        const { products } = get();
        const updatedProducts = products.filter((p) => p.id !== productId);

        set({
          products: updatedProducts,
          totalCount: get().totalCount - 1,
          deletingProductIds: new Set(
            [...deletingProductIds].filter((id) => id !== productId)
          ),
        });

        // Инвалидируем кеш Apollo Client чтобы публичная часть тоже обновилась
        try {
          await client.resetStore();
          console.log('🔄 Apollo Client кеш сброшен');
        } catch (cacheError) {
          console.warn('⚠️ Ошибка сброса кеша Apollo Client:', cacheError);
        }

        // Показываем уведомление об успехе
        get().showTemporaryMessage('🗑️ Продукт успешно удален из БД');

        console.log(`✅ Продукт ${productId} успешно удален из БД`);
      } catch (error) {
        // Убираем ID из списка удаляемых при ошибке
        set({
          deletingProductIds: new Set(
            [...deletingProductIds].filter((id) => id !== productId)
          ),
        });

        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка удаления';
        set({ error: errorMessage });

        console.error(`❌ Ошибка удаления продукта ${productId}:`, error);
      }
    },

    // Управление ошибками
    setError: (error: string) => {
      set({ error });
    },

    clearError: () => {
      set({ error: '' });
    },

    // Управление модальным окном удаления
    showDeleteConfirmation: (product: ProductListItem) => {
      set({
        showDeleteConfirm: true,
        productToDelete: product,
      });
    },

    hideDeleteConfirmation: () => {
      set({
        showDeleteConfirm: false,
        productToDelete: null,
      });
    },

    confirmDelete: async (accessToken: string) => {
      const { productToDelete } = get();

      if (productToDelete) {
        await get().deleteProduct(productToDelete.id, accessToken);
        get().hideDeleteConfirmation();
      }
    },

    // Временные сообщения
    showTemporaryMessage: (message: string, duration = 3000) => {
      set({ temporaryMessage: message, isShowingTempMessage: true });

      setTimeout(() => {
        const currentState = get();
        currentState.hideTemporaryMessage();
      }, duration);
    },

    hideTemporaryMessage: () => {
      set({ temporaryMessage: '', isShowingTempMessage: false });
    },
  }))
);

// ==================== ХУКИ ====================

export const useProducts = () =>
  useAdminProductsStore((state) => state.products);
export const useTotalCount = () =>
  useAdminProductsStore((state) => state.totalCount);
export const useHasNextPage = () =>
  useAdminProductsStore((state) => state.hasNextPage);
export const useIsLoading = () =>
  useAdminProductsStore((state) => state.isLoading);
export const useError = () => useAdminProductsStore((state) => state.error);

export const useDeletingProductIds = () =>
  useAdminProductsStore((state) => state.deletingProductIds);
export const useShowDeleteConfirm = () =>
  useAdminProductsStore((state) => state.showDeleteConfirm);
export const useProductToDelete = () =>
  useAdminProductsStore((state) => state.productToDelete);

export const useTemporaryMessage = () =>
  useAdminProductsStore((state) => state.temporaryMessage);
export const useIsShowingTempMessage = () =>
  useAdminProductsStore((state) => state.isShowingTempMessage);

export const useAdminProductsActions = () => {
  const store = useAdminProductsStore();

  return {
    loadProducts: store.loadProducts,
    loadMoreProducts: store.loadMoreProducts,
    deleteProduct: store.deleteProduct,
    setError: store.setError,
    clearError: store.clearError,
    showDeleteConfirmation: store.showDeleteConfirmation,
    hideDeleteConfirmation: store.hideDeleteConfirmation,
    confirmDelete: store.confirmDelete,
    showTemporaryMessage: store.showTemporaryMessage,
    hideTemporaryMessage: store.hideTemporaryMessage,
  };
};
