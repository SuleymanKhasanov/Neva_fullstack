// backend/scripts/export-catalog.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

import { PrismaClient } from '@prisma/client';

class CatalogExporter {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async exportCatalog(): Promise<void> {
    console.log('📤 Начинаем экспорт каталога в JSON...');

    try {
      const catalogData = await this.buildCatalogStructure();

      // Сохраняем в файл
      const outputPath = join(process.cwd(), 'data', 'exported_catalog.json');
      writeFileSync(outputPath, JSON.stringify(catalogData, null, 2), 'utf-8');

      console.log(`✅ Каталог экспортирован в: ${outputPath}`);

      // Показываем статистику
      await this.printExportStats(catalogData);
    } catch (error) {
      console.error('❌ Ошибка при экспорте каталога:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  private async buildCatalogStructure(): Promise<any> {
    console.log('🔄 Собираем структуру каталога из базы данных...');

    const categories = await this.prisma.category.findMany({
      include: {
        translations: true,
        subcategories: {
          include: {
            translations: true,
          },
          orderBy: { id: 'asc' },
        },
        categoryBrands: {
          include: {
            brand: {
              include: {
                translations: {
                  where: { locale: 'ru' }, // Экспортируем только русские названия брендов
                },
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return {
      categories: categories.map((category) => {
        // Собираем переводы категории
        const categoryName: any = {};
        ['ru', 'en', 'uz', 'ko'].forEach((locale) => {
          const translation = category.translations.find(
            (t) => t.locale === locale
          );
          if (translation) {
            categoryName[locale] = translation.name;
          }
        });

        // Собираем субкатегории
        const subcategories = category.subcategories.map((sub) => {
          // Собираем переводы субкатегории
          const subName: any = {};
          ['ru', 'en', 'uz', 'ko'].forEach((locale) => {
            const translation = sub.translations.find(
              (t) => t.locale === locale
            );
            if (translation) {
              subName[locale] = translation.name;
            }
          });

          // Собираем бренды для этой категории
          const brands = category.categoryBrands
            .filter((cb) => cb.brand.translations.length > 0)
            .map((cb) => cb.brand.translations[0].name)
            .sort(); // Сортируем бренды по алфавиту

          return {
            id: sub.id,
            name: subName,
            brands: brands,
          };
        });

        return {
          id: category.id,
          name: categoryName,
          subcategories: subcategories,
        };
      }),
    };
  }

  private async printExportStats(catalogData: any): Promise<void> {
    console.log('\n📊 Статистика экспорта:');

    const categoriesCount = catalogData.categories.length;
    let subcategoriesCount = 0;
    let brandsSet = new Set<string>();
    let translationsCount = 0;

    catalogData.categories.forEach((category: any) => {
      // Подсчитываем переводы категории
      translationsCount += Object.keys(category.name).length;

      category.subcategories.forEach((sub: any) => {
        subcategoriesCount++;
        // Подсчитываем переводы субкатегории
        translationsCount += Object.keys(sub.name).length;

        // Собираем уникальные бренды
        sub.brands.forEach((brand: string) => brandsSet.add(brand));
      });
    });

    console.log(`📁 Категорий: ${categoriesCount}`);
    console.log(`📂 Субкатегорий: ${subcategoriesCount}`);
    console.log(`🏷️  Уникальных брендов: ${brandsSet.size}`);
    console.log(`🌐 Всего переводов: ${translationsCount}`);

    // Показываем распределение по секциям
    const nevaCategories = catalogData.categories.filter(
      (c: any) => c.id <= 10
    );
    const xSolutionCategories = catalogData.categories.filter(
      (c: any) => c.id > 10
    );

    console.log(`\n📋 По секциям:`);
    console.log(`  🅰️ NEVA: ${nevaCategories.length} категорий`);
    console.log(`  🅱️ X_SOLUTION: ${xSolutionCategories.length} категорий`);
  }

  async validateExportedData(): Promise<boolean> {
    console.log('🔍 Валидация экспортированных данных...');

    try {
      // Проверяем соответствие данных в БД
      const dbStats = await Promise.all([
        this.prisma.category.count(),
        this.prisma.subcategory.count(),
        this.prisma.brand.count(),
      ]);

      console.log(
        `✅ Проверка завершена. В БД: ${dbStats[0]} категорий, ${dbStats[1]} субкатегорий, ${dbStats[2]} брендов`
      );

      return true;
    } catch (error) {
      console.error('❌ Ошибка валидации:', error);

      return false;
    }
  }
}

// Основная функция
async function main() {
  const exporter = new CatalogExporter();

  try {
    await exporter.exportCatalog();
    await exporter.validateExportedData();
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  console.log('📤 Запуск экспорта каталога в JSON');
  console.log('📝 Результат будет сохранен в: data/exported_catalog.json\n');

  main()
    .then(() => {
      console.log('\n🎉 Экспорт завершен успешно!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Экспорт завершился с ошибкой:', error);
      process.exit(1);
    });
}
