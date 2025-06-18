// src/admin/products/admin-products.controller.ts (исправленный)
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import {
  CreateProductDto,
  UpdateProductDto,
  AdminProductResponseDto,
  AdminProductsListResponseDto,
} from '../dto/product.dto';

import { AdminProductsService } from './admin-products.service';

interface AdminUser {
  username: string;
  role: string;
}

@ApiTags('Admin - Products Management')
@Controller('admin/products')
@Auth() // Все эндпойнты требуют JWT авторизации
export class AdminProductsController {
  private readonly logger = new Logger(AdminProductsController.name);

  constructor(private readonly adminProductsService: AdminProductsService) {}

  // ==================== ОСНОВНЫЕ CRUD ОПЕРАЦИИ ====================

  @Get()
  @ApiOperation({
    summary: 'Получить список продуктов для администрирования',
    description: 'Возвращает продукты с расширенной информацией для управления',
  })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'subcategoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiQuery({ name: 'section', required: false, enum: ['NEVA', 'X_SOLUTION'] })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['createdAt', 'updatedAt', 'name'],
  })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  async getProducts(
    @Query('categoryId') categoryId?: number,
    @Query('subcategoryId') subcategoryId?: number,
    @Query('brandId') brandId?: number,
    @Query('section') section?: string,
    @Query('isActive') isActive?: boolean,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
    @Query('search') search?: string,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @CurrentUser() user?: AdminUser
  ): Promise<AdminProductsListResponseDto> {
    this.logger.log(
      `Admin ${user?.username} requesting products list with filters`
    );

    return this.adminProductsService.getProducts({
      categoryId,
      subcategoryId,
      brandId,
      section,
      isActive,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить продукт по ID для редактирования',
    description:
      'Возвращает полную информацию о продукте включая все переводы и характеристики',
  })
  @ApiParam({ name: 'id', type: Number })
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user?: AdminUser
  ): Promise<AdminProductResponseDto> {
    this.logger.log(
      `Admin ${user?.username} requesting product ${id} for editing`
    );

    return this.adminProductsService.getProduct(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать новый продукт',
    description:
      'Создает продукт с поддержкой субкатегорий и множественных переводов',
  })
  @ApiResponse({
    status: 201,
    description: 'Продукт успешно создан',
    type: AdminProductResponseDto,
  })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user?: AdminUser
  ): Promise<AdminProductResponseDto> {
    this.logger.log(
      `Admin ${user?.username} creating product: ${createProductDto.translations[0]?.name}`
    );

    const product =
      await this.adminProductsService.createProduct(createProductDto);

    this.logger.log(`Product created with ID: ${product.id}`);

    return product;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить продукт',
    description:
      'Обновляет информацию о продукте включая переводы и характеристики',
  })
  @ApiParam({ name: 'id', type: Number })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user?: AdminUser
  ): Promise<AdminProductResponseDto> {
    this.logger.log(`Admin ${user?.username} updating product ${id}`);

    const product = await this.adminProductsService.updateProduct(
      id,
      updateProductDto
    );

    this.logger.log(`Product ${id} updated successfully`);

    return product;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить продукт',
    description: 'Мягкое удаление - устанавливает isActive = false',
  })
  @ApiParam({ name: 'id', type: Number })
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(`Admin ${user?.username} deleting product ${id}`);

    await this.adminProductsService.deleteProduct(id);

    this.logger.log(`Product ${id} deleted successfully`);

    return {
      success: true,
      message: 'Продукт удален',
      id,
    };
  }

  // ==================== УПРАВЛЕНИЕ ИЗОБРАЖЕНИЯМИ ====================

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiOperation({
    summary: 'Загрузить изображения продукта',
    description:
      'Загрузка и обработка изображений с автоматической конвертацией в WebP',
  })
  @ApiParam({ name: 'id', type: Number })
  async uploadProductImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} uploading ${files.length} images for product ${id}`
    );

    const result = await this.adminProductsService.uploadImages(id, files);

    this.logger.log(
      `${result.uploaded.length} images uploaded for product ${id}`
    );

    return result;
  }

  @Delete(':id/images/:imageId')
  @ApiOperation({
    summary: 'Удалить изображение продукта',
    description: 'Удаляет изображение и связанные файлы с диска',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукта' })
  @ApiParam({ name: 'imageId', type: Number, description: 'ID изображения' })
  async deleteProductImage(
    @Param('id', ParseIntPipe) productId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} deleting image ${imageId} from product ${productId}`
    );

    await this.adminProductsService.deleteImage(productId, imageId);

    return {
      success: true,
      message: 'Изображение удалено',
      imageId,
    };
  }

  @Put(':id/images/:imageId/primary')
  @ApiOperation({
    summary: 'Установить основное изображение',
    description: 'Делает изображение основным для продукта',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'imageId', type: Number })
  async setPrimaryImage(
    @Param('id', ParseIntPipe) productId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} setting image ${imageId} as primary for product ${productId}`
    );

    await this.adminProductsService.setPrimaryImage(productId, imageId);

    return {
      success: true,
      message: 'Основное изображение установлено',
    };
  }

  // ==================== МАССОВЫЕ ОПЕРАЦИИ ====================

  @Post('bulk/activate')
  @ApiOperation({
    summary: 'Массовая активация продуктов',
    description: 'Активирует несколько продуктов одновременно',
  })
  async bulkActivateProducts(
    @Body('productIds') productIds: number[],
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} bulk activating ${productIds.length} products`
    );

    const result = await this.adminProductsService.bulkUpdateStatus(
      productIds,
      true
    );

    return {
      success: true,
      message: `Активировано ${result.count} продуктов`,
      updated: result.count,
    };
  }

  @Post('bulk/deactivate')
  @ApiOperation({
    summary: 'Массовая деактивация продуктов',
    description: 'Деактивирует несколько продуктов одновременно',
  })
  async bulkDeactivateProducts(
    @Body('productIds') productIds: number[],
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} bulk deactivating ${productIds.length} products`
    );

    const result = await this.adminProductsService.bulkUpdateStatus(
      productIds,
      false
    );

    return {
      success: true,
      message: `Деактивировано ${result.count} продуктов`,
      updated: result.count,
    };
  }

  @Delete('bulk')
  @ApiOperation({
    summary: 'Массовое удаление продуктов',
    description: 'Удаляет несколько продуктов одновременно',
  })
  async bulkDeleteProducts(
    @Body('productIds') productIds: number[],
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} bulk deleting ${productIds.length} products`
    );

    const result = await this.adminProductsService.bulkDelete(productIds);

    return {
      success: true,
      message: `Удалено ${result.count} продуктов`,
      deleted: result.count,
    };
  }

  // ==================== СВЯЗИ И ПРИВЯЗКИ ====================

  @Post(':id/categories/:categoryId')
  @ApiOperation({
    summary: 'Переместить продукт в другую категорию',
    description: 'Изменяет категорию продукта',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукта' })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    description: 'ID новой категории',
  })
  async moveToCategory(
    @Param('id', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('subcategoryId') subcategoryId?: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} moving product ${productId} to category ${categoryId}`
    );

    await this.adminProductsService.moveToCategory(
      productId,
      categoryId,
      subcategoryId
    );

    return {
      success: true,
      message: 'Продукт перемещен в другую категорию',
    };
  }

  @Put(':id/brand/:brandId')
  @ApiOperation({
    summary: 'Изменить бренд продукта',
    description: 'Привязывает продукт к другому бренду',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукта' })
  @ApiParam({ name: 'brandId', type: Number, description: 'ID нового бренда' })
  async changeBrand(
    @Param('id', ParseIntPipe) productId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} changing brand for product ${productId} to ${brandId}`
    );

    await this.adminProductsService.changeBrand(productId, brandId);

    return {
      success: true,
      message: 'Бренд продукта изменен',
    };
  }

  // ==================== ХАРАКТЕРИСТИКИ ПРОДУКТОВ ====================

  @Post(':id/specifications')
  @ApiOperation({
    summary: 'Добавить характеристику продукта',
    description: 'Добавляет новую характеристику с переводами',
  })
  @ApiParam({ name: 'id', type: Number })
  async addSpecification(
    @Param('id', ParseIntPipe) productId: number,
    @Body() specificationDto: any, // TODO: создать DTO
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} adding specification to product ${productId}`
    );

    const specification = await this.adminProductsService.addSpecification(
      productId,
      specificationDto
    );

    return {
      success: true,
      message: 'Характеристика добавлена',
      data: specification,
    };
  }

  @Delete(':id/specifications/:specId')
  @ApiOperation({
    summary: 'Удалить характеристику продукта',
    description: 'Удаляет характеристику и все ее переводы',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукта' })
  @ApiParam({ name: 'specId', type: Number, description: 'ID характеристики' })
  async deleteSpecification(
    @Param('id', ParseIntPipe) productId: number,
    @Param('specId', ParseIntPipe) specId: number,
    @CurrentUser() user?: AdminUser
  ) {
    this.logger.log(
      `Admin ${user?.username} deleting specification ${specId} from product ${productId}`
    );

    await this.adminProductsService.deleteSpecification(productId, specId);

    return {
      success: true,
      message: 'Характеристика удалена',
    };
  }

  // ==================== СТАТИСТИКА И АНАЛИТИКА ====================

  @Get('stats/overview')
  @ApiOperation({
    summary: 'Общая статистика продуктов',
    description: 'Возвращает сводную статистику по продуктам',
  })
  async getProductsStats(@CurrentUser() user?: AdminUser) {
    this.logger.log(`Admin ${user?.username} requesting products statistics`);

    return this.adminProductsService.getProductsStats();
  }

  @Get('stats/by-category')
  @ApiOperation({
    summary: 'Статистика по категориям',
    description: 'Количество продуктов в каждой категории',
  })
  async getStatsByCategory(@CurrentUser() user?: AdminUser) {
    this.logger.log(`Admin ${user?.username} requesting stats by category`);

    return this.adminProductsService.getStatsByCategory();
  }

  @Get('stats/by-brand')
  @ApiOperation({
    summary: 'Статистика по брендам',
    description: 'Количество продуктов для каждого бренда',
  })
  async getStatsByBrand(@CurrentUser() user?: AdminUser) {
    this.logger.log(`Admin ${user?.username} requesting stats by brand`);

    return this.adminProductsService.getStatsByBrand();
  }
}
