'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import TechTag from './TechTag'
import type { ProjectData } from '@/data/projects'

type Props = {
  projects: ProjectData[]
  githubCta: string
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const CARD_ROTATIONS = [-6, 7, -4, 9, -8, 5]
const cardRotation = (i: number) => CARD_ROTATIONS[i % CARD_ROTATIONS.length]

export default function ProjectShowcase({ projects, githubCta }: Props) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReduced = useReducedMotion()

  const prev = useCallback(() => setActive((i) => (i - 1 + projects.length) % projects.length), [projects.length])
  const next = useCallback(() => setActive((i) => (i + 1) % projects.length), [projects.length])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next, isPaused])

  const project = projects[active]

  return (
    <div
      className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Image stack — LEFT */}
      <div className="relative aspect-video w-full shrink-0 lg:w-130">
        <AnimatePresence>
          {projects.map((p, i) => {
            const isActive = i === active
            return (
              <motion.div
                key={p.slug}
                initial={prefersReduced ? {} : {
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: cardRotation(i),
                }}
                animate={prefersReduced ? {} : {
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 1 : 0.95,
                  z: isActive ? 0 : -100,
                  rotate: isActive ? 0 : cardRotation(i),
                  zIndex: isActive ? 40 : projects.length + 2 - i,
                  y: isActive ? [0, -80, 0] : 0,
                }}
                exit={prefersReduced ? {} : {
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: cardRotation(i),
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 origin-bottom overflow-hidden rounded-3xl border border-border bg-surface shadow-xl"
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    priority={isActive}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/20 via-surface-2 to-accent-alt/10">
                    <span className="font-mono text-[12px] text-text-muted/40">{p.title}</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Text panel — RIGHT */}
      <div className="flex w-full flex-col gap-8 lg:max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent">
                {project.role}
              </span>
              <span className="font-mono text-[11px] text-text-muted">· {project.year}</span>
            </div>

            <h3 className="text-3xl font-semibold leading-tight text-text-primary lg:text-4xl">
              {project.title}
            </h3>

            <p className="text-[14px] leading-[1.8] text-text-muted">{project.overview}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>

            <div className="flex items-center gap-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live site — ${project.title}`}
                  className="flex items-center gap-2 text-[13px] font-medium text-text-muted transition-colors duration-200 hover:text-accent"
                >
                  <ExternalLinkIcon />
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${githubCta} — ${project.title}`}
                  className="flex items-center gap-2 text-[13px] font-medium text-text-muted transition-colors duration-200 hover:text-accent"
                >
                  <GitHubIcon />
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent rtl:rotate-180"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent rtl:rotate-180"
          >
            <ChevronRight />
          </button>

          <div role="tablist" aria-label="Project indicators" className="ms-2 flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to ${p.title}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-accent' : 'w-2 bg-border hover:bg-text-muted/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
