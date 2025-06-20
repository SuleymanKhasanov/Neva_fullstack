// frontend/src/features/ProductBasicInfo/model/useSelectors.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAdminApi } from '@/shared/hooks/useAdminApi';

export interface SelectOption {
  value: string;
  label: string;
  searchText: string;
}

interface SectionData {
  value: string;
  name: string;
}

interface CategoryData {
  id: number;
  name: string;
  section: string;
}

interface SubcategoryData {
  id: number;
  name: string;
  categoryId: number;
}

interface BrandData {
  id: number;
  name: string;
  section: string;
}

export const useSelectors = (
  selectedSection: string | null,
  selectedCategoryId: number | null,
  locale: string
) => {
  const [sectionsData, setSectionsData] = useState<SectionData[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [subcategoriesData, setSubcategoriesData] = useState<SubcategoryData[]>(
    []
  );
  const [brandsData, setBrandsData] = useState<BrandData[]>([]);

  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);

  const { adminApi, isAuthenticated } = useAdminApi();

  // Загрузка секций при инициализации
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadSections = async () => {
      setIsLoadingSections(true);
      try {
        // Пока используем статические данные, позже заменим на API
        const sections: SectionData[] = [
          { value: 'NEVA', name: 'NEVA' },
          { value: 'X_SOLUTION', name: 'X-Solution' },
        ];
        setSectionsData(sections);
      } catch (error) {
        console.error('Failed to load sections:', error);
      } finally {
        setIsLoadingSections(false);
      }
    };

    loadSections();
  }, [isAuthenticated]);

  // Загрузка категорий при выборе секции
  useEffect(() => {
    if (!selectedSection || !isAuthenticated) {
      setCategoriesData([]);
      return;
    }

    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await adminApi.get(
          `/admin/categories?section=${selectedSection}&locale=${locale}`
        );

        if (response.ok) {
          const data = await response.json();
          setCategoriesData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategoriesData([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [selectedSection, locale, isAuthenticated, adminApi]);

  // Загрузка подкатегорий при выборе категории
  useEffect(() => {
    if (!selectedCategoryId || !isAuthenticated) {
      setSubcategoriesData([]);
      return;
    }

    const loadSubcategories = async () => {
      setIsLoadingSubcategories(true);
      try {
        const response = await adminApi.get(
          `/admin/subcategories?categoryId=${selectedCategoryId}&locale=${locale}`
        );

        if (response.ok) {
          const data = await response.json();
          setSubcategoriesData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load subcategories:', error);
        setSubcategoriesData([]);
      } finally {
        setIsLoadingSubcategories(false);
      }
    };

    loadSubcategories();
  }, [selectedCategoryId, locale, isAuthenticated, adminApi]);

  // Загрузка брендов при выборе секции
  useEffect(() => {
    if (!selectedSection || !isAuthenticated) {
      setBrandsData([]);
      return;
    }

    const loadBrands = async () => {
      setIsLoadingBrands(true);
      try {
        const response = await adminApi.get(
          `/admin/brands?section=${selectedSection}&locale=${locale}`
        );

        if (response.ok) {
          const data = await response.json();
          setBrandsData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load brands:', error);
        setBrandsData([]);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    loadBrands();
  }, [selectedSection, locale, isAuthenticated, adminApi]);

  // Мемоизированные опции для селектов
  const sectionOptions: SelectOption[] = useMemo(
    () =>
      sectionsData.map((section) => ({
        value: section.value,
        label: section.name,
        searchText: section.name.toLowerCase(),
      })),
    [sectionsData]
  );

  const categoryOptions: SelectOption[] = useMemo(
    () =>
      categoriesData.map((category) => ({
        value: category.id.toString(),
        label: category.name,
        searchText: category.name.toLowerCase(),
      })),
    [categoriesData]
  );

  const subcategoryOptions: SelectOption[] = useMemo(
    () =>
      subcategoriesData.map((subcategory) => ({
        value: subcategory.id.toString(),
        label: subcategory.name,
        searchText: subcategory.name.toLowerCase(),
      })),
    [subcategoriesData]
  );

  const brandOptions: SelectOption[] = useMemo(
    () =>
      brandsData.map((brand) => ({
        value: brand.id.toString(),
        label: brand.name,
        searchText: brand.name.toLowerCase(),
      })),
    [brandsData]
  );

  return {
    sectionOptions,
    categoryOptions,
    subcategoryOptions,
    brandOptions,
    isLoadingSections,
    isLoadingCategories,
    isLoadingSubcategories,
    isLoadingBrands,
  };
};
