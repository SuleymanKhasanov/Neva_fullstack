// backend/src/categories/categories-enhanced.controller.ts
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { Section } from '@prisma/client';

import { Public } from '../auth/decorators/public.decorator';

import { CategoriesEnhancedService } from './categories-enhanced.service';

class SubcategoryResponseDto {
  @ApiProperty({ description: 'Subcategory ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Subcategory name', example: 'Ручки' })
  name!: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale!: string;

  @ApiProperty({ description: 'Products count', example: 15 })
  productsCount!: number;

  @ApiProperty({ description: 'Brands count', example: 3 })
  brandsCount!: number;
}

class CategoryWithSubcategoriesDto {
  @ApiProperty({ description: 'Category ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Category name', example: 'Канцтовары' })
  name!: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale!: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section!: Section;

  @ApiProperty({
    description: 'Subcategories with products',
    type: [SubcategoryResponseDto],
  })
  subcategories!: SubcategoryResponseDto[];

  @ApiProperty({ description: 'Brands count', example: 5 })
  brandsCount!: number;

  @ApiProperty({ description: 'Products count', example: 25 })
  productsCount!: number;
}

class CategoriesEnhancedResponseDto {
  @ApiProperty({
    description: 'Categories with subcategories',
    type: [CategoryWithSubcategoriesDto],
  })
  data!: CategoryWithSubcategoriesDto[];
}

@ApiTags('Categories Enhanced')
@Controller('categories-enhanced')
@Public()
export class CategoriesEnhancedController {
  constructor(
    private readonly categoriesEnhancedService: CategoriesEnhancedService
  ) {}

  @Get('all')
  @ApiOperation({
    summary: 'Получить все категории с субкатегориями (только с продуктами)',
    description:
      'Возвращает только те категории и субкатегории, к которым привязаны активные продукты',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'Categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getAllCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale
      );

    return { data: result.categories };
  }

  @Get('neva')
  @ApiOperation({
    summary: 'Получить NEVA категории с субкатегориями',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'NEVA categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getNevaCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale,
        Section.NEVA
      );

    return { data: result.categories };
  }

  @Get('x-solution')
  @ApiOperation({
    summary: 'Получить X_SOLUTION категории с субкатегориями',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'X_SOLUTION categories with subcategories',
    type: CategoriesEnhancedResponseDto,
  })
  async getXSolutionCategoriesWithSubcategories(
    @Query('locale') locale: string
  ): Promise<CategoriesEnhancedResponseDto> {
    const result =
      await this.categoriesEnhancedService.getCategoriesWithSubcategories(
        locale,
        Section.X_SOLUTION
      );

    return { data: result.categories };
  }

  @Get(':categoryId/subcategories')
  @ApiOperation({
    summary: 'Получить субкатегории конкретной категории',
  })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategories for category',
    type: [SubcategoryResponseDto],
  })
  async getSubcategoriesByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('locale') locale: string
  ): Promise<{ data: SubcategoryResponseDto[] }> {
    const subcategories =
      await this.categoriesEnhancedService.getSubcategoriesByCategory(
        categoryId,
        locale
      );

    return { data: subcategories };
  }
}
