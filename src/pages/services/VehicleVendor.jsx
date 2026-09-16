import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, CalendarClock, Users, Receipt } from 'lucide-react';
import ServiceHero from '../../components/ui/ServiceHero';
import SectionHeading from '../../components/ui/SectionHeading';
import ParallaxImage from '../../components/ui/ParallaxImage';
import ImageReveal from '../../components/ui/ImageReveal';
import FeatureList from '../../components/ui/FeatureList';
import TiltCard from '../../components/ui/TiltCard';
import ProcessTimeline from '../../components/ui/ProcessTimeline';
import CTASection from '../../components/ui/CTASection';
import { getService } from '../../data/services';
import { EASE, fadeUp, viewportOnce } from '../../utils/motion';
import usePageTitle from '../../hooks/usePageTitle';
import { useMotionLevel } from '../../hooks/useMedia';
const s = getService('vehicle-vendor');
/** Route lines drawing across the hero with a moving marker. */
function RouteLines() {
    const path = 'M -50 420 C 150 300, 250 480, 450 360 S 700 200, 900 300 S 1200 420, 1500 280';
    return (<svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <motion.path d={path} fill="none" stroke="#6fd3ee" strokeWidth="2" strokeDasharray="8 10" strokeOpacity="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}/>
      <motion.circle r="7" fill="#ffffff" stroke="#6fd3ee" strokeWidth="3" style={{ offsetPath: `path("${path}")` }} animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 1 }}/>
      {[[450, 360], [900, 300]].map(([x, y], i) => (<g key={i}>
          <motion.circle cx={x} cy={y} r="6" fill="#6fd3ee" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + i * 0.5, type: 'spring' }} style={{ transformOrigin: `${x}px ${y}px` }}/>
          <motion.circle cx={x} cy={y} r="6" fill="none" stroke="#6fd3ee" animate={{ scale: [1, 4.5], opacity: [0.8, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2 }} style={{ transformOrigin: `${x}px ${y}px` }}/>
        </g>))}
    </svg>);
}
/** Location-inspired stat-free "trip card" that tilts and shows a route. */
function TripCard({ from, to, when, i }) {
    return (<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }}>
      <TiltCard max={8} className="rounded-3xl border border-navy-800/10 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,21,51,0.35)]">
        <div className="flex items-center justify-between text-xs text-ink-400"><span className="eyebrow text-[0.6rem] text-teal-600">{when}</span><span>Trip {String(i + 1).padStart(2, '0')}</span></div>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex flex-col items-center gap-1"><span className="h-3 w-3 rounded-full border-2 border-navy-900"/><span className="h-10 w-px border-l border-dashed border-navy-900/40"/><MapPin className="h-4 w-4 text-teal-600"/></div>
          <div className="flex-1 space-y-6">
            <p className="font-display font-semibold text-navy-900">{from}</p>
            <p className="font-display font-semibold text-navy-900">{to}</p>
          </div>
        </div>
        <svg className="mt-4 h-10 w-full" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden>
          <motion.path d="M0 30 C 40 30, 60 10, 100 12 S 160 30, 200 10" fill="none" stroke="#1a9dc3" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 + i * 0.1 }}/>
        </svg>
      </TiltCard>
    </motion.div>);
}
/**
 * Vehicle Automation — movement narrative. Full hero with drawn route lines,
 * a horizontal-drift image band, tilt trip cards, and a vendor approach timeline.
 */
export default function VehicleVendor() {
    usePageTitle(`${s.title} — Infynex Technologies`);
    const ref = useRef(null);
    const level = useMotionLevel();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const driftL = useTransform(scrollYProgress, [0, 1], [-120 * level, 120 * level]);
    const driftR = useTransform(scrollYProgress, [0, 1], [120 * level, -120 * level]);
    return (<>
      <ServiceHero service={s} layout="full" visual={<RouteLines />}/>

      {/* Overview */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Overview" title="Business movement, handled." text={s.overview}/>
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10 grid grid-cols-2 gap-4">
              {[{ icon: CalendarClock, t: 'Scheduled & on-demand' }, { icon: Users, t: 'Staff & visitor transport' }, { icon: MapPin, t: 'Route coordination' }, { icon: Receipt, t: 'Trip records & billing' }].map(({ icon: Icon, t }) => (<div key={t} className="flex items-center gap-3 rounded-2xl border border-navy-800/10 bg-white p-4" data-cursor="hover">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white"><Icon className="h-4 w-4"/></span>
                  <span className="font-display text-sm font-semibold text-navy-900">{t}</span>
                </div>))}
            </motion.div>
          </div>
          <ParallaxImage src={s.gallery[0]} alt="Professional vehicle" className="aspect-[4/3] rounded-[2rem]" reveal="right" strength={70}/>
        </div>
      </section>

      {/* Moving image band */}
      <section ref={ref} className="overflow-hidden bg-navy-950 py-16 text-white">
        <motion.div style={{ x: driftL }} className="flex gap-6 pl-6">
          {[s.gallery[1], s.gallery[2], s.gallery[0], s.gallery[1]].map((img, i) => (<div key={i} className="w-[60vw] shrink-0 md:w-[32vw]"><ImageReveal src={img} alt="" className="aspect-[16/10] rounded-3xl" direction={i % 2 ? 'left' : 'right'} hoverZoom={false}/></div>))}
        </motion.div>
        <motion.div style={{ x: driftR }} className="mt-6 flex items-center gap-10 whitespace-nowrap font-display text-5xl font-semibold text-white/15 md:text-7xl">
          {['Employee transport', 'Visitor movement', 'Event logistics', 'Scheduled routes', 'Employee transport', 'Visitor movement'].map((t, i) => <span key={i}>{t}<span className="mx-6 text-teal-400/60">·</span></span>)}
        </motion.div>
      </section>

      {/* Service capability */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="Service capability" title="From the daily shift run to the one-off event."/>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <TripCard from="Head office" to="Client site" when="Scheduled · Weekday" i={0}/>
          <TripCard from="Airport" to="Guest house" when="On-demand · Visitor" i={1}/>
          <TripCard from="Office" to="Event venue" when="Event · Group" i={2}/>
        </div>
        <div className="mt-12"><FeatureList items={s.highlights} columns={3} accent={s.accent}/></div>
      </section>

      {/* Automation approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Automation approach" title="Requirement, plan, operate, review."/>
            <div className="mt-12"><ProcessTimeline steps={s.process} orientation="vertical" accent={s.accent}/></div>
          </div>
          <ParallaxImage src={s.gallery[1]} alt="Road" className="aspect-[4/5] rounded-[2rem]" reveal="right" strength={90}/>
        </div>
      </section>

      <CTASection title="Reliable transport, organised around your schedule." text="Share your routes, timings and vehicle requirements and we will propose a suitable plan." image={s.gallery[2]}/>
    </>);
}
