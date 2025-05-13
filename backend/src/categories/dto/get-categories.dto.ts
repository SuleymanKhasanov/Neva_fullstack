import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetCategoriesDto {
  @ApiProperty({
    description: 'Locale for the category and brand data',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'uz',
  })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale!: string;

  @ApiProperty({
    description: 'Page number for pagination',
    minimum: 1,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page!: number;

  @ApiProperty({
    description: 'Number of items per page (optional)',
    minimum: 1,
    default: 20,
    required: false,
    example: 20,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}
