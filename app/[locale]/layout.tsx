import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: '400',
})

const BASE_URL = 'https://shalevshaul.dev'

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shalev Shaul',
  url: BASE_URL,
  jobTitle: 'Full-Stack Developer',
  description:
    'Full-Stack Developer specialising in UI/UX, animation, and modern web architecture.',
  knowsLanguage: ['en', 'he'],
  nationality: {
    '@type': 'Country',
    name: 'Israel',
  },
  sameAs: [
    'https://github.com/shalevshaul',
    'https://www.linkedin.com/in/shalev-shaul-5843772a3',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'UI/UX Design',
    'Web Animation',
    'Full-Stack Development',
  ],
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Shalev Shaul',
  url: BASE_URL,
  author: { '@type': 'Person', name: 'Shalev Shaul' },
  inLanguage: ['en', 'he'],
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHe = locale === 'he'

  const title = isHe
    ? 'שלו שאול — מפתח Full-Stack'
    : 'Shalev Shaul — Full-Stack Developer'

  const description = isHe
    ? 'מפתח פול סטאק המתמחה בעיצוב UI/UX, אנימציה ואדריכלות ווב מודרנית. פרילנסר זמין לפרויקטים.'
    : 'Full-Stack Developer specialising in UI/UX, animation, and modern web architecture.'

  const keywords = isHe
    ? [
        'מפתח פול סטאק',
        'מפתח Full-Stack',
        'עיצוב UI/UX',
        'מפתח עצמאי',
        'פרילנסר',
        'פיתוח אפליקציות',
        'מפתח ישראלי',
        'React',
        'Next.js',
        'TypeScript',
        'פיתוח אתרים',
        'שלו שאול',
      ]
    : [
        'Full-Stack Developer',
        'UI/UX Design',
        'React',
        'Next.js',
        'TypeScript',
        'Web Developer',
        'Frontend Developer',
        'Freelance Developer',
        'Israel',
        'Shalev Shaul',
        'Web Animation',
        'Modern Web Architecture',
      ]

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: '%s | Shalev Shaul',
      default: title,
    },
    description,
    keywords,
    authors: [{ name: 'Shalev Shaul', url: BASE_URL }],
    creator: 'Shalev Shaul',
    publisher: 'Shalev Shaul',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        he: `${BASE_URL}/he`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Shalev Shaul',
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      locale: isHe ? 'he_IL' : 'en_US',
      alternateLocale: isHe ? 'en_US' : 'he_IL',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Shalev Shaul — Full-Stack Developer',
          type: 'image/png',
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      shortcut: '/favicon.ico',
    },
    manifest: '/manifest.webmanifest',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07080f' },
    { media: '(prefers-color-scheme: light)', color: '#eef0ff' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const isRtl = locale === 'he'

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
