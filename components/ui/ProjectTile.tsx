'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { scaleIn } from '@/lib/motion'
import Image from 'next/image'
import TechTag from './TechTag'
import type { ProjectData } from '@/data/projects'

type Props = {
  project: ProjectData
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

export default function ProjectTile({ project, githubCta }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      variants={prefersReduced ? {} : scaleIn}
      className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-accent/35 hover:shadow-card-hover"
    >
      {project.image ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-fill transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-accent/20 via-surface-2 to-accent-alt/10">
          <span className="font-mono text-[12px] text-text-muted/40">{project.title}</span>
        </div>
      )}

      <div className="flex flex-col p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-[17px] font-semibold leading-snug text-text-primary">{project.title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live site — ${project.title}`}
              className="text-text-muted transition-colors duration-200 hover:text-accent"
            >
              <ExternalLinkIcon />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${githubCta} — ${project.title}`}
              className="text-text-muted transition-colors duration-200 hover:text-accent"
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      <p className="mb-4 flex-1 text-[14px] leading-[1.7] text-text-muted">{project.overview}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
      </div>
    </motion.article>
  )
}
