'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useScrolled } from '@/hooks/useScrolled'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'

const NAV_LINKS = ['about', 'skills', 'services', 'projects', 'contact'] as const

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  )
}

export default function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  const tA11y = useTranslations('a11y')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-[rgba(7,8,15,0.85)] backdrop-blur-[16px] dark:bg-[rgba(7,8,15,0.85)] light:bg-[rgba(255,255,255,0.85)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <a
            href="#hero"
            className="text-[15px] font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-200 hover:text-accent"
          >
            Shalev Shaul
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {NAV_LINKS.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="text-[14px] font-medium tracking-[0.01em] text-text-muted transition-colors duration-200 hover:text-text-primary"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LangToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? tA11y('closeMenu') : tA11y('openMenu')}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-all duration-200 hover:text-text-primary md:hidden"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-y-0 end-0 z-40 w-72 border-s border-border bg-surface-2 px-6 pt-24 pb-8 md:hidden rtl:start-0 rtl:end-auto"
          >
            <ul className="flex flex-col gap-6" role="list">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    onClick={() => setOpen(false)}
                    className="text-[18px] font-medium text-text-muted transition-colors duration-200 hover:text-text-primary"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay behind drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
