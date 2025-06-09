// backend/scripts/seed-data.ts
import { PrismaClient, Section, Locale } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting data seeding...');

  try {
    // 1. Создаем бренды
    console.log('📦 Creating brands...');

    const asusId = await createBrand('ASUS', [
      { locale: Locale.ru, name: 'ASUS' },
      { locale: Locale.en, name: 'ASUS' },
      { locale: Locale.kr, name: 'ASUS' },
      { locale: Locale.uz, name: 'ASUS' },
    ]);

    const dellId = await createBrand('Dell', [
      { locale: Locale.ru, name: 'Dell' },
      { locale: Locale.en, name: 'Dell' },
      { locale: Locale.kr, name: 'Dell' },
      { locale: Locale.uz, name: 'Dell' },
    ]);

    const hpId = await createBrand('HP', [
      { locale: Locale.ru, name: 'HP' },
      { locale: Locale.en, name: 'HP' },
      { locale: Locale.kr, name: 'HP' },
      { locale: Locale.uz, name: 'HP' },
    ]);

    // 2. Создаем категории для NEVA
    console.log('📂 Creating NEVA categories...');

    const laptopsCategoryId = await createCategory(Section.NEVA, [
      { locale: Locale.ru, name: 'Ноутбуки' },
      { locale: Locale.en, name: 'Laptops' },
      { locale: Locale.kr, name: '노트북' },
      { locale: Locale.uz, name: 'Noutbuklar' },
    ]);

    const desktopsCategoryId = await createCategory(Section.NEVA, [
      { locale: Locale.ru, name: 'Настольные ПК' },
      { locale: Locale.en, name: 'Desktop PCs' },
      { locale: Locale.kr, name: '데스크톱 PC' },
      { locale: Locale.uz, name: 'Ish stoli kompyuterlari' },
    ]);

    // 3. Создаем категории для X_SOLUTION
    console.log('🏢 Creating X_SOLUTION categories...');

    const serversCategoryId = await createCategory(Section.X_SOLUTION, [
      { locale: Locale.ru, name: 'Серверы' },
      { locale: Locale.en, name: 'Servers' },
      { locale: Locale.kr, name: '서버' },
      { locale: Locale.uz, name: 'Serverlar' },
    ]);

    const networkCategoryId = await createCategory(Section.X_SOLUTION, [
      { locale: Locale.ru, name: 'Сетевое оборудование' },
      { locale: Locale.en, name: 'Network Equipment' },
      { locale: Locale.kr, name: '네트워크 장비' },
      { locale: Locale.uz, name: 'Tarmoq jihozlari' },
    ]);

    // 4. Создаем связи категории-бренды
    console.log('🔗 Creating category-brand relationships...');

    await createCategoryBrandRelation(laptopsCategoryId, asusId, Section.NEVA);
    await createCategoryBrandRelation(laptopsCategoryId, hpId, Section.NEVA);
    await createCategoryBrandRelation(desktopsCategoryId, asusId, Section.NEVA);
    await createCategoryBrandRelation(desktopsCategoryId, hpId, Section.NEVA);

    await createCategoryBrandRelation(
      serversCategoryId,
      dellId,
      Section.X_SOLUTION
    );
    await createCategoryBrandRelation(
      serversCategoryId,
      hpId,
      Section.X_SOLUTION
    );
    await createCategoryBrandRelation(
      networkCategoryId,
      dellId,
      Section.X_SOLUTION
    );

    // 5. Создаем тестовые продукты
    console.log('💻 Creating sample products...');

    // NEVA продукт
    await createProduct({
      section: Section.NEVA,
      categoryId: laptopsCategoryId,
      brandId: asusId,
      slug: 'asus-vivobook-15',
      translations: [
        {
          locale: Locale.ru,
          name: 'ASUS VivoBook 15',
          description: 'Мощный ноутбук для работы и развлечений',
          marketingDescription: 'Идеальный выбор для профессионалов',
        },
        {
          locale: Locale.en,
          name: 'ASUS VivoBook 15',
          description: 'Powerful laptop for work and entertainment',
          marketingDescription: 'Perfect choice for professionals',
        },
        {
          locale: Locale.kr,
          name: 'ASUS VivoBook 15',
          description: '작업과 엔터테인먼트를 위한 강력한 노트북',
          marketingDescription: '전문가를 위한 완벽한 선택',
        },
        {
          locale: Locale.uz,
          name: 'ASUS VivoBook 15',
          description: "Ish va ko'ngilochar uchun kuchli noutbuk",
          marketingDescription: 'Mutaxassislar uchun mukammal tanlov',
        },
      ],
    });

    // X_SOLUTION продукт
    await createProduct({
      section: Section.X_SOLUTION,
      categoryId: serversCategoryId,
      brandId: dellId,
      slug: 'dell-poweredge-r640',
      translations: [
        {
          locale: Locale.ru,
          name: 'Dell PowerEdge R640',
          description: 'Высокопроизводительный сервер для бизнеса',
          marketingDescription: 'Надежное решение для крупных предприятий',
        },
        {
          locale: Locale.en,
          name: 'Dell PowerEdge R640',
          description: 'High-performance server for business',
          marketingDescription: 'Reliable solution for large enterprises',
        },
        {
          locale: Locale.kr,
          name: 'Dell PowerEdge R640',
          description: '비즈니스용 고성능 서버',
          marketingDescription: '대기업을 위한 안정적인 솔루션',
        },
        {
          locale: Locale.uz,
          name: 'Dell PowerEdge R640',
          description: 'Biznes uchun yuqori samaradorlikdagi server',
          marketingDescription: 'Yirik korxonalar uchun ishonchli yechim',
        },
      ],
    });

    console.log('✅ Data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function createBrand(
  key: string,
  translations: { locale: Locale; name: string }[]
) {
  const brand = await prisma.brand.create({
    data: {
      translations: {
        create: translations,
      },
    },
  });
  console.log(`✓ Created brand: ${key} (ID: ${brand.id})`);
  return brand.id;
}

async function createCategory(
  section: Section,
  translations: { locale: Locale; name: string }[]
) {
  const category = await prisma.category.create({
    data: {
      section,
      translations: {
        create: translations,
      },
    },
  });
  console.log(
    `✓ Created category for ${section}: ${translations[0].name} (ID: ${category.id})`
  );
  return category.id;
}

async function createCategoryBrandRelation(
  categoryId: number,
  brandId: number,
  section: Section
) {
  await prisma.categoryBrand.create({
    data: {
      categoryId,
      brandId,
      section,
    },
  });
  console.log(
    `✓ Created category-brand relation: ${categoryId}-${brandId} for ${section}`
  );
}

async function createProduct(data: {
  section: Section;
  categoryId: number;
  brandId: number;
  slug: string;
  translations: {
    locale: Locale;
    name: string;
    description: string;
    marketingDescription: string;
  }[];
}) {
  const product = await prisma.product.create({
    data: {
      section: data.section,
      categoryId: data.categoryId,
      brandId: data.brandId,
      slug: data.slug,
      isActive: true,
      translations: {
        create: data.translations,
      },
    },
  });
  console.log(
    `✓ Created product: ${data.translations[0].name} (ID: ${product.id})`
  );
  return product.id;
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
