import { getTranslations } from 'next-intl/server'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectRow from '@/components/ui/ProjectRow'
import { projects } from '@/data/projects'

export default async function FeaturedProjects() {
  const t = await getTranslations('projects')
  const featured = projects.filter((p) => p.featured)

  return (
    <SectionWrapper id="projects">
      <SectionHeader id="projects" title={t('title')} subtitle={t('subtitle')} />
      <div className="flex flex-col gap-24">
        {featured.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            liveCta={t('liveCta')}
            githubCta={t('githubCta')}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
