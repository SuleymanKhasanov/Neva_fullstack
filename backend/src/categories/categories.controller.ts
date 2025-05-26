import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { Section } from '@prisma/client';

import { CategoriesService } from './categories.service';
import { GetCategoriesDto } from './dto/get-categories.dto';

class CategoryResponse {
  @ApiProperty({ description: 'Category ID', example: 1 })
  id?: number;

  @ApiProperty({ description: 'Category name', example: 'Ноутбуки' })
  name?: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale?: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section?: Section;

  @ApiProperty({
    description: 'List of brands in the category',
    type: () => [BrandResponse],
  })
  brands?: BrandResponse[];
}

class BrandResponse {
  @ApiProperty({ description: 'Brand ID', example: 1 })
  id?: number;

  @ApiProperty({ description: 'Brand name', example: 'ASUS' })
  name?: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale?: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section?: Section;
}

class CategoriesResponse {
  @ApiProperty({
    description: 'List of categories',
    type: () => [CategoryResponse],
  })
  data?: CategoryResponse[];
}

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all categories with brands' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of all categories with brands',
    type: CategoriesResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid locale' })
  async getAllCategories(@Query() dto: GetCategoriesDto) {
    const result = await this.categoriesService.getCategories(dto);

    return { data: result.categories };
  }

  @Get('neva')
  @ApiOperation({ summary: 'Get NEVA categories with brands' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of NEVA categories with brands',
    type: CategoriesResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid locale' })
  async getNevaCategories(@Query() dto: GetCategoriesDto) {
    const result = await this.categoriesService.getCategories({
      ...dto,
      section: Section.NEVA,
    });

    return { data: result.categories };
  }

  @Get('x-solution')
  @ApiOperation({ summary: 'Get X_SOLUTION categories with brands' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of X_SOLUTION categories with brands',
    type: CategoriesResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid locale' })
  async getXSolutionCategories(@Query() dto: GetCategoriesDto) {
    const result = await this.categoriesService.getCategories({
      ...dto,
      section: Section.X_SOLUTION,
    });

    return { data: result.categories };
  }
}
