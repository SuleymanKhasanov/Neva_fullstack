// 🔒 backend/src/admin/admin-categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Section, Locale } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

interface CreateCategoryDto {
  section: Section;
  translations: { locale: Locale; name: string }[];
}

@ApiTags('Admin - Categories')
@Controller('admin/categories')
export class AdminCategoriesController {
  private readonly logger = new Logger(AdminCategoriesController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Получить все категории' })
  async getAllCategories(@CurrentUser() user: any) {
    this.logger.log(`Admin ${user.username} requesting all categories`);
    const categories = await this.prisma.category.findMany({
      include: { translations: true },
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

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Создать категорию' })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: any
  ) {
    this.logger.log(
      `Admin ${user.username} creating category: ${createCategoryDto.translations[0]?.name}`
    );
    const category = await this.prisma.category.create({
      data: {
        section: createCategoryDto.section,
        translations: { create: createCategoryDto.translations },
      },
      include: { translations: true },
    });

    return { success: true, message: 'Категория создана', data: category };
  }
}
