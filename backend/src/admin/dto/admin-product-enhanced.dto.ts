// backend/src/admin/dto/admin-product-enhanced.dto.ts
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

import { Section, Locale } from '@prisma/client';

export class TranslationDto {
  @ApiProperty({ enum: Locale, example: 'ru' })
  @IsEnum(Locale)
  locale!: Locale;

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
  @ApiProperty({ enum: Locale })
  @IsEnum(Locale)
  locale!: Locale;

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

export class CreateProductEnhancedDto {
  @ApiProperty({ enum: Section, example: 'NEVA' })
  @IsEnum(Section)
  section!: Section;

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

export class UpdateProductEnhancedDto {
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
