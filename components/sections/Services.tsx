'use client'

import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/ui/SectionHeader'

function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  )
}

function BrandingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

function ConsultingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const SERVICE_ICONS = {
  webDev: <CodeIcon />,
  uiDesign: <DesignIcon />,
  branding: <BrandingIcon />,
  consulting: <ConsultingIcon />,
} as const

type ServiceKey = keyof typeof SERVICE_ICONS

const SERVICE_KEYS: ServiceKey[] = ['webDev', 'uiDesign', 'branding', 'consulting']

// Each card sticks 28px higher than the previous — creates the fanned deck
// Last card (index 3) sits closest to the top, becoming the "top of stack"
const CARD_STICKY_TOP = [208, 180, 152, 124] // px from viewport top
const CARD_SCROLL_HEIGHT = 360 // px of scroll room per card wrapper

export default function Services() {
  const t = useTranslations('services')
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <section id="services" aria-labelledby="services-heading" className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
          <div className="mx-auto max-w-2xl space-y-4">
            {SERVICE_KEYS.map((key) => (
              <div key={key} className="rounded-2xl border border-border bg-surface p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {SERVICE_ICONS[key]}
                </div>
                <h3 className="mb-3 text-[18px] font-semibold leading-snug text-text-primary">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.7] text-text-muted">{t(`${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative"
      style={{ minHeight: `calc(100vh + ${SERVICE_KEYS.length * CARD_SCROLL_HEIGHT + 200}px)` }}
    >
      {/* Section header — normal flow, scrolls away */}
      <div className="mx-auto max-w-6xl px-4 pt-24 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
        </motion.div>
      </div>

      {/* Stacking sticky cards — single column, centered */}
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
        {SERVICE_KEYS.map((key, idx) => (
          <div key={key} style={{ height: CARD_SCROLL_HEIGHT }}>
            <div
              style={{
                position: 'sticky',
                top: CARD_STICKY_TOP[idx],
                zIndex: idx + 1,
              }}
              className="rounded-2xl border border-border bg-surface p-8 shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {SERVICE_ICONS[key]}
              </div>
              <h3 className="mb-3 text-[18px] font-semibold leading-snug text-text-primary">
                {t(`${key}.title`)}
              </h3>
              <p className="text-[15px] leading-[1.7] text-text-muted">{t(`${key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
