// backend/src/routes/admin.ts
import { Router } from 'express';

import { PrismaClient, Locale, Section } from '../../generated/prisma/client';
import { authMiddleware } from '../middleware/auth';
import { validateAdminRole } from '../middleware/validateRole';

const router = Router();
const prisma = new PrismaClient();

// Middleware для проверки админ доступа
router.use(authMiddleware);
router.use(validateAdminRole);

// ===================
// КАТЕГОРИИ
// ===================

// Получить все категории с переводами
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        translations: true,
        subcategories: {
          include: {
            translations: true,
          },
        },
        _count: {
          select: {
            products: true,
            subcategories: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения категорий',
    });
  }
});

// Создать новую категорию
router.post('/categories', async (req, res) => {
  try {
    const { section, translations } = req.body;

    // Валидация
    if (!section || !translations || Object.keys(translations).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Секция и переводы обязательны',
      });
    }

    // Проверяем, что все локали присутствуют
    const requiredLocales = Object.values(Locale);
    const providedLocales = Object.keys(translations);
    const missingLocales = requiredLocales.filter(
      (locale) => !providedLocales.includes(locale)
    );

    if (missingLocales.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Отсутствуют переводы для локалей: ${missingLocales.join(', ')}`,
      });
    }

    const category = await prisma.category.create({
      data: {
        section: section as Section,
        translations: {
          create: Object.entries(translations).map(([locale, name]) => ({
            locale: locale as Locale,
            name: name as string,
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    res.status(201).json({
      success: true,
      data: category,
      message: 'Категория успешно создана',
    });
  } catch (error) {
    console.error('Ошибка создания категории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания категории',
    });
  }
});

// Обновить категорию
router.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { section, translations } = req.body;

    // Проверяем существование категории
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Категория не найдена',
      });
    }

    // Обновляем категорию
    const updateData: any = {};
    if (section) updateData.section = section as Section;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        translations: true,
      },
    });

    // Обновляем переводы
    if (translations) {
      await prisma.categoryTranslation.deleteMany({
        where: { categoryId: parseInt(id) },
      });

      await prisma.categoryTranslation.createMany({
        data: Object.entries(translations).map(([locale, name]) => ({
          categoryId: parseInt(id),
          locale: locale as Locale,
          name: name as string,
        })),
      });
    }

    const updatedCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        translations: true,
      },
    });

    res.json({
      success: true,
      data: updatedCategory,
      message: 'Категория успешно обновлена',
    });
  } catch (error) {
    console.error('Ошибка обновления категории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления категории',
    });
  }
});

// Удалить категорию
router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Проверяем существование категории
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        subcategories: true,
        products: true,
      },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Категория не найдена',
      });
    }

    // Проверяем, есть ли связанные данные
    if (
      existingCategory.subcategories.length > 0 ||
      existingCategory.products.length > 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Нельзя удалить категорию, к которой привязаны субкатегории или товары',
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: 'Категория успешно удалена',
    });
  } catch (error) {
    console.error('Ошибка удаления категории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления категории',
    });
  }
});

// ===================
// СУБКАТЕГОРИИ
// ===================

// Получить все субкатегории
router.get('/subcategories', async (req, res) => {
  try {
    const { categoryId } = req.query;

    const where = categoryId
      ? { categoryId: parseInt(categoryId as string) }
      : {};

    const subcategories = await prisma.subcategory.findMany({
      where,
      include: {
        translations: true,
        category: {
          include: {
            translations: true,
          },
        },
        subcategoryBrands: {
          include: {
            brand: {
              include: {
                translations: true,
              },
            },
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    res.json({
      success: true,
      data: subcategories,
    });
  } catch (error) {
    console.error('Ошибка получения субкатегорий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения субкатегорий',
    });
  }
});

// Создать новую субкатегорию
router.post('/subcategories', async (req, res) => {
  try {
    const { categoryId, translations, brandIds = [] } = req.body;

    if (!categoryId || !translations) {
      return res.status(400).json({
        success: false,
        message: 'ID категории и переводы обязательны',
      });
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        categoryId: parseInt(categoryId),
        translations: {
          create: Object.entries(translations).map(([locale, name]) => ({
            locale: locale as Locale,
            name: name as string,
          })),
        },
        subcategoryBrands: {
          create: brandIds.map((brandId: number) => ({
            brandId,
          })),
        },
      },
      include: {
        translations: true,
        category: {
          include: {
            translations: true,
          },
        },
        subcategoryBrands: {
          include: {
            brand: {
              include: {
                translations: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: subcategory,
      message: 'Субкатегория успешно создана',
    });
  } catch (error) {
    console.error('Ошибка создания субкатегории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания субкатегории',
    });
  }
});

// ===================
// БРЕНДЫ
// ===================

// Получить все бренды
router.get('/brands', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        translations: true,
        subcategoryBrands: {
          include: {
            subcategory: {
              include: {
                translations: true,
                category: {
                  include: {
                    translations: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    res.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    console.error('Ошибка получения брендов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения брендов',
    });
  }
});

// Создать новый бренд
router.post('/brands', async (req, res) => {
  try {
    const { translations, subcategoryIds = [] } = req.body;

    if (!translations) {
      return res.status(400).json({
        success: false,
        message: 'Переводы обязательны',
      });
    }

    const brand = await prisma.brand.create({
      data: {
        translations: {
          create: Object.entries(translations).map(([locale, name]) => ({
            locale: locale as Locale,
            name: name as string,
          })),
        },
        subcategoryBrands: {
          create: subcategoryIds.map((subcategoryId: number) => ({
            subcategoryId,
          })),
        },
      },
      include: {
        translations: true,
        subcategoryBrands: {
          include: {
            subcategory: {
              include: {
                translations: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: brand,
      message: 'Бренд успешно создан',
    });
  } catch (error) {
    console.error('Ошибка создания бренда:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания бренда',
    });
  }
});

// Обновить связи бренда с субкатегориями
router.put('/brands/:id/subcategories', async (req, res) => {
  try {
    const { id } = req.params;
    const { subcategoryIds } = req.body;

    // Удаляем старые связи
    await prisma.subcategoryBrand.deleteMany({
      where: { brandId: parseInt(id) },
    });

    // Создаем новые связи
    if (subcategoryIds && subcategoryIds.length > 0) {
      await prisma.subcategoryBrand.createMany({
        data: subcategoryIds.map((subcategoryId: number) => ({
          brandId: parseInt(id),
          subcategoryId,
        })),
      });
    }

    const updatedBrand = await prisma.brand.findUnique({
      where: { id: parseInt(id) },
      include: {
        translations: true,
        subcategoryBrands: {
          include: {
            subcategory: {
              include: {
                translations: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      data: updatedBrand,
      message: 'Связи бренда успешно обновлены',
    });
  } catch (error) {
    console.error('Ошибка обновления связей бренда:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления связей бренда',
    });
  }
});

export default router;
