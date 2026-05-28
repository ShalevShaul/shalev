import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
