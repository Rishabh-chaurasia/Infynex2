import { motion } from 'framer-motion'
import { PhoneIncoming, PhoneOutgoing, FileText, BarChart3 } from 'lucide-react'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import FeatureList from '../../components/ui/FeatureList'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

const s = getService('tele-services')!

/** Concentric signal rings + waveform, used over the hero photo. */
function SignalWaves() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[30%] top-[38%]">
        {[0, 1, 2, 3].map((i) => (
          <motion.span key={i} className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-teal-300/60"
            animate={reduced ? {} : { scale: [1, 14], opacity: [0.7, 0] }} transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: 'easeOut' }} />
        ))}
      </div>
      <svg className="absolute bottom-0 left-0 h-40 w-full opacity-70" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <motion.path d="M0 80 Q 50 20 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80 T 900 80 T 1000 80 T 1100 80 T 1200 80" fill="none" stroke="#6fd3ee" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.8 }} />
        <motion.path d="M0 80 Q 50 140 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80 T 900 80 T 1000 80 T 1100 80 T 1200 80" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1.2 }} />
      </svg>
    </div>
  )
}

/** Communication workflow: nodes across a path, with pulses travelling between them. */
function Workflow() {
  const steps = [
    { icon: PhoneIncoming, label: 'Customer contact', text: 'Inbound call or scheduled outbound call.' },
    { icon: FileText, label: 'Script & process', text: 'Agent follows the flow agreed with you.' },
    { icon: PhoneOutgoing, label: 'Action & follow-up', text: 'Outcome recorded; follow-ups scheduled.' },
    { icon: BarChart3, label: 'Reporting', text: 'Activity and outcomes shared regularly.' },
  ]
  return (
    <div className="relative">
      <svg className="absolute inset-x-0 top-10 hidden h-2 w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
        <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#1a9dc3" strokeWidth="0.3" strokeDasharray="1 1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-9 hidden h-4 md:block" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="absolute top-1 h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_12px_#2ab7dd]"
            animate={{ left: ['2%', '98%'], opacity: [0, 1, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 1.7, ease: 'easeInOut' }} />
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((st, i) => {
          const Icon = st.icon
          return (
            <motion.div key={st.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.15, duration: 0.9, ease: EASE }} className="relative">
              <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-navy-900 shadow-[0_20px_50px_-20px_rgba(11,21,51,0.3)] ring-1 ring-navy-800/10">
                <Icon className="h-7 w-7" />
                <span className="absolute inset-0 rounded-3xl ring-2 ring-teal-400/40 animate-pulse-ring" style={{ animationDelay: `${i * 0.6}s` }} />
              </span>
              <h4 className="mt-6 font-display text-lg font-semibold text-navy-900">{st.label}</h4>
              <p className="mt-2 text-sm text-ink-600">{st.text}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Tele Services — communication story with signal waves, a rounded card
 * cluster overview and a pulse-driven workflow.
 */
export default function TeleServices() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  return (
    <>
      <ServiceHero service={s} layout="full" visual={<SignalWaves />} />

      {/* Overview — image cluster */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Overview" title="Your customers, spoken to consistently." text={s.overview} />
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 rounded-2xl border-l-4 border-teal-500 bg-ivory-100 p-5 text-ink-600">
              Scripts, tone and escalation paths are agreed with you before the first call. Nothing is said to your customers that you have not approved.
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageReveal src={s.gallery[0]} alt="Support agent with headset" className="col-span-2 aspect-[16/9] rounded-3xl" direction="left" />
            <ImageReveal src={s.gallery[1]} alt="Support team" className="aspect-square rounded-3xl" direction="up" delay={0.15} />
            <ImageReveal src={s.gallery[2]} alt="Telecom antenna" className="aspect-square rounded-3xl" direction="up" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x">
          <SectionHeading dark eyebrow="Capabilities" title="Inbound, outbound and everything in between." align="center" />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {s.capabilities.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 40, rotateY: -15 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:bg-white/[0.08]" data-cursor="hover">
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-500/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                <span className="font-display text-xs tracking-[0.3em] text-teal-300">0{i + 1}</span>
                <h4 className="mt-3 font-display text-xl font-semibold">{c.title}</h4>
                <p className="mt-2 text-sm text-white/65">{c.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><FeatureList items={s.highlights} dark columns={3} accent={s.accent} /></div>
        </div>
      </section>

      {/* Communication workflow */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="Communication workflow" title="From first ring to reported outcome." />
        <div className="mt-16"><Workflow /></div>
      </section>

      {/* Service approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <ParallaxImage src={s.gallery[1]} alt="Communication team" className="aspect-[4/3] rounded-[2rem]" reveal="left" strength={60} />
          <div>
            <SectionHeading eyebrow="Service approach" title="Set up once, improved continuously." />
            <div className="mt-12"><ProcessTimeline steps={s.process} orientation="vertical" accent={s.accent} /></div>
          </div>
        </div>
      </section>

      <CTASection title="Outsource your customer calling with confidence." text="Tell us about your customers and call volumes; we will propose a team and process." image={s.gallery[0]} />
    </>
  )
}
