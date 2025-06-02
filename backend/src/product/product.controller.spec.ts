// backend/src/product/product.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../common/cache.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDetailDto } from './dto/product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductDetail: ProductDetailDto = {
    id: 1,
    name: 'ASUS Vivobook 15',
    description: 'Высокопроизводительный ноутбук',
    image: 'http://localhost:3000/public/images/laptop.webp',
    fullImage: 'http://localhost:3000/public/images/laptop_full.webp',
    locale: 'ru',
    section: Section.NEVA,
    slug: 'asus-vivobook-15',
    brand: {
      id: 1,
      name: 'ASUS',
      locale: 'ru',
      section: Section.NEVA,
    },
    category: {
      id: 1,
      name: 'Ноутбуки',
      locale: 'ru',
      section: Section.NEVA,
    },
    seoTitle:
      'ASUS Vivobook 15 | Neva - Официальный дистрибьютор в Узбекистане',
    seoDescription:
      'Купить ASUS Vivobook 15 в Ташкенте. Высокопроизводительный ноутбук...',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
  };

  const mockService = {
    getProductById: jest.fn(),
    productExists: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: mockService },
        { provide: PrismaService, useValue: {} },
        { provide: CacheService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProduct', () => {
    it('should return product details when product exists', async () => {
      mockService.getProductById.mockResolvedValue(mockProductDetail);

      const result = await controller.getProduct('ru', 1);

      expect(result).toEqual({
        data: mockProductDetail,
        success: true,
      });
      expect(service.getProductById).toHaveBeenCalledWith(1, 'ru');
    });

    it('should throw HttpException when product not found', async () => {
      mockService.getProductById.mockRejectedValue(
        new Error('Product with ID 999 and locale en not found')
      );

      await expect(controller.getProduct('en', 999)).rejects.toThrow(
        HttpException
      );
      expect(service.getProductById).toHaveBeenCalledWith(999, 'en');
    });

    it('should throw BadRequest for invalid ID', async () => {
      await expect(controller.getProduct('ru', 0)).rejects.toThrow(
        new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw BadRequest for invalid locale', async () => {
      await expect(controller.getProduct('invalid', 1)).rejects.toThrow(
        new HttpException(
          'Invalid locale. Supported: ru, en, kr, uz',
          HttpStatus.BAD_REQUEST
        )
      );
    });

    it('should throw BadRequest for negative ID', async () => {
      await expect(controller.getProduct('ru', -1)).rejects.toThrow(
        new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST)
      );
    });

    it('should handle service errors gracefully', async () => {
      mockService.getProductById.mockRejectedValue(
        new Error('Database connection failed')
      );

      await expect(controller.getProduct('ru', 1)).rejects.toThrow(
        HttpException
      );
      expect(service.getProductById).toHaveBeenCalledWith(1, 'ru');
    });

    it('should work with all supported locales', async () => {
      mockService.getProductById.mockResolvedValue(mockProductDetail);

      for (const locale of ['ru', 'en', 'kr', 'uz']) {
        const result = await controller.getProduct(locale, 1);
        expect(result.success).toBe(true);
        expect(service.getProductById).toHaveBeenCalledWith(1, locale);
      }
    });
  });

  describe('checkProductExists', () => {
    it('should return true when product exists', async () => {
      mockService.productExists.mockResolvedValue(true);

      const result = await controller.checkProductExists('ru', 1);

      expect(result).toEqual({
        exists: true,
        id: 1,
        locale: 'ru',
        success: true,
      });
      expect(service.productExists).toHaveBeenCalledWith(1, 'ru');
    });

    it('should return false when product does not exist', async () => {
      mockService.productExists.mockResolvedValue(false);

      const result = await controller.checkProductExists('en', 999);

      expect(result).toEqual({
        exists: false,
        id: 999,
        locale: 'en',
        success: true,
      });
      expect(service.productExists).toHaveBeenCalledWith(999, 'en');
    });

    it('should throw BadRequest for invalid ID in exists check', async () => {
      await expect(controller.checkProductExists('ru', 0)).rejects.toThrow(
        new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw BadRequest for invalid locale in exists check', async () => {
      await expect(controller.checkProductExists('invalid', 1)).rejects.toThrow(
        new HttpException(
          'Invalid locale. Supported: ru, en, kr, uz',
          HttpStatus.BAD_REQUEST
        )
      );
    });

    it('should handle service errors in exists check', async () => {
      mockService.productExists.mockRejectedValue(new Error('Database error'));

      await expect(controller.checkProductExists('ru', 1)).rejects.toThrow(
        HttpException
      );
      expect(service.productExists).toHaveBeenCalledWith(1, 'ru');
    });

    it('should work with all supported locales for exists check', async () => {
      mockService.productExists.mockResolvedValue(true);

      for (const locale of ['ru', 'en', 'kr', 'uz']) {
        const result = await controller.checkProductExists(locale, 1);
        expect(result.locale).toBe(locale);
        expect(service.productExists).toHaveBeenCalledWith(1, locale);
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
