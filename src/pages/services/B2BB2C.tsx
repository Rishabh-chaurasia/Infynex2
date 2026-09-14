import { useState } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import { Building2, User, FileSignature, MapPinned, UserCog, Home, Smartphone, BadgeCheck } from 'lucide-react'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import SmartImage from '../../components/ui/SmartImage'
import TiltCard from '../../components/ui/TiltCard'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import { getService } from '../../data/services'
import { images } from '../../data/images'
import { EASE } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'

const s = getService('b2b-b2c')!

type Mode = 'b2b' | 'b2c'

const content: Record<Mode, {
  icon: typeof Building2; label: string; title: string; text: string; hero: string; gallery: string[];
  cards: { icon: typeof Building2; title: string; text: string }[]; services: string[]
}> = {
  b2b: {
    icon: Building2, label: 'B2B', title: 'For organisations',
    text: 'Structured, contract-based engagements for businesses that need a dependable partner across IT, facilities and energy. Scope, responsibilities and points of contact are agreed up front.',
    hero: images.b2bHero, gallery: [images.b2bMeeting, images.b2bOffice],
    cards: [
      { icon: FileSignature, title: 'Service agreements', text: 'Written scope and responsibilities for every engagement.' },
      { icon: MapPinned, title: 'Multi-site coverage', text: 'Consistent service across offices and facilities.' },
      { icon: UserCog, title: 'Account management', text: 'A named contact for planning, escalation and reviews.' },
    ],
    services: ['AMC', 'IT Infrastructure', 'Cloud Server', 'Helpdesk', 'On-site Support', 'Robotic Duct Cleaning', 'Solar', 'Vehicle Automation', 'Tele Services'],
  },
  b2c: {
    icon: User, label: 'B2C', title: 'For individuals',
    text: 'Accessible services for homes and personal needs — from device support to solar installations — delivered with the same care and documentation we bring to business clients.',
    hero: images.b2cHero, gallery: [images.b2cPeople, images.aboutLeadership],
    cards: [
      { icon: Home, title: 'Home installations', text: 'Solar, networking and equipment set up at home.' },
      { icon: Smartphone, title: 'Personal device support', text: 'Help with laptops, desktops and peripherals.' },
      { icon: BadgeCheck, title: 'Clear communication', text: 'Plain-language proposals and follow-up.' },
    ],
    services: ['Hardware', 'Technical Support', 'Solar', 'Helpdesk', 'Vehicle Services'],
  },
}

/**
 * B2B & B2C — interactive experience. A hero, then a persistent toggle that
 * transitions copy, imagery, cards and the section background between modes.
 */
export default function B2BB2C() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  const [mode, setMode] = useState<Mode>('b2b')
  const c = content[mode]
  const dark = mode === 'b2b'
  const Icon = c.icon

  return (
    <>
      <ServiceHero service={s} layout="split" />

      <LayoutGroup>
        <motion.section
          layout
          animate={{ backgroundColor: dark ? '#0b1533' : '#f4f6fa' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden py-24 md:py-32"
        >
          <motion.div aria-hidden animate={{ opacity: dark ? 0.4 : 0.7 }} className={`absolute inset-0 ${dark ? 'grid-lines-dark' : 'grid-lines'}`} />
          <motion.div aria-hidden animate={{ x: dark ? '-20%' : '60%', backgroundColor: dark ? 'rgba(26,157,195,0.25)' : 'rgba(245,181,68,0.25)' }} transition={{ duration: 1.2, ease: EASE }} className="absolute top-1/3 h-[30rem] w-[30rem] rounded-full blur-[140px]" />

          <div className="container-x relative">
            {/* Toggle */}
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading dark={dark} eyebrow="Choose your experience" title="Choose the support that fits you." />
              <div className={`relative flex rounded-full border p-1 ${dark ? 'border-white/15 bg-white/5' : 'border-navy-800/15 bg-white'}`} role="tablist" aria-label="Business or individual">
                {(['b2b', 'b2c'] as Mode[]).map((m) => {
                  const MIcon = content[m].icon
                  return (
                    <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
                      className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold transition-colors duration-300 ${mode === m ? (dark ? 'text-navy-950' : 'text-white') : dark ? 'text-white/70' : 'text-navy-900'}`}>
                      {mode === m && <motion.span layoutId="mode-pill" className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-teal-300' : 'bg-navy-900'}`} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                      <MIcon className="h-4 w-4" />{content[m].label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.55, ease: EASE }}>
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? 'bg-teal-500 text-white' : 'bg-navy-900 text-white'}`}><Icon className="h-6 w-6" /></span>
                  <h3 className={`mt-6 font-display text-4xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}`}>{c.title}</h3>
                  <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-600'}`}>{c.text}</p>
                  <p className={`eyebrow mt-8 ${dark ? 'text-teal-300' : 'text-teal-600'}`}>Typically includes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.services.map((sv, i) => (
                      <motion.li key={sv} initial={{ opacity: 0, scale: 0.8, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }} className={`rounded-full px-4 py-2 text-sm ${dark ? 'bg-white/10 text-white' : 'bg-white text-navy-900 ring-1 ring-navy-800/10'}`}>{sv}</motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div key={mode} initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.1 }} animate={{ clipPath: 'inset(0 0 0 0)', scale: 1 }} exit={{ clipPath: 'inset(0 100% 0 0)', scale: 0.98 }} transition={{ duration: 0.8, ease: EASE }} className="aspect-[4/3] overflow-hidden rounded-[2rem]">
                    <SmartImage src={c.hero} alt={c.title} className="h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={mode + '-sm'} initial={{ opacity: 0, y: 40, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className={`absolute -bottom-8 -left-6 hidden w-[42%] overflow-hidden rounded-3xl border-4 shadow-2xl md:block ${dark ? 'border-navy-900' : 'border-ivory-100'}`}>
                    <SmartImage src={c.gallery[1]} alt="" className="aspect-square h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Cards */}
            <div className="mt-20 grid gap-6 md:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {c.cards.map((card, i) => {
                  const CIcon = card.icon
                  return (
                    <motion.div key={mode + card.title} layout initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}>
                      <TiltCard max={7} className={`h-full rounded-3xl border p-7 ${dark ? 'border-white/10 bg-white/[0.05]' : 'border-navy-800/10 bg-white shadow-[0_30px_70px_-40px_rgba(11,21,51,0.3)]'}`}>
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${dark ? 'bg-teal-500/20 text-teal-300' : 'bg-navy-900 text-white'}`}><CIcon className="h-5 w-5" /></span>
                        <h4 className={`mt-5 font-display text-xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}`}>{card.title}</h4>
                        <p className={`mt-2 ${dark ? 'text-white/65' : 'text-ink-600'}`}>{card.text}</p>
                      </TiltCard>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </LayoutGroup>

      {/* Approach */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="How we engage" title="The same four steps, whoever you are." align="center" />
        <div className="mt-16"><ProcessTimeline steps={s.process} accent={s.accent} /></div>
      </section>

      <CTASection title="Business or individual — start with a conversation." text="Tell us who you are and what you need. We will respond with the right engagement model." image={images.b2bMeeting} />
    </>
  )
}

