// frontend/src/pages/AdminHomePage/lib/hooks/useAdminHomeData.ts
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

  // ✅ ФУНКЦИЯ загрузки только реальных данных с бекенда
  const loadStats = useCallback(async () => {
    if (!isAuthenticated) {
      console.log('❌ User not authenticated');
      setStats({
        products: 0,
        categories: 0,
        subcategories: 0,
        brands: 0,
      });
      setIsLoading(false);
      setError('Пользователь не авторизован');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('📊 Loading admin stats from backend...');

      // Загружаем реальные данные с бекенда
      const systemResponse = await adminApi.system.getStats();

      if (systemResponse.success && systemResponse.data) {
        console.log('✅ Real stats loaded from backend:', systemResponse.data);
        const data = systemResponse.data;
        setStats({
          products: data?.products || 0,
          categories: data?.categories || 0,
          subcategories: data?.subcategories || 0,
          brands: data?.brands || 0,
        });
        setError(null);
      } else {
        console.log('⚠️ API failed:', systemResponse.error);
        // При ошибке API показываем пустые данные
        setStats({
          products: 0,
          categories: 0,
          subcategories: 0,
          brands: 0,
        });
        setError(
          `Не удалось загрузить данные: ${systemResponse.error || 'Неизвестная ошибка'}`
        );
      }
    } catch (err) {
      console.error('💥 Error loading admin home stats:', err);
      // При любой ошибке показываем пустые данные
      setStats({
        products: 0,
        categories: 0,
        subcategories: 0,
        brands: 0,
      });
      setError('Ошибка загрузки данных с сервера');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // ✅ Убрали adminApi из зависимостей!

  // ✅ КОНТРОЛИРУЕМЫЙ useEffect с четкими зависимостями
  useEffect(() => {
    let mounted = true;

    const runLoadStats = async () => {
      if (mounted) {
        await loadStats();
      }
    };

    runLoadStats();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]); // ✅ Только isAuthenticated!

  // ✅ ФУНКЦИЯ refetch для повторной загрузки
  const refetch = useCallback(async () => {
    console.log('🔄 Manual refetch triggered');
    await loadStats();
  }, [loadStats]);

  return {
    stats,
    isLoading,
    error,
    refetch,
  };
};
