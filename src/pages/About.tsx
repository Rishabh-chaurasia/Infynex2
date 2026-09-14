import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '../components/ui/AnimatedText'
import SectionHeading from '../components/ui/SectionHeading'
import ImageReveal from '../components/ui/ImageReveal'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import CTASection from '../components/ui/CTASection'
import { images } from '../data/images'
import { site } from '../data/site'
import { EASE, fadeUp, viewportOnce } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'
import { useMotionLevel } from '../hooks/useMedia'

const values = [
  { title: 'Responsibility', text: 'One team takes responsibility for the service.' },
  { title: 'Clear records', text: 'You receive a simple report of the work we complete.' },
  { title: 'Practical advice', text: 'We suggest options that fit your needs and budget.' },
  { title: 'Good support', text: 'Every customer receives helpful and respectful service.' },
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
      <section ref={heroRef} className="relative min-h-[82svh] overflow-hidden bg-ivory-50">
        <div aria-hidden className="absolute inset-0 grid-lines" />
        <div className="container-x relative grid min-h-[82svh] items-center gap-8 pb-10 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:pt-28">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-600">
              <span className="h-px w-10 bg-teal-500" /> About {site.shortName}
            </motion.p>
            <motion.h1 style={{ scale: titleScale, opacity: fade }} className="origin-left font-display text-[3rem] font-semibold leading-[0.98] text-navy-900 sm:text-6xl lg:text-[5.4rem]">
              <AnimatedText text="Here to help" trigger="mount" delay={0.4} /><br />
              <AnimatedText text="your business" trigger="mount" delay={0.55} /><br />
              <span className="text-teal-600"><AnimatedText text="with care." trigger="mount" delay={0.7} /></span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: EASE }} className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-600">
              Please tell us what you need. Our team will listen carefully and make the process simple for you.
            </motion.p>
          </div>
          <div className="relative min-h-[390px] sm:min-h-[460px]">
            <motion.div style={{ x: leftX, y: imgY }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.2, ease: EASE }} className="absolute left-0 top-4 w-[72%]">
              <ImageReveal src={images.aboutHeroTeam} alt="Indian technology leadership team in discussion" className="aspect-[4/3] rounded-3xl shadow-2xl" direction="left" delay={0.6} />
            </motion.div>
            <motion.div style={{ x: rightX }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1.2, ease: EASE }} className="absolute bottom-0 right-0 w-[58%]">
              <ImageReveal src={images.aboutHeroService} alt="Indian infrastructure engineers in a server room" className="aspect-[3/4] rounded-3xl border-4 border-white shadow-2xl" direction="up" delay={0.8} />
            </motion.div>
          </div>
        </div>
        <ScrollIndicator dark={false} />
      </section>

      {/* Manifesto */}
      <section className="relative overflow-hidden bg-navy-950 pb-0 pt-20 text-white md:pb-0 md:pt-24">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x relative">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="eyebrow inline-flex rounded-full bg-teal-500 px-4 py-2 font-bold text-white">What we believe</motion.p>
          <AnimatedText as="h2" text="We make everyday business services simple and easy to manage." className="mt-6 max-w-5xl font-display text-3xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl" stagger={0.03} />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              'Our team can manage several services and make coordination easier for you.',
              'We are available remotely and can also visit your site whenever needed.',
              'We share simple updates so you always understand the work completed.',
            ].map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: EASE }} className="border-t border-white/15 pt-6 text-white/70">{t}</motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x pb-14 pt-10 md:pb-16 md:pt-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <SectionHeading eyebrow="How we work" title="Four simple promises to every customer." size="md" />
            <div className="mt-6"><ImageReveal src={images.aboutPrinciples} alt="Indian engineers planning an infrastructure deployment" className="aspect-[16/10] rounded-3xl" direction="left" /></div>
            <div className="mt-4 rounded-2xl bg-navy-900 p-5 text-white"><p className="font-display text-xl font-semibold">People-led service</p><p className="mt-2 text-sm text-white/70">Real people listen, explain and stay responsible for the support you receive.</p></div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.li key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.7, ease: EASE }} className="group rounded-2xl border border-navy-800/10 bg-ivory-50 p-6" data-cursor="hover">
                <span className="font-display text-3xl font-light text-teal-500">0{i + 1}</span>
                <div><h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{v.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-16 text-white md:py-20">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x relative grid items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
          <ImageReveal src={images.aboutLeadership} alt="Infynex engineers working with a customer" className="aspect-[16/10] rounded-3xl" direction="left" />
          <div>
            <p className="eyebrow text-teal-300">Led by engineers</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">Technical knowledge with a human approach.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">Our engineers stay close to the work and explain every step in simple language. We listen first, suggest practical options and remain available after delivery.</p>
          </div>
        </div>
      </section>

      <CTASection title="Reliable support, delivered with care." text="Share your requirements and we will explain the next steps clearly." image={images.aboutCta} compact />
    </>
  )
}
