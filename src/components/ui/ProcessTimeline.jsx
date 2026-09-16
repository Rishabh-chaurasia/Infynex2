import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE } from '../../utils/motion';
/**
 * Scroll-driven process timeline. The connecting line draws as you scroll;
 * steps rise into place with staggered timing.
 */
export default function ProcessTimeline({ steps, dark = false, orientation = 'horizontal', accent = '#1a9dc3' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
    if (orientation === 'vertical') {
        return (<div ref={ref} className="relative pl-10 md:pl-14">
        <div className={`absolute left-3 top-0 h-full w-px md:left-5 ${dark ? 'bg-white/10' : 'bg-navy-800/10'}`}/>
        <motion.div className="absolute left-3 top-0 w-px origin-top md:left-5" style={{ scaleY: progress, height: '100%', background: accent }}/>
        <ol className="space-y-12">
          {steps.map((s, i) => (<motion.li key={s.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }} className="relative">
              <span className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 md:-left-14 md:h-10 md:w-10 ${dark ? 'border-navy-900 bg-navy-800' : 'border-ivory-50 bg-white'} font-display text-xs font-semibold`} style={{ boxShadow: `0 0 0 2px ${accent}`, color: accent }}>
                {i + 1}
              </span>
              <h4 className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}`}>{s.title}</h4>
              <p className={`mt-2 max-w-md ${dark ? 'text-white/65' : 'text-ink-600'}`}>{s.text}</p>
            </motion.li>))}
        </ol>
      </div>);
    }
    return (<div ref={ref} className="relative">
      <div className={`absolute left-0 right-0 top-6 hidden h-px lg:block ${dark ? 'bg-white/10' : 'bg-navy-800/10'}`}/>
      <motion.div className="absolute left-0 top-6 hidden h-px origin-left lg:block" style={{ scaleX: progress, width: '100%', background: accent }}/>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (<motion.li key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }} className="relative">
            <span className={`process-step-number relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold ${dark ? 'process-step-number-dark text-white' : 'bg-white text-navy-900'}`} style={{ boxShadow: `0 0 0 2px ${accent}, 0 12px 30px -10px ${accent}80`, ...(dark ? { background: accent } : {}) }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className={`mt-6 font-display text-xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}`}>{s.title}</h4>
            <p className={`mt-2 ${dark ? 'text-white/65' : 'text-ink-600'}`}>{s.text}</p>
          </motion.li>))}
      </ol>
    </div>);
}
