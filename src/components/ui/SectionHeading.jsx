import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { fadeUp, lineGrow, viewportOnce } from '../../utils/motion';
export default function SectionHeading({ eyebrow, title, text, align = 'left', dark = false, className = '', size = 'lg', }) {
    const sizes = {
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-5xl lg:text-[3.4rem]',
        xl: 'text-5xl md:text-6xl lg:text-7xl',
    }[size];
    return (<div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (<motion.div className={`site-section-eyebrow mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.span variants={lineGrow} className={`h-px w-10 origin-left ${dark ? 'bg-teal-400' : 'bg-teal-500'}`}/>
          <motion.span variants={fadeUp} className={`eyebrow ${dark ? 'text-teal-300' : 'text-teal-600'}`}>{eyebrow}</motion.span>
        </motion.div>)}
      <AnimatedText as="h2" text={title} className={`site-section-heading text-balance font-display font-semibold leading-[1.05] ${sizes} ${dark ? 'text-white' : 'text-navy-900'}`}/>
      {text && (<motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={viewportOnce} className={`mt-6 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-600'}`}>
          {text}
        </motion.p>)}
    </div>);
}
