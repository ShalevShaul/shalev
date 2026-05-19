type Props = {
  label: string
}

export default function TechTag({ label }: Props) {
  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] font-medium tracking-[0.02em] text-text-muted">
      {label}
    </span>
  )
}
