import { Test, TestingModule } from '@nestjs/testing';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { NevaProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('NevaProductsController', () => {
  let controller: NevaProductsController;
  let service: ProductsService;

  const mockService = {
    getProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NevaProductsController],
      providers: [
        { provide: ProductsService, useValue: mockService },
        PrismaService,
      ],
    }).compile();

    controller = module.get<NevaProductsController>(NevaProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockResult = {
        products: [
          {
            id: 1,
            name: 'ASUS Vivobook',
            locale: 'ru',
            section: Section.NEVA,
            description: 'A powerful laptop',
            image: '/images/product_1_resized.webp',
            fullImage: '/images/product_1_full.webp',
            brand: { id: 1, name: 'ASUS', locale: 'ru', section: Section.NEVA },
            category: {
              id: 1,
              name: 'Ноутбуки',
              locale: 'ru',
              section: Section.NEVA,
            },
          },
        ],
        totalCount: 1,
      };

      mockService.getProducts.mockResolvedValue(mockResult);

      const result = await controller.getAllProducts({
        locale: 'ru',
        page: 1,
      });

      expect(result).toEqual({
        data: mockResult.products,
        meta: {
          total: mockResult.totalCount,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      });
      expect(service.getProducts).toHaveBeenCalledWith({
        locale: 'ru',
        page: 1,
        limit: 20,
      });
    });
  });

  describe('getNevaProducts', () => {
    it('should return NEVA products', async () => {
      const mockResult = {
        products: [
          {
            id: 1,
            name: 'ASUS Vivobook',
            locale: 'ru',
            section: Section.NEVA,
            description: 'A powerful laptop',
            image: '/images/product_1_resized.webp',
            fullImage: '/images/product_1_full.webp',
            brand: { id: 1, name: 'ASUS', locale: 'ru', section: Section.NEVA },
            category: {
              id: 1,
              name: 'Ноутбуки',
              locale: 'ru',
              section: Section.NEVA,
            },
          },
        ],
        totalCount: 1,
      };

      mockService.getProducts.mockResolvedValue(mockResult);

      const result = await controller.getNevaProducts({
        locale: 'ru',
        page: 1,
      });

      expect(result).toEqual({
        data: mockResult.products,
        meta: {
          total: mockResult.totalCount,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      });
      expect(service.getProducts).toHaveBeenCalledWith({
        locale: 'ru',
        page: 1,
        limit: 20,
        section: Section.NEVA,
      });
    });
  });

  describe('getXSolutionProducts', () => {
    it('should return X_SOLUTION products', async () => {
      const mockResult = {
        products: [
          {
            id: 2,
            name: 'PowerEdge R660',
            locale: 'ru',
            section: Section.X_SOLUTION,
            description: 'A powerful server',
            image: '/images/product_2_resized.webp',
            fullImage: '/images/product_2_full.webp',
            brand: {
              id: 3,
              name: 'Dell',
              locale: 'ru',
              section: Section.X_SOLUTION,
            },
            category: {
              id: 2,
              name: 'Серверы',
              locale: 'ru',
              section: Section.X_SOLUTION,
            },
          },
        ],
        totalCount: 1,
      };

      mockService.getProducts.mockResolvedValue(mockResult);

      const result = await controller.getXSolutionProducts({
        locale: 'ru',
        page: 1,
      });

      expect(result).toEqual({
        data: mockResult.products,
        meta: {
          total: mockResult.totalCount,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      });
      expect(service.getProducts).toHaveBeenCalledWith({
        locale: 'ru',
        page: 1,
        limit: 20,
        section: Section.X_SOLUTION,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
