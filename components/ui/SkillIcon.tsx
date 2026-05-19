import type { SimpleIcon } from 'simple-icons'

function FallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13.325 3.05L8.667 20.432l1.932.518 4.658-17.382zm-5.548 2.263L.313 12l7.464 6.687 1.337-1.494L3.187 12l5.927-5.193zM16.21 5.313l-1.337 1.494L20.8 12l-5.927 5.193 1.337 1.494L23.687 12z" />
    </svg>
  )
}

export default function SkillIcon({ icon }: { icon?: SimpleIcon }) {
  if (!icon) return <FallbackIcon />
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}
