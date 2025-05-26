import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number = 0;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number = 1;

  @ApiProperty({ description: 'Items per page', example: 20 })
  limit: number = 20;

  @ApiProperty({ description: 'Total number of pages', example: 5 })
  totalPages: number = 1;
}

export class BrandDto {
  @ApiProperty({ description: 'Brand ID', example: 1 })
  id: number = 0;

  @ApiProperty({ description: 'Brand name', example: 'Asus' })
  name: string = '';

  @ApiProperty({
    description: 'Locale',
    example: 'uz',
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  locale: string = '';

  @ApiProperty({
    description: 'Section',
    example: 'NEVA',
    enum: ['NEVA', 'X_SOLUTION'],
  })
  section: string = '';
}

export class CategoryDto {
  @ApiProperty({ description: 'Category ID', example: 1 })
  id: number = 0;

  @ApiProperty({ description: 'Category name', example: 'Noutbuklar' })
  name: string = '';

  @ApiProperty({
    description: 'Locale',
    example: 'uz',
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  locale: string = '';

  @ApiProperty({
    description: 'Section',
    example: 'NEVA',
    enum: ['NEVA', 'X_SOLUTION'],
  })
  section: string = '';
}

export class ProductDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  id: number = 0;

  @ApiProperty({ description: 'Product name', example: 'Laptop XYZ' })
  name: string = '';

  @ApiProperty({
    description: 'Product image URL',
    example: 'http://localhost:3000/public/images/laptop.webp',
    nullable: true,
  })
  image: string | null = null;

  @ApiProperty({
    description: 'Product full image URL',
    example: 'http://localhost:3000/public/images/laptop_full.webp',
    nullable: true,
  })
  fullImage: string | null = null;

  @ApiProperty({
    description: 'Product description',
    example: 'High-performance laptop',
  })
  description: string = '';

  @ApiProperty({
    description: 'Locale',
    example: 'uz',
    enum: ['ru', 'en', 'kr', 'uz'],
  })
  locale: string = '';

  @ApiProperty({
    description: 'Section',
    example: 'NEVA',
    enum: ['NEVA', 'X_SOLUTION'],
  })
  section: string = '';

  @ApiProperty({
    description: 'Associated brand',
    type: BrandDto,
    nullable: true,
  })
  brand: BrandDto | null = null;

  @ApiProperty({ description: 'Associated category', type: CategoryDto })
  category: CategoryDto = new CategoryDto();
}

export class ProductResponseDto {
  @ApiProperty({ description: 'List of products', type: [ProductDto] })
  data: ProductDto[] = [];

  @ApiProperty({ description: 'Pagination metadata', type: PaginationDto })
  meta: PaginationDto = new PaginationDto();
}
