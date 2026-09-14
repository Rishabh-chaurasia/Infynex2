import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import { EASE } from '../../utils/motion'

interface Props {
  items: { title: string; text: string }[]
  dark?: boolean
  accent?: string
  layout?: 'grid' | 'stagger' | 'row'
}

/**
 * Capability cards in three arrangements: even grid, staggered/asymmetric, or a single row.
 * Each card tilts in 3D and carries an animated accent bar.
 */
export default function CapabilityGrid({ items, dark = false, accent = '#1a9dc3', layout = 'grid' }: Props) {
  const wrap = {
    grid: 'grid gap-6 sm:grid-cols-2',
    stagger: 'grid gap-6 sm:grid-cols-2 [&>*:nth-child(even)]:sm:translate-y-10',
    row: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4',
  }[layout]
  return (
    <div className={`${wrap} perspective`}>
      {items.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
        >
          <TiltCard max={6} className={`h-full rounded-3xl border p-7 md:p-8 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-navy-800/10 bg-white shadow-[0_20px_60px_-30px_rgba(11,21,51,0.25)]'}`}>
            <span className="mb-6 block h-1 w-10 rounded-full transition-all duration-700 group-hover:w-20" style={{ background: accent }} />
            <span className={`font-display text-xs tracking-[0.3em] ${dark ? 'text-white/40' : 'text-ink-400'}`}>{String(i + 1).padStart(2, '0')}</span>
            <h4 className={`mt-2 font-display text-xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}`}>{c.title}</h4>
            <p className={`mt-3 leading-relaxed ${dark ? 'text-white/65' : 'text-ink-600'}`}>{c.text}</p>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  )
}
