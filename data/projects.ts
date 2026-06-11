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
    slug: 'pare',
    title: 'PARE',
    role: 'Full-Stack',
    year: '2026',
    overview:
      'A full-featured expense and income management app. Track transactions by date, manage recurring expenses, group by categories, and generate financial reports - income vs. expenses, category breakdowns, top 5 costs, and CSV/PDF export.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
    image: '/projects/pare.webp',
    liveUrl: 'https://pare-three.vercel.app/',
    githubUrl: 'https://github.com/ShalevShaul/PARE',
    featured: true,
  },
  {
    slug: 'little-lemon',
    title: 'Little Lemon Restaurant',
    role: 'Frontend',
    year: '2025',
    overview:
      'A restaurant website for Little Lemon featuring signature dishes, customer reviews, and a full table reservation flow - with booking tracking, confirmation emails, and calendar integration.',
    tech: ['React', 'TypeScript', 'Vite', 'SCSS'],
    image: '/projects/lemon.webp',
    liveUrl: 'https://little-lemon-reserve.vercel.app/',
    githubUrl: 'https://github.com/ShalevShaul/little-lemon',
    featured: true,
  },
  {
    slug: 'storeit',
    title: 'StoreIt',
    role: 'Full-Stack',
    year: '2025',
    overview:
      'A cloud storage platform with user authentication, file management - upload, delete, rename, download, and share files with other users. Supports documents, images, and media with built-in search.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Appwrite'],
    image: '/projects/storeit.webp',
    liveUrl: 'https://store-it-storage-management.vercel.app',
    githubUrl: 'https://github.com/ShalevShaul/storeIt',
    featured: true,
  },
  {
    slug: 'tourvisto',
    title: 'Tourvisto',
    role: 'Full-Stack',
    year: '2025',
    overview:
      'A travel booking platform with Google OAuth, role-based access, and an admin panel to create trips and manage users. Users can browse trips, book, and pay via Stripe. New trips can be generated with AI.',
    tech: ['React', 'TypeScript', 'Appwrite', 'Stripe'],
    image: '/projects/tourvisto.webp',
    liveUrl: 'https://travel-agency-navy-five.vercel.app/',
    githubUrl: 'https://github.com/ShalevShaul/travel-agency',
    featured: false,
  },
  {
    slug: 'pinto-clinic',
    title: 'Pinto Clinic',
    role: 'Frontend',
    year: '2026',
    overview:
      'A dental clinic website with services, treatments, staff profiles, and a contact form that sends inquiries directly to the clinic via EmailJS. Full bilingual EN/HE support and a dedicated page per treatment.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/pinto.webp',
    liveUrl: 'https://pintoclinic.co.il',
    featured: false,
  },
  {
    slug: 'shalev-portfolio',
    title: 'Shalev Portfolio',
    role: 'Frontend',
    year: '2026',
    overview:
      'Personal portfolio designed and built from scratch to reflect a creative tech director aesthetic. Combines a live 3D WebGL hero, scroll-driven animations, full EN/HE RTL bilingual support, dark/light mode, semantic accessibility, and SEO optimization.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/shalev.webp',
    liveUrl: 'https://shalevshaul.dev',
    githubUrl: 'https://github.com/ShalevShaul/shalev',
    featured: true,
  },
  {
    slug: 'vacations',
    title: 'Vacations',
    role: 'Full-Stack',
    year: '2025',
    overview:
      'A full-stack vacation management app with role-based access. Users browse, filter, and follow vacations. Admins add, edit, delete trips, view follower stats in a chart, and export data to CSV. Auth via JWT.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL'],
    image: '/projects/vacations.webp',
    liveUrl: 'https://vacations-five.vercel.app',
    githubUrl: 'https://github.com/ShalevShaul/vacations',
    featured: false,
  },
]
