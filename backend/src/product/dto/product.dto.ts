// backend/src/product/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Section } from '@prisma/client';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class ProductBrandDto {
  @ApiProperty({ description: 'Brand ID', example: 1 })
  @IsNumber()
  id: number = 0;

  @ApiProperty({ description: 'Brand name', example: 'ASUS' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'Brand locale', example: 'ru' })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale: string = '';

  @ApiProperty({ description: 'Brand section', enum: Section, example: 'NEVA' })
  @IsEnum(Section)
  section: Section = Section.NEVA;
}

export class ProductCategoryDto {
  @ApiProperty({ description: 'Category ID', example: 1 })
  @IsNumber()
  id: number = 0;

  @ApiProperty({ description: 'Category name', example: 'Ноутбуки' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'Category locale', example: 'ru' })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale: string = '';

  @ApiProperty({
    description: 'Category section',
    enum: Section,
    example: 'NEVA',
  })
  @IsEnum(Section)
  section: Section = Section.NEVA;
}

export class ProductDetailDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  id: number = 0;

  @ApiProperty({ description: 'Product name', example: 'ASUS Vivobook 15' })
  @IsString()
  name: string = '';

  @ApiProperty({
    description: 'Product description',
    example: 'Высокопроизводительный ноутбук для работы и развлечений',
  })
  @IsString()
  description: string = '';

  @ApiProperty({
    description: 'Product image URL',
    example: 'http://localhost:3000/public/images/laptop.webp',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  image: string | null = null;

  @ApiProperty({
    description: 'Product full size image URL',
    example: 'http://localhost:3000/public/images/laptop_full.webp',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fullImage: string | null = null;

  @ApiProperty({ description: 'Product locale', example: 'ru' })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale: string = '';

  @ApiProperty({
    description: 'Product section',
    enum: Section,
    example: 'NEVA',
  })
  @IsEnum(Section)
  section: Section = Section.NEVA;

  @ApiProperty({
    description: 'Product slug for SEO URLs',
    example: 'asus-vivobook-15',
  })
  @IsString()
  slug: string = '';

  @ApiProperty({
    description: 'Associated brand',
    type: ProductBrandDto,
    nullable: true,
  })
  @IsOptional()
  brand: ProductBrandDto | null = null;

  @ApiProperty({ description: 'Associated category', type: ProductCategoryDto })
  category: ProductCategoryDto = new ProductCategoryDto();

  @ApiProperty({
    description: 'SEO optimized title',
    example: 'ASUS Vivobook 15 - Мощный ноутбук для работы | Neva',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiProperty({
    description: 'SEO meta description',
    example:
      'Купить ASUS Vivobook 15 в Ташкенте. Высокая производительность, современный дизайн, доступная цена.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @ApiProperty({
    description: 'Created date',
    example: '2024-01-15T10:30:00Z',
  })
  @IsString()
  createdAt: string = '';

  @ApiProperty({
    description: 'Last updated date',
    example: '2024-01-20T15:45:00Z',
  })
  @IsString()
  updatedAt: string = '';
}

export class ProductResponseDto {
  @ApiProperty({ description: 'Product details', type: ProductDetailDto })
  data: ProductDetailDto = new ProductDetailDto();

  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean = true;
}

export class GetProductDto {
  @ApiProperty({
    description: 'Product locale',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'ru',
  })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale: string = '';

  @ApiProperty({
    description: 'Product ID',
    example: 123,
  })
  @IsNumber()
  id: number = 0;
}
