import { SKILL_ICONS, TECH_LABEL_TO_KEY } from '@/lib/skillIcons'

type Props = {
  label: string
}

export default function TechTag({ label }: Props) {
  const key = TECH_LABEL_TO_KEY[label]
  const icon = key ? SKILL_ICONS[key] : undefined

  if (icon) {
    return (
      <span
        title={label}
        aria-label={label}
        className="flex items-center justify-center rounded-full border border-border bg-surface p-2 text-text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text-primary"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] font-medium tracking-[0.02em] text-text-muted">
      {label}
    </span>
  )
}
