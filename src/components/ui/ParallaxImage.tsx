import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import SmartImage from './SmartImage'
import { useMotionLevel } from '../../hooks/useMedia'
import { EASE } from '../../utils/motion'

interface Props {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  /** Parallax travel in px at full motion level */
  strength?: number
  /** Slow zoom range */
  zoom?: [number, number]
  /** Clip-path reveal direction, or none */
  reveal?: 'left' | 'right' | 'up' | 'down' | 'none'
  overlay?: string
  children?: React.ReactNode
}

/**
 * Image that moves at a different speed from the page, enters with a clip reveal
 * and zooms subtly as it scrolls — the core cinematic image primitive.
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  strength = 80,
  zoom = [1.15, 1],
  reveal = 'left',
  overlay,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], [strength * level, -strength * level])
  const y = useSpring(yRaw, { stiffness: 90, damping: 30, mass: 0.4 })
  const scale = useTransform(scrollYProgress, [0, 1], level ? zoom : [1, 1])

  const from = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
    none: 'inset(0 0 0 0)',
  }[reveal]

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.div style={{ y, scale }} className="absolute inset-[-12%] will-change-transform">
        <SmartImage src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
      </motion.div>
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      {children}
    </motion.div>
  )
}
