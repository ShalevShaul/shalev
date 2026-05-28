'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { PixelatedCanvas } from '@/components/ui/PixelatedCanvas'
import { fadeUp, staggerContainer } from '@/lib/motion'

function PhotoCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ width: 400, height: 520 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) {
        setDims({ width: Math.round(width), height: Math.round(height) })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <PixelatedCanvas
        src="/me.webp"
        width={dims.width}
        height={dims.height}
        cellSize={5}
        dotScale={0.9}
        shape="square"
        backgroundColor="#000000"
        interactive={!reducedMotion}
        distortionMode="swirl"
        distortionStrength={3}
        distortionRadius={80}
        objectFit="cover"
        tintColor="#FFFFFF"
        tintStrength={0.1}
        dropoutStrength={0.2}
        jitterStrength={5}
        jitterSpeed={2}
        followSpeed={0.3}
        maxFps={30}
        sampleAverage
        fadeOnLeave
      />
    </div>
  )
}

export default function About() {
  const t = useTranslations('about')
  const prefersReduced = useReducedMotion() ?? false

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

        {/* Right: pixelated photo */}
        <motion.div
          variants={stagger}
          className="relative rounded-full p-0.5 dark:p-px overflow-hidden mx-auto w-80 lg:w-110"
        >
          {/* Spinning conic gradient border */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 65%, var(--accent-alt) 78%, var(--accent) 85%, var(--accent-alt) 92%, transparent 100%)',
              animation: 'border-spin 4s linear infinite',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 overflow-hidden rounded-full bg-surface-2 aspect-square w-full">
            <PhotoCanvas reducedMotion={prefersReduced} />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
