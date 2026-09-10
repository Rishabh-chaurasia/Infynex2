import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

interface Props {
  labels?: string[]
  className?: string
  color?: string
}

/**
 * "Equipment scanning" overlay: a horizontal beam sweeps the image while
 * corner brackets and reticle markers blink in with technical labels.
 */
export default function ScanOverlay({ labels = ['CPU · OK', 'PSU · OK', 'FAN · CHECK', 'NET · OK'], className = '', color = '#6fd3ee' }: Props) {
  const reduced = usePrefersReducedMotion()
  const marks = [
    { x: '22%', y: '28%' }, { x: '64%', y: '22%' }, { x: '40%', y: '62%' }, { x: '74%', y: '70%' },
  ]
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {!reduced && (
        <div className="absolute inset-x-0 top-0 h-16 animate-scan" style={{ background: `linear-gradient(to bottom, transparent, ${color}55, transparent)` }} />
      )}
      {/* corner brackets */}
      {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((c) => (
        <motion.span key={c} className={`absolute h-6 w-6 ${c}`} style={{ borderColor: color }}
          initial={{ opacity: 0, scale: 1.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
      ))}
      {marks.map((m, i) => (
        <motion.div key={i} className="absolute" style={{ left: m.x, top: m.y }}
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.25, type: 'spring', stiffness: 200, damping: 14 }}>
          <span className="relative block h-3 w-3 rounded-full" style={{ background: color }}>
            {!reduced && <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: color, animationDelay: `${i * 0.5}s` }} />}
          </span>
          <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-950/80 px-2 py-1 font-display text-[0.6rem] tracking-[0.2em] text-white backdrop-blur">
            {labels[i % labels.length]}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
