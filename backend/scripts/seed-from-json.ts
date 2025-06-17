// backend/scripts/seed-from-json.ts
import * as fs from 'fs';
import * as path from 'path';

import { PrismaClient, Section, Locale } from '../generated/prisma/client';

const prisma = new PrismaClient();

// Интерфейсы для JSON структуры
interface CategoryName {
  ru: string;
  en: string;
  uz: string;
  ko: string;
}

interface SubcategoryJson {
  id: number;
  name: CategoryName;
  brands: string[];
}

interface CategoryJson {
  id: number;
  name: CategoryName;
  subcategories: SubcategoryJson[];
}

interface CatalogData {
  categories: CategoryJson[];
}

// Маппинг локалей из JSON в Prisma enum
const localeMapping: Record<string, Locale> = {
  ru: Locale.ru,
  en: Locale.en,
  uz: Locale.uz,
  ko: Locale.kr, // В JSON 'ko', в Prisma 'kr'
};

async function loadJsonData(): Promise<CatalogData> {
  try {
    const jsonPath = path.join(__dirname, '..', '..', 'catalog_json.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const data: CatalogData = JSON.parse(jsonContent);

    console.log(`📁 JSON файл загружен: ${data.categories.length} категорий`);

    return data;
  } catch (error) {
    console.error('❌ Ошибка чтения JSON файла:', error);
    throw error;
  }
}

async function clearExistingData(): Promise<void> {
  console.log('🧹 Очистка существующих данных...');

  try {
    // Удаляем в правильном порядке (учитывая foreign keys)
    await prisma.subcategoryBrand.deleteMany();
    await prisma.productSpecificationTranslation.deleteMany();
    await prisma.productSpecification.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productTranslation.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subcategoryTranslation.deleteMany();
    await prisma.subcategory.deleteMany();
    await prisma.categoryBrand.deleteMany();
    await prisma.categoryTranslation.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brandTranslation.deleteMany();
    await prisma.brand.deleteMany();

    console.log('✅ Данные очищены');
  } catch (error) {
    console.error('❌ Ошибка очистки данных:', error);
    throw error;
  }
}

async function createCategories(
  catalogData: CatalogData
): Promise<Map<number, number>> {
  console.log('📁 Создание категорий...');
  const categoryIdMap = new Map<number, number>(); // JSON ID -> DB ID

  for (const categoryJson of catalogData.categories) {
    try {
      const category = await prisma.category.create({
        data: {
          section: Section.NEVA, // По умолчанию NEVA, можно настроить
          translations: {
            create: Object.entries(categoryJson.name)
              .map(([locale, name]) => ({
                locale: localeMapping[locale],
                name: name.trim(),
              }))
              .filter((t) => t.locale), // Фильтруем только валидные локали
          },
        },
      });

      categoryIdMap.set(categoryJson.id, category.id);
      console.log(
        `✅ Категория создана: ${categoryJson.name.ru} (JSON ID: ${categoryJson.id} -> DB ID: ${category.id})`
      );
    } catch (error) {
      console.error(
        `❌ Ошибка создания категории ${categoryJson.name.ru}:`,
        error
      );
    }
  }

  return categoryIdMap;
}

async function createSubcategories(
  catalogData: CatalogData,
  categoryIdMap: Map<number, number>
): Promise<Map<number, number>> {
  console.log('📂 Создание субкатегорий...');
  const subcategoryIdMap = new Map<number, number>(); // JSON ID -> DB ID

  for (const categoryJson of catalogData.categories) {
    const categoryDbId = categoryIdMap.get(categoryJson.id);
    if (!categoryDbId) {
      console.warn(`⚠️ Категория с JSON ID ${categoryJson.id} не найдена`);
      continue;
    }

    for (const subcategoryJson of categoryJson.subcategories) {
      try {
        const subcategory = await prisma.subcategory.create({
          data: {
            categoryId: categoryDbId,
            translations: {
              create: Object.entries(subcategoryJson.name)
                .map(([locale, name]) => ({
                  locale: localeMapping[locale],
                  name: name.trim(),
                }))
                .filter((t) => t.locale),
            },
          },
        });

        subcategoryIdMap.set(subcategoryJson.id, subcategory.id);
        console.log(
          `✅ Субкатегория создана: ${subcategoryJson.name.ru} (JSON ID: ${subcategoryJson.id} -> DB ID: ${subcategory.id})`
        );
      } catch (error) {
        console.error(
          `❌ Ошибка создания субкатегории ${subcategoryJson.name.ru}:`,
          error
        );
      }
    }
  }

  return subcategoryIdMap;
}

async function createBrands(
  catalogData: CatalogData
): Promise<Map<string, number>> {
  console.log('🏷️ Создание брендов...');
  const brandNameToIdMap = new Map<string, number>(); // Brand name -> DB ID

  // Собираем все уникальные бренды
  const allBrands = new Set<string>();
  for (const categoryJson of catalogData.categories) {
    for (const subcategoryJson of categoryJson.subcategories) {
      subcategoryJson.brands.forEach((brand) => {
        if (brand && brand.trim()) {
          allBrands.add(brand.trim());
        }
      });
    }
  }

  console.log(`📊 Найдено ${allBrands.size} уникальных брендов`);

  for (const brandName of allBrands) {
    try {
      const brand = await prisma.brand.create({
        data: {
          translations: {
            create: [
              { locale: Locale.ru, name: brandName },
              { locale: Locale.en, name: brandName },
              { locale: Locale.uz, name: brandName },
              { locale: Locale.kr, name: brandName },
            ],
          },
        },
      });

      brandNameToIdMap.set(brandName, brand.id);
      console.log(`✅ Бренд создан: ${brandName} (DB ID: ${brand.id})`);
    } catch (error) {
      console.error(`❌ Ошибка создания бренда ${brandName}:`, error);
    }
  }

  return brandNameToIdMap;
}

async function createSubcategoryBrandRelations(
  catalogData: CatalogData,
  subcategoryIdMap: Map<number, number>,
  brandNameToIdMap: Map<string, number>
): Promise<void> {
  console.log('🔗 Создание связей субкатегория-бренд...');
  let relationsCreated = 0;

  for (const categoryJson of catalogData.categories) {
    for (const subcategoryJson of categoryJson.subcategories) {
      const subcategoryDbId = subcategoryIdMap.get(subcategoryJson.id);
      if (!subcategoryDbId) {
        console.warn(
          `⚠️ Субкатегория с JSON ID ${subcategoryJson.id} не найдена`
        );
        continue;
      }

      for (const brandName of subcategoryJson.brands) {
        if (!brandName || !brandName.trim()) continue;

        const brandDbId = brandNameToIdMap.get(brandName.trim());
        if (!brandDbId) {
          console.warn(`⚠️ Бренд ${brandName} не найден`);
          continue;
        }

        try {
          await prisma.subcategoryBrand.create({
            data: {
              subcategoryId: subcategoryDbId,
              brandId: brandDbId,
            },
          });
          relationsCreated++;
        } catch (error) {
          console.error(
            `❌ Ошибка создания связи субкатегория-бренд (${subcategoryJson.name.ru} - ${brandName}):`,
            error
          );
        }
      }
    }
  }

  console.log(`✅ Создано ${relationsCreated} связей субкатегория-бренд`);
}

async function seedFromJson(): Promise<void> {
  console.log('🌱 Начинаем загрузку данных из JSON...');
  console.log('=====================================');

  try {
    // 1. Загружаем JSON данные
    const catalogData = await loadJsonData();

    // 2. Очищаем существующие данные
    await clearExistingData();

    // 3. Создаем категории
    const categoryIdMap = await createCategories(catalogData);

    // 4. Создаем субкатегории
    const subcategoryIdMap = await createSubcategories(
      catalogData,
      categoryIdMap
    );

    // 5. Создаем бренды
    const brandNameToIdMap = await createBrands(catalogData);

    // 6. Создаем связи субкатегория-бренд
    await createSubcategoryBrandRelations(
      catalogData,
      subcategoryIdMap,
      brandNameToIdMap
    );

    console.log('');
    console.log('🎉 Загрузка данных завершена успешно!');
    console.log('=====================================');
    console.log('📊 Статистика:');
    console.log(`   - Категорий: ${categoryIdMap.size}`);
    console.log(`   - Субкатегорий: ${subcategoryIdMap.size}`);
    console.log(`   - Брендов: ${brandNameToIdMap.size}`);

    // Проверим что данные действительно созданы
    const [categoriesCount, subcategoriesCount, brandsCount, relationsCount] =
      await Promise.all([
        prisma.category.count(),
        prisma.subcategory.count(),
        prisma.brand.count(),
        prisma.subcategoryBrand.count(),
      ]);

    console.log('');
    console.log('✅ Проверка в БД:');
    console.log(`   - Категорий в БД: ${categoriesCount}`);
    console.log(`   - Субкатегорий в БД: ${subcategoriesCount}`);
    console.log(`   - Брендов в БД: ${brandsCount}`);
    console.log(`   - Связей в БД: ${relationsCount}`);
  } catch (error) {
    console.error('❌ Ошибка при загрузке данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск только если скрипт вызван напрямую
if (require.main === module) {
  seedFromJson().catch((error) => {
    console.error('💥 Критическая ошибка:', error);
    process.exit(1);
  });
}

export { seedFromJson };
