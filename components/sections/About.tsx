'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { ScrollVideoCanvas } from '@/components/ui/ScrollVideoCanvas'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function About() {
  const t = useTranslations('about')
  const prefersReduced = useReducedMotion() ?? false
  const boxRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ['start end', 'end start'],
  })

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

        {/* Right: scroll video — spinning border */}
        <motion.div
          variants={stagger}
          className="relative rounded-3xl p-0.5 dark:p-px overflow-hidden"
        >
          {/* Spinning conic gradient — scaled up so corners stay covered while rotating */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 65%, var(--accent-alt) 78%, var(--accent) 85%, var(--accent-alt) 92%, transparent 100%)',
              animation: 'border-spin 4s linear infinite',
            }}
            aria-hidden="true"
          />
          <div
            ref={boxRef}
            className="relative z-10 overflow-hidden rounded-[23px] bg-surface-2 min-h-96 lg:min-h-130"
          >
            <ScrollVideoCanvas scrollYProgress={scrollYProgress} reducedMotion={prefersReduced} />
            <div className="pointer-events-none absolute inset-0 bg-white/40 dark:hidden" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 hidden dark:block bg-black/40" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
