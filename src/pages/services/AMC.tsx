import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, AlertTriangle, ClipboardList, Repeat } from 'lucide-react'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import FeatureList from '../../components/ui/FeatureList'
import CapabilityGrid from '../../components/ui/CapabilityGrid'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import ScanOverlay from '../../components/visuals/ScanOverlay'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'

const s = getService('amc')!

/**
 * AMC — maintenance narrative. Distinct treatment: technical "scanning" overlays
 * on photography, an offset hero, a sticky vertical timeline and an interactive
 * reactive‑vs‑planned comparison.
 */
export default function AMC() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  const [mode, setMode] = useState<'reactive' | 'planned'>('planned')

  return (
    <>
      <ServiceHero service={s} layout="offset" visual={<ScanOverlay className="hidden md:block" />} />

      {/* Overview */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative">
            <ParallaxImage src={s.gallery[0]} alt="Technician servicing IT equipment" className="aspect-[4/5] rounded-[2rem]" reveal="left" />
            <ScanOverlay labels={['RACK 02', 'UPS · OK', 'SWITCH · OK', 'AIRFLOW']} className="hidden lg:block" color="#1a9dc3" />
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 1, ease: EASE, delay: 0.4 }}
              className="absolute -bottom-8 -right-6 hidden w-[46%] md:block">
              <ImageReveal src={s.gallery[1]} alt="Server rack cabling" className="aspect-[4/3] rounded-3xl border-4 border-ivory-50 shadow-2xl" direction="right" />
            </motion.div>
          </div>
          <div>
            <SectionHeading eyebrow="Service overview" title="Maintenance you can plan around, not react to." text={s.overview} />
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10 grid grid-cols-2 gap-4">
              {[{ icon: CalendarCheck, t: 'Scheduled visits' }, { icon: ClipboardList, t: 'Service reports' }, { icon: Repeat, t: 'Full-term coverage' }, { icon: AlertTriangle, t: 'Fault attendance' }].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 rounded-2xl border border-navy-800/10 bg-white p-4" data-cursor="hover">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white"><Icon className="h-4 w-4" /></span>
                  <span className="font-display text-sm font-semibold text-navy-900">{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What AMC covers */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading dark eyebrow="What AMC covers" title="One contract across your equipment estate." text="Coverage is defined per site during the audit. The categories below are typically included; scope is written into the agreement so there is no ambiguity about what is covered." />
          </div>
          <div>
            <FeatureList items={s.highlights} dark columns={2} accent={s.accent} />
            <div className="mt-8">
              <ParallaxImage src={s.gallery[2]} alt="Workstation environment" className="aspect-[16/9] rounded-3xl" reveal="up" strength={50} />
            </div>
          </div>
        </div>
      </section>

      {/* Service capabilities */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="Service capabilities" title="Preventive, corrective and documented." align="center" />
        <div className="mt-14">
          <CapabilityGrid items={s.capabilities} accent={s.accent} layout="row" />
        </div>
      </section>

      {/* Maintenance approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Maintenance approach" title="How an AMC engagement runs." />
            <div className="mt-12">
              <ProcessTimeline steps={s.process} orientation="vertical" accent={s.accent} />
            </div>
          </div>
          <div className="relative">
            <ParallaxImage src={s.hero} alt="Engineer with equipment" className="aspect-[4/5] rounded-[2rem]" reveal="right" strength={100} />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 backdrop-blur">
              <p className="eyebrow text-teal-600">After every visit</p>
              <p className="mt-1 font-display text-sm font-semibold text-navy-900">A service report records what was checked, what was fixed and what needs attention next.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AMC matters — interactive comparison */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Why AMC matters" title="Compare reactive and planned maintenance." />
          <div className="flex rounded-full border-2 border-teal-500/35 bg-white p-1.5 shadow-[0_10px_30px_rgba(26,157,195,.16)]">
            {(['reactive', 'planned'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`relative isolate overflow-hidden rounded-full px-7 py-3 font-display text-sm font-bold capitalize transition-colors ${mode === m ? 'text-white' : 'text-navy-900'}`}>
                {mode === m && <motion.span layoutId="amc-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-teal-600 to-[#526ee8]" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                {m}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE }}
            className={`mt-12 grid gap-6 rounded-[2rem] p-8 md:grid-cols-3 md:p-12 ${mode === 'planned' ? 'bg-navy-900 text-white' : 'bg-ivory-100 text-navy-900'}`}>
            {(mode === 'planned'
              ? [['Scheduled inspections', 'Issues are found on a calendar, not when a user reports them.'], ['Known costs', 'One agreement covers the term, so budgeting is predictable.'], ['Records', 'Every visit and repair is documented against the asset.']]
              : [['Unplanned downtime', 'Work stops until someone is available to attend.'], ['Unpredictable spend', 'Each call-out and part is a separate, unbudgeted cost.'], ['No history', 'Nobody has a record of what was done to which machine.']]
            ).map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className={`rounded-2xl p-6 ${mode === 'planned' ? 'bg-white/[0.06]' : 'bg-white'}`}>
                <span className="font-display text-xs tracking-[0.3em] opacity-50">0{i + 1}</span>
                <h4 className="mt-2 font-display text-xl font-semibold">{t}</h4>
                <p className={`mt-2 ${mode === 'planned' ? 'text-white/65' : 'text-ink-600'}`}>{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <CTASection title="Put your equipment under one maintenance contract." text="Share a list of sites and equipment and we will propose AMC coverage and visit frequency." image={s.gallery[1]} />
    </>
  )
}
