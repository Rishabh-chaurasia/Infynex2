import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wrench, Laptop, Printer, Wifi, Users, Truck } from 'lucide-react';
import ServiceHero from '../../components/ui/ServiceHero';
import SectionHeading from '../../components/ui/SectionHeading';
import ParallaxImage from '../../components/ui/ParallaxImage';
import ImageReveal from '../../components/ui/ImageReveal';
import CapabilityGrid from '../../components/ui/CapabilityGrid';
import ProcessTimeline from '../../components/ui/ProcessTimeline';
import CTASection from '../../components/ui/CTASection';
import { getService } from '../../data/services';
import { EASE, fadeUp, viewportOnce } from '../../utils/motion';
import usePageTitle from '../../hooks/usePageTitle';
import { useMotionLevel } from '../../hooks/useMedia';
const s = getService('technical-support');
const tools = [
    { icon: Laptop, label: 'Desktop & laptop' }, { icon: Printer, label: 'Printers' }, { icon: Wifi, label: 'Network & Wi‑Fi' },
    { icon: Wrench, label: 'Installations' }, { icon: Users, label: 'User support' }, { icon: Truck, label: 'Moves & rollouts' },
];
/** Tool icons orbiting slowly at different depths over the hero image. */
function ToolOrbit() {
    return (<div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {tools.map((t, i) => {
            const Icon = t.icon;
            const angle = (i / tools.length) * Math.PI * 2;
            return (<motion.div key={t.label} className="absolute left-1/2 top-1/2" style={{ x: Math.cos(angle) * 220 - 24, y: Math.sin(angle) * 150 - 24 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.12, type: 'spring', stiffness: 160, damping: 14 }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }} className="glass-dark flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 text-white">
              <Icon className="h-5 w-5"/>
            </motion.div>
          </motion.div>);
        })}
    </div>);
}
/**
 * Technical Support — on-site narrative. Offset hero with orbiting tools,
 * masked image reveals in a broken grid, sticky timeline with parallax photo.
 */
export default function TechnicalSupport() {
    usePageTitle(`${s.title} — Infynex Technologies`);
    const ref = useRef(null);
    const level = useMotionLevel();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const a = useTransform(scrollYProgress, [0, 1], [80 * level, -80 * level]);
    const b = useTransform(scrollYProgress, [0, 1], [-40 * level, 40 * level]);
    return (<>
      <ServiceHero service={s} layout="offset" visual={<ToolOrbit />}/>

      {/* Overview */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Overview" title="When remote is not enough, we are there." size="xl"/>
          <div className="lg:pt-6">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-xl leading-relaxed text-ink-600">{s.overview}</motion.p>
            <motion.ul variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 flex flex-wrap gap-2">
              {tools.map((t) => {
            const Icon = t.icon;
            return (<motion.li key={t.label} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="flex items-center gap-2 rounded-full border border-navy-800/15 bg-white px-4 py-2 text-sm text-navy-900">
                    <Icon className="h-4 w-4 text-teal-600"/>{t.label}
                  </motion.li>);
        })}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* On-site support — broken grid of masked reveals */}
      <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40"/>
        <div className="container-x">
          <SectionHeading dark eyebrow="On-site support" title="Three ways to have an engineer on site."/>
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            <motion.div style={{ y: a }} className="md:col-span-5">
              <ImageReveal src={s.gallery[0]} alt="Office IT environment" className="aspect-[4/5] rounded-[2rem]" direction="left"/>
            </motion.div>
            <div className="grid content-center gap-4 md:col-span-4">
              {s.capabilities.slice(0, 3).map((c, i) => (<motion.div key={c.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-500 hover:bg-white/[0.08]" data-cursor="hover">
                  <span className="font-display text-xs tracking-[0.3em] text-teal-300">0{i + 1}</span>
                  <h4 className="mt-2 font-display text-lg font-semibold">{c.title}</h4>
                  <p className="mt-1 text-sm text-white/60">{c.text}</p>
                </motion.div>))}
            </div>
            <motion.div style={{ y: b }} className="md:col-span-3 md:mt-20">
              <ImageReveal src={s.gallery[1]} alt="Engineer troubleshooting" className="aspect-[3/4] rounded-3xl" direction="up" delay={0.2}/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach — sticky image */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ParallaxImage src={s.hero} alt="Engineer at work" className="aspect-[4/5] rounded-[2rem]" reveal="left" strength={50}/>
          </div>
          <div>
            <SectionHeading eyebrow="Service approach" title="Scoped, deployed, supported, reported."/>
            <div className="mt-12"><ProcessTimeline steps={s.process} orientation="vertical" accent={s.accent}/></div>
            <div className="mt-12"><ImageReveal src={s.gallery[2]} alt="Desk setup" className="aspect-[16/9] rounded-3xl" direction="right"/></div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="What on-site engineers handle." align="center"/>
          <div className="mt-14"><CapabilityGrid items={s.capabilities} accent={s.accent} layout="row"/></div>
        </div>
      </section>

      <CTASection title="Skilled technical support, on site and remote." text="Share your locations and working hours and we will suggest suitable coverage." image={s.gallery[0]}/>
    </>);
}
