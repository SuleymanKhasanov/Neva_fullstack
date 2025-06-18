// src/public/public.controller.ts
import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

import { Public } from '../auth/decorators/public.decorator';

import {
  ProductsResponseDto,
  ProductDetailDto,
  CategoriesResponseDto,
  BrandsResponseDto,
  SearchResponseDto,
  MenuResponseDto,
} from './dto';
import { PublicService } from './public.service';

@ApiTags('Public Catalog API')
@Controller('api')
@Public() // Все эндпойнты публичные
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  // ==================== ПРОДУКТЫ ====================

  @Get('products')
  @ApiOperation({
    summary: 'Получить список продуктов',
    description: 'Возвращает продукты с фильтрацией, пагинацией и поиском',
  })
  @ApiQuery({
    name: 'locale',
    required: false,
    example: 'ru',
    enum: ['ru', 'en', 'uz', 'kr'],
  })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'subcategoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getProducts(
    @Query('locale') locale: string = 'ru',
    @Query('section') section?: string,
    @Query('categoryId') categoryId?: number,
    @Query('subcategoryId') subcategoryId?: number,
    @Query('brandId') brandId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string
  ): Promise<ProductsResponseDto> {
    return this.publicService.getProducts({
      locale,
      section,
      categoryId,
      subcategoryId,
      brandId,
      page,
      limit,
      search,
    });
  }

  @Get('products/:id')
  @ApiOperation({
    summary: 'Получить детали продукта',
    description:
      'Возвращает полную информацию о продукте включая характеристики, изображения, SEO данные',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукта' })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: string = 'ru'
  ): Promise<ProductDetailDto> {
    const product = await this.publicService.getProduct(id, locale);
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return product;
  }

  @Get('products/section/:section')
  @ApiOperation({
    summary: 'Продукты по секции',
    description: 'Получить продукты NEVA или X-SOLUTION',
  })
  @ApiParam({ name: 'section', enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async getProductsBySection(
    @Param('section') section: string,
    @Query('locale') locale: string = 'ru',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ): Promise<ProductsResponseDto> {
    return this.publicService.getProducts({
      locale,
      section: section.toUpperCase(),
      page,
      limit,
    });
  }

  @Get('products/slug/:locale/:slug')
  @ApiOperation({
    summary: 'Получить продукт по slug',
    description:
      'Для SEO-дружественных URL вида /ru/product/123/amazing-product',
  })
  @ApiParam({ name: 'locale', enum: ['ru', 'en', 'uz', 'kr'] })
  @ApiParam({ name: 'slug', type: String, description: 'SEO slug продукта' })
  async getProductBySlug(
    @Param('locale') locale: string,
    @Param('slug') slug: string
  ): Promise<ProductDetailDto> {
    const product = await this.publicService.getProductBySlug(slug, locale);
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return product;
  }

  // ==================== КАТЕГОРИИ ====================

  @Get('categories')
  @ApiOperation({
    summary: 'Получить все категории',
    description: 'Возвращает категории с субкатегориями и связанными брендами',
  })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({
    name: 'withSubcategories',
    required: false,
    type: Boolean,
    example: true,
  })
  @ApiQuery({
    name: 'withBrands',
    required: false,
    type: Boolean,
    example: true,
  })
  async getCategories(
    @Query('locale') locale: string = 'ru',
    @Query('section') section?: string,
    @Query('withSubcategories') withSubcategories: boolean = true,
    @Query('withBrands') withBrands: boolean = true
  ): Promise<CategoriesResponseDto> {
    return this.publicService.getCategories({
      locale,
      section,
      withSubcategories,
      withBrands,
    });
  }

  @Get('categories/:id')
  @ApiOperation({
    summary: 'Получить категорию по ID',
    description: 'Детальная информация о категории с субкатегориями и брендами',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: string = 'ru'
  ) {
    const category = await this.publicService.getCategory(id, locale);
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return category;
  }

  @Get('categories/:id/products')
  @ApiOperation({
    summary: 'Продукты категории',
    description:
      'Все продукты определенной категории с возможностью фильтрации по субкатегории',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID категории' })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'subcategoryId', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async getCategoryProducts(
    @Param('id', ParseIntPipe) categoryId: number,
    @Query('locale') locale: string = 'ru',
    @Query('subcategoryId') subcategoryId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ): Promise<ProductsResponseDto> {
    return this.publicService.getProducts({
      locale,
      categoryId,
      subcategoryId,
      page,
      limit,
    });
  }

  @Get('categories/:id/subcategories')
  @ApiOperation({
    summary: 'Субкатегории категории',
    description: 'Все субкатегории определенной категории',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID категории' })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getCategorySubcategories(
    @Param('id', ParseIntPipe) categoryId: number,
    @Query('locale') locale: string = 'ru'
  ) {
    return this.publicService.getSubcategories(categoryId, locale);
  }

  // ==================== БРЕНДЫ ====================

  @Get('brands')
  @ApiOperation({
    summary: 'Получить все бренды',
    description: 'Список брендов с фильтрацией по секции и категории',
  })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  async getBrands(
    @Query('locale') locale: string = 'ru',
    @Query('section') section?: string,
    @Query('categoryId') categoryId?: number
  ): Promise<BrandsResponseDto> {
    return this.publicService.getBrands({
      locale,
      section,
      categoryId,
    });
  }

  @Get('brands/:id')
  @ApiOperation({
    summary: 'Получить бренд по ID',
    description: 'Детальная информация о бренде',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getBrand(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: string = 'ru'
  ) {
    const brand = await this.publicService.getBrand(id, locale);
    if (!brand) {
      throw new NotFoundException('Бренд не найден');
    }

    return brand;
  }

  @Get('brands/:id/products')
  @ApiOperation({
    summary: 'Продукты бренда',
    description: 'Все продукты определенного бренда',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID бренда' })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async getBrandProducts(
    @Param('id', ParseIntPipe) brandId: number,
    @Query('locale') locale: string = 'ru',
    @Query('categoryId') categoryId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ): Promise<ProductsResponseDto> {
    return this.publicService.getProducts({
      locale,
      brandId,
      categoryId,
      page,
      limit,
    });
  }

  // ==================== ПОИСК ====================

  @Get('search')
  @ApiOperation({
    summary: 'Поиск по каталогу',
    description: 'Полнотекстовый поиск по продуктам, категориям и брендам',
  })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Поисковый запрос (минимум 2 символа)',
  })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async search(
    @Query('q') query: string,
    @Query('locale') locale: string = 'ru',
    @Query('section') section?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ): Promise<SearchResponseDto> {
    if (!query || query.trim().length < 2) {
      return {
        products: [],
        categories: [],
        brands: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
        query: query.trim(),
      };
    }

    return this.publicService.search({
      query: query.trim(),
      locale,
      section,
      page,
      limit,
    });
  }

  // ==================== НАВИГАЦИЯ ====================

  @Get('menu')
  @ApiOperation({
    summary: 'Данные для навигационного меню',
    description:
      'Иерархическая структура категорий с субкатегориями и брендами для отображения в меню',
  })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getMenuData(
    @Query('locale') locale: string = 'ru'
  ): Promise<MenuResponseDto> {
    return this.publicService.getMenuData(locale);
  }

  @Get('menu/:section')
  @ApiOperation({
    summary: 'Меню для конкретной секции',
    description: 'Данные меню только для NEVA или X-SOLUTION',
  })
  @ApiParam({ name: 'section', enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'locale', required: false, example: 'ru' })
  async getSectionMenu(
    @Param('section') section: string,
    @Query('locale') locale: string = 'ru'
  ): Promise<MenuResponseDto> {
    return this.publicService.getMenuData(locale, section.toUpperCase());
  }

  // ==================== СОВМЕСТИМОСТЬ (для существующих API) ====================

  @Get('products/all/:locale')
  @ApiOperation({
    summary: 'Все продукты для ISR',
    description:
      'Для совместимости с Next.js ISR. Возвращает все продукты для конкретной локали',
  })
  @ApiParam({ name: 'locale', enum: ['ru', 'en', 'uz', 'kr'] })
  async getAllProductsForISR(@Param('locale') locale: string) {
    const result = await this.publicService.getProducts({
      locale,
      page: 1,
      limit: 1000, // Большой лимит для ISR
    });

    return {
      success: true,
      data: { products: result.products },
    };
  }

  @Get('product/:locale/:id')
  @ApiOperation({
    summary: 'Продукт для ISR',
    description: 'Для совместимости с Next.js ISR',
  })
  @ApiParam({ name: 'locale', enum: ['ru', 'en', 'uz', 'kr'] })
  @ApiParam({ name: 'id', type: Number })
  async getProductForISR(
    @Param('locale') locale: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    const product = await this.publicService.getProduct(id, locale);
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return {
      success: true,
      data: product,
    };
  }
}
