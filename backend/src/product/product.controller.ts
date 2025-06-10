// backend/src/product/product.controller.ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Public } from '../auth/decorators/public.decorator';
import { ProductService } from './product.service';
import {
  ProductResponseDto,
  ProductDetailDto,
  GetProductDto,
} from './dto/product.dto';

@ApiTags('Product')
@Controller('product')
@Public()
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Get(':locale/:id')
  @ApiOperation({
    summary: 'Get product by ID and locale',
    description:
      'Retrieve detailed information about a specific product by its ID and locale. Returns complete product data including brand, category, images, and SEO metadata in the specified language.',
  })
  @ApiParam({
    name: 'locale',
    type: 'string',
    description: 'Product locale',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'ru',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Product ID',
    example: 123,
  })
  @ApiResponse({
    status: 200,
    description: 'Product details retrieved successfully',
    type: ProductResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'string',
          example: 'Product with ID 123 and locale ru not found',
        },
        statusCode: { type: 'number', example: 404 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid product ID or locale',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Invalid product ID or locale' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  async getProduct(
    @Param('locale') locale: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductResponseDto> {
    try {
      this.logger.log(`📦 Fetching product with ID: ${id}, locale: ${locale}`);

      // Валидация ID
      if (!id || id <= 0) {
        throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
      }

      // Валидация локали
      if (!['ru', 'en', 'kr', 'uz'].includes(locale)) {
        throw new HttpException(
          'Invalid locale. Supported: ru, en, kr, uz',
          HttpStatus.BAD_REQUEST
        );
      }

      const startTime = Date.now();
      const product = await this.productService.getProductById(id, locale);
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `✅ Product ${id}:${locale} fetched successfully in ${responseTime}ms`
      );

      return {
        data: product,
        success: true,
      };
    } catch (error) {
      this.logger.error(`❌ Failed to fetch product ${id}:${locale}:`, error);

      if (error instanceof HttpException) {
        throw error;
      }

      // Обработка ошибок из сервиса
      if (error instanceof Error && error.message.includes('not found')) {
        throw new HttpException(
          `Product with ID ${id} and locale ${locale} not found`,
          HttpStatus.NOT_FOUND
        );
      }

      // Общая ошибка сервера
      throw new HttpException(
        'Internal server error while fetching product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':locale/:id/exists')
  @ApiOperation({
    summary: 'Check if product exists for specific locale',
    description:
      'Check if a product with the given ID exists in the database for the specified locale.',
  })
  @ApiParam({
    name: 'locale',
    type: 'string',
    description: 'Product locale',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'ru',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Product ID to check',
    example: 123,
  })
  @ApiResponse({
    status: 200,
    description: 'Product existence check result',
    schema: {
      type: 'object',
      properties: {
        exists: { type: 'boolean', example: true },
        id: { type: 'number', example: 123 },
        locale: { type: 'string', example: 'ru' },
        success: { type: 'boolean', example: true },
      },
    },
  })
  async checkProductExists(
    @Param('locale') locale: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<{
    exists: boolean;
    id: number;
    locale: string;
    success: boolean;
  }> {
    try {
      this.logger.log(`🔍 Checking if product ${id}:${locale} exists`);

      if (!id || id <= 0) {
        throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
      }

      if (!['ru', 'en', 'kr', 'uz'].includes(locale)) {
        throw new HttpException(
          'Invalid locale. Supported: ru, en, kr, uz',
          HttpStatus.BAD_REQUEST
        );
      }

      const exists = await this.productService.productExists(id, locale);

      this.logger.log(`📊 Product ${id}:${locale} exists: ${exists}`);

      return {
        exists,
        id,
        locale,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `❌ Failed to check product ${id}:${locale} existence:`,
        error
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error while checking product existence',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
