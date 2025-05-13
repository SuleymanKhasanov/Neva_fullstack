import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';
import { Section } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiQuery({ type: GetProductsDto })
  @ApiResponse({
    status: 200,
    description: 'List of products with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 1099,
            name: 'ASUS Vivobook 15',
            image: '/images/product_4_1747056565657.webp',
            description:
              'Intel Core i5-1235U/ DDR4 8GB/ SSD 512GB/ 15.6» FHD IPS/ Intel UHD Graphics/ NoOS/ RU',
            section: 'NEVA',
            locale: 'uz',
            brand: {
              id: 130,
              name: 'Noutbuklar',
              locale: 'uz',
              section: 'NEVA',
            },
            category: {
              id: 170,
              name: 'Asus, Lenovo, Acer, HP',
              locale: 'uz',
              section: 'NEVA',
            },
          },
        ],
        meta: {
          total: 366,
          page: 1,
          limit: 20,
          totalPages: 19,
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
  async getAllProducts(@Query() dto: GetProductsDto) {
    return this.productsService.getAllProducts(dto);
  }

  @ApiOperation({ summary: 'Get products in NEVA section' })
  @ApiQuery({ type: GetProductsDto })
  @ApiResponse({
    status: 200,
    description: 'List of NEVA products with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 1099,
            name: 'ASUS Vivobook 15',
            image: '/images/product_4_1747056565657.webp',
            description:
              'Intel Core i5-1235U/ DDR4 8GB/ SSD 512GB/ 15.6» FHD IPS/ Intel UHD Graphics/ NoOS/ RU',
            section: 'NEVA',
            locale: 'uz',
            brand: {
              id: 130,
              name: 'Noutbuklar',
              locale: 'uz',
              section: 'NEVA',
            },
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
          limit: 10,
          totalPages: 10,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid locale or parameters' })
  @Get('neva')
  async getNevaProducts(@Query() dto: GetProductsDto) {
    return this.productsService.getProductsBySection(dto, Section.NEVA);
  }

  @ApiOperation({ summary: 'Get products in X_SOLUTION section' })
  @ApiQuery({ type: GetProductsDto })
  @ApiResponse({
    status: 200,
    description: 'List of X_SOLUTION products with pagination metadata',
    schema: {
      example: {
        data: [
          {
            id: 1100,
            name: 'Some X_Solution Product',
            image: '/images/product_5_1747056565658.webp',
            description: 'Description of X_Solution product',
            section: 'X_SOLUTION',
            locale: 'uz',
            brand: {
              id: 131,
              name: 'Some Brand',
              locale: 'uz',
              section: 'X_SOLUTION',
            },
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
          limit: 10,
          totalPages: 5,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid locale or parameters' })
  @Get('x-solution')
  async getXSolutionProducts(@Query() dto: GetProductsDto) {
    return this.productsService.getProductsBySection(dto, Section.X_SOLUTION);
  }
}
