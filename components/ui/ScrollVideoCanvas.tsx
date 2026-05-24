'use client'

import { useEffect, useRef } from 'react'
import { type MotionValue, useMotionValueEvent } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}

// yBias: 0 = show top, 0.5 = center, 1 = show bottom
const Y_BIAS = 0.85

function drawCover(ctx: CanvasRenderingContext2D, video: HTMLVideoElement) {
  const cW = ctx.canvas.width
  const cH = ctx.canvas.height
  const vW = video.videoWidth
  const vH = video.videoHeight
  if (!vW || !vH) return
  const scale = Math.max(cW / vW, cH / vH)
  const x = (cW - vW * scale) / 2
  const y = (cH - vH * scale) * Y_BIAS
  ctx.drawImage(video, x, y, vW * scale, vH * scale)
}

export function ScrollVideoCanvas({ scrollYProgress, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const syncSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    const draw = () => {
      syncSize()
      drawCover(ctx, video)
    }

    const onSeeked = () => {
      draw()
      seekingRef.current = false
    }

    syncSize()
    video.addEventListener('loadeddata', draw)
    video.addEventListener('canplay', draw)
    video.addEventListener('seeked', onSeeked)

    const ro = new ResizeObserver(syncSize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    video.load()

    return () => {
      video.removeEventListener('loadeddata', draw)
      video.removeEventListener('canplay', draw)
      video.removeEventListener('seeked', onSeeked)
      ro.disconnect()
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion) return
    const video = videoRef.current
    if (!video || video.readyState < 1 || seekingRef.current) return
    seekingRef.current = true
    video.currentTime = progress * video.duration
  })

  return (
    <>
      <video
        ref={videoRef}
        src="/me.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </>
  )
}
