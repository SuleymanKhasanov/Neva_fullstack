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

    // Секции для дублирования данных
    const sections: Section[] = [Section.NEVA, Section.X_SOLUTION];

    // Обработка категорий для обеих секций
    for (const section of sections) {
      console.log(`Импорт для секции: ${section}`);

      for (const category of data.categories) {
        // Создание уникального ID для каждой секции
        // Для NEVA используем оригинальный ID, для X_SOLUTION добавляем смещение
        const categoryId =
          section === Section.NEVA ? category.id : category.id + 10000; // Смещение для X_SOLUTION

        // Создание или обновление категории
        const categoryRecord = await prisma.category.upsert({
          where: { id: categoryId },
          update: {
            section: section,
          },
          create: {
            id: categoryId,
            section: section,
          },
        });

        // Обработка переводов категории
        for (const locale of locales) {
          if (category.name[locale]) {
            await prisma.categoryTranslation.upsert({
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

        // Обработка субкатегорий
        for (const subcategory of category.subcategories) {
          // Создание уникального ID для субкатегории
          const subcategoryId =
            section === Section.NEVA ? subcategory.id : subcategory.id + 10000; // Смещение для X_SOLUTION

          // Создание или обновление субкатегории
          const subcategoryRecord = await prisma.subcategory.upsert({
            where: { id: subcategoryId },
            update: {
              categoryId: categoryId,
            },
            create: {
              id: subcategoryId,
              categoryId: categoryId,
            },
          });

          // Обработка переводов субкатегории
          for (const locale of locales) {
            if (subcategory.name[locale]) {
              await prisma.subcategoryTranslation.upsert({
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

          // Обработка брендов
          for (const brandName of subcategory.brands) {
            // Поиск существующего бренда по имени в русской локали
            let existingBrand = await prisma.brand.findFirst({
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

            // Связывание бренда с категорией для текущей секции
            await prisma.categoryBrand.upsert({
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

    console.log('Импорт каталога для обеих секций успешно завершен');
  } catch (error) {
    console.error('Ошибка при импорте каталога:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Заменяем старую функцию - теперь импортируем только в админские таблицы
async function importCatalogDeprecated() {
  console.log('⚠️  ВНИМАНИЕ: Этот скрипт устарел!');
  console.log('📋 Используйте вместо него: npm run catalog:parse:admin');
  console.log('🔄 Данные теперь импортируются только в админские таблицы');
  console.log(
    '📦 Публичные таблицы заполняются только при создании продуктов админом'
  );

  process.exit(0);
}

// Запуск скрипта
importCatalogDeprecated().catch((e) => {
  console.error(e);
  process.exit(1);
});
