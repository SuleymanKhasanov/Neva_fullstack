import { Controller, Get, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { GetBrandsDto } from './dto/get-brands.dto';
import { Section } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all brands with pagination' })
  @ApiQuery({ type: GetBrandsDto })
  @ApiResponse({
    status: 200,
    description: 'List of brands with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 130,
            name: 'Noutbuklar',
            locale: 'uz',
            section: 'NEVA',
            categoryId: 170,
            category: {
              id: 170,
              name: 'Asus, Lenovo, Acer, HP',
              locale: 'uz',
              section: 'NEVA',
            },
          },
        ],
        meta: {
          total: 200,
          page: 1,
          limit: 20,
          totalPages: 10,
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
  @Get('all')
  async getAllBrands(@Query() dto: GetBrandsDto) {
    return this.brandsService.getAllBrands(dto);
  }

  @ApiOperation({ summary: 'Get brands in NEVA section' })
  @ApiQuery({ type: GetBrandsDto })
  @ApiResponse({
    status: 200,
    description: 'List of NEVA brands with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 130,
            name: 'Noutbuklar',
            locale: 'uz',
            section: 'NEVA',
            categoryId: 170,
            category: {
              id: 170,
              name: 'Asus, Lenovo, Acer, HP',
              locale: 'uz',
              section: 'NEVA',
            },
          },
        ],
        meta: {
          total: 100,
          page: 1,
          limit: 20,
          totalPages: 5,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid locale or parameters' })
  @Get('neva')
  async getNevaBrands(@Query() dto: GetBrandsDto) {
    return this.brandsService.getBrandsBySection(dto, Section.NEVA);
  }

  @ApiOperation({ summary: 'Get brands in X_SOLUTION section' })
  @ApiQuery({ type: GetBrandsDto })
  @ApiResponse({
    status: 200,
    description: 'List of X_SOLUTION brands with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 131,
            name: 'Some Brand',
            locale: 'uz',
            section: 'X_SOLUTION',
            categoryId: 171,
            category: {
              id: 171,
              name: 'Other Category',
              locale: 'uz',
              section: 'X_SOLUTION',
            },
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
  @ApiResponse({ status: 400, description: 'Invalid locale or parameters' })
  @Get('x-solution')
  async getXSolutionBrands(@Query() dto: GetBrandsDto) {
    return this.brandsService.getBrandsBySection(dto, Section.X_SOLUTION);
  }
}
