import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Service } from '../../data/services'
import AnimatedText from './AnimatedText'
import SmartImage from './SmartImage'
import MagneticButton from './MagneticButton'
import ScrollIndicator from './ScrollIndicator'
import { EASE } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

interface Props {
  service: Service
  /** full: image fills the hero; split: text left / image right; offset: tall image pinned right with overlapping copy */
  layout?: 'full' | 'split' | 'offset'
  /** Optional custom visual rendered instead of / over the photo */
  visual?: ReactNode
  imageClassName?: string
  tone?: 'dark' | 'light'
}

/**
 * Service page hero with three compositions. Photo scales and drifts with scroll,
 * copy reveals with masked typography, and each service brings its own accent glow.
 */
export default function ServiceHero({ service, layout = 'full', visual, imageClassName = '', tone = 'light' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 220 * level])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90 * level])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const Crumbs = (
    <motion.nav
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
      className={`mb-6 flex flex-wrap items-center gap-2 text-xs sm:mb-8 ${tone === 'dark' ? 'text-white/60' : 'text-ink-400'}`} aria-label="Breadcrumb"
    >
      <Link to="/" className="hover:text-teal-400">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/services" className="hover:text-teal-400">Services</Link>
      <ChevronRight className="h-3 w-3" />
      <span className={tone === 'dark' ? 'text-white' : 'text-navy-900'}>{service.navTitle}</span>
    </motion.nav>
  )

  const Copy = (
    <motion.div style={{ y: textY, opacity: fade }} className="service-hero-copy relative z-10">
      {Crumbs}
      <motion.p
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="eyebrow mb-5 flex items-center gap-3"
        style={{ color: service.accent }}
      >
        <span className="h-px w-10" style={{ background: service.accent }} />
        {service.eyebrow}
      </motion.p>
      <AnimatedText
        as="h1"
        trigger="mount"
        delay={0.35}
        text={service.title}
        className={`text-balance font-display text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl ${tone === 'dark' ? 'text-white' : 'text-navy-900'}`}
      />
      <motion.p
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
        className={`mt-6 max-w-xl text-lg md:text-xl ${tone === 'dark' ? 'text-white/70' : 'text-ink-600'}`}
      >
        {service.tagline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease: EASE }}
        className="service-hero-actions mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
      >
        <MagneticButton to="/contact" variant={tone === 'dark' ? 'dark' : 'primary'}>Enquire about {service.navTitle}</MagneticButton>
        <MagneticButton to="/services" variant={tone === 'dark' ? 'light' : 'ghost'} icon={false}>All services</MagneticButton>
      </motion.div>
    </motion.div>
  )

  if (layout === 'split') {
    return (
      <section ref={ref} className={`service-hero relative overflow-hidden ${tone === 'dark' ? 'bg-navy-950 text-white' : 'bg-ivory-50'}`}>
        <div aria-hidden className={`absolute inset-0 ${tone === 'dark' ? 'grid-lines-dark' : 'grid-lines'}`} />
        <div aria-hidden className="absolute -left-32 top-1/3 h-96 w-96 rounded-full blur-[120px]" style={{ background: `${service.accent}33` }} />
        <div className="container-x relative grid min-h-[92vh] items-center gap-10 pb-14 pt-28 md:grid-cols-2 md:pb-20 md:pt-40">
          {Copy}
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/6]"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-[-10%]">
              <SmartImage src={service.hero} alt="" className={`h-full w-full object-cover ${imageClassName}`} />
            </motion.div>
            {visual}
          </motion.div>
        </div>
        <ScrollIndicator dark={tone === 'dark'} />
      </section>
    )
  }

  if (layout === 'offset') {
    return (
      <section ref={ref} className={`service-hero relative overflow-hidden ${tone === 'dark' ? 'bg-navy-950 text-white' : 'bg-ivory-100'}`}>
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
          className="service-hero-offset-media absolute right-0 top-0 h-full w-full md:w-[62%]"
        >
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-[-10%]">
            <SmartImage src={service.hero} alt="" className={`h-full w-full object-cover ${imageClassName}`} />
          </motion.div>
          <div className={`absolute inset-0 ${tone === 'dark' ? 'bg-gradient-to-r from-navy-950 via-navy-950/60 to-navy-950/20 md:from-navy-950 md:via-navy-950/20 md:to-transparent' : 'bg-gradient-to-r from-ivory-100/95 via-ivory-100/45 to-transparent'}`} />
          {visual}
        </motion.div>
        <div className="container-x relative flex min-h-[92vh] items-center pb-14 pt-28 md:pb-20 md:pt-40">
          <div className="md:max-w-[52%]">{Copy}</div>
        </div>
        <ScrollIndicator dark={tone === 'dark'} />
      </section>
    )
  }

  return (
    <section ref={ref} className={`service-hero relative min-h-[100svh] overflow-hidden ${tone === 'dark' ? 'bg-navy-950 text-white' : 'bg-ivory-50 text-navy-950'}`}>
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-[-10%]">
        <SmartImage src={service.hero} alt="" className={`h-full w-full object-cover ${imageClassName}`} />
      </motion.div>
      <div className={`absolute inset-0 ${tone === 'dark' ? 'bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30' : 'bg-gradient-to-t from-ivory-50/70 via-transparent to-white/10'}`} />
      <div className={`absolute inset-0 ${tone === 'dark' ? 'bg-gradient-to-r from-navy-950/80 to-transparent' : 'bg-gradient-to-r from-ivory-50/92 via-ivory-50/35 to-transparent'}`} />
      {visual}
      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 md:pb-24 md:pt-40">
        <div className="max-w-3xl">{Copy}</div>
      </div>
      <ScrollIndicator dark={tone === 'dark'} />
    </section>
  )
}
