'use client'

import { useRef, type ReactNode } from 'react'
import { type MotionValue, useReducedMotion, motion, useScroll, useTransform } from 'framer-motion'
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
const N = SERVICE_KEYS.length

interface StickyCardProps {
  i: number
  total: number
  scrollYProgress: MotionValue<number>
  targetScale: number
  icon: ReactNode
  title: string
  description: string
  cardNum: string
  totalNum: string
}

function StickyCard({ i, total, scrollYProgress, targetScale, icon, title, description, cardNum, totalNum }: StickyCardProps) {
  const scale = useTransform(scrollYProgress, [i * (1 / total), 1], [1, targetScale])

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center">
      <motion.div
        style={{ scale }}
        className="relative w-[90vw] h-[50vh] max-w-2xl rounded-2xl border border-border bg-surface p-8 origin-top"
      >
        <div className="flex items-start justify-between">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            {icon}
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-disabled">
            {cardNum} — {totalNum}
          </span>
        </div>
        <h3 className="mb-3 text-[18px] font-semibold leading-snug text-text-primary">{title}</h3>
        <p className="text-[15px] leading-[1.7] text-text-muted">{description}</p>
      </motion.div>
    </div>
  )
}

export default function Services() {
  const t = useTranslations('services')
  const prefersReduced = useReducedMotion()
  const container = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

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
    <section id="services" aria-labelledby="services-heading">
      <div
        ref={container}
        className="relative flex w-full flex-col items-center pt-[20vh]"
      >
        <div className="absolute top-[6%] w-full px-4 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
          </div>
        </div>

        {SERVICE_KEYS.map((key, i) => {
          const targetScale = Math.max(0.75, 1 - (N - i - 1) * 0.05)
          return (
            <StickyCard
              key={key}
              i={i}
              total={N}
              scrollYProgress={scrollYProgress}
              targetScale={targetScale}
              icon={SERVICE_ICONS[key]}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              cardNum={String(i + 1).padStart(2, '0')}
              totalNum={String(N).padStart(2, '0')}
            />
          )
        })}
      </div>
    </section>
  )
}
