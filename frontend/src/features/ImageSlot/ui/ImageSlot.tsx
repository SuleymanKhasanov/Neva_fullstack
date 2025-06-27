// frontend/src/features/ImageSlot/ui/ImageSlot.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Plus, X, Star } from 'lucide-react';
import styles from './ImageSlot.module.css';

// ==================== ТИПЫ ====================

interface ImageSlotProps {
  readonly slotIndex: number;
  readonly image: File | null;
  readonly preview: string | null;
  readonly isPrimary?: boolean;
  readonly disabled?: boolean;
  readonly onImageSelect: (slotIndex: number, file: File | null) => void;
  readonly onImageRemove: (slotIndex: number) => void;
  readonly onSetPrimary?: (slotIndex: number) => void;
  readonly className?: string;
}

// ==================== КОНСТАНТЫ ====================

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// ==================== КОМПОНЕНТ ====================

export const ImageSlot: React.FC<ImageSlotProps> = ({
  slotIndex,
  image,
  preview,
  isPrimary = false,
  disabled = false,
  onImageSelect,
  onImageRemove,
  onSetPrimary,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  // ==================== ВАЛИДАЦИЯ ====================

  const validateFile = useCallback((file: File): string => {
    if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
      return 'Поддерживаются только JPEG, PNG и WebP форматы';
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'Максимальный размер файла 10MB';
    }

    return '';
  }, []);

  // ==================== ОБРАБОТЧИКИ ====================

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      setError('');
      onImageSelect(slotIndex, file);
    },
    [slotIndex, onImageSelect, validateFile]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(event.target.files);
      // Сбрасываем input для возможности повторного выбора того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileSelect]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleRemove = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onImageRemove(slotIndex);
      setError('');
    },
    [slotIndex, onImageRemove]
  );

  const handleSetPrimary = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onSetPrimary?.(slotIndex);
    },
    [slotIndex, onSetPrimary]
  );

  // ==================== DRAG & DROP ====================

  const handleDragEnter = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Проверяем, что мышь действительно покинула элемент
    const rect = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = event.dataTransfer.files;
      handleFileSelect(files);
    },
    [disabled, handleFileSelect]
  );

  // ==================== RENDER ====================

  const hasImage = image && preview;
  const slotNumber = slotIndex + 1;

  const containerClasses = [
    styles.container,
    hasImage ? styles.hasImage : styles.empty,
    isDragOver ? styles.dragOver : '',
    disabled ? styles.disabled : '',
    isPrimary ? styles.primary : '',
    error ? styles.error : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <div
        className={containerClasses}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={
          hasImage
            ? `Изображение ${slotNumber}${isPrimary ? ' (основное)' : ''}`
            : `Добавить изображение ${slotNumber}`
        }
      >
        {/* Скрытый input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleInputChange}
          disabled={disabled}
          className={styles.hiddenInput}
        />

        {/* Пустое состояние */}
        {!hasImage && (
          <div className={styles.emptyContent}>
            <div className={styles.plusIcon}>
              <Plus size={24} />
            </div>
            <span className={styles.emptyText}>{slotNumber}</span>
          </div>
        )}

        {/* Состояние с изображением */}
        {hasImage && (
          <div className={styles.imageContent}>
            <img
              src={preview}
              alt={`Изображение ${slotNumber}`}
              className={styles.previewImage}
              loading="lazy"
            />

            {/* Оверлей с кнопками */}
            <div className={styles.overlay}>
              <div className={styles.actions}>
                {/* Кнопка "Основное" */}
                {onSetPrimary && !isPrimary && (
                  <button
                    type="button"
                    onClick={handleSetPrimary}
                    className={styles.primaryButton}
                    title="Сделать основным"
                    aria-label="Сделать основным изображением"
                  >
                    <Star size={16} />
                  </button>
                )}

                {/* Кнопка удаления */}
                <button
                  type="button"
                  onClick={handleRemove}
                  className={styles.removeButton}
                  title="Удалить изображение"
                  aria-label="Удалить изображение"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Значок "Основное" */}
            {isPrimary && (
              <div className={styles.primaryBadge}>
                <Star size={12} fill="currentColor" />
                <span>Основное</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ошибка */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
