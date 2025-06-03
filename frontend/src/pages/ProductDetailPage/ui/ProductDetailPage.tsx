// pages/ProductDetailPage/ProductDetailPage.tsx

'use client';

import React from 'react';
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
  return (
    <div className={styles.container}>
      <div className={styles.productContent}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            {product.fullImage && (
              <Image
                src={product.fullImage}
                alt={product.name}
                fill
                className={styles.image}
                priority
              />
            )}
          </div>
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
            '@id': `${typeof window !== 'undefined' ? window.location.origin : ''}/${locale}/product/${product.id}/${product.slug}`,
            name: product.name,
            description: product.description,
            image: product.fullImage,
            url: `${typeof window !== 'undefined' ? window.location.origin : ''}/${locale}/product/${product.id}/${product.slug}`,
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
