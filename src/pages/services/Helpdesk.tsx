import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, Globe, CheckCircle2, ArrowRight } from 'lucide-react'
import ServiceHero from '../../components/ui/ServiceHero'
import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/ui/ParallaxImage'
import ImageReveal from '../../components/ui/ImageReveal'
import FeatureList from '../../components/ui/FeatureList'
import CapabilityGrid from '../../components/ui/CapabilityGrid'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import CTASection from '../../components/ui/CTASection'
import { getService } from '../../data/services'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'
import usePageTitle from '../../hooks/usePageTitle'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

const s = getService('helpdesk')!

const sampleTickets = [
  { id: 'HD-1042', title: 'Cannot connect to shared printer', cat: 'Peripheral', via: 'Phone' },
  { id: 'HD-1043', title: 'New starter account setup', cat: 'Access', via: 'Email' },
  { id: 'HD-1044', title: 'Laptop very slow after update', cat: 'Device', via: 'Portal' },
  { id: 'HD-1045', title: 'VPN drops every few minutes', cat: 'Network', via: 'Phone' },
  { id: 'HD-1046', title: 'Email signature not applying', cat: 'Software', via: 'Portal' },
]
const columns = ['Logged', 'Triaged', 'In progress', 'Resolved']

/**
 * Animated ticket board: tickets appear in "Logged" and move across columns
 * on a timer, with notification toasts sliding in. Purely illustrative UI.
 */
function TicketBoard() {
  const reduced = usePrefersReducedMotion()
  const [tickets, setTickets] = useState(sampleTickets.map((t, i) => ({ ...t, col: i % 4 })))
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (reduced) return
    let i = 0
    const id = setInterval(() => {
      setTickets((ts) => {
        const idx = i % ts.length
        i++
        const next = ts.map((t, j) => (j === idx ? { ...t, col: (t.col + 1) % 4 } : t))
        const moved = next[idx]
        setToast(moved.col === 3 ? `${moved.id} resolved` : `${moved.id} → ${columns[moved.col]}`)
        return next
      })
    }, 2200)
    return () => clearInterval(id)
  }, [reduced])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="relative rounded-[2rem] border border-navy-800/10 bg-white p-4 shadow-[0_40px_100px_-40px_rgba(11,21,51,0.3)] md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
        <span className="eyebrow text-[0.6rem] text-ink-400">Ticket board · illustrative</span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {columns.map((c, ci) => (
          <div key={c} className="min-h-[14rem] rounded-2xl bg-ivory-100 p-3">
            <p className="mb-3 flex items-center justify-between font-display text-xs font-semibold text-navy-900">{c}<span className="rounded-full bg-white px-2 py-0.5 text-[0.65rem] text-ink-400">{tickets.filter((t) => t.col === ci).length}</span></p>
            <div className="space-y-2">
              <AnimatePresence>
                {tickets.filter((t) => t.col === ci).map((t) => (
                  <motion.div key={t.id} layout layoutId={t.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={`rounded-xl border p-3 text-xs ${ci === 3 ? 'border-green-200 bg-green-50' : 'border-navy-800/10 bg-white'}`}>
                    <div className="flex items-center justify-between font-display font-semibold text-navy-900"><span>{t.id}</span>{ci === 3 && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}</div>
                    <p className="mt-1 text-ink-600">{t.title}</p>
                    <div className="mt-2 flex gap-1"><span className="rounded bg-ivory-200 px-1.5 py-0.5 text-[0.6rem]">{t.cat}</span><span className="rounded bg-ivory-200 px-1.5 py-0.5 text-[0.6rem]">{t.via}</span></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-white shadow-lg">
            <span className="h-2 w-2 rounded-full bg-teal-300" />{toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Intake channels converge into the helpdesk via animated lines. */
function IntakeVisual() {
  const ch = [{ icon: Phone, l: 'Phone' }, { icon: Mail, l: 'Email' }, { icon: Globe, l: 'Portal' }]
  return (
    <div className="relative flex items-center justify-between gap-4 md:gap-10">
      <div className="flex flex-col gap-4">
        {ch.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div key={c.l} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.15, duration: 0.8, ease: EASE }} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
              <Icon className="h-4 w-4 text-teal-300" /><span className="font-display text-sm font-semibold">{c.l}</span>
            </motion.div>
          )
        })}
      </div>
      <svg className="h-40 flex-1" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden>
        {[30, 80, 130].map((y, i) => (
          <g key={y}>
            <motion.path d={`M0 ${y} C 100 ${y}, 100 80, 200 80`} fill="none" stroke="#6fd3ee" strokeOpacity="0.4" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.2 }} />
            <motion.circle r="3" fill="#6fd3ee" animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] }} style={{ offsetPath: `path("M0 ${y} C 100 ${y}, 100 80, 200 80")` }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />
          </g>
        ))}
      </svg>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ delay: 0.6, duration: 0.8, ease: EASE }} className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl bg-teal-500 text-center text-white shadow-[0_0_60px_-10px_#2ab7dd]">
        <span className="font-display text-sm font-semibold">Helpdesk</span><span className="text-[0.65rem] text-white/80">single queue</span>
      </motion.div>
    </div>
  )
}

/**
 * Helpdesk — support UI narrative. Split hero, an animated ticket board,
 * an intake-convergence diagram and a horizontal workflow.
 */
export default function Helpdesk() {
  usePageTitle(`${s.title} — Infynex Technologies`)
  return (
    <>
      <ServiceHero service={s} layout="split" />

      {/* Overview + board */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="Helpdesk overview" title="Every request logged, tracked and closed." text={s.overview} />
        <motion.div initial={{ opacity: 0, y: 60, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE }} className="perspective mt-14">
          <TicketBoard />
        </motion.div>
      </section>

      {/* Support workflow */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading dark eyebrow="Support workflow" title="Three channels, one queue." text="Users reach the helpdesk however suits them. Every contact becomes a ticket with the same fields, priority rules and escalation paths." />
            </div>
            <IntakeVisual />
          </div>
          <div className="mt-20"><ProcessTimeline steps={s.process} dark accent={s.accent} /></div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <ParallaxImage src={s.gallery[0]} alt="Support team" className="col-span-2 aspect-[16/9] rounded-3xl" reveal="left" strength={40} />
            <ImageReveal src={s.gallery[1]} alt="Support agent" className="aspect-square rounded-3xl" direction="up" delay={0.1} />
            <ImageReveal src={s.gallery[2]} alt="Headset on desk" className="aspect-square rounded-3xl" direction="up" delay={0.25} />
          </div>
          <div>
            <SectionHeading eyebrow="Capabilities" title="What the helpdesk handles." />
            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10"><FeatureList items={s.highlights} columns={1} accent={s.accent} /></motion.div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Service approach" title="Remote first, escalated when needed." />
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex items-center gap-2 text-sm text-ink-600">Pairs with on-site support <ArrowRight className="h-4 w-4" /></motion.p>
          </div>
          <div className="mt-14"><CapabilityGrid items={s.capabilities} accent={s.accent} layout="row" /></div>
        </div>
      </section>

      <CTASection title="Give your users one place to ask for help." text="Tell us your user count and typical requests; we will propose helpdesk coverage and escalation paths." image={s.gallery[0]} />
    </>
  )
}
