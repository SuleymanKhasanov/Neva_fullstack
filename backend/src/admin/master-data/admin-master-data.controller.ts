import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Section, Locale } from '@prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminMasterDataService } from './admin-master-data.service';

@Controller('admin/master-data')
@UseGuards(JwtAuthGuard)
export class AdminMasterDataController {
  constructor(
    private readonly adminMasterDataService: AdminMasterDataService
  ) {}

  // ==================== АДМИНСКИЕ КАТЕГОРИИ ====================

  @Get('categories')
  async getAdminCategories(
    @Query('locale') locale: Locale = Locale.ru,
    @Query('section') section?: Section
  ) {
    try {
      return await this.adminMasterDataService.getAdminCategories(
        locale,
        section
      );
    } catch (error) {
      throw new HttpException(
        'Failed to fetch admin categories',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('categories/:id')
  async getAdminCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: Locale = Locale.ru
  ) {
    try {
      const category = await this.adminMasterDataService.getAdminCategoryById(
        id,
        locale
      );

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch admin category',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ==================== АДМИНСКИЕ ПОДКАТЕГОРИИ ====================

  @Get('subcategories')
  async getAdminSubcategories(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
    @Query('locale') locale?: Locale
  ) {
    try {
      return await this.adminMasterDataService.getAdminSubcategories(
        categoryId,
        locale
      );
    } catch (error) {
      throw new HttpException(
        'Failed to fetch admin subcategories',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('subcategories/:id')
  async getAdminSubcategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: Locale = Locale.ru
  ) {
    try {
      const subcategory =
        await this.adminMasterDataService.getAdminSubcategoryById(id, locale);

      if (!subcategory) {
        throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
      }

      return subcategory;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch admin subcategory',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ==================== АДМИНСКИЕ БРЕНДЫ ====================

  @Get('brands')
  async getAdminBrands(
    @Query('locale') locale: Locale = Locale.ru,
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
    @Query('section') section?: Section
  ) {
    try {
      return await this.adminMasterDataService.getAdminBrands(
        locale,
        categoryId,
        section
      );
    } catch (error) {
      throw new HttpException(
        'Failed to fetch admin brands',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('brands/:id')
  async getAdminBrandById(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: Locale = Locale.ru
  ) {
    try {
      const brand = await this.adminMasterDataService.getAdminBrandById(
        id,
        locale
      );

      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }

      return brand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch admin brand',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ==================== СВЯЗИ КАТЕГОРИИ-БРЕНДЫ ====================

  @Get('categories/:categoryId/brands')
  async getAdminBrandsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('locale') locale: Locale = Locale.ru,
    @Query('section') section?: Section
  ) {
    try {
      return await this.adminMasterDataService.getAdminBrandsByCategory(
        categoryId,
        locale,
        section
      );
    } catch (error) {
      throw new HttpException(
        'Failed to fetch brands by category',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ==================== СТАТИСТИКА ====================

  @Get('stats')
  async getAdminMasterDataStats() {
    try {
      return await this.adminMasterDataService.getAdminMasterDataStats();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch admin master data stats',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ==================== КЕШ ====================

  @Get('cache/invalidate')
  async invalidateAdminCache(
    @Query('locale') locale?: string,
    @Query('section') section?: string
  ) {
    try {
      return await this.adminMasterDataService.invalidateAdminCache(
        locale,
        section
      );
    } catch (error) {
      throw new HttpException(
        'Failed to invalidate admin cache',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
