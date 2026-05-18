import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <main id="main-content">
      <p className="p-8 text-text-primary font-sans">
        {t('name')} — Phase 1 scaffold complete
      </p>
    </main>
  )
}
