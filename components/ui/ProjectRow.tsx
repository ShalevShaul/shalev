'use client'

import { useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
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
  const locale = useLocale()
  const arrow = locale === 'he' ? '↖' : '↗'
  const isEven = index % 2 === 0
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollImgRef = useRef<HTMLImageElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    if (prefersReduced || !project.imageScroll) return
    if (scrollImgRef.current && containerRef.current) {
      const imgNaturalH = scrollImgRef.current.naturalHeight
      const imgNaturalW = scrollImgRef.current.naturalWidth
      const renderedW = containerRef.current.offsetWidth
      const renderedH = renderedW * (imgNaturalH / imgNaturalW)
      const containerH = containerRef.current.offsetHeight
      setTranslateY(-(renderedH - containerH))
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

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
        ref={containerRef}
        variants={prefersReduced ? {} : fadeUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2 ${isEven ? '' : 'lg:order-last'}`}
      >
        {project.imageScroll && (
          <img
            ref={scrollImgRef}
            src={project.imageScroll}
            alt={project.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 'auto',
              transform: `translateY(${isHovered ? translateY : 0}px)`,
              transition: isHovered ? 'transform 6s ease-in-out' : 'transform 0.6s ease-out',
              opacity: isHovered ? 1 : 0,
              pointerEvents: 'none',
            }}
          />
        )}

        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-fill"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{
              opacity: isHovered && project.imageScroll ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {!project.image && !project.imageScroll && (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/20 via-surface-2 to-accent-alt/10">
            <span className="font-mono text-[13px] text-text-muted/40">{project.title}</span>
          </div>
        )}

        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
      </motion.div>

      {/* Details */}
      <motion.div variants={prefersReduced ? {} : staggerContainer} className="flex flex-col gap-5">
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
              {liveCta} {arrow}
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="secondary">
              {githubCta} {arrow}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
