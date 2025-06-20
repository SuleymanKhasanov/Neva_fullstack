// frontend/src/features/ProductBasicInfo/model/useSelectors.ts
'use client';

import { useState, useEffect, useMemo } from 'react';

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

  // ✅ ИСПРАВЛЕНИЕ: Загрузка секций - только один раз при монтировании
  useEffect(() => {
    console.log('🔍 Loading sections...');
    setIsLoadingSections(true);

    try {
      // Пока используем статические данные
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
  }, []); // ✅ Пустой массив зависимостей - выполняется только при монтировании

  // ✅ ИСПРАВЛЕНИЕ: Загрузка категорий - только при изменении секции
  useEffect(() => {
    if (!selectedSection) {
      console.log('🔍 No section selected, clearing categories');
      setCategoriesData([]);
      return;
    }

    console.log('🔍 Loading categories for section:', selectedSection);
    setIsLoadingCategories(true);

    // Имитируем API запрос с задержкой
    const loadCategories = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация загрузки

        // Моковые данные для демонстрации
        const mockCategories: CategoryData[] = [
          { id: 1, name: 'Серверы', section: selectedSection },
          { id: 2, name: 'Сетевое оборудование', section: selectedSection },
          { id: 3, name: 'Системы хранения', section: selectedSection },
        ];

        setCategoriesData(mockCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategoriesData([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [selectedSection]); // ✅ Зависит только от selectedSection

  // ✅ ИСПРАВЛЕНИЕ: Загрузка подкатегорий - только при изменении категории
  useEffect(() => {
    if (!selectedCategoryId) {
      console.log('🔍 No category selected, clearing subcategories');
      setSubcategoriesData([]);
      return;
    }

    console.log('🔍 Loading subcategories for category:', selectedCategoryId);
    setIsLoadingSubcategories(true);

    const loadSubcategories = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Моковые данные
        const mockSubcategories: SubcategoryData[] = [
          { id: 1, name: 'Rack серверы', categoryId: selectedCategoryId },
          { id: 2, name: 'Blade серверы', categoryId: selectedCategoryId },
        ];

        setSubcategoriesData(mockSubcategories);
      } catch (error) {
        console.error('Failed to load subcategories:', error);
        setSubcategoriesData([]);
      } finally {
        setIsLoadingSubcategories(false);
      }
    };

    loadSubcategories();
  }, [selectedCategoryId]); // ✅ Зависит только от selectedCategoryId

  // ✅ ИСПРАВЛЕНИЕ: Загрузка брендов - только при изменении секции
  useEffect(() => {
    if (!selectedSection) {
      console.log('🔍 No section selected, clearing brands');
      setBrandsData([]);
      return;
    }

    console.log('🔍 Loading brands for section:', selectedSection);
    setIsLoadingBrands(true);

    const loadBrands = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Моковые данные
        const mockBrands: BrandData[] = [
          { id: 1, name: 'Dell', section: selectedSection },
          { id: 2, name: 'HP', section: selectedSection },
          { id: 3, name: 'Cisco', section: selectedSection },
          { id: 4, name: 'Lenovo', section: selectedSection },
        ];

        setBrandsData(mockBrands);
      } catch (error) {
        console.error('Failed to load brands:', error);
        setBrandsData([]);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    loadBrands();
  }, [selectedSection]); // ✅ Зависит только от selectedSection

  // ✅ ИСПРАВЛЕНИЕ: Мемоизированные опции для селекторов
  const sectionOptions = useMemo(
    () =>
      sectionsData.map((section) => ({
        value: section.value,
        label: section.name,
        searchText: section.name.toLowerCase(),
      })),
    [sectionsData]
  );

  const categoryOptions = useMemo(
    () =>
      categoriesData.map((category) => ({
        value: category.id.toString(),
        label: category.name,
        searchText: category.name.toLowerCase(),
      })),
    [categoriesData]
  );

  const subcategoryOptions = useMemo(
    () =>
      subcategoriesData.map((subcategory) => ({
        value: subcategory.id.toString(),
        label: subcategory.name,
        searchText: subcategory.name.toLowerCase(),
      })),
    [subcategoriesData]
  );

  const brandOptions = useMemo(
    () =>
      brandsData.map((brand) => ({
        value: brand.id.toString(),
        label: brand.name,
        searchText: brand.name.toLowerCase(),
      })),
    [brandsData]
  );

  console.log('🔍 useSelectors state:', {
    sectionsCount: sectionsData.length,
    categoriesCount: categoriesData.length,
    subcategoriesCount: subcategoriesData.length,
    brandsCount: brandsData.length,
    selectedSection,
    selectedCategoryId,
  });

  return {
    // Опции для селекторов
    sectionOptions,
    categoryOptions,
    subcategoryOptions,
    brandOptions,

    // Состояния загрузки
    isLoadingSections,
    isLoadingCategories,
    isLoadingSubcategories,
    isLoadingBrands,

    // Сырые данные (если нужны)
    sectionsData,
    categoriesData,
    subcategoriesData,
    brandsData,
  };
};
