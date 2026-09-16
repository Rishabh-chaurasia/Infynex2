import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Network, Printer, MemoryStick, Cable } from 'lucide-react';
import ServiceHero from '../../components/ui/ServiceHero';
import SectionHeading from '../../components/ui/SectionHeading';
import ParallaxImage from '../../components/ui/ParallaxImage';
import ImageReveal from '../../components/ui/ImageReveal';
import SmartImage from '../../components/ui/SmartImage';
import TiltCard from '../../components/ui/TiltCard';
import CapabilityGrid from '../../components/ui/CapabilityGrid';
import ProcessTimeline from '../../components/ui/ProcessTimeline';
import CTASection from '../../components/ui/CTASection';
import { getService } from '../../data/services';
import { EASE, fadeUp, viewportOnce } from '../../utils/motion';
import usePageTitle from '../../hooks/usePageTitle';
import { useMotionLevel } from '../../hooks/useMedia';
import { images } from '../../data/images';
const s = getService('hardware');
const categories = [
    { icon: Monitor, title: 'Desktops & laptops', text: 'User devices specified for the role, deployed and configured.', img: images.hwDesktops },
    { icon: Server, title: 'Servers & storage', text: 'Rack and tower servers, storage arrays and backup devices.', img: images.hwServers },
    { icon: Network, title: 'Networking', text: 'Switches, routers, firewalls and wireless access points.', img: images.hwNetwork },
    { icon: Printer, title: 'Peripherals', text: 'Monitors, printers, scanners and workspace accessories.', img: images.hwPeripherals },
    { icon: MemoryStick, title: 'Upgrades', text: 'Memory, storage and component upgrades for existing systems.', img: images.hwUpgrades },
    { icon: Cable, title: 'Cabling accessories', text: 'Patch panels, cable management and structured cabling parts.', img: images.hwCabling },
];
/** Floating component chips that drift at different depths over the hero photo. */
function FloatingParts() {
    const parts = [
        { l: '8%', t: '18%', d: 0, label: 'RAM' }, { l: '70%', t: '12%', d: 1.5, label: 'SSD' },
        { l: '78%', t: '64%', d: 0.8, label: 'NIC' }, { l: '14%', t: '72%', d: 2.2, label: 'PSU' },
    ];
    return (<div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {parts.map((p, i) => (<motion.div key={p.label} className="absolute" style={{ left: p.l, top: p.t }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.15, duration: 0.8, ease: EASE }}>
          <motion.div animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: p.d }} className="glass-dark rounded-xl border border-white/20 px-3 py-2 font-display text-[0.65rem] tracking-[0.25em] text-white">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal-300"/>{p.label}
          </motion.div>
        </motion.div>))}
    </div>);
}
/**
 * Hardware — 3D depth story. Layered image stack with scroll depth, a category
 * explorer with image swap and tilt, staggered capability cards.
 */
export default function Hardware() {
    usePageTitle(`${s.title} — Infynex Technologies`);
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const level = useMotionLevel();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const z1 = useTransform(scrollYProgress, [0, 1], [-60 * level, 60 * level]);
    const z2 = useTransform(scrollYProgress, [0, 1], [80 * level, -80 * level]);
    const z3 = useTransform(scrollYProgress, [0, 1], [70 * level, -70 * level]);
    const rot = useTransform(scrollYProgress, [0, 1], [8 * level, -8 * level]);
    return (<>
      <ServiceHero service={s} layout="split" visual={<FloatingParts />}/>

      {/* Hardware services — layered depth stack */}
      <section ref={ref} className="container-x py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="perspective relative mb-10 aspect-square">
            <motion.div style={{ y: z1, rotateY: rot, transformStyle: 'preserve-3d' }} className="absolute left-0 top-0 h-[70%] w-[70%]">
              <ImageReveal src={s.gallery[0]} alt="Circuit board" className="h-full w-full rounded-[2rem] shadow-2xl" direction="left"/>
            </motion.div>
            <motion.div style={{ y: z2 }} className="absolute bottom-[8%] right-0 h-[52%] w-[54%]">
              <ImageReveal src={s.gallery[1]} alt="PC components" className="h-full w-full rounded-3xl border-4 border-ivory-50 shadow-2xl" direction="right" delay={0.2}/>
            </motion.div>
            <motion.div style={{ y: z3 }} className="absolute bottom-0 left-[12%] h-[32%] w-[36%]">
              <ImageReveal src={s.gallery[2]} alt="Laptop keyboard" className="h-full w-full rounded-2xl border-4 border-ivory-50 shadow-2xl" direction="up" delay={0.4}/>
            </motion.div>
          </div>
          <div>
            <SectionHeading eyebrow="Hardware services" title="Specified for the work, installed to last." text={s.overview}/>
            <motion.p variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 text-ink-600">
              We do not tie recommendations to a single manufacturer. Equipment is proposed against your requirement and budget, and every deployment ends with a documented handover.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Equipment categories — explorer */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-teal-500/15 blur-[140px]"/>
        <div className="container-x">
          <SectionHeading dark eyebrow="Equipment categories" title="What we supply and support."/>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <ul className="space-y-2">
              {categories.map((c, i) => {
            const Icon = c.icon;
            return (<motion.li key={c.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}>
                    <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-500 ${active === i ? 'border-teal-400/50 bg-white/[0.08] pl-6' : 'border-white/10 hover:bg-white/[0.04]'}`}>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500 ${active === i ? 'bg-teal-500' : 'bg-white/10'}`}><Icon className="h-4 w-4"/></span>
                      <span className="flex-1">
                        <span className="block font-display font-semibold">{c.title}</span>
                        <span className="block text-sm text-white/60">{c.text}</span>
                      </span>
                    </button>
                  </motion.li>);
        })}
            </ul>
            <div className="perspective">
              <TiltCard max={10} className="aspect-[4/4.2] overflow-hidden rounded-[2rem] border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, scale: 1.15, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)' }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.7, ease: EASE }} className="absolute inset-0">
                    <SmartImage src={categories[active].img} alt={categories[active].title} className="h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"/>
                    <div className="absolute bottom-6 left-6">
                      <p className="eyebrow text-teal-300">{String(active + 1).padStart(2, '0')}</p>
                      <p className="mt-1 font-display text-2xl font-semibold">{categories[active].title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Support capabilities */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading eyebrow="Support capabilities" title="Through the whole lifecycle." text="Supply is only the start. We install, upgrade and repair so that equipment keeps delivering value for as long as it is in service."/>
            <div className="mt-10"><ParallaxImage src={s.gallery[3]} alt="Network cabling" className="aspect-[4/3] rounded-3xl" reveal="up" strength={40}/></div>
          </div>
          <CapabilityGrid items={s.capabilities} accent={s.accent} layout="stagger"/>
        </div>
      </section>

      {/* Service approach */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Service approach" title="Four steps from requirement to support." align="center"/>
          <div className="mt-16"><ProcessTimeline steps={s.process} accent={s.accent}/></div>
        </div>
      </section>

      <CTASection title="Hardware support shaped around your workplace." text="Share your requirement or current inventory and we will respond with suitable options." image={s.gallery[1]}/>
    </>);
}
