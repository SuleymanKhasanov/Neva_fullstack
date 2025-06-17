// backend/src/routes/public.ts
import { Router } from 'express';

import { PrismaClient, Locale, Section } from '../../generated/prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Получить локаль из запроса (по умолчанию русский)
const getLocale = (req: any): Locale => {
  const locale = req.query.locale || req.headers['accept-language'] || 'ru';
  const supportedLocales = Object.values(Locale);

  return supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : Locale.ru;
};

// ===================
// ПУБЛИЧНЫЕ КАТЕГОРИИ
// ===================

// Получить категории с товарами (только те, к которым привязаны товары)
router.get('/categories', async (req, res) => {
  try {
    const locale = getLocale(req);
    const section = req.query.section as Section;

    const where: any = {
      products: {
        some: {
          isActive: true,
        },
      },
    };

    if (section) {
      where.section = section;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        translations: {
          where: {
            locale,
          },
        },
        subcategories: {
          where: {
            products: {
              some: {
                isActive: true,
              },
            },
          },
          include: {
            translations: {
              where: {
                locale,
              },
            },
            _count: {
              select: {
                products: {
                  where: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            products: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    // Форматируем ответ для удобства фронтенда
    const formattedCategories = categories.map((category) => ({
      id: category.id,
      section: category.section,
      name: category.translations[0]?.name || 'Без названия',
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.translations[0]?.name || 'Без названия',
        productsCount: subcategory._count.products,
      })),
      productsCount: category._count.products,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    res.json({
      success: true,
      data: formattedCategories,
      locale,
      totalCategories: formattedCategories.length,
    });
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения категорий',
    });
  }
});

// Получить одну категорию с субкатегориями
router.get('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const locale = getLocale(req);

    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
        products: {
          some: {
            isActive: true,
          },
        },
      },
      include: {
        translations: {
          where: {
            locale,
          },
        },
        subcategories: {
          where: {
            products: {
              some: {
                isActive: true,
              },
            },
          },
          include: {
            translations: {
              where: {
                locale,
              },
            },
            subcategoryBrands: {
              include: {
                brand: {
                  include: {
                    translations: {
                      where: {
                        locale,
                      },
                    },
                  },
                },
              },
            },
            _count: {
              select: {
                products: {
                  where: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Категория не найдена или не содержит товаров',
      });
    }

    const formattedCategory = {
      id: category.id,
      section: category.section,
      name: category.translations[0]?.name || 'Без названия',
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.translations[0]?.name || 'Без названия',
        brands: subcategory.subcategoryBrands.map((sb) => ({
          id: sb.brand.id,
          name: sb.brand.translations[0]?.name || 'Без названия',
        })),
        productsCount: subcategory._count.products,
      })),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    res.json({
      success: true,
      data: formattedCategory,
      locale,
    });
  } catch (error) {
    console.error('Ошибка получения категории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения категории',
    });
  }
});

// ===================
// ПУБЛИЧНЫЕ СУБКАТЕГОРИИ
// ===================

// Получить субкатегории с товарами
router.get('/subcategories', async (req, res) => {
  try {
    const locale = getLocale(req);
    const categoryId = req.query.categoryId;

    const where: any = {
      products: {
        some: {
          isActive: true,
        },
      },
    };

    if (categoryId) {
      where.categoryId = parseInt(categoryId as string);
    }

    const subcategories = await prisma.subcategory.findMany({
      where,
      include: {
        translations: {
          where: {
            locale,
          },
        },
        category: {
          include: {
            translations: {
              where: {
                locale,
              },
            },
          },
        },
        subcategoryBrands: {
          include: {
            brand: {
              include: {
                translations: {
                  where: {
                    locale,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            products: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const formattedSubcategories = subcategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.translations[0]?.name || 'Без названия',
      category: {
        id: subcategory.category.id,
        name: subcategory.category.translations[0]?.name || 'Без названия',
        section: subcategory.category.section,
      },
      brands: subcategory.subcategoryBrands.map((sb) => ({
        id: sb.brand.id,
        name: sb.brand.translations[0]?.name || 'Без названия',
      })),
      productsCount: subcategory._count.products,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }));

    res.json({
      success: true,
      data: formattedSubcategories,
      locale,
      totalSubcategories: formattedSubcategories.length,
    });
  } catch (error) {
    console.error('Ошибка получения субкатегорий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения субкатегорий',
    });
  }
});

// ===================
// ПУБЛИЧНЫЕ БРЕНДЫ
// ===================

// Получить бренды с товарами
router.get('/brands', async (req, res) => {
  try {
    const locale = getLocale(req);
    const subcategoryId = req.query.subcategoryId;

    const where: any = {
      products: {
        some: {
          isActive: true,
        },
      },
    };

    // Если указана субкатегория, фильтруем по ней
    if (subcategoryId) {
      where.subcategoryBrands = {
        some: {
          subcategoryId: parseInt(subcategoryId as string),
        },
      };
    }

    const brands = await prisma.brand.findMany({
      where,
      include: {
        translations: {
          where: {
            locale,
          },
        },
        subcategoryBrands: {
          include: {
            subcategory: {
              include: {
                translations: {
                  where: {
                    locale,
                  },
                },
                category: {
                  include: {
                    translations: {
                      where: {
                        locale,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            products: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        translations: {
          _count: 'desc',
        },
      },
    });

    const formattedBrands = brands.map((brand) => ({
      id: brand.id,
      name: brand.translations[0]?.name || 'Без названия',
      subcategories: brand.subcategoryBrands.map((sb) => ({
        id: sb.subcategory.id,
        name: sb.subcategory.translations[0]?.name || 'Без названия',
        category: {
          id: sb.subcategory.category.id,
          name: sb.subcategory.category.translations[0]?.name || 'Без названия',
          section: sb.subcategory.category.section,
        },
      })),
      productsCount: brand._count.products,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    }));

    res.json({
      success: true,
      data: formattedBrands,
      locale,
      totalBrands: formattedBrands.length,
    });
  } catch (error) {
    console.error('Ошибка получения брендов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения брендов',
    });
  }
});

// ===================
// СТРУКТУРА КАТАЛОГА
// ===================

// Получить полную структуру каталога (категории -> субкатегории -> бренды)
router.get('/catalog-structure', async (req, res) => {
  try {
    const locale = getLocale(req);
    const section = req.query.section as Section;

    const where: any = {
      products: {
        some: {
          isActive: true,
        },
      },
    };

    if (section) {
      where.section = section;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        translations: {
          where: {
            locale,
          },
        },
        subcategories: {
          where: {
            products: {
              some: {
                isActive: true,
              },
            },
          },
          include: {
            translations: {
              where: {
                locale,
              },
            },
            subcategoryBrands: {
              include: {
                brand: {
                  where: {
                    products: {
                      some: {
                        isActive: true,
                      },
                    },
                  },
                  include: {
                    translations: {
                      where: {
                        locale,
                      },
                    },
                    _count: {
                      select: {
                        products: {
                          where: {
                            isActive: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const catalogStructure = categories.map((category) => ({
      id: category.id,
      section: category.section,
      name: category.translations[0]?.name || 'Без названия',
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.translations[0]?.name || 'Без названия',
        brands: subcategory.subcategoryBrands
          .filter((sb) => sb.brand) // Фильтруем только те бренды, которые есть
          .map((sb) => ({
            id: sb.brand.id,
            name: sb.brand.translations[0]?.name || 'Без названия',
            productsCount: sb.brand._count.products,
          })),
      })),
    }));

    res.json({
      success: true,
      data: catalogStructure,
      locale,
      totalCategories: catalogStructure.length,
      totalSubcategories: catalogStructure.reduce(
        (acc, cat) => acc + cat.subcategories.length,
        0
      ),
      totalBrands: catalogStructure.reduce(
        (acc, cat) =>
          acc +
          cat.subcategories.reduce(
            (subAcc, subcat) => subAcc + subcat.brands.length,
            0
          ),
        0
      ),
    });
  } catch (error) {
    console.error('Ошибка получения структуры каталога:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения структуры каталога',
    });
  }
});

export default router;
