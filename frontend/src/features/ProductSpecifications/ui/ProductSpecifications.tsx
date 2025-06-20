// frontend/src/features/ProductSpecifications/ui/ProductSpecifications.tsx
'use client';

import { useState } from 'react';
import { LuList, LuInfo } from 'react-icons/lu';
import styles from './ProductSpecifications.module.css';

interface ProductSpecificationsProps {
  specifications: string;
  errors: Record<string, string>;
  onUpdate: (specifications: string) => void;
}

const ProductSpecifications = ({
  specifications,
  errors,
  onUpdate,
}: ProductSpecificationsProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const charCount = specifications.length;
  const maxLength = 3000;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.label}>
          <LuList className={styles.labelIcon} />
          Характеристики продукта
        </label>
        <div className={styles.counter}>
          <span className={styles.count}>{charCount}</span>
          <span className={styles.maxCount}>/ {maxLength}</span>
        </div>
      </div>

      <div
        className={`${styles.textareaContainer} ${isFocused ? styles.focused : ''} ${errors.specifications ? styles.error : ''}`}
      >
        <textarea
          className={styles.textarea}
          value={specifications}
          onChange={(e) => onUpdate(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Введите технические характеристики...

Примеры форматов:

Формат списка:
• Процессор: Intel Xeon Gold 6248R
• Оперативная память: 64GB DDR4
• Хранилище: 2x 960GB NVMe SSD
• Сеть: 4x 1GbE + 2x 10GbE

Формат таблицы:
Процессор        | Intel Xeon Gold 6248R
Память           | 64GB DDR4 ECC
Диски            | 2x 960GB NVMe SSD
Сеть             | 4x 1GbE, 2x 10GbE

Или любой удобный формат..."
          maxLength={maxLength}
          rows={10}
        />
      </div>

      {errors.specifications && (
        <div className={styles.errorMessage}>{errors.specifications}</div>
      )}

      <div className={styles.infoBlock}>
        <div className={styles.infoHeader}>
          <LuInfo className={styles.infoIcon} />
          <span className={styles.infoTitle}>Информация о характеристиках</span>
        </div>
        <div className={styles.infoContent}>
          <p>
            Поле необязательно для заполнения, но рекомендуется для более
            полного описания продукта.
          </p>
          <p>
            Вы можете использовать любой удобный формат: списки, таблицы или
            свободный текст.
          </p>
        </div>
      </div>

      <div className={styles.examples}>
        <h4 className={styles.examplesTitle}>📝 Рекомендации по заполнению:</h4>
        <div className={styles.examplesList}>
          <div className={styles.example}>
            <strong>Для серверов:</strong> CPU, RAM, Storage, Network, Power
          </div>
          <div className={styles.example}>
            <strong>Для сетевого оборудования:</strong> Ports, Speed, Protocols,
            Management
          </div>
          <div className={styles.example}>
            <strong>Для ПО:</strong> Version, Requirements, Features,
            Compatibility
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
