// 🔒 backend/src/admin/admin-products.controller.ts
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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AdminProductsService } from './admin-products.service';
import { ImageService } from './image.service';
import { CreateProductDto, UpdateProductDto } from './dto/admin-product.dto';

@ApiTags('Admin - Products')
@Controller('admin/products')
export class AdminProductsController {
  private readonly logger = new Logger(AdminProductsController.name);

  constructor(
    private readonly adminProductsService: AdminProductsService,
    private readonly imageService: ImageService
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Получить все продукты' })
  async getAllProducts(@CurrentUser() user: any) {
    this.logger.log(`Admin ${user.username} requesting all products`);
    return this.adminProductsService.findAll();
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Получить продукт по ID' })
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting product ${id}`);
    return this.adminProductsService.findOne(id);
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Создать продукт' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating product: ${createProductDto.translations[0]?.name}`
    );
    return this.adminProductsService.create(createProductDto);
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Обновить продукт' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating product ${id}`);
    return this.adminProductsService.update(id, updateProductDto);
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
  @ApiOperation({ summary: 'Загрузить изображения' })
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
  @ApiOperation({ summary: 'Удалить изображение' })
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
}
