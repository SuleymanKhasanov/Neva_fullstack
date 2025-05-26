import { Section } from '@prisma/client';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  locale?: string;

  @IsEnum(Section)
  @IsOptional()
  section?: Section;

  @IsNumber()
  @IsOptional() // Делаем categoryId опциональным
  categoryId?: number; // Обязательное по логике, но опциональное для TypeScript
}
