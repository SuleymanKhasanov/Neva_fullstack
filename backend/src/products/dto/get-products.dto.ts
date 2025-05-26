import { ApiProperty } from '@nestjs/swagger';
import { Section } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetProductsDto {
  @ApiProperty({
    description: 'Locale for the product data',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'ru',
  })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale!: string;

  @ApiProperty({
    description: 'Section to filter products',
    enum: Section,
    required: false,
    example: 'NEVA',
  })
  @IsEnum(Section)
  @IsOptional()
  section?: Section;

  @ApiProperty({
    description: 'Category ID to filter products',
    required: false,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  categoryId?: number;

  @ApiProperty({
    description: 'Brand ID to filter products',
    required: false,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  brandId?: number;

  @ApiProperty({
    description: 'Page number for pagination',
    minimum: 1,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number = 1;
}
