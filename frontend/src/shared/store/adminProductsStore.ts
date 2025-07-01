import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ProductDetail } from '@/shared/types/product';

// ==================== ТИПЫ ====================

interface ProductsListResponse {
  products: ProductDetail[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
}

interface AdminProductsState {
  // Состояние данных
  products: ProductDetail[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
  isLoading: boolean;
  error: string;

  // Состояние удаления
  deletingProductIds: Set<number>;
  showDeleteConfirm: boolean;
  productToDelete: ProductDetail | null;

  // Временные сообщения
  temporaryMessage: string;
  isShowingTempMessage: boolean;

  // Действия
  loadProducts: (page: number, section?: string) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setError: (error: string) => void;
  clearError: () => void;

  // Управление модальным окном удаления
  showDeleteConfirmation: (product: ProductDetail) => void;
  hideDeleteConfirmation: () => void;
  confirmDelete: () => Promise<void>;

  // Временные сообщения
  showTemporaryMessage: (message: string, duration?: number) => void;
  hideTemporaryMessage: () => void;
}

// ==================== API ФУНКЦИИ ====================

const fetchProductsList = async (
  page: number,
  section?: string
): Promise<ProductsListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '12', // Как на публичной странице
  });

  if (section) {
    params.append('section', section);
  }

  // Временно используем бэкенд напрямую
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  const response = await fetch(`${backendUrl}/api/admin/products?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // TODO: Добавить авторизацию
      // 'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки продуктов: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Неизвестная ошибка');
  }

  return data.data;
};

const deleteProductApi = async (productId: number): Promise<void> => {
  // Временно используем бэкенд напрямую
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  const response = await fetch(
    `${backendUrl}/api/admin/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Добавить авторизацию
        // 'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Ошибка удаления продукта: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Неизвестная ошибка удаления');
  }
};

// ==================== ZUSTAND STORE ====================

export const useAdminProductsStore = create<AdminProductsState>()(
  subscribeWithSelector((set, get) => ({
    // Начальное состояние
    products: [],
    totalPages: 0,
    totalProducts: 0,
    currentPage: 1,
    isLoading: false,
    error: '',

    deletingProductIds: new Set(),
    showDeleteConfirm: false,
    productToDelete: null,

    temporaryMessage: '',
    isShowingTempMessage: false,

    // Загрузка продуктов
    loadProducts: async (page: number, section?: string) => {
      set({ isLoading: true, error: '' });

      try {
        const data = await fetchProductsList(page, section);

        set({
          products: data.products,
          totalPages: data.totalPages,
          totalProducts: data.totalProducts,
          currentPage: data.currentPage,
          isLoading: false,
        });

        console.log(
          `✅ Загружено ${data.products.length} продуктов (страница ${page})`
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

    // Удаление продукта
    deleteProduct: async (productId: number) => {
      const { deletingProductIds } = get();

      // Добавляем ID в список удаляемых
      set({
        deletingProductIds: new Set([...deletingProductIds, productId]),
      });

      try {
        await deleteProductApi(productId);

        // Убираем продукт из списка
        const { products } = get();
        const updatedProducts = products.filter((p) => p.id !== productId);

        set({
          products: updatedProducts,
          deletingProductIds: new Set(
            [...deletingProductIds].filter((id) => id !== productId)
          ),
        });

        // Показываем уведомление об успехе
        get().showTemporaryMessage('🗑️ Продукт успешно удален');

        console.log(`✅ Продукт ${productId} успешно удален`);
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

    // Установка текущей страницы
    setCurrentPage: (page: number) => {
      set({ currentPage: page });
    },

    // Управление ошибками
    setError: (error: string) => {
      set({ error });
    },

    clearError: () => {
      set({ error: '' });
    },

    // Управление модальным окном удаления
    showDeleteConfirmation: (product: ProductDetail) => {
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

    confirmDelete: async () => {
      const { productToDelete } = get();

      if (productToDelete) {
        await get().deleteProduct(productToDelete.id);
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
export const useTotalPages = () =>
  useAdminProductsStore((state) => state.totalPages);
export const useTotalProducts = () =>
  useAdminProductsStore((state) => state.totalProducts);
export const useCurrentPage = () =>
  useAdminProductsStore((state) => state.currentPage);
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
    deleteProduct: store.deleteProduct,
    setCurrentPage: store.setCurrentPage,
    setError: store.setError,
    clearError: store.clearError,
    showDeleteConfirmation: store.showDeleteConfirmation,
    hideDeleteConfirmation: store.hideDeleteConfirmation,
    confirmDelete: store.confirmDelete,
    showTemporaryMessage: store.showTemporaryMessage,
    hideTemporaryMessage: store.hideTemporaryMessage,
  };
};
