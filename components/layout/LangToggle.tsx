'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'

export default function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('a11y')

  function toggle() {
    const next = locale === 'en' ? 'he' : 'en'
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={t('langToggle')}
      className="flex h-9 items-center rounded-full border border-border px-3 text-sm font-medium tracking-[0.02em] text-text-muted transition-all duration-200 hover:border-accent hover:text-text-primary disabled:opacity-50"
    >
      {locale === 'en' ? 'עב' : 'EN'}
    </button>
  )
}
