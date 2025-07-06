// backend/src/admin/image.service.ts
import { promises as fs } from 'fs';
import { join } from 'path';

import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import sharp from 'sharp'; // ✅ ИСПРАВЛЕНО: default import вместо namespace

import { PrismaService } from '../database/prisma.service';

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private readonly uploadDir = join(process.cwd(), 'public', 'images');
  private readonly allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];
  private readonly maxSize = 10 * 1024 * 1024;

  constructor(private readonly prisma: PrismaService) {
    this.ensureUploadDir();
  }

  // ✅ ИСПРАВЛЕНО: Заменил Express.Multer.File на UploadedFile
  async processAndSaveImages(productId: number, files: UploadedFile[]) {
    this.logger.log(
      `Processing ${files.length} images for product ${productId}`
    );

    // Валидация всех файлов сначала
    for (const file of files) {
      this.validateFile(file);
    }

    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const processed = await this.processImage(file, productId);

        // Сохранить в БД
        const imageRecord = await this.prisma.productImage.create({
          data: {
            productId,
            originalFilename: file.originalname,
            imageSmall: processed.smallPath,
            imageLarge: processed.largePath,
            sortOrder: i,
            isPrimary: i === 0, // Первое изображение главное
          },
        });

        results.push({
          id: imageRecord.id,
          smallUrl: this.getPublicUrl(processed.smallPath),
          largeUrl: this.getPublicUrl(processed.largePath),
          originalName: file.originalname,
        });
      } catch (error) {
        this.logger.error(`Failed to process ${file.originalname}:`, error);
        // Продолжаем обработку других файлов
      }
    }

    return results;
  }

  async deleteImage(productId: number, imageId: number) {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    // Удалить файлы
    await this.deleteFile(image.imageSmall);
    await this.deleteFile(image.imageLarge);

    // Удалить из БД
    await this.prisma.productImage.delete({
      where: { id: imageId },
    });

    this.logger.log(`Deleted image ${imageId} for product ${productId}`);
  }

  // ✅ ИСПРАВЛЕНО: Заменил Express.Multer.File на UploadedFile
  private async processImage(file: UploadedFile, productId: number) {
    const timestamp = Date.now();
    const basename = `product_${productId}_${timestamp}`;

    const smallPath = `${basename}_small.webp`;
    const largePath = `${basename}_large.webp`;

    const smallFullPath = join(this.uploadDir, smallPath);
    const largeFullPath = join(this.uploadDir, largePath);

    // Обработать изображения параллельно
    await Promise.all([
      // Маленькое 400x400
      sharp(file.buffer) // ✅ Теперь sharp() работает правильно
        .resize(400, 400, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(smallFullPath),

      // Большое (оригинальные пропорции)
      sharp(file.buffer).webp({ quality: 80 }).toFile(largeFullPath),
    ]);

    this.logger.log(`Processed: ${file.originalname} -> ${basename}.webp`);

    return { smallPath, largePath };
  }

  // ✅ ИСПРАВЛЕНО: Заменил Express.Multer.File на UploadedFile
  private validateFile(file: UploadedFile) {
    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type: ${file.mimetype}. Allowed: ${this.allowedTypes.join(', ')}`
      );
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File too large: ${Math.round(file.size / 1024 / 1024)}MB. Max: 10MB`
      );
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('Empty file');
    }
  }

  private async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(`Created upload directory: ${this.uploadDir}`);
    }
  }

  private async deleteFile(filename: string) {
    try {
      const fullPath = join(this.uploadDir, filename);
      await fs.unlink(fullPath);
      this.logger.log(`Deleted file: ${filename}`);
    } catch (error) {
      this.logger.warn(`Failed to delete file ${filename}:`, error);
    }
  }

  private getPublicUrl(filename: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return `${baseUrl}/public/images/${filename}`;
  }
}
