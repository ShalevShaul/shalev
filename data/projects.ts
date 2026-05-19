export type ProjectData = {
  slug: string
  title: string
  role: string
  year: string
  overview: string
  tech: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: ProjectData[] = [
  {
    slug: 'portfolio',
    title: 'Personal Portfolio',
    role: 'Full-Stack Developer & Designer',
    year: '2025',
    overview:
      'A cinematic, bilingual portfolio built with Next.js 16, Tailwind v4, and React Three Fiber. Features dark/light mode, RTL Hebrew support, infinite skills animation, and a 3D icosphere hero.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Three Fiber'],
    githubUrl: 'https://github.com/shalevshaul',
    featured: true,
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    role: 'Full-Stack Developer',
    year: '2024',
    overview:
      'An end-to-end web application with authentication, real-time data, and a clean accessible interface designed to make complex workflows feel effortless.',
    tech: ['React', 'Node.js', 'Supabase', 'TypeScript'],
    githubUrl: 'https://github.com/shalevshaul',
    featured: true,
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    role: 'Frontend Developer',
    year: '2024',
    overview:
      'A smooth, accessible product landing page with scroll-driven animations and an obsessive focus on performance.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shalevshaul',
    featured: false,
  },
  {
    slug: 'project-four',
    title: 'Project Four',
    role: 'Full-Stack Developer',
    year: '2023',
    overview:
      'REST API integration with a React dashboard. Implemented real-time data filtering, custom chart components, and a responsive layout.',
    tech: ['Next.js', 'TypeScript', 'REST APIs'],
    githubUrl: 'https://github.com/shalevshaul',
    featured: false,
  },
  {
    slug: 'project-five',
    title: 'Project Five',
    role: 'Frontend Developer',
    year: '2023',
    overview:
      'Component library with a full Storybook setup, design tokens, and automated visual regression testing.',
    tech: ['React', 'TypeScript', 'Storybook'],
    githubUrl: 'https://github.com/shalevshaul',
    featured: false,
  },
]
