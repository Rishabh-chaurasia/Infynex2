import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Camera, Fan, Video, FileCheck } from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading'
import AnimatedText from '../../components/ui/AnimatedText'
import MagneticButton from '../../components/ui/MagneticButton'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import SmartImage from '../../components/ui/SmartImage'
import ScrollIndicator from '../../components/ui/ScrollIndicator'
import FeatureList from '../../components/ui/FeatureList'
import CTASection from '../../components/ui/CTASection'
import DuctScene from '../../components/visuals/DuctScene'
import Particles from '../../components/visuals/Particles'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'
import { useMotionLevel, useIsDesktop } from '../../hooks/useMedia'

const s = getService('robotic-duct-cleaning')!

const equipment = [
  { icon: Camera, title: 'Inspection camera', text: 'Robot-mounted camera with lighting records the duct interior.' },
  { icon: Fan, title: 'Rotating brush', text: 'Agitates and dislodges accumulated dust from duct surfaces.' },
  { icon: Video, title: 'Live monitoring', text: 'The operator watches progress in real time and revisits sections.' },
  { icon: FileCheck, title: 'Reporting', text: 'Before-and-after footage compiled into a completion report.' },
]

/**
 * Pinned process: the robot travels along a duct path as the user scrolls,
 * lighting up each stage — Inspection → Cleaning → Monitoring → Completion.
 */
function ScrollProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const robotX = useTransform(p, [0, 1], ['4%', '88%'])
  const lineW = useTransform(p, [0, 1], ['0%', '100%'])
  const cameraGlow = useTransform(p, [0, 0.25, 0.5, 1], [0.4, 1, 0.6, 1])

  if (!desktop) {
    return (
      <section className="bg-navy-950 py-24 text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Process" title="Four stages, documented on camera." />
          <ol className="mt-10 space-y-4">
            {s.process.map((st, i) => (
              <motion.li key={st.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="font-display text-2xl font-light text-teal-300">0{i + 1}</span>
                <span><span className="block font-display text-lg font-semibold">{st.title}</span><span className="block text-sm text-white/60">{st.text}</span></span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[320vh] bg-navy-950 text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x relative">
          <SectionHeading dark eyebrow="Process" title="Four stages, documented on camera." text="Scroll to move the robot through the duct." size="md" />

          {/* Duct track */}
          <div className="relative mt-14 h-40 rounded-3xl border border-teal-300/20 bg-navy-900/60">
            <div className="absolute inset-x-8 top-1/2 h-px bg-white/10" />
            <motion.div style={{ width: lineW }} className="absolute left-8 top-1/2 h-px max-w-[calc(100%-4rem)] bg-teal-400 shadow-[0_0_16px_#2ab7dd]" />
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="absolute top-4 bottom-4 w-px bg-white/5" style={{ left: `${10 + i * 10}%` }} />
            ))}
            {s.process.map((st, i) => (
              <Stage key={st.title} index={i} progress={p} title={st.title} />
            ))}
            <motion.div style={{ left: robotX }} className="absolute top-1/2 -translate-y-1/2">
              <motion.div style={{ opacity: cameraGlow }} className="absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-teal-300/30 blur-2xl" />
              <div className="relative flex items-center gap-1">
                <span className="h-10 w-4 rounded-md border border-teal-300 bg-navy-800" />
                <span className="flex h-8 w-14 items-center justify-center rounded-lg border border-teal-300 bg-navy-800">
                  <motion.span className="h-2 w-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                </span>
                <span className="h-10 w-4 rounded-md border border-teal-300 bg-navy-800" />
                <motion.span className="absolute -top-6 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-dashed border-teal-300" animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
              </div>
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6">
            {s.process.map((st, i) => <StageText key={st.title} index={i} progress={p} title={st.title} text={st.text} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

type MV = ReturnType<typeof useSpring>

function Stage({ index, progress, title }: { index: number; progress: MV; title: string }) {
  const left = `${8 + index * 27}%`
  const at = index / 3
  const scale = useTransform(progress, [at - 0.12, at, at + 0.12], [1, 1.5, 1])
  const opacity = useTransform(progress, [at - 0.15, at], [0.35, 1])
  return (
    <motion.div style={{ left, scale, opacity }} className="absolute top-1/2 -translate-y-1/2">
      <span className="block h-3 w-3 rounded-full bg-teal-300 shadow-[0_0_20px_#6fd3ee]" />
      <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap font-display text-[0.65rem] tracking-[0.25em] text-teal-200">{title.toUpperCase()}</span>
    </motion.div>
  )
}

function StageText({ index, progress, title, text }: { index: number; progress: MV; title: string; text: string }) {
  const at = index / 3
  const opacity = useTransform(progress, [at - 0.2, at, at + 0.3], [0.3, 1, index === 3 ? 1 : 0.5])
  const y = useTransform(progress, [at - 0.2, at], [12, 0])
  return (
    <motion.div style={{ opacity, y }}>
      <span className="font-display text-3xl font-light text-teal-300">0{index + 1}</span>
      <h4 className="mt-2 font-display text-xl font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-white/60">{text}</p>
    </motion.div>
  )
}

/**
 * Robotic Duct Cleaning — the flagship visual page. Custom cinematic hero with
 * a perspective duct scene over photography, a scroll-driven robot process, and
 * an equipment section with masked image reveals.
 */
export default function RoboticDuctCleaning() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  const level = useMotionLevel()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 160 * level])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120 * level])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      {/* Custom hero */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-navy-950 text-white">
        <motion.div style={{ scale: sceneScale, y: sceneY }} className="absolute inset-0">
          <SmartImage src={s.hero} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0"><DuctScene /></div>
        </motion.div>
        <Particles count={50} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/40" />
        <motion.div style={{ y: copyY, opacity: fade }} className="container-x relative flex min-h-[100svh] flex-col justify-end pb-28 pt-40">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-teal-300">Home</Link><ChevronRight className="h-3 w-3" />
            <Link to="/services" className="hover:text-teal-300">Services</Link><ChevronRight className="h-3 w-3" />
            <span className="text-white">{s.navTitle}</span>
          </nav>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-5 flex items-center gap-3 text-teal-300">
            <span className="h-px w-10 bg-teal-300" /> {s.eyebrow} · Camera-guided
          </motion.p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1] md:text-7xl lg:text-8xl">
            <AnimatedText text="Robotic" trigger="mount" delay={0.4} /> <AnimatedText text="Duct" trigger="mount" delay={0.55} /><br />
            <span className="text-teal-300"><AnimatedText text="Cleaning." trigger="mount" delay={0.7} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease: EASE }} className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">{s.tagline}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton to="/contact" variant="dark">Book an inspection</MagneticButton>
            <MagneticButton to="/services" variant="light" icon={false}>All services</MagneticButton>
          </motion.div>
        </motion.div>
        <ScrollIndicator />
      </section>

      {/* Overview */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative">
            <ParallaxImage src={s.gallery[0]} alt="Robotic equipment" className="aspect-[4/5] rounded-[2rem]" reveal="left" strength={90} />
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.5, duration: 0.9, ease: EASE }} className="absolute -bottom-8 -right-6 hidden w-1/2 md:block">
              <ImageReveal src={s.gallery[3]} alt="Industrial ducting" className="aspect-[4/3] rounded-3xl border-4 border-ivory-50 shadow-2xl" direction="right" delay={0.2} />
            </motion.div>
          </div>
          <div>
            <SectionHeading eyebrow="Overview" title="Clean air starts inside the duct." text={s.overview} />
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10"><FeatureList items={s.highlights} columns={2} accent={s.accent} /></motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How the service works" title="A robot goes where people cannot." align="center" text="Access points are opened at agreed locations. The robot enters, inspects and cleans section by section while the operator monitors on screen. Access points are sealed and a report is produced." />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[s.gallery[1], s.gallery[2], s.gallery[3]].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.15, duration: 1, ease: EASE }} className={i === 1 ? 'md:-mt-12' : ''}>
                <ImageReveal src={img} alt="" className="aspect-[3/4] rounded-3xl" direction={i % 2 ? 'up' : 'down'} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ScrollProcess />

      {/* Technology / equipment */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Technology & equipment" title="Camera, brush, extraction, record." />
            <ul className="mt-10 space-y-3">
              {equipment.map((e, i) => {
                const Icon = e.icon
                return (
                  <motion.li key={e.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }} className="group flex gap-4 rounded-2xl border border-navy-800/10 bg-white p-4 transition-all duration-500 hover:border-teal-500/40 hover:pl-6" data-cursor="hover">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-500 group-hover:bg-teal-500"><Icon className="h-5 w-5" /></span>
                    <span><span className="block font-display font-semibold text-navy-900">{e.title}</span><span className="block text-sm text-ink-600">{e.text}</span></span>
                  </motion.li>
                )
              })}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-navy-800/10 bg-navy-950">
            <div className="aspect-[4/3]"><DuctScene compact /></div>
            <SmartImage src={s.gallery[0]} alt="" className="absolute inset-0 -z-0 h-full w-full object-cover opacity-20" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <ParallaxImage src={s.gallery[1]} alt="" className="absolute inset-0 opacity-20" reveal="none" strength={40} />
        <div className="container-x relative">
          <SectionHeading dark eyebrow="Benefits" title="What you get from a robotic clean." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ['Visibility', 'You see the duct interior before and after, not a description of it.'],
              ['Reach', 'Long duct runs and tight sections are cleaned without dismantling.'],
              ['Low disruption', 'Work happens inside the duct network with small access points.'],
            ].map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }} className="glass-dark rounded-3xl border border-white/10 p-8">
                <span className="font-display text-3xl font-light text-teal-300">0{i + 1}</span>
                <h4 className="mt-4 font-display text-xl font-semibold">{t}</h4>
                <p className="mt-2 text-white/65">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Book a robotic duct inspection." text="Tell us about the building and its air-handling system; we will propose an inspection and cleaning plan." image={s.gallery[2]} />
    </>
  )
}
