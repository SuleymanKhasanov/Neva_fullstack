import * as fs from 'fs/promises';
import * as path from 'path';

import { PrismaClient, Section, Locale } from '@prisma/client';

// Интерфейс для структуры JSON
interface CatalogData {
  categories: CategoryData[];
}

interface CategoryData {
  id: number;
  name: Record<string, string>;
  subcategories: SubcategoryData[];
}

interface SubcategoryData {
  id: number;
  name: Record<string, string>;
  brands: string[];
}

const prisma = new PrismaClient();

async function importCatalog() {
  try {
    // Чтение JSON файла из папки data (на уровень выше)
    const rawData = await fs.readFile(
      path.join(__dirname, '../data/catalog_json.json'),
      'utf-8'
    );
    const data: CatalogData = JSON.parse(rawData);

    // Поддерживаемые локали
    const locales: Locale[] = ['ru', 'en', 'uz', 'kr'];

    // Обработка категорий
    for (const category of data.categories) {
      // Создание или обновление категории
      const categoryRecord = await prisma.category.upsert({
        where: { id: category.id },
        update: {
          section: Section.NEVA,
        },
        create: {
          id: category.id,
          section: Section.NEVA,
        },
      });

      // Обработка переводов категории
      for (const locale of locales) {
        if (category.name[locale]) {
          await prisma.categoryTranslation.upsert({
            where: {
              categoryId_locale: {
                categoryId: category.id,
                locale: locale as Locale,
              },
            },
            update: {
              name: category.name[locale],
            },
            create: {
              categoryId: category.id,
              locale: locale as Locale,
              name: category.name[locale],
            },
          });
        }
      }

      // Обработка субкатегорий
      for (const subcategory of category.subcategories) {
        // Создание или обновление субкатегории
        const subcategoryRecord = await prisma.subcategory.upsert({
          where: { id: subcategory.id },
          update: {
            categoryId: category.id,
          },
          create: {
            id: subcategory.id,
            categoryId: category.id,
          },
        });

        // Обработка переводов субкатегории
        for (const locale of locales) {
          if (subcategory.name[locale]) {
            await prisma.subcategoryTranslation.upsert({
              where: {
                subcategoryId_locale: {
                  subcategoryId: subcategory.id,
                  locale: locale as Locale,
                },
              },
              update: {
                name: subcategory.name[locale],
              },
              create: {
                subcategoryId: subcategory.id,
                locale: locale as Locale,
                name: subcategory.name[locale],
              },
            });
          }
        }

        // Обработка брендов
        for (const brandName of subcategory.brands) {
          // Поиск существующего бренда по имени в русской локали
          const existingBrand = await prisma.brand.findFirst({
            where: {
              translations: {
                some: {
                  locale: Locale.ru,
                  name: brandName,
                },
              },
            },
            include: {
              translations: true,
            },
          });

          let brand;

          if (existingBrand) {
            // Если бренд существует, обновляем его
            brand = await prisma.brand.upsert({
              where: { id: existingBrand.id },
              update: {}, // Ничего не обновляем, если бренд уже существует
              create: {
                translations: {
                  create: locales.map((locale) => ({
                    locale,
                    name: brandName, // Используем одно имя для всех локалей
                  })),
                },
              },
            });
          } else {
            // Если бренд не существует, создаем новый
            brand = await prisma.brand.create({
              data: {
                translations: {
                  create: locales.map((locale) => ({
                    locale,
                    name: brandName, // Используем одно имя для всех локалей
                  })),
                },
              },
            });
          }

          // Связывание бренда с категорией
          await prisma.categoryBrand.upsert({
            where: {
              categoryId_brandId_section: {
                categoryId: category.id,
                brandId: brand.id,
                section: Section.NEVA,
              },
            },
            update: {},
            create: {
              categoryId: category.id,
              brandId: brand.id,
              section: Section.NEVA,
            },
          });
        }
      }
    }

    console.log('Импорт каталога успешно завершен');
  } catch (error) {
    console.error('Ошибка при импорте каталога:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск скрипта
importCatalog().catch((e) => {
  console.error(e);
  process.exit(1);
});
