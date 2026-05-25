'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { heroStagger, fadeUp } from '@/lib/motion'

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Hero() {
  const t = useTranslations('hero')
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? {} : heroStagger
  const itemVariants = prefersReduced ? {} : fadeUp

  return (
    <section id="hero" className="relative flex min-h-svh items-center">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-[13px] font-medium uppercase tracking-widest text-accent"
            >
              {t('role')}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-[clamp(48px,7vw,96px)] font-extrabold leading-none tracking-[-0.03em] text-text-primary"
            >
              {t('name')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-110 text-[18px] leading-[1.6] text-text-muted"
            >
              {t('tagline')}
            </motion.p>

            <motion.div variants={itemVariants} className="pt-2">
              <Button href="#projects">{t('cta')}</Button>
            </motion.div>
          </motion.div>

          {/* R3F Canvas */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="h-70 sm:h-95 lg:h-130"
            aria-hidden="true"
          >
            <HeroCanvas />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest">{t('scrollHint')}</span>
          <motion.div
            animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
