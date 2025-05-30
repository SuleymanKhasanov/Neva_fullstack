import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Section } from '@prisma/client';

import { BrandsService } from './brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all brands' })
  @ApiQuery({ name: 'locale', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of brands' })
  async getAllBrands(@Query('locale') locale?: string) {
    return this.brandsService.getBrands(locale || 'ru'); // Фоллбэк для locale
  }

  @Get('neva')
  @ApiOperation({ summary: 'Get NEVA brands' })
  @ApiQuery({ name: 'locale', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of NEVA brands' })
  async getNevaBrands(@Query('locale') locale?: string) {
    return this.brandsService.getBrands(locale || 'ru', Section.NEVA);
  }

  @Get('x-solution')
  @ApiOperation({ summary: 'Get X_SOLUTION brands' })
  @ApiQuery({ name: 'locale', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of X_SOLUTION brands' })
  async getXSolutionBrands(@Query('locale') locale?: string) {
    return this.brandsService.getBrands(locale || 'ru', Section.X_SOLUTION);
  }
}
