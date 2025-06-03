// shared/types/metadata.ts

import { Metadata } from 'next';

// Поддерживаемые типы OpenGraph в Next.js
export type OpenGraphType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';

// Интерфейс для создания метаданных продукта
export interface ProductMetadataParams {
  title: string;
  description: string;
  imageUrl?: string;
  canonicalUrl: string;
  locale: string;
  keywords: string[];
  brandName: string;
  categoryName: string;
}

// Функция для создания метаданных продукта
export function createProductMetadata(params: ProductMetadataParams): Metadata {
  const {
    title,
    description,
    imageUrl,
    canonicalUrl,
    locale,
    keywords,
    brandName,
    categoryName,
  } = params;

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Neva App',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: 'image/jpeg',
            },
          ]
        : [],
      type: 'website', // Используем только поддерживаемые типы
      locale: locale,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: title,
            },
          ]
        : [],
    },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl.replace(`/${locale}/`, '/en/'),
        ru: canonicalUrl.replace(`/${locale}/`, '/ru/'),
        uz: canonicalUrl.replace(`/${locale}/`, '/uz/'),
        kr: canonicalUrl.replace(`/${locale}/`, '/kr/'),
      },
    },

    // SEO метатеги
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Дополнительные метатеги
    other: {
      'product:brand': brandName,
      'product:category': categoryName,
      'product:availability': 'in stock',
      'product:condition': 'new',
    },
  };
}
