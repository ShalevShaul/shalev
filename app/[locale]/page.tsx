import Navbar from '@/components/layout/Navbar'
import GrainOverlay from '@/components/ui/GrainOverlay'

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
      <main id="main-content" className="pt-16">
        <div className="mx-auto max-w-6xl px-4 py-32 lg:px-6">
          <p className="text-text-muted text-sm">Phase 2 complete — sections coming in Phase 3.</p>
        </div>
      </main>
    </>
  )
}
