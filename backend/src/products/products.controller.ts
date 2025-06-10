// backend/src/products/products.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { Section } from '@prisma/client';

import { Public } from '../auth/decorators/public.decorator';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductsService } from './products.service';

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

class CategoryResponse {
  @ApiProperty({ description: 'Category ID', example: 1 })
  id?: number;

  @ApiProperty({ description: 'Category name', example: 'Ноутбуки' })
  name?: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale?: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section?: Section;
}

class PaginationMeta {
  @ApiProperty({ description: 'Total number of products', example: 100 })
  total?: number;

  @ApiProperty({ description: 'Current page', example: 1 })
  page?: number;

  @ApiProperty({ description: 'Items per page', example: 20 })
  limit?: number;

  @ApiProperty({ description: 'Total pages', example: 5 })
  totalPages?: number;
}

class ProductResponse {
  @ApiProperty({ description: 'Product ID', example: 1 })
  id?: number;

  @ApiProperty({ description: 'Product name', example: 'ASUS Vivobook' })
  name?: string;

  @ApiProperty({ description: 'Locale', example: 'ru' })
  locale?: string;

  @ApiProperty({ description: 'Section', example: 'NEVA' })
  section?: Section;

  @ApiProperty({ description: 'Description', example: 'A powerful laptop' })
  description?: string;

  @ApiProperty({
    description: 'Image URL',
    example: '/images/product_1_resized.webp',
  })
  image?: string;

  @ApiProperty({
    description: 'Full image URL',
    example: '/images/product_1_full.webp',
  })
  fullImage?: string;

  @ApiProperty({ description: 'Brand', type: () => BrandResponse })
  brand?: BrandResponse;

  @ApiProperty({ description: 'Category', type: () => CategoryResponse })
  category?: CategoryResponse;
}

class ProductsResponse {
  @ApiProperty({
    description: 'List of products',
    type: () => [ProductResponse],
  })
  data?: ProductResponse[];

  @ApiProperty({
    description: 'Metadata for pagination',
    type: () => PaginationMeta,
  })
  meta?: PaginationMeta;
}

@ApiTags('Products')
@Controller('products')
@Public() // ← ДОБАВИТЬ ДЛЯ ВСЕГО КОНТРОЛЛЕРА
export class NevaProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: ProductsResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getAllProducts(@Query() dto: GetProductsDto) {
    const result = await this.productsService.getProducts({
      locale: dto.locale,
      page: dto.page,
      limit: 20,
      categoryId: dto.categoryId,
      brandId: dto.brandId,
    });

    return {
      data: result.products,
      meta: {
        total: result.totalCount,
        page: dto.page,
        limit: 20,
        totalPages: Math.ceil(result.totalCount / 20),
      },
    };
  }

  @Get('neva')
  @ApiOperation({ summary: 'Get NEVA products' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of NEVA products',
    type: ProductsResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getNevaProducts(@Query() dto: GetProductsDto) {
    const result = await this.productsService.getProducts({
      locale: dto.locale,
      page: dto.page,
      limit: 20,
      section: Section.NEVA,
      categoryId: dto.categoryId,
      brandId: dto.brandId,
    });

    return {
      data: result.products,
      meta: {
        total: result.totalCount,
        page: dto.page,
        limit: 20,
        totalPages: Math.ceil(result.totalCount / 20),
      },
    };
  }

  @Get('x-solution')
  @ApiOperation({ summary: 'Get X_SOLUTION products' })
  @ApiQuery({
    name: 'locale',
    required: true,
    type: String,
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of X_SOLUTION products',
    type: ProductsResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getXSolutionProducts(@Query() dto: GetProductsDto) {
    const result = await this.productsService.getProducts({
      locale: dto.locale,
      page: dto.page,
      limit: 20,
      section: Section.X_SOLUTION,
      categoryId: dto.categoryId,
      brandId: dto.brandId,
    });

    return {
      data: result.products,
      meta: {
        total: result.totalCount,
        page: dto.page,
        limit: 20,
        totalPages: Math.ceil(result.totalCount / 20),
      },
    };
  }
}
