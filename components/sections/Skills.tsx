'use client'

import { useTranslations } from 'next-intl'
import { useReducedMotion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { skillsRow1, skillsRow2 } from '@/data/skills'

function SkillPill({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center rounded-full border border-border bg-surface px-5 py-2.5 text-[14px] font-medium text-text-primary transition-colors duration-200 hover:border-accent/40 hover:text-accent">
      {label}
    </div>
  )
}

function SkillTrack({ skills, direction }: { skills: string[]; direction: 'left' | 'right' }) {
  const doubled = [...skills, ...skills]

  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex gap-3 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill}-${i}`} label={skill} />
        ))}
      </div>
    </div>
  )
}

function StaticSkillGrid({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillPill key={skill} label={skill} />
      ))}
    </div>
  )
}

export default function Skills() {
  const t = useTranslations('skills')
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="skills">
      <SectionHeader id="skills" title={t('title')} subtitle={t('subtitle')} />

      {prefersReduced ? (
        <StaticSkillGrid skills={[...skillsRow1, ...skillsRow2]} />
      ) : (
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex flex-col gap-4">
            <SkillTrack skills={skillsRow1} direction="left" />
            <SkillTrack skills={skillsRow2} direction="right" />
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
