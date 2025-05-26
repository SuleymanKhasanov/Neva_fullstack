/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import { type RemotePattern } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/i18n.ts');

const remotePatterns: RemotePattern[] = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/public/images/**',
  },
];

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default withNextIntl(nextConfig);
