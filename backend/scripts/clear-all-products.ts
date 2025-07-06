import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllProducts() {
  try {
    console.log('🗑️ Удаление всех продуктов и связанных данных...');

    await prisma.$transaction(async (tx) => {
      // Удаляем переводы характеристик
      const deletedSpecTranslations =
        await tx.productSpecificationTranslation.deleteMany({});
      console.log(
        `Удалено переводов характеристик: ${deletedSpecTranslations.count}`
      );

      // Удаляем характеристики
      const deletedSpecs = await tx.productSpecification.deleteMany({});
      console.log(`Удалено характеристик: ${deletedSpecs.count}`);

      // Удаляем изображения
      const deletedImages = await tx.productImage.deleteMany({});
      console.log(`Удалено изображений: ${deletedImages.count}`);

      // Удаляем переводы продуктов
      const deletedTranslations = await tx.productTranslation.deleteMany({});
      console.log(`Удалено переводов продуктов: ${deletedTranslations.count}`);

      // Удаляем продукты
      const deletedProducts = await tx.product.deleteMany({});
      console.log(`Удалено продуктов: ${deletedProducts.count}`);

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

      // Удаляем бренды в публичных таблицах
      const deletedBrands = await tx.brand.deleteMany({});
      console.log(`Удалено брендов: ${deletedBrands.count}`);

      // Удаляем переводы подкатегорий в публичных таблицах
      const deletedSubcategoryTranslations =
        await tx.subcategoryTranslation.deleteMany({});
      console.log(
        `Удалено переводов подкатегорий: ${deletedSubcategoryTranslations.count}`
      );

      // Удаляем подкатегории в публичных таблицах
      const deletedSubcategories = await tx.subcategory.deleteMany({});
      console.log(`Удалено подкатегорий: ${deletedSubcategories.count}`);

      // Удаляем переводы категорий в публичных таблицах
      const deletedCategoryTranslations =
        await tx.categoryTranslation.deleteMany({});
      console.log(
        `Удалено переводов категорий: ${deletedCategoryTranslations.count}`
      );

      // Удаляем категории в публичных таблицах
      const deletedCategories = await tx.category.deleteMany({});
      console.log(`Удалено категорий: ${deletedCategories.count}`);
    });

    console.log('✅ Все продукты и публичные данные удалены!');
    console.log(
      '🔄 Теперь продукты можно создавать заново из админских данных'
    );
  } catch (error) {
    console.error('❌ Ошибка при удалении продуктов:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск скрипта
clearAllProducts().catch((e) => {
  console.error(e);
  process.exit(1);
});
