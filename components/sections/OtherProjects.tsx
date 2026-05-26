'use client'

import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectShowcase from '@/components/ui/ProjectShowcase'
import { projects } from '@/data/projects'

export default function OtherProjects() {
  const t = useTranslations('projects')
  const other = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="other-projects">
      <SectionHeader id="other-projects" title={t('otherTitle')} subtitle={t('otherSubtitle')} />
      <ProjectShowcase projects={other} githubCta={t('githubCta')} />
    </SectionWrapper>
  )
}
