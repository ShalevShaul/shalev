import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shalev Shaul — Full-Stack Developer',
    short_name: 'Shalev Shaul',
    description:
      'Full-Stack Developer specialising in UI/UX, animation, and modern web architecture.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#07080f',
    theme_color: '#07080f',
    lang: 'en',
    categories: ['portfolio', 'technology'],
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
