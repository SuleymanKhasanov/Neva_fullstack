// frontend/src/features/ProductImageUpload/ui/ProductImageUpload.tsx
'use client';

import { useRef, useState } from 'react';
import { LuUpload, LuX, LuImage, LuPlus } from 'react-icons/lu';
import { useImageUpload } from '../model/useImageUpload';
import styles from './ProductImageUpload.module.css';

interface ProductImageUploadProps {
  images: File[];
  errors: Record<string, string>;
  onUpdate: (images: File[]) => void;
}

const ProductImageUpload = ({
  images,
  errors,
  onUpdate,
}: ProductImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    previews,
    isUploading,
    uploadError,
    handleFileSelect,
    removeImage,
    reorderImages,
  } = useImageUpload(images, onUpdate);

  const maxImages = 5;
  const canAddMore = images.length < maxImages;

  // Обработка клика по кнопке загрузки
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Обработка выбора файлов
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFileSelect(files);

    // Очищаем input для возможности выбрать те же файлы повторно
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag & Drop обработчики
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFileSelect(files);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.label}>
          <LuImage className={styles.labelIcon} />
          Изображения продукта <span className={styles.required}>*</span>
        </label>
        <div className={styles.counter}>
          <span
            className={`${styles.count} ${images.length === 0 ? styles.error : ''}`}
          >
            {images.length}
          </span>
          <span className={styles.maxCount}>/ {maxImages}</span>
        </div>
      </div>

      {/* Скрытый input для файлов */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />

      {/* Область загрузки */}
      {images.length === 0 ? (
        <div
          className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''} ${errors.images ? styles.error : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <div className={styles.uploadContent}>
            <LuUpload className={styles.uploadIcon} />
            <h3 className={styles.uploadTitle}>Загрузите изображения</h3>
            <p className={styles.uploadDescription}>
              Перетащите файлы сюда или кликните для выбора
            </p>
            <div className={styles.uploadRequirements}>
              <span>• Минимум 1 изображение, максимум {maxImages}</span>
              <span>• Форматы: JPG, PNG, WebP</span>
              <span>• Максимальный размер: 10MB на файл</span>
            </div>
          </div>
        </div>
      ) : (
        // Превью загруженных изображений
        <div className={styles.imagesGrid}>
          {previews.map((preview, index) => (
            <div key={preview.id} className={styles.imageItem}>
              <div className={styles.imagePreview}>
                <img
                  src={preview.url}
                  alt={`Превью ${index + 1}`}
                  className={styles.image}
                />
                <div className={styles.imageOverlay}>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeImage(index)}
                    aria-label="Удалить изображение"
                  >
                    <LuX />
                  </button>
                </div>
                {index === 0 && (
                  <div className={styles.primaryBadge}>Основное</div>
                )}
              </div>
              <div className={styles.imageInfo}>
                <span className={styles.fileName}>{preview.file.name}</span>
                <span className={styles.fileSize}>
                  {(preview.file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
            </div>
          ))}

          {/* Кнопка добавления еще изображений */}
          {canAddMore && (
            <div
              className={`${styles.imageItem} ${styles.addMore}`}
              onClick={handleUploadClick}
            >
              <div className={styles.addMoreContent}>
                <LuPlus className={styles.addMoreIcon} />
                <span className={styles.addMoreText}>Добавить еще</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ошибки */}
      {errors.images && (
        <div className={styles.errorMessage}>{errors.images}</div>
      )}

      {uploadError && <div className={styles.errorMessage}>{uploadError}</div>}

      {/* Подсказки */}
      <div className={styles.hints}>
        <div className={styles.hintItem}>
          <strong>Первое изображение</strong> будет использоваться как основное
          в каталоге
        </div>
        <div className={styles.hintItem}>
          <strong>Рекомендуемое разрешение:</strong> минимум 800x600 пикселей
        </div>
        <div className={styles.hintItem}>
          <strong>Для лучшего качества:</strong> используйте изображения в
          формате JPG или PNG
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;
