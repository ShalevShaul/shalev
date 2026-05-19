'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { scaleIn } from '@/lib/motion'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
}

export default function ServiceCard({ title, description, icon }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      variants={prefersReduced ? {} : scaleIn}
      className="group rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/35 hover:shadow-card-hover"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mb-3 text-[18px] font-semibold leading-snug text-text-primary">{title}</h3>
      <p className="text-[15px] leading-[1.7] text-text-muted">{description}</p>
    </motion.div>
  )
}
