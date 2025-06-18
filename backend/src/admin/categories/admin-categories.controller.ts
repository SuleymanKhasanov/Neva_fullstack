// src/admin/categories/admin-categories.controller.ts (исправленный)
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

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import { AdminCategoriesService } from './admin-categories.service';

interface CreateCategoryDto {
  section: string;
  translations: { locale: string; name: string }[];
}

interface CreateSubcategoryDto {
  categoryId: number;
  translations: { locale: string; name: string }[];
}

interface UpdateCategoryDto {
  section?: string;
  translations?: { locale: string; name: string }[];
}

interface UpdateSubcategoryDto {
  categoryId?: number;
  translations?: { locale: string; name: string }[];
}

@ApiTags('Admin - Categories & Subcategories')
@Controller('admin/categories')
@Auth()
export class AdminCategoriesController {
  private readonly logger = new Logger(AdminCategoriesController.name);

  constructor(
    private readonly adminCategoriesService: AdminCategoriesService
  ) {}

  // ================== КАТЕГОРИИ ==================

  @Get()
  @ApiOperation({ summary: 'Получить все категории с субкатегориями' })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'locale', required: false, enum: ['ru', 'en', 'kr', 'uz'] })
  async getAllCategories(
    @Query('section') section?: string,
    @Query('locale') locale?: string,
    @CurrentUser() user?: any
  ) {
    this.logger.log(`Admin ${user?.username} requesting categories`);

    return this.adminCategoriesService.getAllCategories(section, locale);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  async getCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting category ${id}`);

    return this.adminCategoriesService.getCategory(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать категорию' })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating category: ${createCategoryDto.translations[0]?.name}`
    );

    const category =
      await this.adminCategoriesService.createCategory(createCategoryDto);

    return { success: true, message: 'Категория создана', data: category };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить категорию' })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating category ${id}`);

    return this.adminCategoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию' })
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting category ${id}`);

    return this.adminCategoriesService.deleteCategory(id);
  }

  // ================== СУБКАТЕГОРИИ ==================

  @Get('subcategories/all')
  @ApiOperation({ summary: 'Получить все субкатегории' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'locale', required: false, enum: ['ru', 'en', 'kr', 'uz'] })
  async getAllSubcategories(
    @Query('categoryId') categoryId?: number,
    @Query('locale') locale?: string,
    @CurrentUser() user?: any
  ) {
    this.logger.log(`Admin ${user?.username} requesting subcategories`);

    return this.adminCategoriesService.getAllSubcategories(categoryId, locale);
  }

  @Get('subcategories/:id')
  @ApiOperation({ summary: 'Получить субкатегорию по ID' })
  async getSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting subcategory ${id}`);

    return this.adminCategoriesService.getSubcategory(id);
  }

  @Post('subcategories')
  @ApiOperation({ summary: 'Создать субкатегорию' })
  async createSubcategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating subcategory: ${createSubcategoryDto.translations[0]?.name}`
    );

    const subcategory =
      await this.adminCategoriesService.createSubcategory(createSubcategoryDto);

    return {
      success: true,
      message: 'Субкатегория создана',
      data: subcategory,
    };
  }

  @Put('subcategories/:id')
  @ApiOperation({ summary: 'Обновить субкатегорию' })
  async updateSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating subcategory ${id}`);

    return this.adminCategoriesService.updateSubcategory(
      id,
      updateSubcategoryDto
    );
  }

  @Delete('subcategories/:id')
  @ApiOperation({ summary: 'Удалить субкатегорию' })
  async deleteSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting subcategory ${id}`);

    return this.adminCategoriesService.deleteSubcategory(id);
  }

  // ================== СВЯЗЫВАНИЕ БРЕНДОВ С КАТЕГОРИЯМИ ==================

  @Post(':categoryId/brands/:brandId')
  @ApiOperation({ summary: 'Привязать бренд к категории для секции' })
  async linkBrandToCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body('section') section: string,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} linking brand ${brandId} to category ${categoryId} for section ${section}`
    );

    return this.adminCategoriesService.linkBrandToCategory(
      categoryId,
      brandId,
      section
    );
  }

  @Delete(':categoryId/brands/:brandId')
  @ApiOperation({ summary: 'Отвязать бренд от категории для секции' })
  async unlinkBrandFromCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body('section') section: string,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} unlinking brand ${brandId} from category ${categoryId} for section ${section}`
    );

    return this.adminCategoriesService.unlinkBrandFromCategory(
      categoryId,
      brandId,
      section
    );
  }
}
