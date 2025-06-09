// 🔒 backend/src/admin/admin-brands.controller.ts
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Locale } from '@prisma/client';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PrismaService } from '../../prisma/prisma.service';

interface CreateBrandDto {
  translations: { locale: Locale; name: string }[];
}

@ApiTags('Admin - Brands')
@Controller('admin/brands')
export class AdminBrandsController {
  private readonly logger = new Logger(AdminBrandsController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Получить все бренды' })
  async getAllBrands(@CurrentUser() user: any) {
    this.logger.log(`Admin ${user.username} requesting all brands`);
    const brands = await this.prisma.brand.findMany({
      include: { translations: true },
      orderBy: { createdAt: 'desc' },
    });
    return brands.map((brand) => ({
      id: brand.id,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      translations: brand.translations,
    }));
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Создать бренд' })
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating brand: ${createBrandDto.translations[0]?.name}`
    );
    const brand = await this.prisma.brand.create({
      data: { translations: { create: createBrandDto.translations } },
      include: { translations: true },
    });
    return { success: true, message: 'Бренд создан', data: brand };
  }
}
