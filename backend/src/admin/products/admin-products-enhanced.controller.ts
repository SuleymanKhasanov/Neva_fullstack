// backend/src/admin/products/admin-products-enhanced.controller.ts
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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiQuery, ApiConsumes } from '@nestjs/swagger';

import { Section, Locale } from '@prisma/client';

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { AdminProductsEnhancedService } from '../admin-products-enhanced.service';
import { ImageService } from '../../common/upload/image.service';
import {
  CreateProductEnhancedDto,
  UpdateProductEnhancedDto,
} from '../dto/admin-product-enhanced.dto';

@ApiTags('Admin - Products Enhanced')
@Controller('admin/products')
@Auth()
export class AdminProductsEnhancedController {
  private readonly logger = new Logger(AdminProductsEnhancedController.name);

  constructor(
    private readonly adminProductsService: AdminProductsEnhancedService,
    private readonly imageService: ImageService
  ) {}

  // ================== ПРОДУКТЫ ==================

  @Get()
  @ApiOperation({ summary: 'Получить все продукты' })
  @ApiQuery({ name: 'section', required: false, enum: Section })
  @ApiQuery({ name: 'locale', required: false, enum: Locale })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllProducts(
    @Query('section') section?: Section,
    @Query('locale') locale?: Locale,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @CurrentUser() user?: Record<string, unknown>
  ) {
    this.logger.log(`Admin ${user?.username} requesting products`);

    const products = await this.adminProductsService.findAll();

    // Базовая фильтрация
    let filteredProducts = products;

    if (section) {
      filteredProducts = filteredProducts.filter((p) => p.section === section);
    }

    if (locale) {
      filteredProducts = filteredProducts.filter((p) =>
        p.translations.some((t) => t.locale === locale)
      );
    }

    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNextPage: endIndex < filteredProducts.length,
        hasPrevPage: page > 1,
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(`Admin ${user.username} requesting product ${id}`);

    return this.adminProductsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать продукт (без изображений)' })
  async createProduct(
    @Body() createProductDto: CreateProductEnhancedDto,
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(
      `Admin ${user.username} creating product: ${createProductDto.translations?.[0]?.name || 'Unknown'}`
    );

    try {
      const product = await this.adminProductsService.create(createProductDto);

      this.logger.log(`Product created with ID: ${product.id}`);

      return {
        success: true,
        message: 'Продукт успешно создан',
        productId: product.id,
        data: product,
      };
    } catch (error) {
      this.logger.error(`Error creating product:`, error);
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт (без изображений)' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductEnhancedDto,
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(`Admin ${user.username} updating product ${id}`);

    try {
      const product = await this.adminProductsService.update(
        id,
        updateProductDto
      );

      return {
        success: true,
        message: 'Продукт успешно обновлен',
        data: product,
      };
    } catch (error) {
      this.logger.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт' })
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(`Admin ${user.username} deleting product ${id}`);

    await this.adminProductsService.remove(id);

    return {
      success: true,
      message: 'Продукт успешно удален',
    };
  }

  // ================== МАССОВЫЕ ОПЕРАЦИИ ==================

  @Post('bulk/delete')
  @ApiOperation({ summary: 'Массовое удаление продуктов' })
  async bulkDeleteProducts(
    @Body('ids') ids: number[],
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(
      `Admin ${user.username} bulk deleting ${ids.length} products`
    );

    for (const id of ids) {
      await this.adminProductsService.remove(id);
    }

    return {
      success: true,
      message: `Удалено продуктов: ${ids.length}`,
    };
  }

  @Put('bulk/toggle-status')
  @ApiOperation({ summary: 'Массовое изменение статуса продуктов' })
  async bulkToggleStatus(
    @Body('ids') ids: number[],
    @Body('isActive') isActive: boolean,
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(
      `Admin ${user.username} bulk toggling status for ${ids.length} products to ${isActive}`
    );

    for (const id of ids) {
      await this.adminProductsService.update(id, { isActive });
    }

    return {
      success: true,
      message: `Статус изменен для ${ids.length} продуктов`,
    };
  }

  // ================== ИЗОБРАЖЕНИЯ ==================

  @Post(':id/images')
  @ApiOperation({ summary: 'Загрузить изображения для продукта' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadProductImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
    @CurrentUser() user: Record<string, unknown>
  ) {
    this.logger.log(
      `Admin ${user.username} uploading ${images?.length || 0} images for product ${id}`
    );

    if (!images || images.length === 0) {
      this.logger.warn(`No images provided for product ${id}`);
      return {
        success: false,
        message: 'Нет изображений для загрузки',
        error: 'NO_IMAGES',
      };
    }

    // Проверяем что продукт существует
    try {
      const product = await this.adminProductsService.findOne(id);
      this.logger.log(`Product ${id} exists: ${product.translations[0]?.name}`);
    } catch (error) {
      this.logger.error(`Product ${id} not found:`, error);
      return {
        success: false,
        message: `Продукт с ID ${id} не найден`,
        error: 'PRODUCT_NOT_FOUND',
      };
    }

    // Валидация файлов
    const validImages = images.filter((img) => {
      const isValidType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
      ].includes(img.mimetype);
      const isValidSize = img.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validImages.length === 0) {
      this.logger.warn(`No valid images for product ${id}`);
      return {
        success: false,
        message: 'Нет подходящих изображений (только JPEG, PNG, WebP до 10MB)',
        error: 'NO_VALID_IMAGES',
      };
    }

    // Обрабатываем и сохраняем изображения через ImageService
    this.logger.log(
      `Processing ${validImages.length} valid images for product ${id}`
    );

    try {
      const processedImages = await this.imageService.processAndSaveImages(
        id,
        validImages
      );

      this.logger.log(
        `Successfully processed ${processedImages.length} images for product ${id}`
      );

      return {
        success: true,
        message: `Успешно загружено и обработано ${processedImages.length} изображений`,
        productId: id,
        processedImages: processedImages,
      };
    } catch (error) {
      this.logger.error(`Error processing images for product ${id}:`, error);
      return {
        success: false,
        message: 'Ошибка обработки изображений',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id,
      };
    }
  }

  // ================== СТАТИСТИКА ==================

  @Get('stats/overview')
  @ApiOperation({ summary: 'Статистика по продуктам' })
  async getProductsStats(@CurrentUser() user: Record<string, unknown>) {
    this.logger.log(`Admin ${user.username} requesting products stats`);

    const products = await this.adminProductsService.findAll();

    const stats = {
      total: products.length,
      active: products.filter((p) => p.isActive).length,
      inactive: products.filter((p) => !p.isActive).length,
      bySection: {
        NEVA: products.filter((p) => p.section === 'NEVA').length,
        X_SOLUTION: products.filter((p) => p.section === 'X_SOLUTION').length,
      },
      withBrand: products.filter((p) => p.brandId).length,
      withoutBrand: products.filter((p) => !p.brandId).length,
      withSubcategory: products.filter((p) => p.subcategoryId).length,
      withoutSubcategory: products.filter((p) => !p.subcategoryId).length,
    };

    return stats;
  }
}
