// backend/src/admin/admin-products.controller.ts
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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';

import { AdminProductsService } from './admin-products.service';
import { ImageService } from './image.service';
import { CreateProductDto, UpdateProductDto } from './dto/admin-product.dto';

@ApiTags('Admin - Products')
@Controller('admin/products')
@UsePipes(new ValidationPipe({ transform: true }))
export class AdminProductsController {
  private readonly logger = new Logger(AdminProductsController.name);

  constructor(
    private readonly adminProductsService: AdminProductsService,
    private readonly imageService: ImageService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Получить все продукты для админ панели' })
  async getAllProducts() {
    return this.adminProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.adminProductsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiResponse({ status: 201, description: 'Продукт создан' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    this.logger.log(
      'Creating product:',
      createProductDto.translations[0]?.name
    );
    return this.adminProductsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    this.logger.log(`Updating product ID: ${id}`);
    return this.adminProductsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Deleting product ID: ${id}`);
    await this.adminProductsService.remove(id);
    return { success: true, message: 'Продукт удален' };
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Загрузить изображения' })
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    this.logger.log(`Uploading ${files.length} images for product ${id}`);

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
  @ApiOperation({ summary: 'Удалить изображение' })
  async deleteImage(
    @Param('id', ParseIntPipe) productId: number,
    @Param('imageId', ParseIntPipe) imageId: number
  ) {
    await this.imageService.deleteImage(productId, imageId);
    return { success: true, message: 'Изображение удалено' };
  }
}
