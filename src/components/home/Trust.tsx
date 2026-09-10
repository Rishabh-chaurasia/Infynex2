import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import BlogCard from '../ui/BlogCard'
import ParallaxImage from '../ui/ParallaxImage'
import ImageReveal from '../ui/ImageReveal'
import MagneticButton from '../ui/MagneticButton'
import AnimatedText from '../ui/AnimatedText'
import { clients } from '../../data/site'
import { posts } from '../../data/blog'
import { images } from '../../data/images'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

const reasons = [
  { title: 'One accountable partner', text: 'Maintenance, hardware, infrastructure, support and facilities services from a single team — no vendor hand-offs.' },
  { title: 'Engineers on site and remote', text: 'A helpdesk for fast remote resolution, and engineers at your premises when hands-on work is needed.' },
  { title: 'Documented delivery', text: 'Audits, reports and records accompany every service so you always know what was done and why.' },
  { title: 'Business and consumer ready', text: 'Structured B2B engagements and accessible B2C services, using the same standards.' },
]

/** Section 9: Why choose Infynex — editorial asymmetric layout with sticky heading and numbered reasons. */
export function WhyInfynex() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="Why Infynex" title="What makes working with us different." />
          <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
            <ImageReveal src={images.meeting} alt="Team discussion" className="aspect-[4/3] rounded-3xl" direction="up" />
          </motion.div>
        </div>
        <ol className="space-y-0">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group grid gap-4 border-t border-navy-800/10 py-10 md:grid-cols-[4rem_1fr] md:gap-8"
              data-cursor="hover"
            >
              <span className="font-display text-4xl font-light text-teal-500 transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">{r.title}</h3>
                <p className="mt-3 max-w-lg text-lg text-ink-600">{r.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/**
 * Section 10: client / trust. Names supplied by Infynex render as wordmarks
 * (or as real logos when files are added to site.ts). No fake logos.
 */
export function Clients() {
  return (
    <section className="overflow-hidden border-y border-navy-800/10 bg-ivory-100 py-16">
      <div className="container-x mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="eyebrow text-teal-600">Organisations we work with</p>
        <p className="max-w-md text-sm text-ink-400">Replace wordmarks with official logo files in <code className="rounded bg-white px-1">src/data/site.ts</code>.</p>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-between">
          {[...clients, ...clients].slice(0, 6).map((c, i) => (
            <motion.div
              key={`${c.name}-${i}`}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } } }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="flex h-20 min-w-[12rem] items-center justify-center rounded-2xl border border-navy-800/10 bg-white px-8 opacity-70 transition-opacity duration-500 hover:opacity-100"
              data-cursor="hover"
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="max-h-10 w-auto" />
              ) : (
                <span className="font-display text-lg font-semibold tracking-tight text-navy-900">{c.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/** Section 11: insights preview. */
export function BlogPreview() {
  const featured = posts.slice(0, 3)
  return (
    <section className="container-x py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow="Insights" title="Perspectives from the services we deliver." />
        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <MagneticButton to="/blog" variant="ghost">All articles</MagneticButton>
        </motion.div>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {featured.map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
      </div>
    </section>
  )
}

/** Section 12: about preview — overlapping images with a scroll-lifted quote panel. */
export function AboutPreview() {
  const ref = useRef<HTMLElement>(null)
  const level = useMotionLevel()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60 * level, -60 * level])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40 * level, 40 * level])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <ParallaxImage src={images.team} alt="Team at work" className="aspect-[4/3] rounded-[2rem]" reveal="left" />
          <motion.div style={{ y: y1 }} className="absolute -bottom-10 -right-4 w-[45%] md:-right-8">
            <ImageReveal src={images.office} alt="Office" className="aspect-[4/5] rounded-3xl border-4 border-navy-950" direction="right" delay={0.2} />
          </motion.div>
        </div>
        <motion.div style={{ y: y2 }}>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="eyebrow mb-5 text-teal-300">About Infynex</motion.p>
          <AnimatedText as="h2" text="A technology and services company built around accountability." className="text-balance font-display text-4xl font-semibold leading-[1.05] md:text-5xl" />
          <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 text-lg text-white/70">
            Infynex Technologies brings together IT, infrastructure, support, facilities and energy services so that organisations can rely on one partner across all of them.
          </motion.p>
          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
            <Link to="/about" className="group inline-flex items-center gap-3 font-display text-sm font-semibold">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
              Read our story
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
