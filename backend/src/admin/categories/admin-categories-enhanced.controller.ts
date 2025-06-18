// 🔒 backend/src/admin/admin-categories-enhanced.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Section, Locale } from '@prisma/client';

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CacheService } from '../../common/cache/cache.service';
import { PrismaService } from '../../common/database/prisma.service';

interface CreateCategoryDto {
  section: Section;
  translations: { locale: Locale; name: string }[];
}

interface CreateSubcategoryDto {
  categoryId: number;
  translations: { locale: Locale; name: string }[];
}

interface UpdateCategoryDto {
  section?: Section;
  translations?: { locale: Locale; name: string }[];
}

interface UpdateSubcategoryDto {
  categoryId?: number;
  translations?: { locale: Locale; name: string }[];
}

@ApiTags('Admin - Categories & Subcategories')
@Controller('admin/categories-enhanced')
export class AdminCategoriesEnhancedController {
  private readonly logger = new Logger(AdminCategoriesEnhancedController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  // ================== КАТЕГОРИИ ==================

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Получить все категории с субкатегориями' })
  @ApiQuery({ name: 'section', required: false, enum: Section })
  @ApiQuery({ name: 'locale', required: false, enum: Locale })
  async getAllCategories(
    @Query('section') section?: Section,
    @Query('locale') locale?: Locale,
    @CurrentUser() user?: any
  ) {
    this.logger.log(`Admin ${user.username} requesting categories`);

    const categories = await this.prisma.category.findMany({
      where: {
        ...(section && { section }),
      },
      include: {
        translations: {
          ...(locale && { where: { locale } }),
        },
        subcategories: {
          include: {
            translations: {
              ...(locale && { where: { locale } }),
            },
          },
        },
        _count: {
          select: {
            products: true,
            categoryBrands: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return categories.map((category) => ({
      id: category.id,
      section: category.section,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: category.translations,
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        categoryId: sub.categoryId,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
        translations: sub.translations,
      })),
      stats: {
        productsCount: category._count.products,
        brandsCount: category._count.categoryBrands,
        subcategoriesCount: category.subcategories.length,
      },
    }));
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Получить категорию по ID' })
  async getCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting category ${id}`);

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        translations: true,
        subcategories: {
          include: {
            translations: true,
            _count: {
              select: { products: true },
            },
          },
        },
        categoryBrands: {
          include: {
            brand: {
              include: { translations: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return {
      id: category.id,
      section: category.section,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: category.translations,
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        categoryId: sub.categoryId,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
        translations: sub.translations,
        productsCount: sub._count.products,
      })),
      brands: category.categoryBrands.map((cb) => ({
        id: cb.brand.id,
        section: cb.section,
        translations: cb.brand.translations,
      })),
      productsCount: category._count.products,
    };
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Создать категорию' })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating category: ${createCategoryDto.translations[0]?.name}`
    );

    const category = await this.prisma.category.create({
      data: {
        section: createCategoryDto.section,
        translations: { create: createCategoryDto.translations },
      },
      include: { translations: true },
    });

    // Инвалидируем кеш
    await this.invalidateCategoriesCache();

    return { success: true, message: 'Категория создана', data: category };
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Обновить категорию' })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating category ${id}`);

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    const updateData: any = {};
    if (updateCategoryDto.section) {
      updateData.section = updateCategoryDto.section;
    }

    await this.prisma.$transaction(async (tx) => {
      if (Object.keys(updateData).length > 0) {
        await tx.category.update({
          where: { id },
          data: updateData,
        });
      }

      if (updateCategoryDto.translations) {
        // Удаляем старые переводы
        await tx.categoryTranslation.deleteMany({ where: { categoryId: id } });
        // Создаем новые
        await tx.categoryTranslation.createMany({
          data: updateCategoryDto.translations.map((t) => ({
            categoryId: id,
            locale: t.locale,
            name: t.name,
          })),
        });
      }
    });

    await this.invalidateCategoriesCache();

    return { success: true, message: 'Категория обновлена' };
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Удалить категорию' })
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting category ${id}`);

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true, subcategories: true },
        },
      },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    if (category._count.products > 0) {
      throw new Error(
        `Cannot delete category: ${category._count.products} products are attached`
      );
    }

    if (category._count.subcategories > 0) {
      throw new Error(
        `Cannot delete category: ${category._count.subcategories} subcategories are attached`
      );
    }

    await this.prisma.category.delete({ where: { id } });
    await this.invalidateCategoriesCache();

    return { success: true, message: 'Категория удалена' };
  }

  // ================== СУБКАТЕГОРИИ ==================

  @Get('subcategories/all')
  @Auth()
  @ApiOperation({ summary: 'Получить все субкатегории' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'locale', required: false, enum: Locale })
  async getAllSubcategories(
    @Query('categoryId') categoryId?: number,
    @Query('locale') locale?: Locale,
    @CurrentUser() user?: any
  ) {
    this.logger.log(`Admin ${user.username} requesting subcategories`);

    const subcategories = await this.prisma.subcategory.findMany({
      where: {
        ...(categoryId && { categoryId: parseInt(String(categoryId)) }),
      },
      include: {
        translations: {
          ...(locale && { where: { locale } }),
        },
        category: {
          include: {
            translations: {
              ...(locale && { where: { locale } }),
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return subcategories.map((subcategory) => ({
      id: subcategory.id,
      categoryId: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      translations: subcategory.translations,
      category: {
        id: subcategory.category.id,
        section: subcategory.category.section,
        translations: subcategory.category.translations,
      },
      productsCount: subcategory._count.products,
    }));
  }

  @Get('subcategories/:id')
  @Auth()
  @ApiOperation({ summary: 'Получить субкатегорию по ID' })
  async getSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting subcategory ${id}`);

    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: {
        translations: true,
        category: {
          include: { translations: true },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!subcategory) {
      throw new Error(`Subcategory with ID ${id} not found`);
    }

    return {
      id: subcategory.id,
      categoryId: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      translations: subcategory.translations,
      category: {
        id: subcategory.category.id,
        section: subcategory.category.section,
        translations: subcategory.category.translations,
      },
      productsCount: subcategory._count.products,
    };
  }

  @Post('subcategories')
  @Auth()
  @ApiOperation({ summary: 'Создать субкатегорию' })
  async createSubcategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating subcategory: ${createSubcategoryDto.translations[0]?.name}`
    );

    // Проверяем существование категории
    const category = await this.prisma.category.findUnique({
      where: { id: createSubcategoryDto.categoryId },
    });

    if (!category) {
      throw new Error(
        `Category with ID ${createSubcategoryDto.categoryId} not found`
      );
    }

    const subcategory = await this.prisma.subcategory.create({
      data: {
        categoryId: createSubcategoryDto.categoryId,
        translations: { create: createSubcategoryDto.translations },
      },
      include: { translations: true },
    });

    await this.invalidateCategoriesCache();

    return {
      success: true,
      message: 'Субкатегория создана',
      data: subcategory,
    };
  }

  @Put('subcategories/:id')
  @Auth()
  @ApiOperation({ summary: 'Обновить субкатегорию' })
  async updateSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating subcategory ${id}`);

    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      throw new Error(`Subcategory with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      const updateData: any = {};
      if (updateSubcategoryDto.categoryId) {
        updateData.categoryId = updateSubcategoryDto.categoryId;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.subcategory.update({
          where: { id },
          data: updateData,
        });
      }

      if (updateSubcategoryDto.translations) {
        // Удаляем старые переводы
        await tx.subcategoryTranslation.deleteMany({
          where: { subcategoryId: id },
        });
        // Создаем новые
        await tx.subcategoryTranslation.createMany({
          data: updateSubcategoryDto.translations.map((t) => ({
            subcategoryId: id,
            locale: t.locale,
            name: t.name,
          })),
        });
      }
    });

    await this.invalidateCategoriesCache();

    return { success: true, message: 'Субкатегория обновлена' };
  }

  @Delete('subcategories/:id')
  @Auth()
  @ApiOperation({ summary: 'Удалить субкатегорию' })
  async deleteSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting subcategory ${id}`);

    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!subcategory) {
      throw new Error(`Subcategory with ID ${id} not found`);
    }

    if (subcategory._count.products > 0) {
      throw new Error(
        `Cannot delete subcategory: ${subcategory._count.products} products are attached`
      );
    }

    await this.prisma.subcategory.delete({ where: { id } });
    await this.invalidateCategoriesCache();

    return { success: true, message: 'Субкатегория удалена' };
  }

  // ================== СВЯЗЫВАНИЕ БРЕНДОВ С КАТЕГОРИЯМИ ==================

  @Post(':categoryId/brands/:brandId')
  @Auth()
  @ApiOperation({ summary: 'Привязать бренд к категории для секции' })
  async linkBrandToCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body('section') section: Section,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} linking brand ${brandId} to category ${categoryId} for section ${section}`
    );

    // Проверяем существование категории и бренда
    const [category, brand] = await Promise.all([
      this.prisma.category.findUnique({ where: { id: categoryId } }),
      this.prisma.brand.findUnique({ where: { id: brandId } }),
    ]);

    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    if (!brand) {
      throw new Error(`Brand with ID ${brandId} not found`);
    }

    // Создаем связь (если не существует)
    const existing = await this.prisma.categoryBrand.findUnique({
      where: {
        categoryId_brandId_section: {
          categoryId,
          brandId,
          section,
        },
      },
    });

    if (existing) {
      throw new Error(
        `Brand ${brandId} is already linked to category ${categoryId} for section ${section}`
      );
    }

    await this.prisma.categoryBrand.create({
      data: { categoryId, brandId, section },
    });

    await this.invalidateCategoriesCache();

    return { success: true, message: 'Бренд привязан к категории' };
  }

  @Delete(':categoryId/brands/:brandId')
  @Auth()
  @ApiOperation({ summary: 'Отвязать бренд от категории для секции' })
  async unlinkBrandFromCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body('section') section: Section,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} unlinking brand ${brandId} from category ${categoryId} for section ${section}`
    );

    const existing = await this.prisma.categoryBrand.findUnique({
      where: {
        categoryId_brandId_section: {
          categoryId,
          brandId,
          section,
        },
      },
    });

    if (!existing) {
      throw new Error(
        `Brand ${brandId} is not linked to category ${categoryId} for section ${section}`
      );
    }

    await this.prisma.categoryBrand.delete({
      where: { id: existing.id },
    });

    await this.invalidateCategoriesCache();

    return { success: true, message: 'Бренд отвязан от категории' };
  }

  // ================== УТИЛИТЫ ==================

  private async invalidateCategoriesCache() {
    try {
      await Promise.all([
        this.cacheService.invalidateByPattern('categories:*'),
        this.cacheService.invalidateByPattern('brands:*'),
        this.cacheService.invalidateByPattern('products:*'),
      ]);
      this.logger.log('Cache invalidated for categories');
    } catch (error) {
      this.logger.warn('Failed to invalidate cache:', error);
    }
  }
}
