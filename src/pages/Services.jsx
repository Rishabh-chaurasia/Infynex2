import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cloud, Headphones, Server, Wrench } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import ServiceCard from '../components/ui/ServiceCard';
import CTASection from '../components/ui/CTASection';
import ScrollIndicator from '../components/ui/ScrollIndicator';
import NetworkVisual from '../components/visuals/NetworkVisual';
import { services } from '../data/services';
import { images } from '../data/images';
import { EASE } from '../utils/motion';
import usePageTitle from '../hooks/usePageTitle';
import { useMotionLevel } from '../hooks/useMedia';
const groups = [
    { title: 'Infrastructure & Hardware', slugs: ['it-infra', 'cloud-server', 'hardware', 'amc'] },
    { title: 'Technical Support & Helpdesk', slugs: ['technical-support', 'tele-services'] },
    { title: 'Facilities, Energy & Mobility', slugs: ['robotic-duct-cleaning', 'solar', 'vehicle-vendor'] },
];
/**
 * Service directory: a typographic hero with a live network backdrop, then
 * all services in grouped, interactive 3D cards.
 */
export default function Services() {
    usePageTitle('Services — Infynex Technologies');
    const ref = useRef(null);
    const level = useMotionLevel();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 200 * level]);
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    return (<>
      <section ref={ref} className="services-directory-hero relative overflow-hidden text-navy-950">
        <div aria-hidden className="services-directory-orb services-directory-orb-a"/>
        <div aria-hidden className="services-directory-orb services-directory-orb-b"/>
        <motion.div style={{ y: bgY }} className="services-directory-network absolute inset-0 opacity-75">
          <NetworkVisual seed={3} nodes={22}/>
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/20 to-[#eef8fb]/95"/>
        <motion.div style={{ opacity: fade }} className="container-x relative flex min-h-[520px] flex-col justify-center pb-16 pt-32 md:min-h-[620px] md:pb-20 md:pt-36">
          <motion.div aria-hidden initial={{ opacity: 0, scale: .9, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .65, duration: 1, ease: EASE }} className="services-directory-icon-cluster absolute right-[5%] top-1/2 hidden -translate-y-1/2 lg:grid">
            <span className="services-directory-icon services-directory-icon-main"><Server /></span>
            <span className="services-directory-icon services-directory-icon-cloud"><Cloud /></span>
            <span className="services-directory-icon services-directory-icon-support"><Headphones /></span>
            <span className="services-directory-icon services-directory-icon-tools"><Wrench /></span>
          </motion.div>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow relative -top-14 mb-1 flex w-fit items-center gap-3 text-teal-700">
            <span className="h-px w-8 bg-teal-600"/> Services
          </motion.p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
            <AnimatedText text="Services for your" trigger="mount" delay={0.4}/><br />
            <span className="text-teal-700"><AnimatedText text="Business and Workplace" trigger="mount" delay={0.7}/></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: EASE }} className="services-directory-description mt-8 max-w-xl text-lg font-normal leading-relaxed text-navy-700">
            Explore our comprehensive service portfolio, delivery capabilities and structured approach to supporting secure, efficient and dependable business operations. Our solutions are aligned with your infrastructure, workplace and long-term operational requirements.
          </motion.p>
        </motion.div>
        <ScrollIndicator />
      </section>

      <section className="container-x pb-12 pt-12 md:pb-16 md:pt-16">
        {groups.map((g, gi) => (<div key={g.title} className={gi ? 'mt-16 md:mt-20' : ''}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="service-group-heading mb-10 flex items-center gap-4">
              <span className="font-display text-xs tracking-[0.3em] text-teal-600">0{gi + 1}</span>
              <span className="h-px flex-1 bg-navy-800/10"/>
              <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">{g.title}</h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {g.slugs.map((slug) => {
                const s = services.find((x) => x.slug === slug);
                const idx = services.indexOf(s);
                return <ServiceCard key={slug} service={s} index={idx}/>;
            })}
            </div>
          </div>))}
      </section>

      <CTASection title="The right service framework for your business." text="Share your operational requirements and our team will recommend a clear, practical service approach." image={images.workspace}/>
    </>);
}
