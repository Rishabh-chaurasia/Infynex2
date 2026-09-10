import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'
import SectionHeading from '../components/ui/SectionHeading'
import ParallaxImage from '../components/ui/ParallaxImage'
import ImageReveal from '../components/ui/ImageReveal'
import SmartImage from '../components/ui/SmartImage'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import CTASection from '../components/ui/CTASection'
import { services } from '../data/services'
import { images } from '../data/images'
import { site } from '../data/site'
import { EASE, fadeUp, viewportOnce } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'
import { useMotionLevel } from '../hooks/useMedia'

const values = [
  { title: 'Accountability', text: 'One partner owns the outcome across every service we deliver.' },
  { title: 'Documentation', text: 'Audits, reports and records accompany our work so nothing is left to memory.' },
  { title: 'Practicality', text: 'We recommend what fits the requirement and the budget, not what is fashionable.' },
  { title: 'Care', text: 'Business clients and individual customers receive the same standard of attention.' },
]

/**
 * About — editorial, premium. Large typographic hero with a scroll-parted
 * image pair, a manifesto section, values with numbered choreography,
 * a services mosaic and a placeholder team/leadership area (editable).
 */
export default function About() {
  usePageTitle('About — Infynex Technologies')
  const heroRef = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -160 * level])
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 160 * level])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120 * level])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-ivory-50">
        <div aria-hidden className="absolute inset-0 grid-lines" />
        <div className="container-x relative flex min-h-[100svh] flex-col justify-center pb-24 pt-36">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-600">
            <span className="h-px w-10 bg-teal-500" /> About {site.shortName}
          </motion.p>
          <motion.h1 style={{ scale: titleScale, opacity: fade }} className="origin-left font-display text-[3rem] font-semibold leading-[0.98] text-navy-900 sm:text-6xl lg:text-[6.5rem]">
            <AnimatedText text="Technology," trigger="mount" delay={0.4} /><br />
            <AnimatedText text="infrastructure" trigger="mount" delay={0.55} /><br />
            <span className="text-teal-600"><AnimatedText text="and services." trigger="mount" delay={0.7} /></span>
          </motion.h1>
          <div className="mt-14 grid items-end gap-8 md:grid-cols-[1fr_1fr_1.2fr]">
            <motion.div style={{ x: leftX, y: imgY }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.2, ease: EASE }}>
              <ImageReveal src={images.team} alt="Team" className="aspect-[4/3] rounded-3xl" direction="left" delay={0.6} />
            </motion.div>
            <motion.div style={{ x: rightX }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1.2, ease: EASE }} className="md:-mb-16">
              <ImageReveal src={images.building} alt="Office building" className="aspect-[3/4] rounded-3xl" direction="up" delay={0.8} />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: EASE }} className="text-lg text-ink-600 md:text-xl">
              {site.name} is a technology and business-services company delivering maintenance, hardware, IT infrastructure, cloud, support, robotic duct cleaning, solar, vehicle and B2B/B2C services under one relationship.
            </motion.p>
          </div>
        </div>
        <ScrollIndicator dark={false} />
      </section>

      {/* Manifesto */}
      <section className="relative overflow-hidden bg-navy-950 py-28 text-white md:py-40">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x relative">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="eyebrow text-teal-300">What we believe</motion.p>
          <AnimatedText as="h2" text="Organisations should not have to manage five vendors to keep one office running." className="mt-6 max-w-5xl font-display text-3xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl" stagger={0.03} />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              'Infynex exists to be the single, accountable partner across the technology, infrastructure and facilities services that an organisation depends on.',
              'We combine engineers who work on site with remote support teams, so that problems are resolved wherever they occur.',
              'Everything we deliver is documented — from an AMC visit report to duct-cleaning footage — because you should be able to see what was done.',
            ].map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: EASE }} className="border-t border-white/15 pt-6 text-white/70">{t}</motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="How we work" title="Four principles behind every engagement." />
            <div className="mt-10"><ParallaxImage src={images.workspace} alt="Workspace" className="aspect-[4/3] rounded-3xl" reveal="left" strength={40} /></div>
          </div>
          <ol>
            {values.map((v, i) => (
              <motion.li key={v.title} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.9, ease: EASE }} className="group grid gap-4 border-t border-navy-800/10 py-10 md:grid-cols-[5rem_1fr]" data-cursor="hover">
                <span className="font-display text-5xl font-light text-teal-500 transition-transform duration-500 group-hover:-translate-y-1">0{i + 1}</span>
                <div><h3 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">{v.title}</h3><p className="mt-3 max-w-lg text-lg text-ink-600">{v.text}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services mosaic */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="What we deliver" title="Eleven services, one company." />
            <Link to="/services" className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-900">Service directory <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {services.map((sv, i) => (
              <motion.div key={sv.slug} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } } }} className={i === 0 || i === 5 ? 'col-span-2 row-span-2' : ''}>
                <Link to={sv.path} className="group relative block h-full min-h-[9rem] overflow-hidden rounded-2xl bg-navy-900" data-cursor="hover">
                  <SmartImage src={sv.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-navy-950/10" />
                  <span className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold text-white">{sv.navTitle}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership placeholder */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage src={images.meeting} alt="Meeting" className="aspect-[4/3] rounded-[2rem]" reveal="left" strength={60} />
          <div>
            <SectionHeading eyebrow="People" title="Led by engineers and service managers." text="Company history, leadership profiles and team details can be added here once supplied. This section is intentionally free of invented facts." />
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 rounded-2xl border border-dashed border-navy-800/20 p-5 text-sm text-ink-400">
              Editable placeholder — replace with founding details, leadership bios and photographs in <code className="rounded bg-ivory-100 px-1">src/pages/About.tsx</code>.
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection title="Work with a partner who owns the outcome." image={images.office} />
    </>
  )
}
