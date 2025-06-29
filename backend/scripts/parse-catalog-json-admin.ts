import * as fs from 'fs/promises';
import * as path from 'path';

import { PrismaClient, Section, Locale } from '../generated/prisma/client';

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

async function importCatalogToAdmin() {
  try {
    // Чтение JSON файла из папки data (на уровень выше)
    const rawData = await fs.readFile(
      path.join(__dirname, '../data/catalog_json.json'),
      'utf-8'
    );
    const data: CatalogData = JSON.parse(rawData);

    // Поддерживаемые локали
    const locales: Locale[] = ['ru', 'en', 'uz', 'kr'];

    // Секции для дублирования данных
    const sections: Section[] = [Section.NEVA, Section.X_SOLUTION];

    // Обработка категорий для обеих секций в админских таблицах
    for (const section of sections) {
      console.log(`Импорт в админские таблицы для секции: ${section}`);

      for (const category of data.categories) {
        // Создание уникального ID для каждой секции
        // Для NEVA используем оригинальный ID, для X_SOLUTION добавляем смещение
        const categoryId =
          section === Section.NEVA ? category.id : category.id + 10000;

        // Создание или обновление админской категории
        const categoryRecord = await prisma.adminCategory.upsert({
          where: { id: categoryId },
          update: {
            section: section,
          },
          create: {
            id: categoryId,
            section: section,
          },
        });

        // Обработка переводов админской категории
        for (const locale of locales) {
          if (category.name[locale]) {
            await prisma.adminCategoryTranslation.upsert({
              where: {
                categoryId_locale: {
                  categoryId: categoryId,
                  locale: locale as Locale,
                },
              },
              update: {
                name: category.name[locale],
              },
              create: {
                categoryId: categoryId,
                locale: locale as Locale,
                name: category.name[locale],
              },
            });
          }
        }

        // Обработка админских субкатегорий
        for (const subcategory of category.subcategories) {
          // Создание уникального ID для субкатегории
          const subcategoryId =
            section === Section.NEVA ? subcategory.id : subcategory.id + 10000;

          // Создание или обновление админской субкатегории
          const subcategoryRecord = await prisma.adminSubcategory.upsert({
            where: { id: subcategoryId },
            update: {
              categoryId: categoryId,
            },
            create: {
              id: subcategoryId,
              categoryId: categoryId,
            },
          });

          // Обработка переводов админской субкатегории
          for (const locale of locales) {
            if (subcategory.name[locale]) {
              await prisma.adminSubcategoryTranslation.upsert({
                where: {
                  subcategoryId_locale: {
                    subcategoryId: subcategoryId,
                    locale: locale as Locale,
                  },
                },
                update: {
                  name: subcategory.name[locale],
                },
                create: {
                  subcategoryId: subcategoryId,
                  locale: locale as Locale,
                  name: subcategory.name[locale],
                },
              });
            }
          }

          // Обработка админских брендов
          for (const brandName of subcategory.brands) {
            // Поиск существующего админского бренда по имени в русской локали
            let existingBrand = await prisma.adminBrand.findFirst({
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
              // Если бренд существует, используем его
              brand = existingBrand;
            } else {
              // Если бренд не существует, создаем новый админский бренд
              brand = await prisma.adminBrand.create({
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

            // Связывание админского бренда с админской категорией для текущей секции
            await prisma.adminCategoryBrand.upsert({
              where: {
                categoryId_brandId_section: {
                  categoryId: categoryId,
                  brandId: brand.id,
                  section: section,
                },
              },
              update: {},
              create: {
                categoryId: categoryId,
                brandId: brand.id,
                section: section,
              },
            });
          }
        }
      }
    }

    console.log(
      'Импорт каталога в админские таблицы для обеих секций успешно завершен'
    );
  } catch (error) {
    console.error('Ошибка при импорте каталога в админские таблицы:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск скрипта
importCatalogToAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});
