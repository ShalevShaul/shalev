import Navbar from '@/components/layout/Navbar'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import OtherProjects from '@/components/sections/OtherProjects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white rtl:focus:left-auto rtl:focus:right-4"
      >
        Skip to main content
      </a>
      <main id="main-content">
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
