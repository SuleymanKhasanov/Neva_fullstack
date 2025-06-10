import createMiddleware from 'next-intl/middleware';
import { localePrefix } from './src/shared/config/i18n/i18n';
import { locales } from '@/shared/config/i18n/types';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
  // Добавляем редирект для корневых путей локали на группу user
  pathnames: {
    '/': '/user',
  },
});

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|login).*)'],
};
