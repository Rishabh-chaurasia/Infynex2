import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia'

/**
 * Subtle custom cursor: a small dot that leads and a soft ring that trails.
 * Elements with data-cursor="hover" expand the ring; links/buttons do as well.
 * Only rendered on desktop pointer devices without reduced-motion.
 */
export default function Cursor() {
  const desktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 250, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (!desktop || reduced) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY); setVisible(true)
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [data-cursor="hover"], input, textarea, label'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [desktop, reduced, x, y])

  if (!desktop || reduced) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-teal-500 mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-teal-500/70 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hover ? 56 : 36, height: hover ? 56 : 36, opacity: visible ? (hover ? 0.9 : 0.55) : 0, backgroundColor: hover ? 'rgba(26,157,195,0.15)' : 'rgba(26,157,195,0)' }}
        transition={{ duration: 0.35 }}
      />
    </>
  )
}
