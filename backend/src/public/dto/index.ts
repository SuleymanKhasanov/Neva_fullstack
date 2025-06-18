// src/public/dto/index.ts
import { ApiProperty } from '@nestjs/swagger';

// Общие DTO
export class PaginationDto {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 5 })
  totalPages!: number;

  @ApiProperty({ example: true })
  hasNextPage!: boolean;

  @ApiProperty({ example: false })
  hasPrevPage!: boolean;
}

// Product DTOs
export class ProductImageDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'https://example.com/image_small.webp' })
  small!: string;

  @ApiProperty({ example: 'https://example.com/image_large.webp' })
  large!: string;

  @ApiProperty({ example: 'Product image', nullable: true })
  altText?: string;

  @ApiProperty({ example: true })
  isPrimary!: boolean;
}

export class ProductSpecificationDto {
  @ApiProperty({ example: 'Цвет' })
  name!: string;

  @ApiProperty({ example: 'Синий' })
  value!: string;
}

export class BrandDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Parker' })
  name!: string;
}

export class CategoryDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Канцтовары' })
  name!: string;
}

export class SubcategoryDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Ручки' })
  name!: string;
}

export class ProductDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Parker Jotter Ball Pen' })
  name!: string;

  @ApiProperty({ example: 'Высококачественная шариковая ручка' })
  description!: string;

  @ApiProperty({ example: 'NEVA' })
  section!: string;

  @ApiProperty({ example: 'https://example.com/image.webp', nullable: true })
  image?: string;

  @ApiProperty({ type: BrandDto, nullable: true })
  brand?: BrandDto;

  @ApiProperty({ type: CategoryDto })
  category!: CategoryDto;

  @ApiProperty({ type: SubcategoryDto, nullable: true })
  subcategory?: SubcategoryDto;
}

export class ProductDetailDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Parker Jotter Ball Pen' })
  name!: string;

  @ApiProperty({ example: 'Высококачественная шариковая ручка' })
  description!: string;

  @ApiProperty({ example: 'Идеальная ручка для офиса', nullable: true })
  marketingDescription?: string;

  @ApiProperty({ example: 'Parker Jotter - лучшая ручка', nullable: true })
  metaTitle?: string;

  @ApiProperty({ example: 'Купите Parker Jotter...', nullable: true })
  metaDescription?: string;

  @ApiProperty({ example: 'NEVA' })
  section!: string;

  @ApiProperty({ example: 'parker-jotter-ball-pen', nullable: true })
  slug?: string;

  @ApiProperty({ type: BrandDto, nullable: true })
  brand?: BrandDto;

  @ApiProperty({ type: CategoryDto })
  category!: CategoryDto;

  @ApiProperty({ type: SubcategoryDto, nullable: true })
  subcategory?: SubcategoryDto;

  @ApiProperty({ type: [ProductImageDto] })
  images!: ProductImageDto[];

  @ApiProperty({ type: [ProductSpecificationDto] })
  specifications!: ProductSpecificationDto[];
}

export class ProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  products!: ProductDto[];

  @ApiProperty({ type: PaginationDto })
  pagination!: PaginationDto;
}

// Category DTOs
export class CategoryWithSubcategoriesDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Канцтовары' })
  name!: string;

  @ApiProperty({ example: 'NEVA' })
  section!: string;

  @ApiProperty({ type: [SubcategoryDto] })
  subcategories!: SubcategoryDto[];

  @ApiProperty({ type: [BrandDto] })
  brands!: BrandDto[];
}

export class CategoriesResponseDto {
  @ApiProperty({ type: [CategoryWithSubcategoriesDto] })
  categories!: CategoryWithSubcategoriesDto[];
}

// Brand DTOs
export class BrandsResponseDto {
  @ApiProperty({ type: [BrandDto] })
  brands!: BrandDto[];
}

// Search DTOs
export class SearchResponseDto {
  @ApiProperty({ type: [ProductDto] })
  products!: ProductDto[];

  @ApiProperty({ type: [CategoryDto] })
  categories!: CategoryDto[];

  @ApiProperty({ type: [BrandDto] })
  brands!: BrandDto[];

  @ApiProperty({ type: PaginationDto })
  pagination!: PaginationDto;

  @ApiProperty({ example: 'search query' })
  query!: string;
}

// Menu DTOs
export class MenuResponseDto {
  @ApiProperty({ type: [CategoryWithSubcategoriesDto] })
  neva!: CategoryWithSubcategoriesDto[];

  @ApiProperty({ type: [CategoryWithSubcategoriesDto] })
  xSolution!: CategoryWithSubcategoriesDto[];
}
