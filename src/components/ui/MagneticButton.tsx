import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useIsDesktop } from '../../hooks/useMedia'

interface Props {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'light' | 'dark'
  className?: string
  icon?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

const styles: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-navy-800 text-white hover:bg-navy-700',
  ghost: 'bg-transparent text-navy-800 ring-1 ring-navy-800/20 hover:ring-navy-800/50',
  light: 'bg-white text-navy-900 hover:bg-ivory-100',
  dark: 'bg-teal-500 text-white hover:bg-teal-400',
}

/**
 * Button that is gently attracted to the cursor on desktop; plain on touch.
 * Includes a sliding highlight and arrow motion on hover.
 */
export default function MagneticButton({
  children, to, href, onClick, variant = 'primary', className = '', icon = true, type = 'button', disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 })

  const onMove = (e: MouseEvent) => {
    if (!desktop || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      <span>{children}</span>
      {icon && (
        <span className="relative h-4 w-4 overflow-hidden">
          <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 group-hover:translate-x-4" />
          <ArrowUpRight className="absolute inset-0 h-4 w-4 translate-x-[-1rem] translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </span>
  )
  const cls = `group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors duration-500 disabled:opacity-60 ${styles[variant]} ${className}`
  const sheen = (
    <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
  )

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      whileTap={{ scale: 0.96 }}
      data-cursor="hover"
    >
      {to ? (
        <Link to={to} className={cls}>{sheen}{inner}</Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>{sheen}{inner}</a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>{sheen}{inner}</button>
      )}
    </motion.div>
  )
}
