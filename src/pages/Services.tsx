import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '../components/ui/AnimatedText'
import ServiceCard from '../components/ui/ServiceCard'
import CTASection from '../components/ui/CTASection'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import NetworkVisual from '../components/visuals/NetworkVisual'
import { services } from '../data/services'
import { images } from '../data/images'
import { EASE } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'
import { useMotionLevel } from '../hooks/useMedia'

const groups = [
  { title: 'Infrastructure & hardware', slugs: ['it-infra', 'cloud-server', 'hardware', 'amc'] },
  { title: 'Support & communication', slugs: ['helpdesk', 'technical-support', 'tele-services'] },
  { title: 'Facilities, energy & mobility', slugs: ['robotic-duct-cleaning', 'solar', 'vehicle-vendor', 'b2b-b2c'] },
]

/**
 * Service directory: a typographic hero with a live network backdrop, then
 * all eleven services in grouped, interactive 3D cards.
 */
export default function Services() {
  usePageTitle('Services — Infynex Technologies')
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200 * level])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-navy-950 text-white">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-40">
          <NetworkVisual seed={3} nodes={22} />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/30 to-navy-950" />
        <motion.div style={{ opacity: fade }} className="container-x relative flex min-h-[80vh] flex-col justify-center pb-24 pt-40">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-300">
            <span className="h-px w-10 bg-teal-400" /> Service directory
          </motion.p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
            <AnimatedText text="Eleven services." trigger="mount" delay={0.4} /><br />
            <span className="text-white/50"><AnimatedText text="Each with a page of its own." trigger="mount" delay={0.7} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: EASE }} className="mt-8 max-w-xl text-lg text-white/70">
            Explore what each service covers, how we approach it and where it fits. Select any card to open its dedicated page.
          </motion.p>
        </motion.div>
        <ScrollIndicator />
      </section>

      <section className="container-x py-20 md:py-28">
        {groups.map((g, gi) => (
          <div key={g.title} className={gi ? 'mt-24' : ''}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="mb-10 flex items-center gap-4">
              <span className="font-display text-xs tracking-[0.3em] text-teal-600">0{gi + 1}</span>
              <span className="h-px flex-1 bg-navy-800/10" />
              <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">{g.title}</h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {g.slugs.map((slug) => {
                const s = services.find((x) => x.slug === slug)!
                const idx = services.indexOf(s)
                return <ServiceCard key={slug} service={s} index={idx} />
              })}
            </div>
          </div>
        ))}
      </section>

      <CTASection title="Not sure which service you need?" text="Describe the problem and we will map it to the right combination of services." image={images.workspace} />
    </>
  )
}
