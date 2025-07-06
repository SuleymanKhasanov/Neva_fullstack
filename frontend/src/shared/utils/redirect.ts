// src/shared/utils/redirect.ts
'use client';

/**
 * Получает текущую локаль из URL
 */
export function getCurrentLocale(): string {
  if (typeof window === 'undefined') return 'ru';

  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  // Проверяем, является ли первый сегмент валидной локалью
  const validLocales = ['en', 'ru', 'uz', 'kr'];
  return validLocales.includes(locale) ? locale : 'ru';
}

/**
 * Создает URL с учетом текущей локали
 */
export function createLocalizedUrl(path: string): string {
  const locale = getCurrentLocale();

  // Убираем ведущий слеш если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `/${locale}/${cleanPath}`;
}

/**
 * Перенаправляет на страницу с учетом локали
 */
export function redirectToLocalized(path: string) {
  if (typeof window === 'undefined') return;

  const localizedUrl = createLocalizedUrl(path);
  window.location.href = localizedUrl;
}
