'use client'

import { useRef } from 'react'
import { type MotionValue, useReducedMotion, motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/ui/SectionHeader'

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}

function PerformanceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ConsultingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0h10m-10 0H3m6 0v4m10-15v15m0 0v4m0-4H9" />
    </svg>
  )
}

const SERVICE_ICONS = {
  webDev: <CodeIcon />,
  uiDesign: <DesignIcon />,
  performance: <PerformanceIcon />,
  consulting: <ConsultingIcon />,
} as const

const SERVICE_KEYS = ['webDev', 'uiDesign', 'performance', 'consulting'] as const
type ServiceKey = (typeof SERVICE_KEYS)[number]
const N = SERVICE_KEYS.length

interface StickyCardProps {
  i: number
  total: number
  scrollYProgress: MotionValue<number>
  targetScale: number
  icon: React.ReactNode
  title: string
  description: string
  cardNum: string
}

const PEEK_PX = 36

function StickyCard({ i, total, scrollYProgress, targetScale, icon, title, description, cardNum }: StickyCardProps) {
  const handoff = Math.min((i + 1) / total, 0.9999)
  const scale = useTransform(scrollYProgress, [handoff, 1], [1, targetScale], { clamp: true })
  const peekY = -(total - 1 - i) * PEEK_PX
  const y = useTransform(scrollYProgress, [handoff, 1], [0, peekY], { clamp: true })

  return (
    <div style={{ zIndex: i + 1 }} className="sticky top-20 flex h-svh items-start justify-center pt-[20vh]">
      <motion.div
        style={{ scale, y }}
        className="w-[90vw] max-w-3xl md:max-w-5xl origin-top rounded-2xl border border-white/[0.07] bg-linear-to-br from-surface/70 to-bg/40 px-8 py-10 min-h-80 md:px-14 md:py-14 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 flex items-center gap-5">
          <span className="text-[56px] md:text-[80px] font-bold leading-none text-accent tabular-nums">{cardNum}</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-accent">{icon}</span>
        </div>
        <h3 className="mb-4 text-3xl md:text-4xl font-bold leading-tight text-text-primary">{title}</h3>
        <p className="max-w-xl text-[16px] md:text-[17px] leading-[1.8] text-text-muted">{description}</p>
      </motion.div>
    </div>
  )
}

function StaticCard({ icon, title, description, cardNum }: { icon: React.ReactNode; title: string; description: string; cardNum: string }) {
  return (
    <div className="rounded-2xl bg-bg/90 px-10 py-10">
      <div className="mb-8 flex items-center gap-5">
        <span className="text-[56px] font-bold leading-none text-accent tabular-nums">{cardNum}</span>
        <div className="h-px flex-1 bg-border" />
        <span className="text-accent">{icon}</span>
      </div>
      <h3 className="mb-4 text-3xl font-bold leading-tight text-text-primary">{title}</h3>
      <p className="max-w-lg text-[16px] leading-[1.8] text-text-muted">{description}</p>
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
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
          <div className="space-y-6">
            {SERVICE_KEYS.map((key: ServiceKey, i) => (
              <StaticCard
                key={key}
                icon={SERVICE_ICONS[key]}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
                cardNum={String(i + 1).padStart(2, '0')}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" aria-labelledby="services-heading" className='-mt-40'>
      <div
        ref={container}
        className="relative flex w-full flex-col items-center pt-[25vh]"
      >
        <div className="absolute top-[6%] w-full px-4 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
          </div>
        </div>

        {SERVICE_KEYS.map((key: ServiceKey, i) => {
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
            />
          )
        })}
      </div>
    </section>
  )
}
