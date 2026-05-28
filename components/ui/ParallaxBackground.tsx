'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

const SPRING = { stiffness: 45, damping: 18, mass: 0.85 }
const PAGE_HEIGHT = 4000

export default function ParallaxBackground() {
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mouseX = useSpring(rawX, SPRING)
  const mouseY = useSpring(rawY, SPRING)

  useEffect(() => {
    if (prefersReduced) return
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReduced, rawX, rawY])

  const { scrollY } = useScroll()

  // Scroll offsets — slower scroll factor = further away (parallax depth)
  const s1 = useTransform(scrollY, [0, PAGE_HEIGHT], [0, -200])
  const s2 = useTransform(scrollY, [0, PAGE_HEIGHT], [0, -340])
  const s3 = useTransform(scrollY, [0, PAGE_HEIGHT], [0, -480])
  const s4 = useTransform(scrollY, [0, PAGE_HEIGHT], [0, -150])

  // Mouse offsets — intensity in px at ±1 normalised cursor position
  const mx1 = useTransform(mouseX, (v: number) => v * 30)
  const my1 = useTransform(mouseY, (v: number) => v * 30)
  const mx2 = useTransform(mouseX, (v: number) => v * -36)
  const my2 = useTransform(mouseY, (v: number) => v * -28)
  const mx3 = useTransform(mouseX, (v: number) => v * 45)
  const my3 = useTransform(mouseY, (v: number) => v * 22)
  const mx4 = useTransform(mouseX, (v: number) => v * -24)
  const my4 = useTransform(mouseY, (v: number) => v * -20)

  // Combined Y — mouse + scroll for each orb
  const y1 = useTransform(
    [my1, s1] as MotionValue<number>[],
    ([m, s]: number[]) => m + s
  )
  const y2 = useTransform(
    [my2, s2] as MotionValue<number>[],
    ([m, s]: number[]) => m + s
  )
  const y3 = useTransform(
    [my3, s3] as MotionValue<number>[],
    ([m, s]: number[]) => m + s
  )
  const y4 = useTransform(
    [my4, s4] as MotionValue<number>[],
    ([m, s]: number[]) => m + s
  )

  const animated = !prefersReduced

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — far, primary indigo, top-left */}
      <motion.div
        style={animated ? { x: mx1, y: y1, willChange: 'transform' } : undefined}
        className="absolute left-[-25%] top-[-20%] h-[55vh] w-[55vh] rounded-full bg-accent/14 blur-[70px] dark:bg-accent/30 md:h-[75vh] md:w-[75vh] md:blur-[95px]"
      />

      {/* Layer 2 — mid, indigo, bottom-right */}
      <motion.div
        style={animated ? { x: mx2, y: y2, willChange: 'transform' } : undefined}
        className="absolute bottom-[-25%] right-[-20%] h-[45vh] w-[45vh] rounded-full bg-accent/11 blur-[60px] dark:bg-accent/23 md:h-[65vh] md:w-[65vh] md:blur-[85px]"
      />

      {/* Layer 3 — near, soft indigo, center-left (desktop only) */}
      <motion.div
        style={animated ? { x: mx3, y: y3, willChange: 'transform' } : undefined}
        className="absolute left-[8%] top-[38%] hidden h-[42vh] w-[42vh] rounded-full bg-accent/8 blur-[60px] dark:bg-accent/18 md:block"
      />

      {/* Layer 4 — accent-alt warm glow, top-right (desktop only) */}
      <motion.div
        style={animated ? { x: mx4, y: y4, willChange: 'transform' } : undefined}
        className="absolute right-[-10%] top-[6%] hidden h-[38vh] w-[38vh] rounded-full bg-accent-alt/7 blur-[65px] dark:bg-accent-alt/[0.14] md:block"
      />

      {/* Dot grid — dark mode, desktop only */}
      <div className="absolute inset-0 hidden opacity-0 dark:opacity-100 md:block bg-[radial-gradient(circle,rgba(99,102,241,0.065)_1px,transparent_1px)] bg-size-[44px_44px]" />

      {/* Edge vignette — pulls focus toward the center */}
      <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_88%_88%_at_50%_50%,transparent_52%,var(--bg)_100%)]" />
    </div>
  )
}
