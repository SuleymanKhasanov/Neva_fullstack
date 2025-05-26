import { ApiProperty } from '@nestjs/swagger';
import { Section } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class GetCategoriesDto {
  @ApiProperty({
    description: 'Locale for the category and brand data',
    enum: ['ru', 'en', 'kr', 'uz'],
    example: 'ru',
  })
  @IsString()
  @IsEnum(['ru', 'en', 'kr', 'uz'])
  locale!: string;

  @ApiProperty({
    description: 'Section to filter categories',
    enum: Section,
    required: false,
    example: 'NEVA',
  })
  @IsEnum(Section)
  section?: Section;
}
