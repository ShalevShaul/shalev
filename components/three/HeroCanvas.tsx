'use client'

import { useRef, useEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { useTheme } from 'next-themes'

type MousePos = { x: number; y: number }

// Module-level scratch objects — avoids per-frame allocation inside useFrame.
const _tmpVec   = new THREE.Vector3()
const _tmpColor = new THREE.Color()

/**
 * Fibonacci / golden-angle sphere sampling.
 * Returns N points distributed maximally evenly across the sphere surface.
 */
function fibonacciSpherePoints(n: number, r: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const phi = Math.PI * (Math.sqrt(5) - 1) // golden angle in radians
  for (let i = 0; i < n; i++) {
    const cosTheta = 1 - (2 * i) / (n - 1)
    const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta))
    const angle = phi * i
    pts.push(
      new THREE.Vector3(
        r * sinTheta * Math.cos(angle),
        r * cosTheta,
        r * sinTheta * Math.sin(angle),
      ),
    )
  }
  return pts
}

/** Deterministic LCG PRNG — stable geometry across re-renders. */
function makePrng(seed: number) {
  let s = seed >>> 0
  return (): number => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Dark mode palette — additive blending on dark bg
const C_INDIGO = new THREE.Color('#6366f1')
const C_SOFT   = new THREE.Color('#7476f6') // toned down from #818cf8 — less white
const C_ORANGE = new THREE.Color('#fb923c')

// Light mode palette — normal blending on light bg
const C_INDIGO_L = new THREE.Color('#4f46e5') // site accent — readable on light bg
const C_SOFT_L   = new THREE.Color('#818cf8') // lavender — softer accent
const C_ORANGE_L = new THREE.Color('#f97316') // site accent-alt

const SPHERE_R = 1.85

// ---------------------------------------------------------------------------

function LogoSphere({
  mouse,
  reduced,
  isDark,
}: {
  mouse: { current: MousePos }
  reduced: boolean
  isDark: boolean
}) {
  const svgData = useLoader(SVGLoader, '/s-logo.svg')
  const meshRef    = useRef<THREE.InstancedMesh>(null)
  const lerped     = useRef<MousePos>({ x: 0, y: 0 })
  const clock      = useRef(0)
  const frameCount = useRef(0)

  /** Desktop: 220 glyphs — mobile/low-perf fallback: 80 */
  const count = reduced ? 80 : 220
  const pts   = useMemo(() => fibonacciSpherePoints(count, SPHERE_R), [count])

  /**
   * Raw (pre-depth-attenuation) RGB floats for each instance.
   * Stored as a flat Float32Array [r0,g0,b0, r1,g1,b1, ...] so useFrame can
   * read and scale them per-frame without allocating Color objects.
   */
  const baseColors = useRef<Float32Array | null>(null)

  /**
   * Build a single merged ShapeGeometry from the SVG's path data.
   * All three paths in s-logo.svg are straight-line polygons (M L V H Z only).
   * Y is negated on scale to convert from SVG-space (Y-down) to Three.js (Y-up).
   */
  const logoGeo = useMemo(() => {
    const shapes: THREE.Shape[] = []
    for (const path of svgData.paths) {
      shapes.push(...SVGLoader.createShapes(path))
    }

    const geo = new THREE.ShapeGeometry(shapes)

    geo.computeBoundingBox()
    const bbox = geo.boundingBox!
    const center = new THREE.Vector3()
    bbox.getCenter(center)
    const sizeVec = new THREE.Vector3()
    bbox.getSize(sizeVec)
    const maxDim = Math.max(sizeVec.x, sizeVec.y)

    geo.translate(-center.x, -center.y, 0)
    geo.scale(1 / maxDim, -1 / maxDim, 1)

    return geo
  }, [svgData])

  useEffect(() => {
    return () => { logoGeo.dispose() }
  }, [logoGeo])

  /** Populate instance matrices + base colors once on mount / count change. */
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const dummy  = new THREE.Object3D()
    const rand   = makePrng(0xc0ffee42)
    const colors = new Float32Array(pts.length * 3)

    for (let i = 0; i < pts.length; i++) {
      dummy.position.copy(pts[i])
      dummy.lookAt(0, 0, 0)
      dummy.rotateX(Math.PI)
      dummy.rotateZ(rand() * Math.PI * 4)
      dummy.scale.setScalar(0.15 + rand() * 0.10)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // ── Base color (depth-attenuation applied per-frame in useFrame) ─────
      const t = rand()
      const c = isDark
        ? (t < 0.07 ? C_ORANGE   : t < 0.28 ? C_SOFT   : C_INDIGO)
        : (t < 0.07 ? C_ORANGE_L : t < 0.28 ? C_SOFT_L : C_INDIGO_L)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    baseColors.current = colors
    mesh.instanceMatrix.needsUpdate = true
  }, [pts, isDark])

  useFrame((_, dt) => {
    const mesh   = meshRef.current
    const colors = baseColors.current
    if (!mesh || !colors) return

    clock.current += dt

    // ── Cursor tracking (lerped for silky smoothness) ────────────────────
    const lf = 0.035
    lerped.current.x += (mouse.current.x - lerped.current.x) * lf
    lerped.current.y += (mouse.current.y - lerped.current.y) * lf

    // ── Rotation ─────────────────────────────────────────────────────────
    mesh.rotation.x = -lerped.current.y * 0.32
    mesh.rotation.y =  lerped.current.x * 0.32 + Math.sin(clock.current * 0.15) * 0.06

    // ── Ambient breath ────────────────────────────────────────────────────
    mesh.scale.setScalar(1 + Math.sin(clock.current * 0.38) * 0.012)

    // ── Per-instance depth attenuation (throttled: every 2 frames) ──────
    // Rotate each point's local position by the mesh quaternion to get its
    // current world-space Z. smoothstep maps [-1, +0.6] → [dim, bright] so
    // the front hemisphere is vivid and the rear fades to near-invisible.
    // This upload is ~2.6 KB/frame — negligible GPU bandwidth.
    frameCount.current += 1
    if (frameCount.current % 2 === 0) {
      const q = mesh.quaternion
      for (let i = 0; i < pts.length; i++) {
        _tmpVec.copy(pts[i]).applyQuaternion(q)
        const depth      = _tmpVec.z / SPHERE_R     // +1 = front (toward camera), -1 = rear
        // Dark: rear fades to a slight glow (0.06) — works with additive blending on dark bg.
        // Light: rear fades to pure zero — normal blending on light bg needs clean cutoff.
        const brightness = isDark
          ? 0.25 + 0.94 * THREE.MathUtils.smoothstep(depth, -0.9,   0)
          :               THREE.MathUtils.smoothstep(depth, -0.3, 0.8)

        _tmpColor.setRGB(
          colors[i * 3]     * brightness,
          colors[i * 3 + 1] * brightness,
          colors[i * 3 + 2] * brightness,
        )
        mesh.setColorAt(i, _tmpColor)
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <primitive object={logoGeo} attach="geometry" />
      {/*
       * Wireframe of the triangulated logo polygon — shows silhouette boundary
       * and interior mesh structure. Additive blending: overlapping front-facing
       * instances accumulate brightness naturally; depth-attenuated rear instances
       * fade to near-zero, producing spherical volume without postprocessing.
       */}
      <meshBasicMaterial
        // wireframe
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        side={THREE.BackSide}
      />
    </instancedMesh>
  )
}

// ---------------------------------------------------------------------------

export default function HeroCanvas() {
  const mouse             = useRef<MousePos>({ x: 0, y: 0 })
  const [dpr, setDpr]     = useState<[number, number]>([1, 1.5])
  const [reduced, setReduced] = useState(false)
  const [inView, setInView]   = useState(true)
  const containerRef          = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="h-full w-full" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? 'always' : 'never'}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr([1, 1])
            setReduced(true)
          }}
        >
          <Suspense fallback={null}>
            <LogoSphere mouse={mouse} reduced={reduced} isDark={isDark} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
