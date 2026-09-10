import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE } from '../../utils/motion'

interface Props {
  items: string[]
  dark?: boolean
  columns?: 1 | 2 | 3
  accent?: string
}

/** Staggered checklist with a drawn check mark. */
export default function FeatureList({ items, dark = false, columns = 2, accent = '#1a9dc3' }: Props) {
  const cols = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns]
  return (
    <motion.ul
      className={`grid gap-4 ${cols}`}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {items.map((it) => (
        <motion.li
          key={it}
          variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
          className={`flex items-start gap-3 rounded-2xl border p-4 transition-colors duration-500 ${dark ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]' : 'border-navy-800/10 bg-white hover:border-teal-500/40'}`}
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${accent}22`, color: accent }}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className={dark ? 'text-white/85' : 'text-ink-900'}>{it}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
