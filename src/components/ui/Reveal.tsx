import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../../utils/motion'

interface Props {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

/** In-view wrapper with sensible defaults. Use custom variants for non-fade motion. */
export default function Reveal({ children, className, variants = fadeUp, delay = 0, once = true }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, once }}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}
