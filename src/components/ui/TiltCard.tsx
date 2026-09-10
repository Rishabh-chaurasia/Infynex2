import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useMedia'

interface Props {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

/**
 * 3D tilt on hover with a light glare that follows the pointer.
 * Falls back to a static card on touch devices.
 */
export default function TiltCard({ children, className = '', max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 20 })
  const gx = useTransform(px, [0, 1], [0, 100])
  const gy = useTransform(py, [0, 1], [0, 100])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`

  const onMove = (e: MouseEvent) => {
    if (!desktop || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { px.set(0.5); py.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: desktop ? rx : 0, rotateY: desktop ? ry : 0, transformStyle: 'preserve-3d' }}
      className={`group relative ${className}`}
      data-cursor="hover"
    >
      {children}
      {glare && desktop && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
