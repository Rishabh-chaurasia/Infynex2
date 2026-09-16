import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import AnimatedText from './AnimatedText';
import SmartImage from './SmartImage';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { site } from '../../data/site';
/**
 * Shared closing CTA with a scroll-scaled background image and glow.
 */
export default function CTASection({ title = 'Solutions designed around your business.', text = 'Share your operational requirements and our team will recommend a reliable, practical path forward.', image, compact = false, }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    return (<section ref={ref} className={`container-x ${compact ? 'py-12 md:py-14' : 'py-16 md:py-20'}`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 text-white">
        {image && (<motion.div style={{ scale, y }} className="absolute inset-0">
            <SmartImage src={image} alt="" className="h-full w-full object-cover opacity-30"/>
          </motion.div>)}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/80 to-teal-600/40"/>
        <div aria-hidden className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/30 blur-3xl animate-float"/>
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-60"/>

        <div className="relative grid gap-8 px-7 py-10 md:grid-cols-[1.4fr_1fr] md:items-center md:px-12 md:py-14">
          <div>
            <AnimatedText as="h2" text={title} className="text-balance font-display text-3xl font-semibold leading-[1.05] md:text-4xl lg:text-5xl"/>
            <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 max-w-xl text-lg text-white/70">
              {text}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-wrap gap-4 md:justify-end">
            <MagneticButton to="/contact" variant="dark">Send an enquiry</MagneticButton>
            <MagneticButton href={site.social.whatsapp} variant="light" icon={false} className="!bg-[#25D366] !text-white hover:!bg-[#1eaa52]">WhatsApp us</MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>);
}
