import { motion } from 'framer-motion'
import type { ElementType } from 'react'
import { EASE } from '../../utils/motion'

interface Props {
  text: string
  as?: ElementType
  className?: string
  /** Split by word (default) or letter */
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  /** animate when in view (default) or immediately on mount */
  trigger?: 'view' | 'mount'
  once?: boolean
}

/**
 * Masked text reveal: each word/char rises out of an overflow-hidden line.
 * Typography choreography without fading whole blocks.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  by = 'word',
  delay = 0,
  stagger = 0.045,
  trigger = 'view',
  once = true,
}: Props) {
  const units = by === 'word' ? text.split(' ') : Array.from(text)
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const child = {
    hidden: { y: '110%', rotateX: -40, opacity: 0 },
    visible: { y: '0%', rotateX: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
  }
  const MotionTag = motion.create(Tag as ElementType)
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...(trigger === 'view'
        ? { whileInView: 'visible', viewport: { once, margin: '-10% 0px' } }
        : { animate: 'visible' })}
      aria-label={text}
    >
      {units.map((u, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ perspective: 600 }} aria-hidden>
          <motion.span className="inline-block origin-bottom" variants={child}>
            {u === ' ' ? ' ' : u}
          </motion.span>
          {by === 'word' && i < units.length - 1 ? ' ' : null}
        </span>
      ))}
    </MotionTag>
  )
}
