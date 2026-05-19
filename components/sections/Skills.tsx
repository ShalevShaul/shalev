'use client'

import { useTranslations } from 'next-intl'
import { useReducedMotion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import SkillIcon from '@/components/ui/SkillIcon'
import { skillsRow1, skillsRow2, type SkillItem } from '@/data/skills'
import { SKILL_ICONS } from '@/lib/skillIcons'

function SkillPill({ item }: { item: SkillItem }) {
  const icon = item.iconKey ? SKILL_ICONS[item.iconKey] : undefined
  return (
    <div className="group flex shrink-0 flex-col items-center gap-2.5 rounded-2xl bg-surface px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_4px_24px_rgba(99,102,241,0.12)]">
      <div className="text-text-muted opacity-60 transition-opacity duration-300 group-hover:opacity-90">
        <SkillIcon icon={icon} size={36} />
      </div>
      <span className="text-[11px] font-medium tracking-[0.04em] text-text-muted">
        {item.name}
      </span>
    </div>
  )
}

function SkillTrack({ skills, direction }: { skills: SkillItem[]; direction: 'left' | 'right' }) {
  // Doubled array + mr-4 on each wrapper (not gap) ensures:
  // total width = 2 × one-copy-width, so -50% lands exactly at the seam.
  const doubled = [...skills, ...skills]

  return (
    <div className="group/track flex overflow-hidden">
      <div
        className={`flex ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        } group-hover/track:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {doubled.map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="mr-4 shrink-0">
            <SkillPill item={skill} />
          </div>
        ))}
      </div>
    </div>
  )
}

function StaticSkillGrid({ skills }: { skills: SkillItem[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <SkillPill key={skill.name} item={skill} />
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
