import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import SmartImage from '../ui/SmartImage'
import MagneticButton from '../ui/MagneticButton'
import { services } from '../../data/services'
import { useIsDesktop } from '../../hooks/useMedia'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'

/** Section 2: services introduction — editorial split with a list that highlights on hover. */
export function ServicesIntro() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow="What we do"
            title="Eleven services. One partner accountable for all of them."
            text="Most organisations juggle a maintenance vendor, a hardware supplier, a network integrator, a support desk and a facilities contractor. Infynex brings these under one relationship so that ownership is never in question."
          />
          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
            <MagneticButton to="/services">See the full directory</MagneticButton>
          </motion.div>
        </div>
        <motion.ul
          className="divide-y divide-navy-800/10 border-y border-navy-800/10"
          initial="hidden" whileInView="visible" viewport={viewportOnce}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li key={s.slug} variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } } }}>
                <Link to={s.path} className="group flex items-center gap-5 py-4 transition-all duration-500 hover:pl-3">
                  <span className="font-display text-xs tracking-[0.3em] text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ivory-200 text-navy-900 transition-all duration-500 group-hover:bg-navy-900 group-hover:text-white group-hover:rotate-[-8deg]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold text-navy-900 md:text-xl">{s.navTitle}</span>
                  <span className="hidden max-w-[16rem] text-sm text-ink-400 opacity-0 transition-all duration-500 group-hover:opacity-100 md:block">{s.tagline}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-400 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-600" />
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

/**
 * Section 3: horizontal storytelling. The section pins while a strip of large
 * service panels moves sideways with scroll. On mobile / tablet it becomes a grid.
 */
export function ServiceShowcase() {
  const desktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const xRaw = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const x = useSpring(xRaw, { stiffness: 80, damping: 25, mass: 0.5 })
  const featured = services.filter((s) => ['robotic-duct-cleaning', 'it-infra', 'amc', 'solar', 'cloud-server', 'helpdesk'].includes(s.slug))

  if (!desktop) {
    return (
      <section className="bg-navy-950 py-24 text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Service showcase" title="A closer look at what we deliver." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {featured.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[380vh] bg-navy-950 text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-60" />
        <div className="container-x relative mb-10 flex items-end justify-between">
          <SectionHeading dark eyebrow="Service showcase" title="A closer look at what we deliver." size="md" />
          <p className="hidden text-sm text-white/50 lg:block">Scroll to explore →</p>
        </div>
        <motion.div style={{ x }} className="flex gap-6 pl-[clamp(1.25rem,4vw,3rem)] will-change-transform">
          {featured.map((s, i) => {
            const Icon = s.icon
            return (
              <Link
                key={s.slug}
                to={s.path}
                className="group relative h-[58vh] w-[46vw] shrink-0 overflow-hidden rounded-[2rem] bg-navy-900 xl:w-[38vw]"
                data-cursor="hover"
              >
                <SmartImage src={s.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur"><Icon className="h-5 w-5" /></span>
                    <span className="font-display text-sm tracking-[0.3em] text-white/50">{String(i + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <p className="eyebrow text-teal-300" style={{ color: s.accent }}>{s.eyebrow}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold leading-tight xl:text-4xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-white/70">{s.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold">
                      View service
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal-500"><ArrowUpRight className="h-4 w-4" /></span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
          <Link to="/services" className="group flex h-[58vh] w-[30vw] shrink-0 flex-col items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.03] text-center" data-cursor="hover">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"><ArrowUpRight className="h-8 w-8" /></span>
            <p className="mt-6 font-display text-2xl font-semibold">All eleven services</p>
            <p className="mt-2 text-white/60">Dedicated pages for each</p>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
