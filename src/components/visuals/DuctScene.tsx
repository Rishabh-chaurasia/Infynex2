import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

interface Props {
  className?: string
  /** 0..1 — how far along the duct the robot has travelled (scroll-linked) */
  progress?: number
  compact?: boolean
}

/**
 * Perspective duct environment drawn in SVG: receding rectangular frames,
 * a scanning beam sweeping the walls, floating dust particles and a tracked
 * robot with camera light travelling into the duct.
 */
export default function DuctScene({ className = '', compact = false }: Props) {
  const reduced = usePrefersReducedMotion()
  const frames = Array.from({ length: compact ? 7 : 10 }, (_, i) => i)
  return (
    <svg viewBox="0 0 400 300" className={`h-full w-full ${className}`} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="duct-vanish" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#6fd3ee" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#1a2b5c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#060b1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fd3ee" stopOpacity="0" />
          <stop offset="0.5" stopColor="#6fd3ee" stopOpacity="0.85" />
          <stop offset="1" stopColor="#6fd3ee" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cam" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6fd3ee" stopOpacity="0" />
        </radialGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="1.2" /></filter>
      </defs>

      <rect width="400" height="300" fill="url(#duct-vanish)" />

      {/* Receding frames */}
      {frames.map((i) => {
        const t = i / frames.length
        const s = 1 - t * 0.92
        const w = 380 * s, h = 270 * s
        const x = 200 - w / 2, y = 150 - h / 2
        return (
          <motion.rect
            key={i} x={x} y={y} width={w} height={h} rx={6 * s}
            fill="none" stroke="#6fd3ee" strokeOpacity={0.12 + t * 0.4} strokeWidth={0.6 + t * 0.6}
            initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08 }}
            style={{ transformOrigin: '200px 150px' }}
          />
        )
      })}
      {/* Corner guide lines to the vanishing point */}
      {[[10, 15], [390, 15], [10, 285], [390, 285]].map(([x, y], i) => (
        <motion.line key={i} x1={x} y1={y} x2={200} y2={150} stroke="#6fd3ee" strokeOpacity={0.25} strokeWidth={0.6}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3 }} />
      ))}
      {/* Seams */}
      {[40, 80, 120, 160].map((s, i) => (
        <line key={i} x1={10 + s * 0.95} y1={15 + s * 0.68} x2={390 - s * 0.95} y2={15 + s * 0.68} stroke="#ffffff" strokeOpacity={0.05} />
      ))}

      {/* Scanning beam sweeping the duct */}
      {!reduced && (
        <motion.rect x="10" width="380" height="22" fill="url(#beam)"
          animate={{ y: [10, 270, 10] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      {/* Dust particles */}
      {Array.from({ length: compact ? 12 : 22 }, (_, i) => {
        const x = 30 + ((i * 53) % 340), y = 30 + ((i * 97) % 240)
        return (
          <motion.circle key={i} cx={x} cy={y} r={0.8 + (i % 3) * 0.5} fill="#ffffff" fillOpacity={0.5}
            animate={reduced ? {} : { y: [0, -8 - (i % 5), 0], x: [0, (i % 2 ? 4 : -4), 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.3 }} />
        )
      })}

      {/* Robot travelling into the duct */}
      <motion.g
        initial={{ scale: 1.05, x: 0, y: 40 }}
        animate={reduced ? {} : { scale: [1.05, 0.55, 1.05], y: [40, 8, 40] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 150px' }}
      >
        <g transform="translate(200 190)">
          {/* camera light cone */}
          <path d="M0 -14 L -90 -120 L 90 -120 Z" fill="#6fd3ee" fillOpacity="0.08" />
          <circle cx="0" cy="-14" r="16" fill="url(#cam)" filter="url(#soft)" />
          {/* tracks */}
          <rect x="-46" y="-6" width="16" height="30" rx="6" fill="#0b1533" stroke="#6fd3ee" strokeOpacity="0.6" />
          <rect x="30" y="-6" width="16" height="30" rx="6" fill="#0b1533" stroke="#6fd3ee" strokeOpacity="0.6" />
          {/* body */}
          <rect x="-32" y="-10" width="64" height="30" rx="8" fill="#12204a" stroke="#6fd3ee" />
          <rect x="-24" y="-4" width="48" height="6" rx="3" fill="#1a9dc3" fillOpacity="0.6" />
          {/* brush arm */}
          <motion.g animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '0px -30px' }}>
            <circle cx="0" cy="-30" r="12" fill="none" stroke="#6fd3ee" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="0" cy="-30" r="4" fill="#6fd3ee" />
          </motion.g>
          {/* status lights */}
          <motion.circle cx="-20" cy="10" r="2" fill="#4ade80" animate={reduced ? {} : { opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.circle cx="20" cy="10" r="2" fill="#6fd3ee" animate={reduced ? {} : { opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity }} />
        </g>
      </motion.g>

      {/* HUD overlays */}
      <g fontFamily="Sora, sans-serif" fontSize="7" fill="#6fd3ee" fillOpacity="0.8">
        <text x="16" y="26">CAM 01 · LIVE</text>
        <text x="330" y="26">INSPECT</text>
        <text x="16" y="288">SECTION A → B</text>
        <motion.text x="330" y="288" animate={reduced ? {} : { opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>● REC</motion.text>
      </g>
      <path d="M16 32 h 30 M16 32 v 20 M384 32 h -30 M384 32 v 20 M16 268 h 30 M16 268 v -20 M384 268 h -30 M384 268 v -20" stroke="#6fd3ee" strokeOpacity="0.6" fill="none" />
    </svg>
  )
}
