import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import AnimatedText from '../ui/AnimatedText'
import { images } from '../../data/images'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

const links = [
  { label: 'IT Infrastructure & Services', to: '/services/it-infra' },
  { label: 'Cloud Server', to: '/services/cloud-server' },
  { label: 'Hardware', to: '/services/hardware' },
  { label: 'Annual Maintenance Contracts', to: '/services/amc' },
]

/**
 * Section 5: full-bleed infrastructure image with scroll-scaled clip window and
 * overlapping editorial text panel.
 */
export default function Infrastructure() {
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const inset = useTransform(scrollYProgress, [0, 0.4], [level ? 8 : 0, 0])
  const clip = useTransform(inset, (v) => `inset(0 ${v}% 0 ${v}% round ${v * 4}px)`)
  const panelY = useTransform(scrollYProgress, [0, 1], [60 * level, -60 * level])

  return (
    <section ref={ref} className="relative bg-ivory-50 pb-8">
      <div className="relative h-[70vh] md:h-[90vh]">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden">
          <motion.div style={{ scale, y }} className="absolute inset-0">
            <SmartImage src={images.infrastructure} alt="Server rack detail" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/40 to-transparent" />
        </motion.div>
        <div className="container-x relative flex h-full items-end pb-12 md:items-center md:pb-0">
          <motion.div style={{ y: panelY }} className="max-w-xl text-white">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="eyebrow mb-5 text-teal-300">Infrastructure</motion.p>
            <AnimatedText as="h2" text="From the rack to the cloud, engineered as one." className="text-balance font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl" />
            <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 text-lg text-white/75">
              We design, install and maintain the physical and virtual infrastructure that organisations run on — and we keep it documented, so nothing depends on a single person’s memory.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container-x relative -mt-10 md:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 1, ease: EASE }}
          className="ml-auto max-w-2xl rounded-[2rem] border border-navy-800/10 bg-white p-8 shadow-[0_40px_100px_-40px_rgba(11,21,51,0.35)] md:p-10"
        >
          <p className="eyebrow text-teal-600">Infrastructure services</p>
          <ul className="mt-6 divide-y divide-navy-800/10">
            {links.map((l, i) => (
              <motion.li key={l.to} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: EASE }}>
                <Link to={l.to} className="group flex items-center justify-between py-4 font-display text-lg font-semibold text-navy-900">
                  <span className="transition-transform duration-500 group-hover:translate-x-2">{l.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-200 transition-all duration-500 group-hover:bg-navy-900 group-hover:text-white group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
