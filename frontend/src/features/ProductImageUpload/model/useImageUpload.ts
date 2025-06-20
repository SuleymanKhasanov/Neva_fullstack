// frontend/src/features/ProductImageUpload/model/useImageUpload.ts
'use client';

import { useState, useEffect, useMemo } from 'react';

interface ImagePreview {
  id: string;
  file: File;
  url: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 5;

export const useImageUpload = (
  images: File[],
  onUpdate: (images: File[]) => void
) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Создаем превью для изображений
  const previews = useMemo(() => {
    return images.map((file, index) => ({
      id: `${file.name}-${file.size}-${index}`,
      file,
      url: URL.createObjectURL(file),
    }));
  }, [images]);

  // Освобождаем URL при размонтировании
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  // Валидация файла
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Неподдерживаемый формат файла: ${file.name}. Разрешены только JPG, PNG и WebP.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `Файл ${file.name} слишком большой. Максимальный размер: 10MB.`;
    }

    return null;
  };

  // Обработка выбора файлов
  const handleFileSelect = async (files: File[]) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const validFiles: File[] = [];
      let errorMessage: string | null = null;

      for (const file of files) {
        // Проверяем лимит количества
        if (images.length + validFiles.length >= MAX_IMAGES) {
          errorMessage = `Максимальное количество изображений: ${MAX_IMAGES}`;
          break;
        }

        // Валидируем файл
        const validationError = validateFile(file);
        if (validationError) {
          errorMessage = validationError;
          break;
        }

        // Проверяем на дубликаты
        const isDuplicate = images.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        );

        if (isDuplicate) {
          errorMessage = `Файл ${file.name} уже был добавлен`;
          continue;
        }

        validFiles.push(file);
      }

      if (errorMessage) {
        setUploadError(errorMessage);
      } else {
        // Добавляем новые файлы к существующим
        const updatedImages = [...images, ...validFiles];
        onUpdate(updatedImages);
      }
    } catch (error) {
      console.error('Error handling file selection:', error);
      setUploadError('Произошла ошибка при обработке файлов');
    } finally {
      setIsUploading(false);
    }
  };

  // Удаление изображения
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onUpdate(updatedImages);
    setUploadError(null);
  };

  // Перестановка изображений (для будущего использования)
  const reorderImages = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onUpdate(updatedImages);
  };

  // Очистка ошибок при изменении изображений
  useEffect(() => {
    if (uploadError && images.length > 0) {
      setUploadError(null);
    }
  }, [images.length, uploadError]);

  return {
    previews,
    isUploading,
    uploadError,
    handleFileSelect,
    removeImage,
    reorderImages,
  };
};
