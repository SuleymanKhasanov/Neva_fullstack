// backend/src/admin/admin-categories.controller.ts
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

interface CreateCategoryDto {
  section: Section;
  translations: {
    locale: Locale;
    name: string;
  }[];
}

@ApiTags('Admin - Categories')
@Controller('admin/categories')
@UsePipes(new ValidationPipe({ transform: true }))
export class AdminCategoriesController {
  private readonly logger = new Logger(AdminCategoriesController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все категории для админ панели' })
  async getAllCategories() {
    const categories = await this.prisma.category.findMany({
      include: {
        translations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return categories.map((category) => ({
      id: category.id,
      section: category.section,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: category.translations,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return {
      id: category.id,
      section: category.section,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: category.translations,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую категорию' })
  @ApiResponse({ status: 201, description: 'Категория создана' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.logger.log(
      'Creating category:',
      createCategoryDto.translations[0]?.name
    );

    const category = await this.prisma.category.create({
      data: {
        section: createCategoryDto.section,
        translations: {
          create: createCategoryDto.translations,
        },
      },
      include: {
        translations: true,
      },
    });

    this.logger.log(`Created category ID: ${category.id}`);
    return {
      success: true,
      message: 'Категория создана',
      data: {
        id: category.id,
        section: category.section,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        translations: category.translations,
      },
    };
  }
}
