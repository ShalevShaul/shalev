'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

const CONSENT_KEY = 'cookie_consent'

const glassStyle = {
  background: 'var(--navbar-glass-bg)',
  boxShadow: 'inset 0 0 0 1px var(--navbar-glass-border), 0 8px 32px rgba(0,0,0,0.18)',
  backdropFilter: 'blur(12px) saturate(160%)',
  WebkitBackdropFilter: 'blur(12px) saturate(160%)',
} as const

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('cookies')
  const locale = useLocale()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="region"
          aria-label={t('learnMore')}
          style={glassStyle}
          className="fixed bottom-4 inset-e-4 z-50 w-[min(340px,calc(100vw-2rem))] rounded-2xl p-4"
        >
          <p className="mb-3 text-[13px] leading-[1.65] text-text-muted">
            {t('message')}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={accept}
              className="rounded-lg bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {t('accept')}
            </button>
            <Link
              href={`/${locale}/privacy-policy`}
              className="rounded-lg px-4 py-2 text-[13px] font-medium text-text-muted transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {t('learnMore')}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
