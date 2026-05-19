'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function About() {
  const t = useTranslations('about')
  const prefersReduced = useReducedMotion()
  const fade = prefersReduced ? {} : fadeUp
  const stagger = prefersReduced ? {} : staggerContainer

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ]

  return (
    <SectionWrapper id="about">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <SectionHeader id="about" title={t('title')} subtitle={t('subtitle')} />
          <motion.p variants={fade} className="mb-8 text-[16px] leading-[1.8] text-text-muted">
            {t('body')}
          </motion.p>
          <motion.div variants={fade}>
            <Button href="/cv.pdf" variant="secondary">
              {t('resumeCta')}
            </Button>
          </motion.div>
        </div>

        {/* Right: profile visual with stats */}
        <motion.div
          variants={stagger}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface-2 p-8"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-alt/10 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            variants={fade}
            className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-accent/20 bg-accent/10"
          >
            <span className="text-2xl font-bold text-accent">SS</span>
          </motion.div>

          <div className="relative grid grid-cols-3 gap-4">
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fade}
                className="rounded-2xl border border-border bg-surface p-4 text-center"
              >
                <p className="mb-1 text-[28px] font-bold tracking-[-0.02em] text-accent">{value}</p>
                <p className="text-[12px] leading-tight text-text-muted">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
