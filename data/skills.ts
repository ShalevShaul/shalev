export type SkillItem = {
  name: string
  iconKey: string | null
}

export const skillsRow1: SkillItem[] = [
  { name: 'React', iconKey: 'react' },
  { name: 'Next.js', iconKey: 'nextjs' },
  { name: 'TypeScript', iconKey: 'typescript' },
  { name: 'Tailwind CSS', iconKey: 'tailwindcss' },
  { name: 'Framer Motion', iconKey: 'framer' },
  { name: 'HTML', iconKey: 'html5' },
  { name: 'CSS', iconKey: 'css' },
  { name: 'JavaScript', iconKey: 'javascript' },
]

export const skillsRow2: SkillItem[] = [
  { name: 'Node.js', iconKey: 'nodejs' },
  { name: 'Supabase', iconKey: 'supabase' },
  { name: 'PostgreSQL', iconKey: 'postgresql' },
  { name: 'n8n', iconKey: 'n8n' },
  { name: 'Postman', iconKey: 'postman' },
  { name: 'Git', iconKey: 'git' },
  { name: 'Vercel', iconKey: 'vercel' },
  { name: 'REST APIs', iconKey: null },
]
