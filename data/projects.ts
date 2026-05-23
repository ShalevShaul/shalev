export type ProjectData = {
  slug: string
  title: string
  role: string
  year: string
  overview: string
  tech: string[]
  image?: string
  imageScroll?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: ProjectData[] = [
  {
    slug: 'pare',
    title: 'PARE',
    role: 'Full-Stack Developer',
    year: '2026',
    overview:
      'A full-featured expense and income management app. Track transactions by date, manage recurring expenses, group by categories, and generate financial reports — income vs. expenses, category breakdowns, top 5 costs, and CSV/PDF export.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
    image: '/projects/pare.png',
    imageScroll: '/projects/pare-full.png',
    liveUrl: 'https://pare-three.vercel.app/',
    githubUrl: 'https://github.com/ShalevShaul/PARE',
    featured: true,
  },
  {
    slug: 'little-lemon',
    title: 'Little Lemon Restaurant',
    role: 'Frontend Developer',
    year: '2025',
    overview:
      'A restaurant website for Little Lemon featuring signature dishes, customer reviews, and a full table reservation flow — with booking tracking, confirmation emails, and calendar integration.',
    tech: ['React', 'TypeScript', 'Vite', 'SCSS'],
    image: '/projects/lemon.png',
    imageScroll: '/projects/lemo-full.png',
    liveUrl: 'https://little-lemon-reserve.vercel.app/',
    githubUrl: 'https://github.com/ShalevShaul/little-lemon',
    featured: true,
  },
  {
    slug: 'storeit',
    title: 'StoreIt',
    role: 'Full-Stack Developer',
    year: '2025',
    overview:
      'A cloud storage platform with user authentication, file management — upload, delete, rename, download, and share files with other users. Supports documents, images, and media with built-in search.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Appwrite'],
    image: '/projects/storeit.png',
    liveUrl: 'https://store-it-storage-management.vercel.app',
    githubUrl: 'https://github.com/ShalevShaul/storeIt',
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
