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
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-[14px] font-medium text-text-primary transition-colors duration-200 hover:border-accent/40 hover:text-accent">
      <SkillIcon icon={icon} />
      {item.name}
    </div>
  )
}

function SkillTrack({ skills, direction }: { skills: SkillItem[]; direction: 'left' | 'right' }) {
  const doubled = [...skills, ...skills]

  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex gap-3 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} item={skill} />
        ))}
      </div>
    </div>
  )
}

function StaticSkillGrid({ skills }: { skills: SkillItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
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
