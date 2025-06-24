// frontend/src/app/[locale]/admin/dashboard/home/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { AdminRouteGuard } from '@/shared/components/AdminRouteGuard';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
import styles from './page.module.css';

// Типы для статистики (локальные, так как API может быть недоступно)
interface LocalSystemStats {
  products: {
    total: number;
    active: number;
    bySection: Record<string, number>;
  };
  categories: {
    total: number;
    active: number;
    bySection: Record<string, number>;
  };
  brands: {
    total: number;
    active: number;
    bySection: Record<string, number>;
  };
}

interface LocalCacheStats {
  connected: boolean;
  keyCount: number;
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  hitRate: number;
  operationsPerSecond: number;
}

// Компонент карточки статистики
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  isLoading = false,
}) => (
  <div className={styles.card}>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
    {isLoading ? (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <span>Загрузка...</span>
      </div>
    ) : (
      <div className={styles.cardStats}>
        <span className={styles.statsNumber}>{value}</span>
        {trend && (
          <span
            className={`${styles.trend} ${trend.isPositive ? styles.trendPositive : styles.trendNegative}`}
          >
            {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    )}
  </div>
);

// Компонент содержимого дашборда
const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const { adminApi, isAuthenticated } = useAdminApi();

  // Состояние для статистики
  const [systemStats, setSystemStats] = useState<LocalSystemStats | null>(null);
  const [cacheStats, setCacheStats] = useState<LocalCacheStats | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState<boolean>(false);

  // Флаги для предотвращения повторных загрузок
  const hasLoadedOnce = useRef<boolean>(false);
  const isLoadingRef = useRef<boolean>(false);

  // Mock данные для случаев когда API недоступно
  const getMockStats = (): {
    system: LocalSystemStats;
    cache: LocalCacheStats;
  } => ({
    system: {
      products: {
        total: 1234,
        active: 1156,
        bySection: { NEVA: 800, X_SOLUTION: 434 },
      },
      categories: {
        total: 42,
        active: 38,
        bySection: { NEVA: 25, X_SOLUTION: 17 },
      },
      brands: {
        total: 156,
        active: 142,
        bySection: { NEVA: 89, X_SOLUTION: 67 },
      },
    },
    cache: {
      connected: true,
      keyCount: 2547,
      memoryUsage: { used: 67108864, total: 134217728, percentage: 50 },
      hitRate: 0.94,
      operationsPerSecond: 125,
    },
  });

  // Проверка доступности API
  const checkApiHealth = async (): Promise<boolean> => {
    try {
      console.log('🔍 Checking API health...');

      // Создаем AbortController для timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 секунды

      try {
        // Простая проверка - пытаемся получить health check
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        const isHealthy = response.ok;
        console.log(
          `${isHealthy ? '✅' : '❌'} API health check:`,
          response.status
        );
        return isHealthy;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.log('❌ API health check failed:', error);
      return false;
    }
  };

  // Функция для получения текущего времени
  const getCurrentTime = (): string => {
    return new Date().toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Загрузка статистики с fallback
  useEffect(() => {
    // Предотвращаем повторные загрузки
    if (isLoadingRef.current) {
      console.log('⏩ Already loading, skipping...');
      return;
    }

    const loadStats = async (): Promise<void> => {
      isLoadingRef.current = true;

      try {
        console.log('📊 Loading dashboard statistics...');

        // Если данные уже были загружены, не показываем loader
        if (!hasLoadedOnce.current) {
          setIsInitialLoading(true);
        }
        setError(null);

        // Сначала проверяем доступность API
        const apiHealthy = await checkApiHealth();
        setApiAvailable(apiHealthy);

        if (!apiHealthy || !isAuthenticated) {
          console.log(
            '⚠️ API unavailable or user not authenticated, using mock data'
          );
          const mockData = getMockStats();
          setSystemStats(mockData.system);
          setCacheStats(mockData.cache);
          setError(
            apiHealthy ? null : 'API сервер недоступен. Показаны демо-данные.'
          );
          hasLoadedOnce.current = true;
          return;
        }

        // Пытаемся загрузить реальные данные только если API доступно
        console.log('🌐 Attempting to load real statistics...');

        const [systemResponse, cacheResponse] = await Promise.allSettled([
          adminApi.system.getStats(),
          adminApi.cache.getStats(),
        ]);

        let hasRealData = false;

        // Обрабатываем системную статистику
        if (
          systemResponse.status === 'fulfilled' &&
          systemResponse.value.success
        ) {
          console.log('✅ System stats loaded successfully');
          setSystemStats(systemResponse.value.data as LocalSystemStats);
          hasRealData = true;
        } else {
          console.log('⚠️ System stats failed, using mock data');
          setSystemStats(getMockStats().system);
        }

        // Обрабатываем статистику кеша
        if (
          cacheResponse.status === 'fulfilled' &&
          cacheResponse.value.success
        ) {
          console.log('✅ Cache stats loaded successfully');
          setCacheStats(cacheResponse.value.data as LocalCacheStats);
          hasRealData = true;
        } else {
          console.log('⚠️ Cache stats failed, using mock data');
          setCacheStats(getMockStats().cache);
        }

        // Если ни одного реального запроса не удалось - показываем предупреждение
        if (!hasRealData) {
          setError(
            'Не удалось загрузить актуальную статистику. Показаны демо-данные.'
          );
        }

        hasLoadedOnce.current = true;
      } catch (err) {
        console.error('💥 Error loading dashboard stats:', err);

        // В случае ошибки показываем mock данные
        const mockData = getMockStats();
        setSystemStats(mockData.system);
        setCacheStats(mockData.cache);
        setError('Ошибка загрузки данных. Показаны демо-данные.');
        hasLoadedOnce.current = true;
      } finally {
        setIsInitialLoading(false);
        isLoadingRef.current = false;
        console.log('🏁 Dashboard statistics loading completed');
      }
    };

    loadStats();
  }, [adminApi, isAuthenticated]); // Убираем лишние зависимости чтобы предотвратить лишние перезагрузки

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать в админ панель</h1>
        <p className={styles.subtitle}>
          Управляйте продуктами, категориями и системой
        </p>
      </div>

      <div className={styles.content}>
        {/* Карточка приветствия */}
        <div className={styles.welcomeCard}>
          <h2 className={styles.welcome}>Привет, {user?.username}! 👋</h2>
          <p className={styles.description}>
            Вы успешно авторизованы в админ панели. <br />
            {apiAvailable
              ? 'Система готова к работе и все компоненты функционируют нормально.'
              : 'Демонстрационный режим - API сервер недоступен.'}
          </p>
          <div className={styles.userInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Роль:</span>
              <span className={styles.infoValue}>{user?.role}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Время входа:</span>
              <span className={styles.infoValue}>{getCurrentTime()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Статус API:</span>
              <span className={styles.infoValue}>
                {isInitialLoading
                  ? '⏳ Проверка...'
                  : apiAvailable
                    ? '✅ Подключен'
                    : '⚠️ Недоступен'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Режим:</span>
              <span className={styles.infoValue}>
                {apiAvailable ? 'Продуктивный' : 'Демонстрационный'}
              </span>
            </div>
          </div>
        </div>

        {/* Сетка статистики */}
        <div className={styles.grid}>
          {/* Продукты */}
          <StatCard
            title="Продукты"
            value={systemStats?.products.total || 0}
            description={`Активных: ${systemStats?.products.active || 0}`}
            isLoading={isInitialLoading && !systemStats}
          />

          {/* Категории */}
          <StatCard
            title="Категории"
            value={systemStats?.categories.total || 0}
            description={`Активных: ${systemStats?.categories.active || 0}`}
            isLoading={isInitialLoading && !systemStats}
          />

          {/* Бренды */}
          <StatCard
            title="Бренды"
            value={systemStats?.brands.total || 0}
            description={`Активных: ${systemStats?.brands.active || 0}`}
            isLoading={isInitialLoading && !systemStats}
          />

          {/* Кеш */}
          <StatCard
            title="Кеш"
            value={
              cacheStats?.hitRate
                ? `${Math.round(cacheStats.hitRate * 100)}%`
                : 'N/A'
            }
            description={
              cacheStats?.connected
                ? 'Подключен и работает'
                : 'Проверка соединения...'
            }
            isLoading={isInitialLoading && !cacheStats}
          />
        </div>

        {/* Детальная информация о кеше */}
        {cacheStats && (
          <div className={styles.cacheDetails}>
            <h3 className={styles.sectionTitle}>
              Состояние кеша {!apiAvailable && '(демо-данные)'}
            </h3>
            <div className={styles.cacheGrid}>
              <div className={styles.cacheItem}>
                <span className={styles.cacheLabel}>Статус:</span>
                <span className={styles.cacheValue}>
                  {cacheStats.connected ? '🟢 Подключен' : '🔴 Отключен'}
                </span>
              </div>
              <div className={styles.cacheItem}>
                <span className={styles.cacheLabel}>Ключей в кеше:</span>
                <span className={styles.cacheValue}>
                  {cacheStats.keyCount.toLocaleString()}
                </span>
              </div>
              <div className={styles.cacheItem}>
                <span className={styles.cacheLabel}>Использование памяти:</span>
                <span className={styles.cacheValue}>
                  {Math.round(cacheStats.memoryUsage.percentage)}% (
                  {(cacheStats.memoryUsage.used / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <div className={styles.cacheItem}>
                <span className={styles.cacheLabel}>Hit Rate:</span>
                <span className={styles.cacheValue}>
                  {Math.round(cacheStats.hitRate * 100)}%
                </span>
              </div>
              <div className={styles.cacheItem}>
                <span className={styles.cacheLabel}>Операций/сек:</span>
                <span className={styles.cacheValue}>
                  {cacheStats.operationsPerSecond}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Уведомления и ошибки */}
        {error && (
          <div className={styles.warningCard}>
            <h3>⚠️ Уведомление</h3>
            <p>{error}</p>
            {!apiAvailable && (
              <div className={styles.troubleshooting}>
                <h4>Возможные причины:</h4>
                <ul>
                  <li>Бекенд сервер не запущен (проверьте порт 3000)</li>
                  <li>Проблемы с сетевым соединением</li>
                  <li>CORS политика блокирует запросы</li>
                  <li>Неверная конфигурация URL API</li>
                </ul>
                <p>
                  <strong>Текущий API URL:</strong>{' '}
                  {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Информация в демо режиме */}
        {!apiAvailable && !error && (
          <div className={styles.demoCard}>
            <h3>📋 Демонстрационный режим</h3>
            <p>
              Администраторская панель работает в демо режиме с примерными
              данными. Для полной функциональности убедитесь что бекенд сервер
              запущен.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Главный компонент страницы с защитой маршрута
const AdminDashboardHomePage: React.FC = () => {
  return (
    <AdminRouteGuard redirectTo="admin">
      <DashboardContent />
    </AdminRouteGuard>
  );
};

export default AdminDashboardHomePage;
