import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, HardDrive, Network, Shield } from 'lucide-react';
import ServiceHero from '../../components/ui/ServiceHero';
import SectionHeading from '../../components/ui/SectionHeading';
import ParallaxImage from '../../components/ui/ParallaxImage';
import ImageReveal from '../../components/ui/ImageReveal';
import FeatureList from '../../components/ui/FeatureList';
import CapabilityGrid from '../../components/ui/CapabilityGrid';
import ProcessTimeline from '../../components/ui/ProcessTimeline';
import CTASection from '../../components/ui/CTASection';
import { getService } from '../../data/services';
import { EASE, fadeUp, viewportOnce } from '../../utils/motion';
import usePageTitle from '../../hooks/usePageTitle';
import { useIsDesktop } from '../../hooks/useMedia';
const s = getService('cloud-server');
const planes = [
    { icon: Shield, name: 'Security & access', text: 'Identity, firewalls and hardened access to every environment.' },
    { icon: Network, name: 'Network', text: 'Virtual networks, load balancing and connectivity to your sites.' },
    { icon: Cpu, name: 'Compute', text: 'Right-sized virtual servers for applications and services.' },
    { icon: HardDrive, name: 'Storage & backup', text: 'Block and object storage with scheduled backups.' },
];
/** Data streams flowing upward through the hero image — cloud "activity". */
function DataStreams() {
    return (<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (<motion.span key={i} className="absolute bottom-0 w-px bg-gradient-to-t from-teal-300/0 via-teal-300/80 to-teal-300/0" style={{ left: `${6 + i * 6.5}%`, height: `${30 + (i % 4) * 15}%` }} animate={{ y: ['110%', '-110%'] }} transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: 'linear', delay: (i * 0.7) % 4 }}/>))}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"/>
    </div>);
}
/**
 * Scroll-controlled 3D stack: four translucent planes separate in depth as the
 * user scrolls through the pinned section, each lighting up with its label.
 */
function CloudStack() {
    const ref = useRef(null);
    const desktop = useIsDesktop();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
    const spread = useTransform(p, [0, 1], [0, 1]);
    const rotX = useTransform(p, [0, 1], [55, 62]);
    if (!desktop) {
        return (<section className="bg-navy-950 py-24 text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Infrastructure" title="Four planes, one environment."/>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {planes.map((pl, i) => {
                const Icon = pl.icon;
                return (<motion.div key={pl.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="h-5 w-5 text-teal-300"/>
                  <h4 className="mt-3 font-display font-semibold">{pl.name}</h4>
                  <p className="mt-1 text-sm text-white/60">{pl.text}</p>
                </motion.div>);
            })}
          </div>
        </div>
      </section>);
    }
    return (<section ref={ref} className="relative h-[300dvh] bg-navy-950 text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40"/>
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/15 blur-[160px]"/>
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Infrastructure" title="Four planes, one environment." text="Scroll to separate the layers. Each is provisioned and managed together so that security, networking, compute and storage stay consistent."/>
            <ul className="mt-10 space-y-3">
              {planes.map((pl, i) => {
            const Icon = pl.icon;
            return (<PlaneRow key={pl.name} icon={Icon} name={pl.name} text={pl.text} index={i} progress={spread}/>);
        })}
            </ul>
          </div>
          <div className="perspective relative h-[32rem]">
            <motion.div style={{ rotateX: rotX, rotateZ: -20, transformStyle: 'preserve-3d' }} className="absolute inset-0 flex items-center justify-center">
              {planes.map((pl, i) => (<Plane key={pl.name} index={i} progress={spread} label={pl.name}/>))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>);
}
function PlaneRow({ icon: Icon, name, text, index, progress }) {
    const start = index * 0.22;
    const opacity = useTransform(progress, [start, start + 0.2], [0.35, 1]);
    const x = useTransform(progress, [start, start + 0.2], [-10, 0]);
    return (<motion.li style={{ opacity, x }} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300"><Icon className="h-4 w-4"/></span>
      <span><span className="block font-display font-semibold">{name}</span><span className="block text-sm text-white/60">{text}</span></span>
    </motion.li>);
}
function Plane({ index, progress, label }) {
    const z = useTransform(progress, [0, 1], [index * 6, index * 90 - 130]);
    const opacity = useTransform(progress, [0, 0.15], [0.5, 1]);
    return (<motion.div style={{ translateZ: z, opacity }} className="cloud-plane absolute h-64 w-80 rounded-2xl border-2 border-teal-500 bg-white/90 backdrop-blur-sm shadow-[0_18px_60px_-18px_rgba(26,157,195,0.5)]">
      <div className="absolute inset-0 grid-lines-dark opacity-60 rounded-2xl"/>
      <span className="absolute left-4 top-3 font-display text-xs font-bold tracking-[0.2em] text-teal-700">{label.toUpperCase()}</span>
      {Array.from({ length: 6 }, (_, i) => (<motion.span key={i} className="absolute h-2 w-2 rounded-full bg-teal-600" style={{ left: `${15 + i * 13}%`, top: `${30 + (i % 3) * 20}%` }} animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: index * 0.2 + i * 0.15 }}/>))}
    </motion.div>);
}
/**
 * Cloud Server — layered depth. Split hero with data streams, a pinned
 * scroll-controlled 3D plane stack, and a full-width parallax band.
 */
export default function CloudServer() {
    usePageTitle(`${s.title} — Infynex Technologies`);
    return (<>
      <ServiceHero service={s} layout="split" visual={<DataStreams />}/>

      {/* Overview */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Cloud server overview" title="Move the workload. Keep the control." text={s.overview}/>
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10">
              <FeatureList items={s.highlights} columns={2} accent={s.accent}/>
            </motion.div>
          </div>
          <div className="relative">
            <ParallaxImage src={s.gallery[0]} alt="Data centre racks" className="aspect-[4/5] rounded-[2rem]" reveal="right" strength={80}/>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="absolute -left-6 bottom-10 hidden w-[48%] md:block">
              <ImageReveal src={s.gallery[2]} alt="Configuration code" className="aspect-[4/3] rounded-3xl border-4 border-ivory-50 shadow-2xl" direction="up" delay={0.3}/>
            </motion.div>
          </div>
        </div>
      </section>

      <CloudStack />

      {/* Capabilities */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="What we take care of." align="center"/>
          <div className="mt-14"><CapabilityGrid items={s.capabilities} accent={s.accent} layout="row"/></div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Support approach" title="Discover, plan, migrate, manage."/>
          <div className="mt-16"><ProcessTimeline steps={s.process} accent={s.accent}/></div>
        </div>
      </section>

      <CTASection title="A clear path to reliable cloud services." text="Share your current setup and we will outline a simple migration and management approach." image={s.gallery[0]}/>
    </>);
}
