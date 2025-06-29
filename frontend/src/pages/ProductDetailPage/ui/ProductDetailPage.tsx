// pages/ProductDetailPage/ProductDetailPage.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductDetail } from '@/shared/types/product';
import { Locale, TranslationType } from '@/shared/config/i18n/types';
import { Button } from '@/shared/ui/Button/Button';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  product: ProductDetail;
  locale: Locale;
  messages: TranslationType;
}

export function ProductDetailPage({ product, locale }: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.productContent}>
        <div className={styles.imageSection}>
          {product.images && product.images.length > 0 ? (
            <div className={styles.imageContainer}>
              {/* Основное изображение */}
              <div className={styles.mainImageContainer}>
                <Image
                  src={product.images[selectedImageIndex].large}
                  alt={product.name}
                  fill
                  className={styles.image}
                  priority
                />
              </div>

              {/* Галерея миниатюр */}
              {product.images.length > 1 && (
                <div className={styles.imageGallery}>
                  {product.images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`${styles.thumbContainer} ${
                        index === selectedImageIndex ? styles.thumbActive : ''
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image.small}
                        alt={`${product.name} - изображение ${index + 1}`}
                        fill
                        className={styles.thumbImage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.placeholderContainer}>
              <div className={styles.placeholderText}>
                Изображение недоступно
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.productHeader}>
            <h1 className={styles.productTitle}>{product.name}</h1>
          </div>

          <div className={styles.descriptionSection}>
            <div className={styles.description}>
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index} className={styles.descriptionParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Характеристики */}
          <div className={styles.divider}></div>
          <div className={styles.specificationsSection}>
            <h3 className={styles.sectionTitle}>Технические характеристики</h3>
            {product.specifications && product.specifications.length > 0 ? (
              <div className={styles.specificationsGrid}>
                {product.specifications.map((spec, index) => (
                  <div key={index} className={styles.specificationItem}>
                    <span className={styles.specName}>{spec.name}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noSpecifications}>
                <p className={styles.noSpecText}>
                  Характеристики данного продукта уточняйте у наших менеджеров
                </p>
              </div>
            )}
          </div>

          {/* Действия */}
          <div className={styles.actionsSection}>
            <a href="+998781500000">
              <Button variant="primary">
                Позвоните нам что-бы узнать больше
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD структурированные данные для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            '@id': `/${locale}/product/${product.id}/${product.slug}`,
            name: product.name,
            description: product.description,
            image: product.images?.[0]?.large || '',
            url: `/${locale}/product/${product.id}/${product.slug}`,
            brand: {
              '@type': 'Brand',
              name: product.brand.name,
            },
            category: product.category.name,
            identifier: product.id.toString(),
            sku: product.id.toString(),
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'UZS',
              seller: {
                '@type': 'Organization',
                name: 'Neva',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '1',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </div>
  );
}
