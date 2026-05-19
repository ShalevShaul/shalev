'use client'

import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'

function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  )
}

function BrandingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

function ConsultingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const SERVICE_ICONS = {
  webDev: <CodeIcon />,
  uiDesign: <DesignIcon />,
  branding: <BrandingIcon />,
  consulting: <ConsultingIcon />,
} as const

type ServiceKey = keyof typeof SERVICE_ICONS

const SERVICE_KEYS: ServiceKey[] = ['webDev', 'uiDesign', 'branding', 'consulting']

export default function Services() {
  const t = useTranslations('services')

  return (
    <SectionWrapper id="services">
      <SectionHeader id="services" title={t('title')} subtitle={t('subtitle')} />
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICE_KEYS.map((key) => (
          <ServiceCard
            key={key}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            icon={SERVICE_ICONS[key]}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
