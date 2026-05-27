import type { MetadataRoute } from 'next'

const BASE_URL = 'https://shalevshaul.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${BASE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          he: `${BASE_URL}/he`,
          'x-default': `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/he`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          he: `${BASE_URL}/he`,
          'x-default': `${BASE_URL}/en`,
        },
      },
    },
  ]
}
