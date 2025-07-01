import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ProductListItem } from '@/shared/types/product';

// ==================== ТИПЫ ====================

interface ProductsListResponse {
  products: ProductListItem[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
}

interface AdminProductsState {
  // Состояние данных
  products: ProductListItem[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
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
  loadProducts: (page: number, section?: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setError: (error: string) => void;
  clearError: () => void;

  // Управление модальным окном удаления
  showDeleteConfirmation: (product: ProductListItem) => void;
  hideDeleteConfirmation: () => void;
  confirmDelete: () => Promise<void>;

  // Временные сообщения
  showTemporaryMessage: (message: string, duration?: number) => void;
  hideTemporaryMessage: () => void;
}

// ==================== МОКОВЫЕ ДАННЫЕ ====================

const mockProducts: ProductListItem[] = [
  {
    id: '1',
    name: 'IP-телефон Grandstream GXP2140',
    description:
      'Корпоративный IP-телефон с 4-строчным дисплеем и поддержкой 4 SIP аккаунтов',
    image: '/images/product-1-small.jpg',
    brand: { id: 1, name: 'Grandstream' },
  },
  {
    id: '2',
    name: 'IP-камера Hikvision DS-2CD2143G0-I',
    description: 'Купольная IP-камера 4MP с ИК-подсветкой до 30м',
    image: '/images/product-2-small.jpg',
    brand: { id: 2, name: 'Hikvision' },
  },
  {
    id: '3',
    name: 'Коммутатор TP-Link TL-SG1008D',
    description: '8-портовый гигабитный коммутатор для малого бизнеса',
    image: '/images/product-3-small.jpg',
    brand: { id: 3, name: 'TP-Link' },
  },
];

// Создаем больше продуктов для демо
const generateMockProducts = (count: number): ProductListItem[] => {
  const products: ProductListItem[] = [];
  const brands = [
    'Grandstream',
    'Hikvision',
    'TP-Link',
    'Ubiquiti',
    'MikroTik',
    'Cisco',
  ];
  const categories = [
    'IP-телефоны',
    'IP-камеры',
    'Коммутаторы',
    'Роутеры',
    'Точки доступа',
  ];

  for (let i = 4; i <= count + 3; i++) {
    const brand = brands[i % brands.length];
    const category = categories[i % categories.length];

    products.push({
      id: String(i),
      name: `${brand} Model-${i}XX`,
      description: `Описание продукта ${i} для категории ${category}`,
      image: `/images/product-${i}-small.jpg`,
      brand: { id: i, name: brand },
    });
  }

  return [...mockProducts, ...products];
};

const allMockProducts = generateMockProducts(50); // Генерируем 50+ продуктов

// ==================== МОКОВЫЕ API ФУНКЦИИ ====================

const fetchProductsListMock = async (
  page: number,
  section?: string
): Promise<ProductsListResponse> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const limit = 12;
  const offset = (page - 1) * limit;

  // Фильтрация по секции, если указана
  let filteredProducts = allMockProducts;
  if (section) {
    filteredProducts = allMockProducts.filter((p) => p.section === section);
  }

  const products = filteredProducts.slice(offset, offset + limit);
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    totalPages,
    totalProducts,
    currentPage: page,
  };
};

const deleteProductApiMock = async (productId: string): Promise<void> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Имитируем случайную ошибку в 10% случаев
  if (Math.random() < 0.1) {
    throw new Error('Ошибка удаления продукта (случайная ошибка для демо)');
  }

  // Удаляем продукт из моковых данных
  const index = allMockProducts.findIndex((p) => p.id === productId);
  if (index !== -1) {
    allMockProducts.splice(index, 1);
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
        const data = await fetchProductsListMock(page, section);

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
    deleteProduct: async (productId: string) => {
      const { deletingProductIds } = get();

      // Добавляем ID в список удаляемых
      set({
        deletingProductIds: new Set([...deletingProductIds, productId]),
      });

      try {
        await deleteProductApiMock(productId);

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
