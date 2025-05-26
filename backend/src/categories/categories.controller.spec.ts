import { Test, TestingModule } from '@nestjs/testing';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockService = {
    getCategories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockService },
        PrismaService,
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return all categories with brands', async () => {
      const mockResult = {
        categories: [
          {
            id: 1,
            name: 'Ноутбуки',
            locale: 'ru',
            section: Section.NEVA,
            brands: [
              { id: 1, name: 'ASUS', locale: 'ru', section: Section.NEVA },
              { id: 2, name: 'Lenovo', locale: 'ru', section: Section.NEVA },
            ],
          },
          {
            id: 2,
            name: 'Серверы',
            locale: 'ru',
            section: Section.X_SOLUTION,
            brands: [
              {
                id: 3,
                name: 'Dell',
                locale: 'ru',
                section: Section.X_SOLUTION,
              },
            ],
          },
        ],
      };

      mockService.getCategories.mockResolvedValue(mockResult);

      const result = await controller.getAllCategories({ locale: 'ru' });

      expect(result).toEqual({ data: mockResult.categories });
      expect(service.getCategories).toHaveBeenCalledWith({ locale: 'ru' });
    });
  });

  describe('getNevaCategories', () => {
    it('should return NEVA categories with brands', async () => {
      const mockResult = {
        categories: [
          {
            id: 1,
            name: 'Ноутбуки',
            locale: 'ru',
            section: Section.NEVA,
            brands: [
              { id: 1, name: 'ASUS', locale: 'ru', section: Section.NEVA },
              { id: 2, name: 'Lenovo', locale: 'ru', section: Section.NEVA },
            ],
          },
        ],
      };

      mockService.getCategories.mockResolvedValue(mockResult);

      const result = await controller.getNevaCategories({ locale: 'ru' });

      expect(result).toEqual({ data: mockResult.categories });
      expect(service.getCategories).toHaveBeenCalledWith({
        locale: 'ru',
        section: Section.NEVA,
      });
    });
  });

  describe('getXSolutionCategories', () => {
    it('should return X_SOLUTION categories with brands', async () => {
      const mockResult = {
        categories: [
          {
            id: 2,
            name: 'Серверы',
            locale: 'ru',
            section: Section.X_SOLUTION,
            brands: [
              {
                id: 3,
                name: 'Dell',
                locale: 'ru',
                section: Section.X_SOLUTION,
              },
            ],
          },
        ],
      };

      mockService.getCategories.mockResolvedValue(mockResult);

      const result = await controller.getXSolutionCategories({ locale: 'ru' });

      expect(result).toEqual({ data: mockResult.categories });
      expect(service.getCategories).toHaveBeenCalledWith({
        locale: 'ru',
        section: Section.X_SOLUTION,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
