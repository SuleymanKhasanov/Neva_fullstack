import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Enums
export enum Section {
  NEVA = 'NEVA',
  X_SOLUTION = 'X_SOLUTION',
}

export enum Locale {
  ru = 'ru',
  en = 'en',
  uz = 'uz',
  kr = 'kr',
}

// DTO для перевода бренда
export class BrandTranslationDto {
  @ApiProperty({ enum: Locale, description: 'Locale для перевода' })
  @IsEnum(Locale)
  locale!: Locale;

  @ApiProperty({ description: 'Название бренда', minLength: 2, maxLength: 255 })
  @IsString()
  @MinLength(2, {
    message: 'Название бренда должно содержать минимум 2 символа',
  })
  @MaxLength(255, {
    message: 'Название бренда не должно превышать 255 символов',
  })
  name!: string;
}

// Основной DTO для создания бренда с категориями
export class CreateBrandEnhancedDto {
  @ApiProperty({
    enum: Section,
    description: 'Секция бренда (NEVA или X_SOLUTION)',
  })
  @IsEnum(Section, { message: 'Секция должна быть NEVA или X_SOLUTION' })
  section!: Section;

  @ApiProperty({
    type: [Number],
    description: 'Массив ID категорий для привязки к бренду',
    example: [1, 2, 3],
  })
  @IsArray({ message: 'categoryIds должен быть массивом' })
  @IsInt({ each: true, message: 'Каждый ID категории должен быть числом' })
  @ArrayMinSize(1, { message: 'Необходимо выбрать минимум одну категорию' })
  categoryIds!: number[];

  @ApiProperty({
    type: [Number],
    description: 'Массив ID подкатегорий для привязки к бренду (опционально)',
    example: [10, 11, 12],
    required: false,
  })
  @IsArray({ message: 'subcategoryIds должен быть массивом' })
  @IsInt({ each: true, message: 'Каждый ID подкатегории должен быть числом' })
  @IsOptional()
  subcategoryIds?: number[];

  @ApiProperty({
    type: [BrandTranslationDto],
    description: 'Переводы бренда на разные языки',
    example: [
      { locale: 'ru', name: 'Apple' },
      { locale: 'en', name: 'Apple' },
    ],
  })
  @IsArray({ message: 'translations должен быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => BrandTranslationDto)
  @ArrayMinSize(1, { message: 'Необходимо указать минимум один перевод' })
  translations!: BrandTranslationDto[];
}

// DTO для ответа после создания бренда
export class BrandCreatedResponseDto {
  @ApiProperty({ description: 'ID созданного бренда' })
  id!: number;

  @ApiProperty({ enum: Section, description: 'Секция бренда' })
  section!: Section;

  @ApiProperty({ type: [BrandTranslationDto], description: 'Переводы бренда' })
  translations!: BrandTranslationDto[];

  @ApiProperty({ description: 'Количество связанных категорий' })
  categoriesCount!: number;

  @ApiProperty({ description: 'Количество связанных подкатегорий' })
  subcategoriesCount!: number;

  @ApiProperty({ description: 'Дата создания' })
  createdAt!: Date;

  @ApiProperty({ description: 'Сообщение об успешном создании' })
  message!: string;
}
