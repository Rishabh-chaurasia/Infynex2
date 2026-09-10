import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Home, Factory, Zap, Wrench } from 'lucide-react'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import FeatureList from '../../components/ui/FeatureList'
import TiltCard from '../../components/ui/TiltCard'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import Particles from '../../components/visuals/Particles'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'
import { useMotionLevel } from '../../hooks/useMedia'

const s = getService('solar')!
const gold = '#f5b544'

/** Sun glow + rotating rays + energy particles over the hero photo. */
function SunRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,181,68,0.55), rgba(245,181,68,0.1) 45%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] animate-spin-slow opacity-40" style={{ background: 'conic-gradient(from 0deg, transparent 0 20deg, rgba(255,255,255,0.25) 22deg, transparent 26deg 60deg, rgba(255,255,255,0.18) 62deg, transparent 66deg 130deg, rgba(255,255,255,0.22) 132deg, transparent 136deg 220deg, rgba(255,255,255,0.2) 222deg, transparent 226deg 300deg, rgba(255,255,255,0.22) 302deg, transparent 306deg)' , maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />
      <Particles count={40} color="245, 181, 68" links={false} />
    </div>
  )
}

const solutions = [
  { icon: Home, title: 'Rooftop systems', text: 'Residential and commercial rooftops, designed around the roof and load.', img: s.gallery[2] },
  { icon: Factory, title: 'Industrial & ground-mount', text: 'Larger installations for industrial sites and open land.', img: s.gallery[0] },
  { icon: Zap, title: 'Inverters & electrical', text: 'Inverters, protection, cabling and grid connection works.', img: s.gallery[1] },
  { icon: Wrench, title: 'Cleaning & servicing', text: 'Scheduled panel cleaning, inspection and servicing.', img: s.hero },
]

/**
 * Solar — light, warm page. Sunlight sweeps across the hero, panels parallax
 * at different speeds, and the sun position is scroll-controlled.
 */
export default function Solar() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunX = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])
  const sunY = useTransform(scrollYProgress, [0, 0.5, 1], ['70%', '10%', '70%'])
  const p1 = useTransform(scrollYProgress, [0, 1], [60 * level, -60 * level])
  const p2 = useTransform(scrollYProgress, [0, 1], [-30 * level, 30 * level])

  return (
    <>
      <ServiceHero service={s} layout="full" visual={<SunRays />} imageClassName="saturate-[1.15]" />

      {/* Overview */}
      <section className="relative overflow-hidden bg-[#fff8ec] py-24 md:py-32">
        <div aria-hidden className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#f5b544]/25 blur-[120px]" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Solar overview" title="Designed for your site, serviced for its lifetime." text={s.overview} />
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10"><FeatureList items={s.highlights} columns={2} accent={gold} /></motion.div>
          </div>
          <div className="relative">
            <ParallaxImage src={s.gallery[0]} alt="Solar field" className="aspect-[4/5] rounded-[2rem]" reveal="right" strength={100} zoom={[1.2, 1]} />
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: 0.4, duration: 0.9, ease: EASE }} className="absolute -left-6 bottom-12 hidden w-1/2 md:block">
              <ImageReveal src={s.gallery[1]} alt="Solar installation" className="aspect-[4/3] rounded-3xl border-4 border-[#fff8ec] shadow-2xl" direction="left" delay={0.2} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions — sun tracks across the section */}
      <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <motion.div aria-hidden style={{ left: sunX, top: sunY }} className="pointer-events-none absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b544]/30 blur-[120px]" />
        <div className="container-x">
          <SectionHeading dark eyebrow="Solutions" title="Systems for roofs, sites and open land." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((sol, i) => {
              const Icon = sol.icon
              return (
                <motion.div key={sol.title} style={{ y: i % 2 ? p2 : p1 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }}>
                  <TiltCard max={7} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                    <ImageReveal src={sol.img} alt={sol.title} className="aspect-[4/3]" direction="up" delay={i * 0.05} />
                    <div className="p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-950" style={{ background: gold }}><Icon className="h-4 w-4" /></span>
                      <h4 className="mt-4 font-display text-lg font-semibold">{sol.title}</h4>
                      <p className="mt-1 text-sm text-white/60">{sol.text}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <ParallaxImage src={s.gallery[2]} alt="Rooftop solar" className="aspect-[4/5] rounded-[2rem]" reveal="left" strength={80} />
          <div>
            <SectionHeading eyebrow="Service approach" title="Survey, design, install, maintain." />
            <div className="mt-12"><ProcessTimeline steps={s.process} orientation="vertical" accent={gold} /></div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[#fff8ec] py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="Everything between the sun and your switchboard." align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {s.capabilities.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }} className="rounded-3xl border border-[#f5b544]/40 bg-white p-7">
                <span className="block h-1 w-10 rounded-full" style={{ background: gold }} />
                <h4 className="mt-5 font-display text-lg font-semibold text-navy-900">{c.title}</h4>
                <p className="mt-2 text-sm text-ink-600">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Thinking about solar for your site?" text="Share the location and roof or land details; we will arrange a survey and proposal." image={s.gallery[0]} />
    </>
  )
}
