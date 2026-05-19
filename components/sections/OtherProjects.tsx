'use client'

import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectTile from '@/components/ui/ProjectTile'
import { projects } from '@/data/projects'

export default function OtherProjects() {
  const t = useTranslations('projects')
  const other = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="other-projects">
      <SectionHeader id="other-projects" title={t('otherTitle')} subtitle={t('otherSubtitle')} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {other.map((project) => (
          <ProjectTile key={project.slug} project={project} githubCta={t('githubCta')} />
        ))}
      </div>
    </SectionWrapper>
  )
}
