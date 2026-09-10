import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, EASE_IN_OUT } from '../../utils/motion'

/**
 * Route transition. On exit a navy curtain rises from the bottom over the
 * outgoing page; on enter the curtain (with a teal edge) lifts away from the top
 * while the new page settles into place.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="initial" animate="enter" exit="exit" className="relative">
      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          enter: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.3 } },
          exit: { opacity: 0.6, y: -10, transition: { duration: 0.5, ease: EASE } },
        }}
      >
        {children}
      </motion.div>

      {/* Exit curtain — rises from the bottom */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] bg-navy-900"
        style={{ transformOrigin: 'bottom' }}
        variants={{
          initial: { scaleY: 0 },
          enter: { scaleY: 0 },
          exit: { scaleY: 1, transition: { duration: 0.5, ease: EASE_IN_OUT } },
        }}
      />
      {/* Enter curtains — lift away toward the top */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[81] bg-navy-900"
        style={{ transformOrigin: 'top' }}
        variants={{
          initial: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.05 } },
          exit: { scaleY: 0 },
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] bg-teal-500"
        style={{ transformOrigin: 'top' }}
        variants={{
          initial: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.16 } },
          exit: { scaleY: 0 },
        }}
      />
    </motion.div>
  )
}
