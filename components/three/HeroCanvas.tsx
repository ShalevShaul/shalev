'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

type MousePos = { x: number; y: number }

function Icosphere({ mouse }: { mouse: { current: MousePos } }) {
  const ref = useRef<THREE.Mesh>(null)
  const lerped = useRef<MousePos>({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!ref.current) return
    lerped.current.x += (mouse.current.x - lerped.current.x) * 0.04
    lerped.current.y += (mouse.current.y - lerped.current.y) * 0.04
    ref.current.rotation.y += delta * 0.25 + lerped.current.x * 0.008
    ref.current.rotation.x += lerped.current.y * 0.005
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 2]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.65}
      />
    </mesh>
  )
}

export default function HeroCanvas() {
  const mouse = useRef<MousePos>({ x: 0, y: 0 })
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
      >
        <PerformanceMonitor onDecline={() => setDpr([1, 1])}>
          <ambientLight intensity={0.3} />
          <pointLight position={[4, 4, 4]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-4, -2, 3]} intensity={0.8} color="#fb923c" />
          <Icosphere mouse={mouse} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
