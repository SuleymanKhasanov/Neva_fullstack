import { Test, TestingModule } from '@nestjs/testing';
import { Section } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  const mockService = {
    getBrands: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        { provide: BrandsService, useValue: mockService },
        PrismaService,
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBrands', () => {
    it('should return all brands', async () => {
      const mockBrands = [
        {
          id: 1,
          name: 'ASUS',
          locale: 'ru',
          section: Section.NEVA,
          categoryId: 1,
        },
        { id: 2, name: 'Lenovo', locale: 'ru', section: 'NEVA', categoryId: 1 },
      ];

      mockService.getBrands.mockResolvedValue(mockBrands);

      const result = await controller.getAllBrands('ru');

      expect(result).toEqual(mockBrands);
      expect(service.getBrands).toHaveBeenCalledWith({ locale: 'ru' });
    });
  });

  describe('getNevaBrands', () => {
    it('should return NEVA brands', async () => {
      const mockBrands = [
        {
          id: 1,
          name: 'ASUS',
          locale: 'ru',
          section: Section.NEVA,
          categoryId: 1,
        },
      ];

      mockService.getBrands.mockResolvedValue(mockBrands);

      const result = await controller.getNevaBrands('ru');

      expect(result).toEqual(mockBrands);
      expect(service.getBrands).toHaveBeenCalledWith({
        locale: 'ru',
        section: Section.NEVA,
      });
    });
  });

  describe('getXSolutionBrands', () => {
    it('should return X_SOLUTION brands', async () => {
      const mockBrands = [
        {
          id: 3,
          name: 'Dell',
          locale: 'ru',
          section: Section.X_SOLUTION,
          categoryId: 2,
        },
      ];

      mockService.getBrands.mockResolvedValue(mockBrands);

      const result = await controller.getXSolutionBrands('ru');

      expect(result).toEqual(mockBrands);
      expect(service.getBrands).toHaveBeenCalledWith({
        locale: 'ru',
        section: Section.X_SOLUTION,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
