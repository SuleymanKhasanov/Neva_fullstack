// src/shared/dto/base-translation.dto.ts
import { IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { Locale } from '@prisma/client';

/**
 * Базовый DTO для переводов
 */
export class BaseTranslationDto {
  @IsEnum(Locale, { message: 'locale must be a valid locale value' })
  readonly locale!: Locale;

  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name cannot be empty' })
  readonly name!: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  readonly description?: string;

  @IsOptional()
  @IsString({ message: 'marketingDescription must be a string' })
  readonly marketingDescription?: string;
}

/**
 * Базовый DTO для переводов спецификаций
 */
export class BaseSpecTranslationDto {
  @IsEnum(Locale, { message: 'locale must be a valid locale value' })
  readonly locale!: Locale;

  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name cannot be empty' })
  readonly name!: string;

  @IsString({ message: 'value must be a string' })
  @IsNotEmpty({ message: 'value cannot be empty' })
  readonly value!: string;
}

/**
 * Базовый DTO для спецификаций
 */
export class BaseSpecificationDto {
  @IsString({ message: 'key must be a string' })
  @IsNotEmpty({ message: 'key cannot be empty' })
  readonly key!: string;

  @IsOptional()
  readonly sortOrder?: number;

  readonly translations!: readonly BaseSpecTranslationDto[];
}
