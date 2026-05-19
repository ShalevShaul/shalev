'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

type Props = {
  id?: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      variants={prefersReduced ? {} : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`py-16 lg:py-24 ${className ?? ''}`}
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">{children}</div>
    </motion.section>
  )
}
