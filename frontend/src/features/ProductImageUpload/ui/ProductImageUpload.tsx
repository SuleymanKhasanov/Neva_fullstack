// frontend/src/features/ProductImageUpload/ui/ProductImageUpload.tsx
'use client';

import React, { useRef } from 'react';
import { TranslationType } from '@/shared/config/i18n/types';
import styles from './ProductImageUpload.module.css';

interface ProductImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  error?: string;
  disabled?: boolean;
  maxImages?: number;
  locale: string;
  messages: TranslationType;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  images,
  onChange,
  error,
  disabled = false,
  maxImages = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Проверка количества файлов
    const totalFiles = images.length + files.length;
    if (totalFiles > maxImages) {
      alert(`Максимум ${maxImages} изображений`);
      return;
    }

    // Проверка типов и размеров файлов
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: неподдерживаемый формат`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: слишком большой размер (макс. 10MB)`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert('Ошибки при загрузке файлов:\n' + errors.join('\n'));
    }

    if (validFiles.length > 0) {
      onChange([...images, ...validFiles]);
    }

    // Сброс input для возможности повторного выбора тех же файлов
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      // Имитируем выбор файлов через input
      const fileInput = fileInputRef.current;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        handleFileSelect({
          target: fileInput,
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Изображения продукта</h3>
        <p className={styles.description}>
          Загрузите от 1 до {maxImages} изображений (JPEG, PNG, WebP, GIF, макс.
          10MB)
        </p>
      </div>

      {/* Область загрузки */}
      {canAddMore && (
        <div
          className={`${styles.uploadArea} ${disabled ? styles.disabled : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={openFileDialog}
        >
          <div className={styles.uploadContent}>
            <div className={styles.uploadIcon}>📸</div>
            <div className={styles.uploadText}>
              <p className={styles.mainText}>
                Нажмите или перетащите изображения сюда
              </p>
              <p className={styles.subText}>
                {images.length > 0
                  ? `Можно добавить еще ${maxImages - images.length} изображений`
                  : `До ${maxImages} изображений`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Скрытый input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleFileSelect}
        disabled={disabled}
        style={{ display: 'none' }}
      />

      {/* Превью изображений */}
      {images.length > 0 && (
        <div className={styles.imagesGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <div className={styles.imageWrapper}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className={styles.previewImage}
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className={styles.removeButton}
                  disabled={disabled}
                  title="Удалить изображение"
                >
                  ✕
                </button>
                {index === 0 && (
                  <div className={styles.primaryBadge}>Основное</div>
                )}
              </div>
              <div className={styles.imageInfo}>
                <p className={styles.imageName}>{image.name}</p>
                <p className={styles.imageSize}>
                  {Math.round(image.size / 1024)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Дополнительная кнопка добавления */}
      {canAddMore && images.length > 0 && (
        <button
          type="button"
          onClick={openFileDialog}
          className={styles.addMoreButton}
          disabled={disabled}
        >
          + Добавить еще изображения
        </button>
      )}

      {/* Статус и ошибки */}
      <div className={styles.status}>
        <span className={styles.count}>
          {images.length}/{maxImages} изображений
        </span>
        {images.length >= 1 && (
          <span className={styles.success}>✓ Минимум выполнен</span>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {/* Подсказки */}
      <div className={styles.hints}>
        <h4 className={styles.hintsTitle}>💡 Рекомендации:</h4>
        <ul className={styles.hintsList}>
          <li>Первое изображение станет основным</li>
          <li>Используйте качественные фотографии продукта</li>
          <li>Рекомендуемое разрешение: от 800x600 пикселей</li>
          <li>Изображения будут автоматически оптимизированы</li>
        </ul>
      </div>
    </div>
  );
};
