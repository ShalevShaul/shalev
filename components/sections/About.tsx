'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function About() {
  const t = useTranslations('about')
  const prefersReduced = useReducedMotion()
  const fade = prefersReduced ? {} : fadeUp
  const stagger = prefersReduced ? {} : staggerContainer

  return (
    <SectionWrapper id="about">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <SectionHeader id="about" title={t('title')} subtitle={t('subtitle')} />
          <motion.p variants={fade} className="text-[16px] leading-[1.8] text-text-muted">
            {t('body')}
          </motion.p>
        </div>

        {/* Right: decorative — reserved for future interactive element */}
        <motion.div
          variants={stagger}
          className="relative flex min-h-75 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface-2 p-12"
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
            className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
          >
            <span className="text-3xl font-bold text-accent">SS</span>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
