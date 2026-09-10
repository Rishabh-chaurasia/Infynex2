import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Wrench, Server, Bot, Sun, Cloud, Headset } from 'lucide-react'
import AnimatedText from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
import SmartImage from '../ui/SmartImage'
import ScrollIndicator from '../ui/ScrollIndicator'
import Particles from '../visuals/Particles'
import { images } from '../../data/images'
import { EASE } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

const chips = [
  { icon: Wrench, label: 'AMC', x: '2%', y: '12%', d: 0 },
  { icon: Server, label: 'IT Infra', x: '68%', y: '4%', d: 1.2 },
  { icon: Bot, label: 'Robotic Cleaning', x: '58%', y: '82%', d: 0.6 },
  { icon: Sun, label: 'Solar', x: '-4%', y: '70%', d: 1.8 },
  { icon: Cloud, label: 'Cloud', x: '82%', y: '46%', d: 2.4 },
  { icon: Headset, label: 'Helpdesk', x: '26%', y: '96%', d: 3 },
]

/**
 * Homepage hero: light editorial left column with masked typography;
 * right side is a layered 3D composition of three photographs that respond
 * to the mouse and to scroll, wrapped in animated technical lines.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const rotY = useTransform(sx, [-1, 1], [-7 * level, 7 * level])
  const rotX = useTransform(sy, [-1, 1], [6 * level, -6 * level])
  const l1x = useTransform(sx, [-1, 1], [-18 * level, 18 * level])
  const l1y = useTransform(sy, [-1, 1], [-12 * level, 12 * level])
  const l2x = useTransform(sx, [-1, 1], [28 * level, -28 * level])
  const l2y = useTransform(sy, [-1, 1], [20 * level, -20 * level])
  const glowX = useTransform(sx, [-1, 1], ['20%', '80%'])
  const glowY = useTransform(sy, [-1, 1], ['20%', '80%'])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160 * level])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80 * level])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      className="relative min-h-[100svh] overflow-hidden bg-ivory-50"
    >
      <div aria-hidden className="absolute inset-0 grid-lines" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/20 blur-[140px]"
        style={{ left: glowX, top: glowY }}
      />
      <div aria-hidden className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-navy-700/10 blur-[120px] animate-float" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-14 pb-24 pt-32 lg:grid-cols-[1.05fr_1fr] lg:pt-28">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="eyebrow mb-6 flex items-center gap-3 text-teal-600"
          >
            <span className="h-px w-10 bg-teal-500" />
            Technology · Infrastructure · Services
          </motion.p>
          <h1 className="font-display text-[2.9rem] font-semibold leading-[1.02] text-navy-900 sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            <AnimatedText text="Technology that" trigger="mount" delay={0.55} />
            <br />
            <AnimatedText text="keeps your" trigger="mount" delay={0.75} />
            <br />
            <span className="text-teal-600"><AnimatedText text="business running." trigger="mount" delay={0.95} /></span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-ink-600 md:text-xl"
          >
            Infynex Technologies delivers maintenance, hardware, IT infrastructure, cloud, support, robotic duct cleaning, solar and vehicle services — as one accountable partner.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton to="/services">Explore services</MagneticButton>
            <MagneticButton to="/contact" variant="ghost" icon={false}>Talk to us</MagneticButton>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: visualY }} className="relative perspective">
          <Particles count={40} color="26, 157, 195" className="opacity-70" />
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
            className="relative aspect-[5/5.2] w-full"
          >
            {/* Technical ring lines */}
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-[-8%] h-[116%] w-[116%] text-navy-800/25">
              <motion.circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.8 }} />
              <motion.circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.15" initial={{ pathLength: 0, rotate: 0 }} animate={{ pathLength: 1, rotate: 360 }} transition={{ pathLength: { duration: 2, delay: 1 }, rotate: { duration: 90, repeat: Infinity, ease: 'linear' } }} style={{ transformOrigin: '50px 50px' }} />
              <motion.path d="M4 50 H 20 M80 50 H 96 M50 4 V 14 M50 86 V 96" stroke="#1a9dc3" strokeWidth="0.3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.4 }} />
            </svg>

            {/* Main image */}
            <motion.div
              initial={{ clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
              className="absolute left-[8%] top-[6%] h-[70%] w-[72%] overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-30px_rgba(11,21,51,0.55)]"
              style={{ transform: 'translateZ(0px)' }}
            >
              <motion.div initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE, delay: 0.5 }} className="h-full w-full">
                <SmartImage src={images.heroMain} alt="Server corridor with rows of racks" className="h-full w-full object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-teal-300 to-transparent animate-scan" style={{ animationDuration: '6s' }} />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="eyebrow text-[0.6rem] text-teal-300">Infrastructure</p>
                <p className="mt-1 font-display text-sm font-semibold">Built, monitored, maintained</p>
              </div>
            </motion.div>

            {/* Secondary image (engineer) */}
            <motion.div
              style={{ x: l1x, y: l1y, translateZ: 60 }}
              initial={{ opacity: 0, y: 60, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1 }}
              className="absolute bottom-[4%] right-[2%] h-[44%] w-[46%] overflow-hidden rounded-[1.5rem] border border-white/60 shadow-[0_40px_80px_-30px_rgba(11,21,51,0.5)]"
            >
              <SmartImage src={images.heroSide} alt="Engineer working on equipment" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="eyebrow text-[0.6rem] text-teal-300">On-site</p>
                <p className="mt-1 font-display text-sm font-semibold">Engineers where you are</p>
              </div>
            </motion.div>

            {/* Tertiary image (cables) */}
            <motion.div
              style={{ x: l2x, y: l2y, translateZ: 100 }}
              initial={{ opacity: 0, y: -40, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1.25 }}
              className="absolute right-[6%] top-[-2%] h-[28%] w-[30%] overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(11,21,51,0.45)]"
            >
              <SmartImage src={images.heroSmall} alt="Network cabling" className="h-full w-full object-cover" />
            </motion.div>

            {/* Floating chips */}
            {chips.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 1.6 + i * 0.12 }}
                  className="absolute hidden md:block"
                  style={{ left: c.x, top: c.y, translateZ: 120 + i * 10 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
                    className="glass flex items-center gap-2 rounded-full border border-white/70 px-3.5 py-2 shadow-[0_15px_40px_-15px_rgba(11,21,51,0.35)]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-white"><Icon className="h-3 w-3" /></span>
                    <span className="font-display text-xs font-semibold text-navy-900">{c.label}</span>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
      <ScrollIndicator dark={false} />
    </section>
  )
}
