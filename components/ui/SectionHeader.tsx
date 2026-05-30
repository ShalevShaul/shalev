'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

type Props = {
  id: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ id, title, subtitle }: Props) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? {} : fadeUp

  return (
    <div className="mb-8">
      <motion.h2
        id={`${id}-heading`}
        variants={variants}
        className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={variants} className="mt-2 text-lg leading-[1.7] text-text-muted">
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
