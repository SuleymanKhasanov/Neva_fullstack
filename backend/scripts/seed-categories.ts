// backend/prisma/seed.ts
import * as fs from 'fs';
import * as path from 'path';

import { PrismaClient, Section, Locale } from '../generated/prisma/client';

const prisma = new PrismaClient();

// Словари переводов (упрощенные, можно расширить)
const categoryTranslations: Record<string, Record<Locale, string>> = {
  'Серверное оборудование': {
    ru: 'Серверное оборудование',
    en: 'Server Equipment',
    uz: 'Server uskunalari',
    kr: '서버 장비',
  },
  'Сетевое оборудование': {
    ru: 'Сетевое оборудование',
    en: 'Network Equipment',
    uz: 'Tarmoq uskunalari',
    kr: '네트워크 장비',
  },
  'Компьютеры и периферия': {
    ru: 'Компьютеры и периферия',
    en: 'Computers & Peripherals',
    uz: 'Kompyuterlar va periferiya',
    kr: '컴퓨터 및 주변기기',
  },
  'Камеры видеонаблюдения': {
    ru: 'Камеры видеонаблюдения',
    en: 'Surveillance Cameras',
    uz: 'Kuzatuv kameralari',
    kr: '감시 카메라',
  },
  'Файрволы и безопасность': {
    ru: 'Файрволы и безопасность',
    en: 'Firewalls & Security',
    uz: 'Firewall va xavfsizlik',
    kr: '방화벽 및 보안',
  },
  'Программное обеспечение': {
    ru: 'Программное обеспечение',
    en: 'Software',
    uz: 'Dasturiy taʼminot',
    kr: '소프트웨어',
  },
  'Телефония и связь': {
    ru: 'Телефония и связь',
    en: 'Telephony & Communications',
    uz: 'Telefoniya va aloqa',
    kr: '전화 통신',
  },
  'Расходные материалы': {
    ru: 'Расходные материалы',
    en: 'Consumables',
    uz: 'Sarflanuvchi materiallar',
    kr: '소모품',
  },
  'Электроника и аксессуары': {
    ru: 'Электроника и аксессуары',
    en: 'Electronics & Accessories',
    uz: 'Elektronika va aksessuarlar',
    kr: '전자제품 및 액세서리',
  },
  'Инструменты и оборудование': {
    ru: 'Инструменты и оборудование',
    en: 'Tools & Equipment',
    uz: 'Asboblar va jihozlar',
    kr: '도구 및 장비',
  },
  Мебель: {
    ru: 'Мебель',
    en: 'Furniture',
    uz: 'Mebel',
    kr: '가구',
  },
  Канцтовары: {
    ru: 'Канцтовары',
    en: 'Office Supplies',
    uz: 'Kantselyariya tovarlari',
    kr: '사무용품',
  },
  'Чистота и гигиена': {
    ru: 'Чистота и гигиена',
    en: 'Cleaning & Hygiene',
    uz: 'Tozalik va gigiena',
    kr: '청소 및 위생',
  },
  'Бытовая техника': {
    ru: 'Бытовая техника',
    en: 'Home Appliances',
    uz: 'Maishiy texnika',
    kr: '가전제품',
  },
  Освещение: {
    ru: 'Освещение',
    en: 'Lighting',
    uz: 'Yoritish',
    kr: '조명',
  },
  'Системы контроля доступа': {
    ru: 'Системы контроля доступа',
    en: 'Access Control Systems',
    uz: 'Kirish nazorati tizimlari',
    kr: '출입 통제 시스템',
  },
  'Климатическое оборудование': {
    ru: 'Климатическое оборудование',
    en: 'Climate Equipment',
    uz: 'Iqlim uskunalari',
    kr: '기후 장비',
  },
};

const subcategoryTranslations: Record<string, Record<Locale, string>> = {
  Серверы: {
    ru: 'Серверы',
    en: 'Servers',
    uz: 'Serverlar',
    kr: '서버',
  },
  'Системы хранения данных': {
    ru: 'Системы хранения данных',
    en: 'Data Storage Systems',
    uz: 'Maʼlumotlarni saqlash tizimlari',
    kr: '데이터 스토리지 시스템',
  },
  'HCI (гиперконвергентная инфраструктура)': {
    ru: 'HCI (гиперконвергентная инфраструктура)',
    en: 'HCI (Hyperconverged Infrastructure)',
    uz: 'HCI (Giperkonvergent infratuzilma)',
    kr: 'HCI (하이퍼컨버지드 인프라)',
  },
  'Серверные аксессуары': {
    ru: 'Серверные аксессуары',
    en: 'Server Accessories',
    uz: 'Server aksessuarlari',
    kr: '서버 액세서리',
  },
  'Стойки и шкафы': {
    ru: 'Стойки и шкафы',
    en: 'Racks & Cabinets',
    uz: 'Stendlar va shkaflar',
    kr: '랙 및 캐비닛',
  },
  Коммутаторы: {
    ru: 'Коммутаторы',
    en: 'Switches',
    uz: 'Kommutatorlar',
    kr: '스위치',
  },
  Маршрутизаторы: {
    ru: 'Маршрутизаторы',
    en: 'Routers',
    uz: 'Marshrutizatorlar',
    kr: '라우터',
  },
  'Точки доступа Wi-Fi': {
    ru: 'Точки доступа Wi-Fi',
    en: 'Wi-Fi Access Points',
    uz: 'Wi-Fi kirish nuqtalari',
    kr: 'Wi-Fi 액세스 포인트',
  },
  'Сетевые кабели': {
    ru: 'Сетевые кабели',
    en: 'Network Cables',
    uz: 'Tarmoq kabellari',
    kr: '네트워크 케이블',
  },
  'Патч-панели': {
    ru: 'Патч-панели',
    en: 'Patch Panels',
    uz: 'Patch panellar',
    kr: '패치 패널',
  },
  'Сетевые розетки': {
    ru: 'Сетевые розетки',
    en: 'Network Outlets',
    uz: 'Tarmoq rozetkalar',
    kr: '네트워크 콘센트',
  },
  // Добавьте остальные переводы по аналогии...
};

interface CategoryData {
  category: string;
  subcategory: string;
  brand: string;
}

async function parseMarkdownData(): Promise<CategoryData[]> {
  const filePath = path.join(__dirname, '..', 'categories_with_brands.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split('\n');
  const data: CategoryData[] = [];

  lines.forEach((line) => {
    if (
      line.startsWith('|') &&
      !line.startsWith('| **Категория**') &&
      line.includes('|')
    ) {
      const parts = line
        .split('|')
        .map((part) => part.trim())
        .filter((part) => part !== '');
      if (parts.length >= 3) {
        const [category, subcategory, brand] = parts;
        data.push({
          category: category.replace(/\*\*/g, ''), // Убираем markdown
          subcategory: subcategory.replace(/\*\*/g, ''),
          brand: brand.replace(/\*\*/g, ''),
        });
      }
    }
  });

  return data;
}

async function seedDatabase() {
  console.log('🌱 Начинаем загрузку данных...');

  try {
    // Очистка существующих данных
    console.log('🧹 Очистка существующих данных...');
    await prisma.subcategoryBrand.deleteMany();
    await prisma.subcategoryTranslation.deleteMany();
    await prisma.subcategory.deleteMany();
    await prisma.categoryTranslation.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brandTranslation.deleteMany();
    await prisma.brand.deleteMany();

    // Парсинг данных из markdown
    const data = await parseMarkdownData();
    console.log(`📊 Найдено ${data.length} записей для обработки`);

    // Группировка данных
    const categories = new Set(data.map((item) => item.category));
    const subcategoriesMap = new Map<string, Set<string>>();
    const brandsMap = new Map<string, Set<string>>();

    data.forEach((item) => {
      if (!subcategoriesMap.has(item.category)) {
        subcategoriesMap.set(item.category, new Set());
      }
      subcategoriesMap.get(item.category)!.add(item.subcategory);

      const subcategoryKey = `${item.category}:${item.subcategory}`;
      if (!brandsMap.has(subcategoryKey)) {
        brandsMap.set(subcategoryKey, new Set());
      }
      brandsMap.get(subcategoryKey)!.add(item.brand);
    });

    // Создание категорий
    console.log('📁 Создание категорий...');
    const categoryMap = new Map<string, number>();

    for (const categoryName of categories) {
      const category = await prisma.category.create({
        data: {
          section: Section.NEVA,
          translations: {
            create: Object.entries(
              categoryTranslations[categoryName] || {
                ru: categoryName,
                en: categoryName,
                uz: categoryName,
                kr: categoryName,
              }
            ).map(([locale, name]) => ({
              locale: locale as Locale,
              name,
            })),
          },
        },
      });
      categoryMap.set(categoryName, category.id);
      console.log(`✅ Создана категория: ${categoryName} (ID: ${category.id})`);
    }

    // Создание субкатегорий
    console.log('📂 Создание субкатегорий...');
    const subcategoryMap = new Map<string, number>();

    for (const [categoryName, subcategoryNames] of subcategoriesMap) {
      const categoryId = categoryMap.get(categoryName)!;

      for (const subcategoryName of subcategoryNames) {
        const subcategory = await prisma.subcategory.create({
          data: {
            categoryId,
            translations: {
              create: Object.entries(
                subcategoryTranslations[subcategoryName] || {
                  ru: subcategoryName,
                  en: subcategoryName,
                  uz: subcategoryName,
                  kr: subcategoryName,
                }
              ).map(([locale, name]) => ({
                locale: locale as Locale,
                name,
              })),
            },
          },
        });

        const subcategoryKey = `${categoryName}:${subcategoryName}`;
        subcategoryMap.set(subcategoryKey, subcategory.id);
        console.log(
          `✅ Создана субкатегория: ${subcategoryName} (ID: ${subcategory.id})`
        );
      }
    }

    // Создание брендов и связей
    console.log('🏷️ Создание брендов и связей...');
    const brandMap = new Map<string, number>();

    for (const [subcategoryKey, brandNames] of brandsMap) {
      const subcategoryId = subcategoryMap.get(subcategoryKey)!;

      for (const brandName of brandNames) {
        let brandId = brandMap.get(brandName);

        if (!brandId) {
          // Создаем новый бренд
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
          brandId = brand.id;
          brandMap.set(brandName, brandId);
          console.log(`✅ Создан бренд: ${brandName} (ID: ${brandId})`);
        }

        // Создаем связь субкатегория-бренд
        await prisma.subcategoryBrand.create({
          data: {
            subcategoryId,
            brandId,
          },
        });
      }
    }

    console.log('🎉 Загрузка данных завершена успешно!');
    console.log(`📊 Статистика:`);
    console.log(`   - Категорий: ${categories.size}`);
    console.log(`   - Субкатегорий: ${subcategoryMap.size}`);
    console.log(`   - Брендов: ${brandMap.size}`);
  } catch (error) {
    console.error('❌ Ошибка при загрузке данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск только если скрипт вызван напрямую
if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export { seedDatabase };
