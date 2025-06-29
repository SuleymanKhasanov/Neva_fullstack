import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function clearPublicTables() {
  try {
    console.log('🧹 Очистка публичных таблиц (сохраняем только продукты)...');

    await prisma.$transaction(async (tx) => {
      // Удаляем связи категория-бренд в публичных таблицах
      const deletedCategoryBrands = await tx.categoryBrand.deleteMany({});
      console.log(
        `Удалено связей категория-бренд: ${deletedCategoryBrands.count}`
      );

      // Удаляем переводы брендов в публичных таблицах
      const deletedBrandTranslations = await tx.brandTranslation.deleteMany({});
      console.log(
        `Удалено переводов брендов: ${deletedBrandTranslations.count}`
      );

      // Удаляем бренды в публичных таблицах (кроме тех, что связаны с продуктами)
      const productsWithBrands = await tx.product.findMany({
        where: { brandId: { not: null } },
        select: { brandId: true },
      });

      const usedBrandIds = productsWithBrands
        .map((p) => p.brandId)
        .filter((id) => id !== null) as number[];

      const deletedBrands = await tx.brand.deleteMany({
        where: {
          id: { notIn: usedBrandIds.length > 0 ? usedBrandIds : [-1] },
        },
      });
      console.log(`Удалено брендов: ${deletedBrands.count}`);

      // Удаляем переводы подкатегорий в публичных таблицах
      const deletedSubcategoryTranslations =
        await tx.subcategoryTranslation.deleteMany({});
      console.log(
        `Удалено переводов подкатегорий: ${deletedSubcategoryTranslations.count}`
      );

      // Удаляем подкатегории в публичных таблицах (кроме тех, что связаны с продуктами)
      const productsWithSubcategories = await tx.product.findMany({
        where: { subcategoryId: { not: null } },
        select: { subcategoryId: true },
      });

      const usedSubcategoryIds = productsWithSubcategories
        .map((p) => p.subcategoryId)
        .filter((id) => id !== null) as number[];

      const deletedSubcategories = await tx.subcategory.deleteMany({
        where: {
          id: {
            notIn: usedSubcategoryIds.length > 0 ? usedSubcategoryIds : [-1],
          },
        },
      });
      console.log(`Удалено подкатегорий: ${deletedSubcategories.count}`);

      // Удаляем переводы категорий в публичных таблицах
      const deletedCategoryTranslations =
        await tx.categoryTranslation.deleteMany({});
      console.log(
        `Удалено переводов категорий: ${deletedCategoryTranslations.count}`
      );

      // Удаляем категории в публичных таблицах (кроме тех, что связаны с продуктами)
      const productsWithCategories = await tx.product.findMany({
        select: { categoryId: true },
      });

      const usedCategoryIds = productsWithCategories.map((p) => p.categoryId);

      const deletedCategories = await tx.category.deleteMany({
        where: {
          id: { notIn: usedCategoryIds.length > 0 ? usedCategoryIds : [-1] },
        },
      });
      console.log(`Удалено категорий: ${deletedCategories.count}`);
    });

    console.log('✅ Публичные таблицы очищены успешно!');
    console.log(
      '📋 Теперь публичные данные будут создаваться только при создании продуктов'
    );
  } catch (error) {
    console.error('❌ Ошибка при очистке публичных таблиц:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск скрипта
clearPublicTables().catch((e) => {
  console.error(e);
  process.exit(1);
});
