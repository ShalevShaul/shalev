'use client'

import { useTranslations } from 'next-intl'

const NAV_LINKS = ['about', 'skills', 'services', 'projects', 'contact'] as const

function SLogo() {
  return (
    <svg width="447" height="541" viewBox="0 0 447 541" fill="currentColor" aria-hidden="true" className="h-6 w-auto">
      <path d="M259 189V172L264 169H269.5L446 280V412L241 541H235L223 530V525L423 399V294L259 190V189Z" />
      <path d="M153.5 455L8.5 365.5L1 368V386.767L148.5 480H156.5L332 366V331.5L125 196V185.5L288 84H289H290L439 179H444L447 176V157L293 58H285L101 174V207V208L308 342L310 344V352.5L153.5 455Z" />
      <path d="M175 341V360L171 363H165L0 260V123L195 0H200.5L213 13V17L23 136V245.857L175 341Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const glassStyle = {
  background: 'var(--navbar-glass-bg)',
  boxShadow: 'inset 0 0 0 1px var(--navbar-glass-border), var(--navbar-glass-shadow)',
  backdropFilter: 'blur(8px) saturate(160%)',
  WebkitBackdropFilter: 'blur(8px) saturate(160%)',
} as const

export default function Footer() {
  const t = useTranslations('nav')
  const tFooter = useTranslations('footer')
  const tA11y = useTranslations('a11y')
  const year = new Date().getFullYear()

  return (
    <footer className="px-4 pb-4 lg:px-6">
      <div style={glassStyle} className="mx-auto max-w-6xl rounded-2xl px-5 py-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              aria-label="Home"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              <SLogo />
            </a>
          </div>

          {/* Nav links */}
          <nav aria-label={t('home')}>
            <ul className="flex flex-wrap gap-6" role="list">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-[14px] text-text-muted transition-colors duration-200 hover:text-text-primary"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shalevshaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tA11y('github')}
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/shalev-shaul-5843772a3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tA11y('linkedin')}
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-text-muted">
            © {year} Shalev Shaul. {tFooter('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
