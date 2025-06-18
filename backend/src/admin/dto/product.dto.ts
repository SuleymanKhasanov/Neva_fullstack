// src/admin/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';

// Простые DTO для админки
export class TranslationDto {
  @ApiProperty({ enum: ['ru', 'en', 'kr', 'uz'], example: 'ru' })
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale!: string;

  @ApiProperty({ example: 'Parker Jotter Ball Pen' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  marketingDescription?: string;
}

export class SpecTranslationDto {
  @ApiProperty({ enum: ['ru', 'en', 'kr', 'uz'] })
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale!: string;

  @ApiProperty({ example: 'Цвет чернил' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Синий' })
  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class SpecificationDto {
  @ApiProperty({ example: 'ink_color' })
  @IsString()
  @IsNotEmpty()
  key!: string;

  @ApiProperty({ type: [SpecTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecTranslationDto)
  translations!: SpecTranslationDto[];
}

export class CreateProductDto {
  @ApiProperty({ enum: ['NEVA', 'X_SOLUTION'], example: 'NEVA' })
  @IsEnum(['NEVA', 'X_SOLUTION'])
  section!: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsInt()
  @Min(1)
  categoryId!: number;

  @ApiProperty({
    required: false,
    description: 'Subcategory ID (optional)',
    example: 15,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  subcategoryId?: number;

  @ApiProperty({ required: false, description: 'Brand ID (optional)' })
  @IsInt()
  @Min(1)
  @IsOptional()
  brandId?: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ type: [TranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations!: TranslationDto[];

  @ApiProperty({ type: [SpecificationDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationDto)
  @IsOptional()
  specifications?: SpecificationDto[] = [];
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ required: false, description: 'Subcategory ID (optional)' })
  @IsInt()
  @Min(1)
  @IsOptional()
  subcategoryId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  brandId?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ type: [TranslationDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  @IsOptional()
  translations?: TranslationDto[];

  @ApiProperty({ type: [SpecificationDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationDto)
  @IsOptional()
  specifications?: SpecificationDto[];
}

// Response DTOs
export class PaginationResponseDto {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 50 })
  limit!: number;

  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 2 })
  totalPages!: number;

  @ApiProperty({ example: true })
  hasNextPage!: boolean;

  @ApiProperty({ example: false })
  hasPrevPage!: boolean;
}

export class AdminProductResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'NEVA' })
  section!: string;

  @ApiProperty({ example: 'parker-jotter-ball-pen' })
  slug!: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 1 })
  categoryId!: number;

  @ApiProperty({ example: 15, nullable: true })
  subcategoryId?: number;

  @ApiProperty({ example: 2, nullable: true })
  brandId?: number;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty({ type: [TranslationDto] })
  translations!: TranslationDto[];

  @ApiProperty({ description: 'Brand information', nullable: true })
  brand?: any;

  @ApiProperty({ description: 'Category information' })
  category!: any;

  @ApiProperty({ description: 'Subcategory information', nullable: true })
  subcategory?: any;

  @ApiProperty({ description: 'Product images', type: Array })
  images!: any[];

  @ApiProperty({ description: 'Product specifications', type: Array })
  specifications!: any[];

  @ApiProperty({ description: 'Product statistics' })
  stats!: {
    imagesCount: number;
    specificationsCount: number;
  };
}

export class AdminProductsListResponseDto {
  @ApiProperty({ type: [AdminProductResponseDto] })
  products!: AdminProductResponseDto[];

  @ApiProperty({ type: PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
