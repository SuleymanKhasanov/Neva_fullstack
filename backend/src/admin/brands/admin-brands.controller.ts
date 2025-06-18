// src/admin/brands/admin-brands.controller.ts (исправленный)
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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import { AdminBrandsService } from './admin-brands.service';

interface CreateBrandDto {
  translations: { locale: string; name: string }[];
}

interface UpdateBrandDto {
  translations?: { locale: string; name: string }[];
}

@ApiTags('Admin - Brands')
@Controller('admin/brands')
@Auth()
export class AdminBrandsController {
  private readonly logger = new Logger(AdminBrandsController.name);

  constructor(private readonly adminBrandsService: AdminBrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все бренды' })
  async getAllBrands(@CurrentUser() user: any) {
    this.logger.log(`Admin ${user.username} requesting all brands`);

    return this.adminBrandsService.getAllBrands();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить бренд по ID' })
  async getBrand(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} requesting brand ${id}`);

    return this.adminBrandsService.getBrand(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать бренд' })
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating brand: ${createBrandDto.translations[0]?.name}`
    );

    const brand = await this.adminBrandsService.createBrand(createBrandDto);

    return { success: true, message: 'Бренд создан', data: brand };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить бренд' })
  async updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} updating brand ${id}`);

    return this.adminBrandsService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить бренд' })
  async deleteBrand(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Admin ${user.username} deleting brand ${id}`);

    return this.adminBrandsService.deleteBrand(id);
  }
}
