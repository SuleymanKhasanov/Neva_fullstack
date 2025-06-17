// 🔒 backend/src/admin/admin-products-enhanced.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AdminProductsEnhancedService } from './admin-products-enhanced.service';
import {
  CreateProductEnhancedDto,
  UpdateProductEnhancedDto,
} from './dto/admin-product-enhanced.dto';
import { ImageService } from './image.service';

@ApiTags('Admin - Products Enhanced')
@Controller('admin/products-enhanced')
export class AdminProductsEnhancedController {
  private readonly logger = new Logger(AdminProductsEnhancedController.name);

  constructor(
    private readonly adminProductsService: AdminProductsEnhancedService,
    private readonly imageService: ImageService
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Получить все продукты с субкатегориями' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'subcategoryId', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  async getAllProducts(
    @Query('categoryId') categoryId?: number,
    @Query('subcategoryId') subcategoryId?: number,
    @Query('brandId') brandId?: number,
    @CurrentUser() user?: any
  ) {
    this.logger.log(`Admin ${user.username} requesting products with filters`);

    const products = await this.adminProductsService.findAll();

    // Фильтруем на стороне приложения (для простоты)
    let filteredProducts = products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.categoryId === parseInt(String(categoryId))
      );
    }

    if (subcategoryId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.subcategoryId === parseInt(String(subcategoryId))
      );
    }

    if (brandId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.brandId === parseInt(String(brandId))
      );
    }

    return {
      data: filteredProducts,
      total: filteredProducts.length,
      filters: {
        categoryId: categoryId ? parseInt(String(categoryId)) : null,
        subcategoryId: subcategoryId ? parseInt(String(subcategoryId)) : null,
        brandId: brandId ? parseInt(String(brandId)) : null,
      },
    };
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Получить продукт по ID с субкатегорией' })
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting product ${id}`);

    return this.adminProductsService.findOne(id);
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Создать продукт с субкатегорией' })
  @ApiResponse({
    status: 201,
    description: 'Продукт создан успешно',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Продукт создан' },
        data: {
          type: 'object',
          description: 'Данные созданного продукта',
        },
      },
    },
  })
  async createProduct(
    @Body() createProductDto: CreateProductEnhancedDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating product: ${createProductDto.translations[0]?.name} (subcategory: ${createProductDto.subcategoryId || 'none'})`
    );

    const product = await this.adminProductsService.create(createProductDto);

    return {
      success: true,
      message: 'Продукт создан',
      data: product,
    };
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Обновить продукт с субкатегорией' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductEnhancedDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating product ${id}`);

    const product = await this.adminProductsService.update(
      id,
      updateProductDto
    );

    return {
      success: true,
      message: 'Продукт обновлен',
      data: product,
    };
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Удалить продукт' })
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting product ${id}`);
    await this.adminProductsService.remove(id);

    return { success: true, message: 'Продукт удален' };
  }

  @Post(':id/images')
  @Auth()
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiOperation({ summary: 'Загрузить изображения продукта' })
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} uploading ${files.length} images for product ${id}`
    );
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
    const result = await this.imageService.processAndSaveImages(id, files);

    return {
      success: true,
      message: `Загружено ${result.length} изображений`,
      images: result,
    };
  }

  @Delete(':id/images/:imageId')
  @Auth()
  @ApiOperation({ summary: 'Удалить изображение продукта' })
  async deleteImage(
    @Param('id', ParseIntPipe) productId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} deleting image ${imageId} from product ${productId}`
    );
    await this.imageService.deleteImage(productId, imageId);

    return { success: true, message: 'Изображение удалено' };
  }

  @Get('by-category/:categoryId')
  @Auth()
  @ApiOperation({ summary: 'Получить продукты по категории' })
  async getProductsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} requesting products for category ${categoryId}`
    );

    const products = await this.adminProductsService.findAll();
    const filteredProducts = products.filter(
      (p) => p.categoryId === categoryId
    );

    return {
      data: filteredProducts,
      total: filteredProducts.length,
      categoryId,
    };
  }

  @Get('by-subcategory/:subcategoryId')
  @Auth()
  @ApiOperation({ summary: 'Получить продукты по субкатегории' })
  async getProductsBySubcategory(
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} requesting products for subcategory ${subcategoryId}`
    );

    const products = await this.adminProductsService.findAll();
    const filteredProducts = products.filter(
      (p) => p.subcategoryId === subcategoryId
    );

    return {
      data: filteredProducts,
      total: filteredProducts.length,
      subcategoryId,
    };
  }
}
