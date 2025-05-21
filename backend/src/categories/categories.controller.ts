import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Section } from '@prisma/client';

import { CategoriesService } from './categories.service';
import { GetCategoriesDto } from './dto/get-categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Get categories in NEVA section with related brands',
  })
  @ApiQuery({ type: GetCategoriesDto })
  @ApiResponse({
    status: 200,
    description: 'List of NEVA categories with pagination metadata and brands',
    schema: {
      example: {
        data: [
          {
            id: 170,
            locale: 'uz',
            name: 'Asus, Lenovo, Acer, HP',
            section: 'NEVA',
            brands: [
              {
                id: 130,
                name: 'Noutbuklar',
                locale: 'uz',
                section: 'NEVA',
                categoryId: 170,
              },
            ],
          },
        ],
        meta: {
          total: 50,
          page: 1,
          limit: 20,
          totalPages: 3,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid locale or parameters',
    schema: {
      example: {
        statusCode: 400,
        message: ['locale must be one of the following values: ru, en, kr, uz'],
        error: 'Bad Request',
      },
    },
  })
  @Get('neva')
  async getNevaCategories(@Query() dto: GetCategoriesDto) {
    return this.categoriesService.getCategoriesBySection(dto, Section.NEVA);
  }

  @ApiOperation({
    summary: 'Get categories in X_SOLUTION section with related brands',
  })
  @ApiQuery({ type: GetCategoriesDto })
  @ApiResponse({
    status: 200,
    description:
      'List of X_SOLUTION categories with pagination metadata and brands',
    schema: {
      example: {
        data: [
          {
            id: 171,
            locale: 'uz',
            name: 'Other Category',
            section: 'X_SOLUTION',
            brands: [
              {
                id: 131,
                name: 'Some Brand',
                locale: 'uz',
                section: 'X_SOLUTION',
                categoryId: 171,
              },
            ],
          },
        ],
        meta: {
          total: 30,
          page: 1,
          limit: 20,
          totalPages: 2,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid locale or parameters' })
  @Get('x-solution')
  async getXSolutionCategories(@Query() dto: GetCategoriesDto) {
    return this.categoriesService.getCategoriesBySection(
      dto,
      Section.X_SOLUTION
    );
  }
}
