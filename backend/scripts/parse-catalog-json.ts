// backend/scripts/parse-catalog-json.ts
import { readFileSync } from 'fs';
import { join } from 'path';

import { PrismaClient, Section, Locale } from '@prisma/client';

interface CatalogData {
  categories: {
    id: number;
    name: {
      ru: string;
      en: string;
      uz: string;
      ko: string;
    };
    subcategories: {
      id: number;
      name: {
        ru: string;
        en: string;
        uz: string;
        ko: string;
      };
      brands: string[];
    }[];
  }[];
}

class CatalogParser {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async parseCatalog(): Promise<void> {
    console.log('🔄 Начинаем парсинг каталога из JSON...');

    try {
      // Читаем JSON файл
      const filePath = join(process.cwd(), 'data', 'catalog_json.json');
      const jsonData = readFileSync(filePath, 'utf-8');
      const catalogData: CatalogData = JSON.parse(jsonData);

      console.log(
        `📋 Найдено ${catalogData.categories.length} категорий для обработки`
      );

      // Очистка существующих данных (опционально)
      if (process.argv.includes('--clean')) {
        await this.cleanExistingData();
      }

      // Обрабатываем категории
      for (const categoryData of catalogData.categories) {
        await this.processCategory(categoryData);
      }

      console.log('✅ Парсинг каталога завершен успешно!');
    } catch (error) {
      console.error('❌ Ошибка при парсинге каталога:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  private async cleanExistingData(): Promise<void> {
    console.log('🧹 Очистка существующих данных...');

    await this.prisma.$transaction(async (tx) => {
      // Удаляем связи брендов с категориями
      await tx.categoryBrand.deleteMany();

      // Удаляем переводы характеристик продуктов
      await tx.productSpecificationTranslation.deleteMany();

      // Удаляем характеристики продуктов
      await tx.productSpecification.deleteMany();

      // Удаляем изображения продуктов
      await tx.productImage.deleteMany();

      // Удаляем переводы продуктов
      await tx.productTranslation.deleteMany();

      // Удаляем продукты
      await tx.product.deleteMany();

      // Удаляем переводы брендов
      await tx.brandTranslation.deleteMany();

      // Удаляем бренды
      await tx.brand.deleteMany();

      // Удаляем переводы субкатегорий
      await tx.subcategoryTranslation.deleteMany();

      // Удаляем субкатегории
      await tx.subcategory.deleteMany();

      // Удаляем переводы категорий
      await tx.categoryTranslation.deleteMany();

      // Удаляем категории
      await tx.category.deleteMany();
    });

    console.log('✅ Данные очищены');
  }

  private async processCategory(categoryData: any): Promise<void> {
    console.log(`📁 Обрабатываем категорию: ${categoryData.name.ru}`);

    // Определяем секцию на основе ID категории (можно изменить логику)
    const section: Section = this.determineSectionById(categoryData.id);

    // Создаем категорию
    const category = await this.prisma.category.create({
      data: {
        id: categoryData.id,
        section: section,
      },
    });

    // Создаем переводы категории
    await this.createCategoryTranslations(category.id, categoryData.name);

    // Обрабатываем субкатегории
    for (const subcategoryData of categoryData.subcategories) {
      await this.processSubcategory(category.id, subcategoryData, section);
    }

    console.log(`✅ Категория "${categoryData.name.ru}" обработана`);
  }

  private async createCategoryTranslations(
    categoryId: number,
    names: any
  ): Promise<void> {
    const locales: Locale[] = ['ru', 'en', 'uz', 'kr'];

    for (const locale of locales) {
      if (names[locale]) {
        await this.prisma.categoryTranslation.create({
          data: {
            categoryId,
            locale,
            name: names[locale],
          },
        });
      }
    }
  }

  private async processSubcategory(
    categoryId: number,
    subcategoryData: any,
    section: Section
  ): Promise<void> {
    console.log(`  📂 Обрабатываем субкатегорию: ${subcategoryData.name.ru}`);

    // Создаем субкатегорию
    const subcategory = await this.prisma.subcategory.create({
      data: {
        id: subcategoryData.id,
        categoryId,
      },
    });

    // Создаем переводы субкатегории
    await this.createSubcategoryTranslations(
      subcategory.id,
      subcategoryData.name
    );

    // Обрабатываем бренды
    if (subcategoryData.brands && subcategoryData.brands.length > 0) {
      await this.processBrands(categoryId, subcategoryData.brands, section);
    }

    console.log(`  ✅ Субкатегория "${subcategoryData.name.ru}" обработана`);
  }

  private async createSubcategoryTranslations(
    subcategoryId: number,
    names: any
  ): Promise<void> {
    const locales: Locale[] = ['ru', 'en', 'uz', 'kr'];

    for (const locale of locales) {
      if (names[locale]) {
        await this.prisma.subcategoryTranslation.create({
          data: {
            subcategoryId,
            locale,
            name: names[locale],
          },
        });
      }
    }
  }

  private async processBrands(
    categoryId: number,
    brandNames: string[],
    section: Section
  ): Promise<void> {
    console.log(`    🏷️  Обрабатываем ${brandNames.length} брендов`);

    for (const brandName of brandNames) {
      await this.processBrand(categoryId, brandName, section);
    }
  }

  private async processBrand(
    categoryId: number,
    brandName: string,
    section: Section
  ): Promise<void> {
    // Проверяем, существует ли уже такой бренд
    let brand = await this.prisma.brand.findFirst({
      where: {
        translations: {
          some: {
            name: brandName,
            locale: 'ru', // Используем русское название как основное
          },
        },
      },
    });

    if (!brand) {
      // Создаем новый бренд
      brand = await this.prisma.brand.create({
        data: {},
      });

      // Создаем переводы бренда (пока только русское название)
      await this.createBrandTranslations(brand.id, brandName);
    }

    // Связываем бренд с категорией
    const existingLink = await this.prisma.categoryBrand.findUnique({
      where: {
        categoryId_brandId_section: {
          categoryId,
          brandId: brand.id,
          section,
        },
      },
    });

    if (!existingLink) {
      await this.prisma.categoryBrand.create({
        data: {
          categoryId,
          brandId: brand.id,
          section,
        },
      });
    }

    console.log(`    ✅ Бренд "${brandName}" обработан`);
  }

  private async createBrandTranslations(
    brandId: number,
    brandName: string
  ): Promise<void> {
    // Создаем переводы для всех языков (пока используем одно название)
    const locales: Locale[] = ['ru', 'en', 'uz', 'kr'];

    for (const locale of locales) {
      await this.prisma.brandTranslation.create({
        data: {
          brandId,
          locale,
          name: brandName, // Можно добавить логику перевода брендов
        },
      });
    }
  }

  private determineSectionById(categoryId: number): Section {
    // Логика определения секции на основе ID категории
    // Можно настроить под конкретные требования

    // Пример: если ID от 1 до 10 - NEVA, остальные - X_SOLUTION
    if (categoryId <= 10) {
      return Section.NEVA;
    } else {
      return Section.X_SOLUTION;
    }
  }

  async getStats(): Promise<void> {
    console.log('\n📊 Статистика базы данных:');

    const stats = await Promise.all([
      this.prisma.category.count(),
      this.prisma.subcategory.count(),
      this.prisma.brand.count(),
      this.prisma.categoryBrand.count(),
      this.prisma.categoryTranslation.count(),
      this.prisma.subcategoryTranslation.count(),
      this.prisma.brandTranslation.count(),
    ]);

    console.log(`📁 Категорий: ${stats[0]}`);
    console.log(`📂 Субкатегорий: ${stats[1]}`);
    console.log(`🏷️  Брендов: ${stats[2]}`);
    console.log(`🔗 Связей бренд-категория: ${stats[3]}`);
    console.log(`🌐 Переводов категорий: ${stats[4]}`);
    console.log(`🌐 Переводов субкатегорий: ${stats[5]}`);
    console.log(`🌐 Переводов брендов: ${stats[6]}`);
  }
}

// Основная функция
async function main() {
  const parser = new CatalogParser();

  try {
    // Парсим каталог
    await parser.parseCatalog();

    // Показываем статистику
    await parser.getStats();
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  console.log('🚀 Запуск парсера каталога JSON');
  console.log('📝 Использование:');
  console.log(
    '  yarn catalog:parse           - Парсинг с сохранением существующих данных'
  );
  console.log(
    '  yarn catalog:parse:clean     - Парсинг с предварительной очисткой\n'
  );

  main()
    .then(() => {
      console.log('\n🎉 Парсинг завершен успешно!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Парсинг завершился с ошибкой:', error);
      process.exit(1);
    });
}
