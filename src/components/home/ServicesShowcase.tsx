import { useEffect, useRef, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import MagneticButton from '../ui/MagneticButton'
import { services } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'

/** Section 2: services introduction — editorial split with a list that highlights on hover. */
export function ServicesIntro() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow="What we do"
            title="Complete services. One accountable partner."
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

/** Autoplaying service slideshow with optional manual navigation. */
export function ServiceShowcase() {
  const featured = services
  const headingColors = ['#ff6464', '#ffad32', '#4ee09a', '#a978ff', '#ff63ad', '#21d4c2', '#b9e83d', '#ffd43b', '#ff8647']
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const pauseSlideshow = () => animationRef.current?.pause()
  const resumeSlideshow = () => animationRef.current?.play()

  useEffect(() => {
    const animation = trackRef.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 56000, iterations: Infinity, easing: 'linear' },
    )
    animationRef.current = animation ?? null
    return () => animation?.cancel()
  }, [])

  return (
    <section className="relative overflow-hidden bg-navy-950 pb-12 pt-16 text-white md:pb-14 md:pt-20">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-60" />
      <div className="container-x relative mb-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading className="service-showcase-heading" dark eyebrow="Service showcase" title="A closer look at what we deliver." size="md" />
        </div>
      </div>

      <div className="relative h-[52vh] min-h-[420px] max-h-[540px]">
        <div ref={trackRef} className="absolute inset-y-0 left-0 flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-6 pr-6" aria-hidden={copy === 1 ? 'true' : undefined}>
              {featured.map((service, index) => {
                const Icon = service.icon
                return (
              <Link to={service.path} tabIndex={copy === 1 ? -1 : undefined} key={`${copy}-${service.slug}`} onMouseEnter={pauseSlideshow} onMouseLeave={resumeSlideshow} className="group relative h-full w-[82vw] max-w-[690px] shrink-0 cursor-pointer overflow-hidden rounded-[2rem] bg-navy-900 sm:w-[62vw] lg:w-[38vw] xl:w-[36vw]" data-cursor="hover" aria-hidden={copy === 1 ? 'true' : undefined}>
                <SmartImage src={service.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                  <div className="flex items-center justify-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur"><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className="flex min-h-[16.5rem] flex-col justify-end">
                    <p className="eyebrow inline-flex w-fit rounded-full px-3 py-1 font-bold text-navy-950" style={{ backgroundColor: headingColors[index] }}>{service.eyebrow}</p>
                    <h3 className="service-card-heading mt-2 flex min-h-[5.5rem] items-end font-display text-3xl font-semibold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,.55)] xl:text-4xl" style={{ '--service-heading-color': headingColors[index] } as CSSProperties}>{service.title}</h3>
                    <p className="mt-3 min-h-[4.5rem] max-w-md text-sm leading-relaxed text-white/70 sm:text-base">{service.short}</p>
                    <span className="mt-auto inline-flex w-fit items-center gap-2 pt-5 font-display text-sm font-semibold text-white">
                      View service
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal-500"><ArrowUpRight className="h-4 w-4" /></span>
                    </span>
                  </div>
                </div>
              </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="container-x relative">
        <div className="mt-6 flex justify-end">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 font-display text-base font-bold text-white shadow-[0_12px_28px_rgba(26,157,195,.3)] transition-all hover:-translate-y-1 hover:bg-[#ff7a45]">All services <ArrowUpRight className="h-5 w-5" /></Link>
        </div>
      </div>
    </section>
  )
}
