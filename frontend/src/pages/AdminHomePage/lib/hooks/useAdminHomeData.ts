'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAdminApi } from '@/shared/hooks/useAdminApi';
import { AdminHomeStats } from '../../types';

interface UseAdminHomeDataReturn {
  stats: AdminHomeStats;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAdminHomeData = (): UseAdminHomeDataReturn => {
  const { adminApi, isAuthenticated } = useAdminApi();

  const [stats, setStats] = useState<AdminHomeStats>({
    products: 0,
    categories: 0,
    subcategories: 0,
    brands: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Мок данные для демонстрации
  const getMockStats = useCallback(
    (): AdminHomeStats => ({
      products: 342,
      categories: 12,
      subcategories: 48,
      brands: 15,
    }),
    []
  );

  const loadStats = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Параллельная загрузка статистики
      const [systemResponse] = await Promise.allSettled([
        adminApi.system.getStats(),
      ]);

      if (
        systemResponse.status === 'fulfilled' &&
        systemResponse.value.success
      ) {
        const data = systemResponse.value.data;
        setStats({
          products: data?.products || 0,
          categories: data?.categories || 0,
          subcategories: data?.subcategories || 0,
          brands: data?.brands || 0,
        });
      } else {
        // Показываем мок данные если API недоступно
        setStats(getMockStats());
        setError('Показаны демо-данные');
      }
    } catch (err) {
      console.error('Error loading admin home stats:', err);
      setStats(getMockStats());
      setError('Показаны демо-данные');
    } finally {
      setIsLoading(false);
    }
  }, [adminApi, isAuthenticated, getMockStats]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refetch = useCallback(async () => {
    await loadStats();
  }, [loadStats]);

  return {
    stats,
    isLoading,
    error,
    refetch,
  };
};
