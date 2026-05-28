import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import GrainOverlay from '@/components/ui/GrainOverlay'
import ParallaxBackground from '@/components/ui/ParallaxBackground'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import OtherProjects from '@/components/sections/OtherProjects'
import Footer from '@/components/sections/Footer'

const About = dynamic(() => import('@/components/sections/About'))
const Skills = dynamic(() => import('@/components/sections/Skills'))
const Services = dynamic(() => import('@/components/sections/Services'))
const Contact = dynamic(() => import('@/components/sections/Contact'))

export default async function HomePage() {
  const t = await getTranslations('a11y')
  return (
    <>
      <ParallaxBackground />
      <GrainOverlay />
      <Navbar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white rtl:focus:left-auto rtl:focus:right-4"
      >
        {t('skipToMain')}
      </a>
      <main id="main-content" className="relative z-1">
        <Hero />
        <About />
        <Skills />
        <Services />
        <FeaturedProjects />
        <OtherProjects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
