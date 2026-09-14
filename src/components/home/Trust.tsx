import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ClipboardCheck, Headphones, Layers3, ShieldCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ParallaxImage from '../ui/ParallaxImage'
import ImageReveal from '../ui/ImageReveal'
import AnimatedText from '../ui/AnimatedText'
import { clients } from '../../data/site'
import { posts } from '../../data/blog'
import { images } from '../../data/images'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import { useMotionLevel } from '../../hooks/useMedia'

const reasons = [
  { icon: ShieldCheck, title: 'One accountable partner', text: 'Maintenance, hardware, infrastructure, support and facilities services from a single team — no vendor hand-offs.' },
  { icon: Headphones, title: 'Engineers on site and remote', text: 'A helpdesk for fast remote resolution, and engineers at your premises when hands-on work is needed.' },
  { icon: ClipboardCheck, title: 'Documented delivery', text: 'Audits, reports and records accompany every service so you always know what was done and why.' },
  { icon: Layers3, title: 'Flexible service plans', text: 'Choose one service or combine several services under one clear plan.' },
]

/** Compact reasons section designed to fit in one desktop viewport. */
export function WhyInfynex() {
  return (
    <section className="relative overflow-hidden bg-ivory-50 pb-12 pt-0 md:pb-16 md:pt-0">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-35" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Why Infynex" title="We are here to make things easier." size="md" className="mb-8 [&_.eyebrow]:!text-base md:[&_.eyebrow]:!text-lg" />
        <div className="grid overflow-hidden rounded-3xl bg-navy-950 text-white shadow-[0_20px_60px_rgba(10,27,61,0.12)] md:grid-cols-[0.8fr_1.2fr]">
          <ImageReveal src={images.meeting} alt="Infynex team working with a client" className="h-52 md:h-full md:min-h-56" direction="left" />
          <div className="flex flex-col justify-center px-7 py-8 md:px-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-teal-300">Here to help</p>
            <h3 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">Simple support, whenever you need it.</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">Please tell us what you need. Our team will listen, explain the options clearly and help you at every step.</p>
          </div>
        </div>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group min-h-48 rounded-2xl border border-navy-800/10 bg-white p-6 shadow-[0_16px_50px_rgba(10,27,61,0.06)]"
              data-cursor="hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 transition-transform duration-500 group-hover:-translate-y-1"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{r.text}</p>
            </motion.li>
            )
          })}
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
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animation = trackRef.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 24000, iterations: Infinity, easing: 'linear' },
    )
    return () => animation?.cancel()
  }, [])

  return (
    <section className="relative overflow-hidden bg-ivory-100 py-16 text-navy-950 md:py-20">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-50" />
      <div className="container-x relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="eyebrow text-teal-600">Selected clients</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">Business is built<br />on relationships.</h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-ink-600 md:justify-self-end">Meet some of the clients Infynex has worked with.</p>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1 ? 'true' : undefined}>
              {[...clients, ...clients].map((c, i) => (
                <div key={`${copy}-${c.name}-${i}`} className="flex h-28 min-w-[17rem] items-center justify-center rounded-2xl border border-navy-800/10 bg-white px-4 shadow-sm">
                  {c.logo ? <img src={c.logo} alt={`${c.name} logo`} className="h-20 w-[15rem] object-contain" /> : <span className="font-display text-xl font-semibold tracking-tight">{c.name}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-x relative mt-8 flex flex-col gap-5 border-t border-navy-800/10 pt-7 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/about" className="inline-flex shrink-0 items-center gap-2 font-display font-semibold text-navy-950">View client stories <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
  )
}

const blogColours = ['#e65a47', '#8156d9', '#d69a10', '#158f77', '#3976d9', '#d4478a']

/** Compact, continuously moving insights slideshow. */
export function BlogPreview() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animation = trackRef.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 36000, iterations: Infinity, easing: 'linear' },
    )
    return () => animation?.cancel()
  }, [])

  return (
    <section className="relative overflow-hidden bg-navy-950 py-12 text-white md:py-16">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-30" />
      <div className="container-x relative flex items-end justify-between gap-6">
        <SectionHeading className="[&_.eyebrow]:!text-sm md:[&_.eyebrow]:!text-base" eyebrow="Our Blogs & News" title="Useful tips for your business." dark size="md" />
        <Link to="/blog" className="hidden items-center gap-2 font-display text-sm font-semibold text-teal-300 sm:inline-flex">All articles <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 ? 'true' : undefined}>
              {posts.map((post, i) => (
                <Link key={`${copy}-${post.slug}`} to={`/blog/${post.slug}`} className="group grid w-[20rem] shrink-0 grid-cols-[6.5rem_1fr] overflow-hidden rounded-2xl bg-white text-navy-950 shadow-xl sm:w-[24rem] sm:grid-cols-[8rem_1fr]">
                  <img src={post.image} alt="" className="h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="flex min-w-0 flex-col p-5">
                    <span className="w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white" style={{ backgroundColor: blogColours[i % blogColours.length] }}>{post.category}</span>
                    <h3 className="mt-4 line-clamp-3 font-display text-lg font-semibold leading-tight">{post.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold" style={{ color: blogColours[i % blogColours.length] }}>Read article <ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container-x relative mt-7 sm:hidden"><Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300">All articles <ArrowUpRight className="h-4 w-4" /></Link></div>
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
