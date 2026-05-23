'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import Image from 'next/image'
import TechTag from './TechTag'
import Button from './Button'
import type { ProjectData } from '@/data/projects'

type Props = {
  project: ProjectData
  index: number
  liveCta: string
  githubCta: string
}

export default function ProjectRow({ project, index, liveCta, githubCta }: Props) {
  const prefersReduced = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <motion.article
      variants={prefersReduced ? {} : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid items-center gap-12 lg:grid-cols-2"
    >
      {/* Image */}
      <motion.div
        variants={prefersReduced ? {} : fadeUp}
        className={`relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2 ${isEven ? '' : 'lg:order-last'}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/20 via-surface-2 to-accent-alt/10">
            <span className="font-mono text-[13px] text-text-muted/40">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
      </motion.div>

      {/* Details */}
      <motion.div variants={prefersReduced ? {} : staggerContainer} className="flex flex-col gap-5">
        <motion.div variants={prefersReduced ? {} : fadeUp} className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[12px] text-text-muted">{project.year}</span>
        </motion.div>

        <motion.h3
          variants={prefersReduced ? {} : fadeUp}
          className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary lg:text-[34px]"
        >
          {project.title}
        </motion.h3>

        <motion.p variants={prefersReduced ? {} : fadeUp} className="text-[13px] text-text-muted">
          {project.role}
        </motion.p>

        <motion.p
          variants={prefersReduced ? {} : fadeUp}
          className="text-[15px] leading-[1.7] text-text-muted"
        >
          {project.overview}
        </motion.p>

        <motion.div variants={prefersReduced ? {} : fadeUp} className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </motion.div>

        <motion.div variants={prefersReduced ? {} : fadeUp} className="flex flex-wrap gap-3 pt-1">
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="primary">
              {liveCta} ↗
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="secondary">
              {githubCta} ↗
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
