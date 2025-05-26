import * as fs from 'fs/promises';
import * as path from 'path';

import fetch from 'node-fetch';
import sharp from 'sharp';

import { PrismaClient, Section } from '../generated/prisma/client';

interface CategoryJson {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string[];
  count: number;
  subcategories: SubcategoryJson[];
}

interface SubcategoryJson {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string[];
  count: number;
  subcategories: SubcategoryJson[];
}

interface ProductCategoryJson {
  id: number;
  name: string;
  description: string;
  image: string[];
  products: ProductJson[];
}

interface ProductJson {
  id: number;
  name: string;
  category_id: number;
  category: string;
  slug: string;
  description: string | null;
  image: string[];
}

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
const INPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_DIR = path.join(__dirname, '../public/images');
const LOCALES = ['ru', 'en', 'kr', 'uz'];

// Хранилище для кэширования путей к изображениям
const imageCache: Map<
  string,
  { image: string | null; fullImage: string | null }
> = new Map();

// Функция для парсинга брендов из строки
function parseBrands(description: string | null): string[] {
  if (!description) return [];

  return description
    .split(',')
    .map((brand) => brand.trim())
    .filter((brand) => brand);
}

// Функция для проверки, является ли изображение SVG
function isSvg(url: string): boolean {
  return url.toLowerCase().endsWith('.svg');
}

// Функция для обработки изображений
async function processImage(
  url: string,
  productId: number,
  outputDir: string
): Promise<{ image: string | null; fullImage: string | null }> {
  if (isSvg(url)) return { image: null, fullImage: null };

  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `product_${productId}_${Date.now()}`;
    const resizedImagePath = path.join(outputDir, `${filename}_resized.webp`);
    const fullImagePath = path.join(outputDir, `${filename}_full.webp`);

    await fs.mkdir(outputDir, { recursive: true });

    // Миниатюра 400x400
    await sharp(buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(resizedImagePath);

    // Полное изображение
    await sharp(buffer).webp({ quality: 80 }).toFile(fullImagePath);

    const resizedRelativePath = `/images/${filename}_resized.webp`;
    const fullRelativePath = `/images/${filename}_full.webp`;

    const result = { image: resizedRelativePath, fullImage: fullRelativePath };
    imageCache.set(url, result);

    return result;
  } catch (error) {
    console.error(`Error processing image ${url}:`, error);

    return { image: null, fullImage: null };
  }
}

// Функция для рекурсивной обработки подкатегорий
async function processSubcategories(
  subcategories: SubcategoryJson[],
  section: Section,
  productsJson: ProductCategoryJson[],
  locale: string
) {
  for (const subcategory of subcategories) {
    const brands = parseBrands(subcategory.description);
    const productsInCategory = productsJson.find(
      (p) => p.id === subcategory.id
    );

    // Создаём категорию
    const categoryRecord = await prisma.category.create({
      data: {
        locale,
        name: subcategory.name,
        section,
      },
    });
    console.log(
      `Created category: ${subcategory.name} (ID: ${categoryRecord.id}, Section: ${section}, Locale: ${locale})`
    );

    // Обработка брендов
    const brandRecords = await Promise.all(
      brands.map(async (name: string) => {
        const brand = await prisma.brand.upsert({
          where: {
            name_locale: { name, locale },
          },
          update: {},
          create: {
            name,
            locale,
            section,
            category: { connect: { id: categoryRecord.id } },
          },
        });
        console.log(
          `Upserted brand: ${name} (ID: ${brand.id}, Category ID: ${categoryRecord.id}, Section: ${section}, Locale: ${locale})`
        );

        return brand;
      })
    );

    // Обработка продуктов
    if (productsInCategory && productsInCategory.products.length > 0) {
      console.log(
        `Found products for subcategory ID: ${subcategory.id}, Name: ${subcategory.name}, Product count: ${productsInCategory.products.length}, Locale: ${locale}`
      );
      let brandIndex = 0;
      for (const product of productsInCategory.products) {
        console.log(
          `Processing product: ${product.name} (Category ID: ${product.category_id}, Locale: ${locale})`
        );

        // Извлекаем бренд из имени продукта
        let brandName = product.name.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '');
        let brandId: number | null = null;

        // Ищем бренд среди созданных
        const matchingBrand = brandRecords.find((b) =>
          product.name.toLowerCase().includes(b.name.toLowerCase())
        );
        if (matchingBrand) {
          brandId = matchingBrand.id;
        } else if (brandRecords.length > 0) {
          // Используем бренд из списка по очереди
          brandId = brandRecords[brandIndex % brandRecords.length].id;
          brandIndex++;
        } else if (brandName) {
          // Создаём новый бренд
          const brand = await prisma.brand.upsert({
            where: {
              name_locale: { name: brandName, locale },
            },
            update: {},
            create: {
              name: brandName,
              locale,
              section,
              category: { connect: { id: categoryRecord.id } },
            },
          });
          brandId = brand.id;
          console.log(
            `Upserted brand for product: ${brandName} (ID: ${brand.id}, Category ID: ${categoryRecord.id})`
          );
        }

        const { image, fullImage } = product.image[0]
          ? await processImage(product.image[0], product.id, OUTPUT_DIR)
          : { image: null, fullImage: null };

        // Создаём продукт
        const productResult = await prisma.product.create({
          data: {
            brandId,
            categoryId: categoryRecord.id,
            locale,
            name: product.name,
            description: product.description || '',
            image,
            fullImage,
            section,
          },
        });
        console.log(
          `Created product: ${product.name} (ID: ${productResult.id}, Section: ${section}, Locale: ${locale})`
        );
      }
    } else {
      console.warn(
        `No products found for subcategory ID: ${subcategory.id}, Name: ${subcategory.name}, Locale: ${locale}`
      );
    }

    // Рекурсивная обработка вложенных подкатегорий
    if (subcategory.subcategories && subcategory.subcategories.length > 0) {
      await processSubcategories(
        subcategory.subcategories,
        section,
        productsJson,
        locale
      );
    }
  }
}

async function mergeAndProcessData() {
  try {
    // Очистка базы данных
    await prisma.$executeRaw`TRUNCATE "Product", "Category", "Brand" RESTART IDENTITY CASCADE;`;
    console.log('Database cleared');

    // Обработка всех локалей
    for (const locale of LOCALES) {
      console.log(`Processing locale: ${locale}`);

      const categoriesPath = path.join(INPUT_DIR, `categories_${locale}.json`);
      const productsPath = path.join(INPUT_DIR, `products_${locale}.json`);

      try {
        await fs.access(categoriesPath);
        await fs.access(productsPath);
      } catch {
        console.error(`Files for locale ${locale} not found`);
        continue;
      }

      const categoriesRaw = await fs.readFile(categoriesPath, 'utf-8');
      const productsRaw = await fs.readFile(productsPath, 'utf-8');

      const categoriesJson = JSON.parse(categoriesRaw).data as CategoryJson[];
      const productsJson = JSON.parse(productsRaw)
        .data as ProductCategoryJson[];

      console.log(
        `Subcategory IDs from categories_${locale}.json:`,
        categoriesJson.flatMap((cat) => cat.subcategories.map((sub) => sub.id))
      );
      console.log(
        `Category IDs from products_${locale}.json:`,
        productsJson.map((p) => p.id)
      );
      console.log(
        `Product Category IDs from products_${locale}.json:`,
        productsJson.flatMap((p) => p.products.map((prod) => prod.category_id))
      );

      for (const category of categoriesJson) {
        const section =
          category.name === 'Neva' ? Section.NEVA : Section.X_SOLUTION;
        await processSubcategories(
          category.subcategories,
          section,
          productsJson,
          locale
        );
      }
    }

    console.log(`Data migration completed for all locales`);
  } catch (error) {
    console.error(`Migration failed:`, error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

mergeAndProcessData();
