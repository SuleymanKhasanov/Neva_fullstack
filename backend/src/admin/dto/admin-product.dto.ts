// backend/src/admin/dto/admin-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Section, Locale } from '@prisma/client';
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

export class TranslationDto {
  @ApiProperty({ enum: Locale, example: 'ru' })
  @IsEnum(Locale)
  locale!: Locale;

  @ApiProperty({ example: 'ASUS VivoBook 15' })
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

  @ApiProperty({ example: 'Процессор' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Intel Core i5' })
  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class SpecificationDto {
  @ApiProperty({ example: 'processor' })
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
  @ApiProperty({ enum: Section, example: 'NEVA' })
  @IsEnum(Section)
  section!: Section;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  categoryId!: number;

  @ApiProperty({ required: false })
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
