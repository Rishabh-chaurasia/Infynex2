import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, ShieldCheck, Layers, Radio } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ParallaxImage from '../ui/ParallaxImage'
import NetworkVisual from '../visuals/NetworkVisual'
import { images } from '../../data/images'
import { EASE } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

const caps = [
  { icon: Layers, title: 'Infrastructure', text: 'Networks, servers, storage and cloud designed as one connected system.' },
  { icon: Activity, title: 'Maintenance', text: 'Planned care for the equipment you already own, under contract.' },
  { icon: ShieldCheck, title: 'Support', text: 'Helpdesk, on-site engineers and tele-services covering your users and customers.' },
  { icon: Radio, title: 'Facilities & energy', text: 'Robotic duct cleaning, solar systems and vehicle services for the physical site.' },
]

/**
 * Section 4: capabilities visualisation — a dark stage where a live network
 * diagram sits over a globe-network photograph, with capability panels that
 * slide in from alternating sides.
 */
export default function Capabilities() {
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6 * level, 6 * level])
  const rise = useTransform(scrollYProgress, [0, 1], [80 * level, -80 * level])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-36">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
      <div aria-hidden className="absolute right-0 top-0 h-[40rem] w-[40rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-teal-500/20 blur-[160px]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            dark
            eyebrow="Capabilities"
            title="Four capability areas, connected by design."
            text="Every Infynex service sits inside one of four capability areas. Because the same team spans all of them, hand-offs between infrastructure, maintenance, support and facilities work happen inside the company — not between vendors."
          />
          <div className="mt-12 space-y-4">
            {caps.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: i % 2 ? 60 : -60, rotateY: i % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
                  className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:border-teal-400/40 hover:bg-white/[0.06]"
                  data-cursor="hover"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300 transition-all duration-500 group-hover:bg-teal-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{c.title}</h4>
                    <p className="mt-1 text-sm text-white/60">{c.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div style={{ y: rise }} className="relative perspective">
          <motion.div style={{ rotateY: rotate, transformStyle: 'preserve-3d' }} className="relative">
            <ParallaxImage src={images.capabilities} alt="Global network visualisation" className="aspect-[4/4.4] rounded-[2rem]" reveal="right" overlay="bg-navy-950/40" strength={40} />
            <div className="absolute inset-0 p-6">
              <NetworkVisual seed={11} nodes={16} labels={['Core', '', '', '', 'Edge', '', '', '', 'Site', '', '', '', 'Cloud']} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}
              className="glass-dark absolute bottom-6 left-6 rounded-2xl border border-white/10 p-4"
              style={{ transform: 'translateZ(60px)' }}
            >
              <p className="eyebrow text-[0.6rem] text-teal-300">Live topology</p>
              <p className="mt-1 font-display text-sm font-semibold">Sites · Network · Cloud · Support</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
