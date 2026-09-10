import { useEffect, useRef } from 'react'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia'

interface Props {
  count?: number
  color?: string
  className?: string
  /** connect nearby particles with faint lines */
  links?: boolean
}

/**
 * Lightweight canvas particle field. Pauses when off-screen, skipped on
 * touch devices / reduced motion.
 */
export default function Particles({ count = 60, color = '111, 211, 238', className = '', links = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const desktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!desktop || reduced) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let running = true
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0006,
      r: 0.8 + Math.random() * 1.6, a: 0.2 + Math.random() * 0.6,
    }))
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.a})`
        ctx.fill()
      }
      if (links) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = (pts[i].x - pts[j].x) * w, dy = (pts[i].y - pts[j].y) * h
            const d = Math.hypot(dx, dy)
            if (d < 120) {
              ctx.strokeStyle = `rgba(${color}, ${(1 - d / 120) * 0.18})`
              ctx.lineWidth = 0.6
              ctx.beginPath(); ctx.moveTo(pts[i].x * w, pts[i].y * h); ctx.lineTo(pts[j].x * w, pts[j].y * h); ctx.stroke()
            }
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) }
    })
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize) }
  }, [desktop, reduced, count, color, links])

  if (!desktop || reduced) return null
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />
}
