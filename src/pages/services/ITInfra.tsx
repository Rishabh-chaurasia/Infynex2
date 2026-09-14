import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import FeatureList from '../../components/ui/FeatureList'
import CapabilityGrid from '../../components/ui/CapabilityGrid'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import NetworkVisual from '../../components/visuals/NetworkVisual'
import Particles from '../../components/visuals/Particles'
import { getService } from '../../data/services'
import { fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'
import { useMotionLevel } from '../../hooks/useMedia'

const s = getService('it-infra')!

const layers = [
  { name: 'Cloud & WAN', desc: 'Internet links, cloud connectivity and site-to-site links.', y: 14, nodes: [30, 50, 70] },
  { name: 'Core & security', desc: 'Core switching, firewalls and segmentation.', y: 38, nodes: [40, 60] },
  { name: 'Distribution', desc: 'Floor and building switching, wireless controllers.', y: 62, nodes: [20, 40, 60, 80] },
  { name: 'Access & endpoints', desc: 'Access switches, wireless, servers, users and devices.', y: 86, nodes: [12, 28, 44, 56, 72, 88] },
]

/** Layered network diagram: hover a layer to highlight it; packets flow between tiers. */
function LayeredNetwork({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <defs>
        <filter id="ng"><feGaussianBlur stdDeviation="0.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {layers.map((l, i) => (
        <motion.rect key={l.name} x="4" y={l.y - 9} width="92" height="18" rx="3" fill="#6fd3ee"
          animate={{ fillOpacity: active === i ? 0.09 : 0.02 }} transition={{ duration: 0.4 }}
          onMouseEnter={() => setActive(i)} style={{ cursor: 'pointer' }} />
      ))}
      {/* inter-layer links */}
      {layers.slice(0, -1).map((l, i) => {
        const next = layers[i + 1]
        return l.nodes.flatMap((x) =>
          next.nodes.filter((nx) => Math.abs(nx - x) < 24).map((nx, j) => (
            <g key={`${i}-${x}-${nx}`}>
              <motion.line x1={x} y1={l.y} x2={nx} y2={next.y} stroke="#6fd3ee" strokeWidth="0.25"
                animate={{ strokeOpacity: active === i || active === i + 1 ? 0.7 : 0.2 }}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.2 + j * 0.05 }} />
              <motion.circle r="0.5" fill="#ffffff" filter="url(#ng)"
                animate={{ cx: [x, nx], cy: [l.y, next.y], opacity: [0, 1, 0] }}
                transition={{ duration: 2 + (j % 3) * 0.6, repeat: Infinity, delay: (x + j) % 3, ease: 'easeInOut' }} />
            </g>
          )),
        )
      })}
      {layers.map((l, i) => l.nodes.map((x, j) => (
        <g key={`${i}-${j}`} onMouseEnter={() => setActive(i)} style={{ cursor: 'pointer' }}>
          <motion.circle cx={x} cy={l.y} r={i === 0 ? 2.4 : 1.8} fill="#0b1533" stroke="#6fd3ee" strokeWidth="0.4"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 + j * 0.05, type: 'spring' }}
            animate={{ stroke: active === i ? '#ffffff' : '#6fd3ee' }} style={{ transformOrigin: `${x}px ${l.y}px` }} />
          <motion.circle cx={x} cy={l.y} r={1} fill="#6fd3ee" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2 + j * 0.3, repeat: Infinity }} />
        </g>
      )))}
      {layers.map((l, i) => (
        <text key={l.name} x="5" y={l.y - 5.5} fontSize="2.6" fontWeight="700" fontFamily="Sora, sans-serif" fill="#0b1533" fillOpacity={active === i ? 1 : 0.72}>{l.name.toUpperCase()}</text>
      ))}
    </svg>
  )
}

/**
 * IT Infrastructure — network story. Full hero with a live node graph,
 * a big-type overview, a layered interactive network visualisation.
 */
export default function ITInfra() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  const [active, setActive] = useState(1)
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const depth = useTransform(scrollYProgress, [0, 1], [18 * level, -18 * level])
  const lift = useTransform(scrollYProgress, [0, 1], [100 * level, -100 * level])

  return (
    <>
      <ServiceHero
        service={s}
        layout="full"
        visual={<div className="absolute inset-0 opacity-50 mix-blend-screen"><NetworkVisual seed={21} nodes={20} /><Particles count={30} links={false} /></div>}
      />

      {/* Overview — editorial */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Infrastructure overview" title="Infrastructure is a system, not a shopping list." size="xl" />
            <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-600">{s.overview}</motion.p>
          </div>
          <div className="relative mt-8 lg:mt-24">
            <ImageReveal src={s.gallery[0]} alt="Server rack" className="aspect-[3/4] rounded-[2rem]" direction="up" />
            <motion.div style={{ y: lift }} className="absolute -left-10 top-10 hidden w-[55%] lg:block">
              <ImageReveal src={s.gallery[2]} alt="Structured cabling" className="aspect-[4/3] rounded-3xl border-4 border-ivory-50 shadow-2xl" direction="left" delay={0.3} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Infrastructure capabilities" title="What we design, build and run." />
            <div className="mt-10"><FeatureList items={s.highlights} columns={1} accent={s.accent} /></div>
          </div>
          <CapabilityGrid items={s.capabilities} accent={s.accent} layout="grid" />
        </div>
      </section>

      {/* Network visualisation */}
      <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading dark eyebrow="Network visualisation" title="Every tier, connected and visible." text="Hover over a layer to see where it sits. Designs are documented tier by tier so that changes later are informed, not guessed." />
            <ul className="mt-10 space-y-2">
              {layers.map((l, i) => (
                <li key={l.name}>
                  <button onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-500 ${active === i ? 'border-teal-400/60 bg-white/[0.08]' : 'border-white/10 hover:bg-white/[0.04]'}`}>
                    <span className="font-display text-xs tracking-[0.3em] text-teal-300">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-display font-semibold">{l.name}</span>
                      <span className="block text-sm text-white/60">{l.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <motion.div style={{ rotateX: depth, transformStyle: 'preserve-3d' }} className="perspective relative aspect-square rounded-[2rem] border border-white/10 bg-navy-900/60 p-4 shadow-[0_60px_120px_-40px_rgba(111,211,238,0.25)]">
            <ParallaxImage src={s.gallery[1]} alt="Data centre" className="absolute inset-0 rounded-[2rem] opacity-30" reveal="none" strength={30} />
            <div className="relative h-full w-full"><LayeredNetwork active={active} setActive={setActive} /></div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <ParallaxImage src={s.hero} alt="Server corridor" className="aspect-[4/5] rounded-[2rem]" reveal="left" strength={90} />
          <div>
            <SectionHeading eyebrow="Service approach" title="Assess, architect, build, operate." />
            <div className="mt-12"><ProcessTimeline steps={s.process} orientation="vertical" accent={s.accent} /></div>
          </div>
        </div>
      </section>

      <CTASection title="Infrastructure designed for the way your team works." text="Share your sites and applications and we will propose a clear, phased plan." image={s.gallery[1]} />
    </>
  )
}
