// backend/src/admin/admin-brands.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Logger,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { Section, Locale } from '@prisma/client';

interface CreateBrandDto {
  translations: {
    locale: Locale;
    name: string;
  }[];
}

interface CreateCategoryBrandDto {
  categoryId: number;
  brandId: number;
  section: Section;
}

@ApiTags('Admin - Brands')
@Controller('admin/brands')
@UsePipes(new ValidationPipe({ transform: true }))
export class AdminBrandsController {
  private readonly logger = new Logger(AdminBrandsController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все бренды для админ панели' })
  async getAllBrands() {
    const brands = await this.prisma.brand.findMany({
      include: {
        translations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return brands.map((brand) => ({
      id: brand.id,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      translations: brand.translations,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить бренд по ID' })
  async getBrand(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!brand) {
      throw new Error(`Brand with ID ${id} not found`);
    }

    return {
      id: brand.id,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      translations: brand.translations,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый бренд' })
  @ApiResponse({ status: 201, description: 'Бренд создан' })
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    this.logger.log('Creating brand:', createBrandDto.translations[0]?.name);

    const brand = await this.prisma.brand.create({
      data: {
        translations: {
          create: createBrandDto.translations,
        },
      },
      include: {
        translations: true,
      },
    });

    this.logger.log(`Created brand ID: ${brand.id}`);
    return {
      success: true,
      message: 'Бренд создан',
      data: {
        id: brand.id,
        createdAt: brand.createdAt,
        updatedAt: brand.updatedAt,
        translations: brand.translations,
      },
    };
  }

  @Post('category-relations')
  @ApiOperation({ summary: 'Создать связь категория-бренд' })
  @ApiResponse({ status: 201, description: 'Связь создана' })
  async createCategoryBrandRelation(@Body() dto: CreateCategoryBrandDto) {
    try {
      this.logger.log(
        `Creating category-brand relation: ${dto.categoryId}-${dto.brandId} for ${dto.section}`
      );

      // Проверяем существование категории
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        return {
          success: false,
          message: `Категория с ID ${dto.categoryId} не найдена`,
        };
      }

      // Проверяем существование бренда
      const brand = await this.prisma.brand.findUnique({
        where: { id: dto.brandId },
      });

      if (!brand) {
        return {
          success: false,
          message: `Бренд с ID ${dto.brandId} не найден`,
        };
      }

      // Проверяем, не существует ли уже такая связь
      const existingRelation = await this.prisma.categoryBrand.findFirst({
        where: {
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          section: dto.section,
        },
      });

      if (existingRelation) {
        return {
          success: false,
          message: 'Связь уже существует',
          data: existingRelation,
        };
      }

      const relation = await this.prisma.categoryBrand.create({
        data: {
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          section: dto.section,
        },
      });

      this.logger.log(`✅ Created category-brand relation: ${relation.id}`);

      return {
        success: true,
        message: 'Связь категория-бренд создана',
        data: relation,
      };
    } catch (error) {
      this.logger.error('❌ Error creating category-brand relation:', error);
      return {
        success: false,
        message: 'Ошибка при создании связи',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
