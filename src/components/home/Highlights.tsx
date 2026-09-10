import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, User } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ParallaxImage from '../ui/ParallaxImage'
import ImageReveal from '../ui/ImageReveal'
import MagneticButton from '../ui/MagneticButton'
import SmartImage from '../ui/SmartImage'
import DuctScene from '../visuals/DuctScene'
import { images } from '../../data/images'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

/** Section 6: Robotic duct cleaning — dark split with live duct scene over photography. */
export function RoboticHighlight() {
  const s = getService('robotic-duct-cleaning')!
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -12 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE }}
          className="perspective relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_60px_120px_-40px_rgba(111,211,238,0.25)]"
        >
          <SmartImage src={s.gallery[1]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0"><DuctScene /></div>
        </motion.div>
        <div>
          <SectionHeading dark eyebrow="Featured service" title="Robotic duct cleaning, documented on camera." text={s.short} />
          <motion.ul variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 grid grid-cols-2 gap-3">
            {s.process.map((p) => (
              <motion.li key={p.title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 font-display text-sm font-semibold">{p.title}</motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
            <MagneticButton to={s.path} variant="dark">Explore robotic duct cleaning</MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Section 7: Solar — warm light section with sunlight sweep and panel parallax. */
export function SolarHighlight() {
  const s = getService('solar')!
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunX = useTransform(scrollYProgress, [0, 1], ['-10%', '70%'])
  const sunY = useTransform(scrollYProgress, [0, 1], ['60%', '-20%'])
  const smallY = useTransform(scrollYProgress, [0, 1], [90 * level, -90 * level])

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#fff8ec] py-24 md:py-32">
      <motion.div aria-hidden style={{ left: sunX, top: sunY }} className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-[#f5b544]/30 blur-[120px]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow="Solar system & services" title="Clean energy, from survey to servicing." text={s.short} />
          <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 flex flex-wrap gap-2">
            {s.highlights.slice(0, 4).map((h) => (
              <span key={h} className="rounded-full border border-[#f5b544]/50 bg-white px-4 py-2 text-sm text-navy-900">{h}</span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} custom={6} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
            <MagneticButton to={s.path}>Explore solar services</MagneticButton>
          </motion.div>
        </div>
        <div className="relative order-1 lg:order-2">
          <ParallaxImage src={s.hero} alt="Solar panels under sunlight" className="aspect-[5/4] rounded-[2rem]" reveal="up" strength={60} />
          <motion.div style={{ y: smallY }} className="absolute -bottom-8 -left-4 w-[42%] md:-left-10">
            <ImageReveal src={s.gallery[1]} alt="Solar installation" className="aspect-square rounded-3xl border-4 border-[#fff8ec] shadow-2xl" direction="up" delay={0.3} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Section 8: B2B / B2C — compact interactive toggle preview. */
export function B2BHighlight() {
  const [mode, setMode] = useState<'b2b' | 'b2c'>('b2b')
  const content = {
    b2b: {
      icon: Building2, title: 'For businesses', image: images.b2bMeeting,
      text: 'Contract-based services, multi-site coverage and a dedicated account contact for organisations of every size.',
      points: ['Service agreements', 'Multi-site support', 'Account management'],
    },
    b2c: {
      icon: User, title: 'For individuals', image: images.b2cPeople,
      text: 'Accessible technology, energy and support services for homes and personal needs, delivered with the same care.',
      points: ['Home installations', 'Personal device support', 'Straightforward pricing'],
    },
  }[mode]
  const Icon = content.icon

  return (
    <section className="container-x py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow="B2B & B2C" title="Built for organisations. Available to everyone." />
        <div className="relative flex rounded-full border border-navy-800/15 bg-white p-1" role="tablist">
          {(['b2b', 'b2c'] as const).map((m) => (
            <button
              key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
              className={`relative z-10 rounded-full px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${mode === m ? 'text-white' : 'text-navy-900'}`}
            >
              {mode === m && <motion.span layoutId="b2b-pill" className="absolute inset-0 -z-10 rounded-full bg-navy-900" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              {m}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className={`mt-12 grid items-center gap-10 overflow-hidden rounded-[2rem] p-6 transition-colors duration-700 md:grid-cols-2 md:p-10 ${mode === 'b2b' ? 'bg-navy-900 text-white' : 'bg-ivory-100 text-navy-900'}`}>
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5, ease: EASE }}>
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${mode === 'b2b' ? 'bg-teal-500 text-white' : 'bg-navy-900 text-white'}`}><Icon className="h-5 w-5" /></span>
            <h3 className="mt-6 font-display text-3xl font-semibold">{content.title}</h3>
            <p className={`mt-4 text-lg ${mode === 'b2b' ? 'text-white/70' : 'text-ink-600'}`}>{content.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {content.points.map((p, i) => (
                <motion.li key={p} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }} className={`rounded-full px-4 py-2 text-sm ${mode === 'b2b' ? 'bg-white/10' : 'bg-white'}`}>{p}</motion.li>
              ))}
            </ul>
            <Link to="/services/b2b-b2c" className="group mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold">
              Explore the B2B / B2C experience <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)' }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.7, ease: EASE }} className="aspect-[4/3] overflow-hidden rounded-3xl">
            <SmartImage src={content.image} alt="" className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
