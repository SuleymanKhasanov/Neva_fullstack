import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './src/shared/config/i18n/i18n';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|login).*)'],
};
