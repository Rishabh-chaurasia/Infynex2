import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { EASE } from '../../utils/motion';
/**
 * Masked image reveal: a brand-coloured curtain wipes across while the image
 * settles from a slight zoom. Adds hover zoom by default.
 */
export default function ImageReveal({ src, alt = '', className = '', direction = 'left', delay = 0, hoverZoom = true, children, }) {
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const sign = direction === 'left' || direction === 'up' ? 1 : -1;
    return (<motion.div className={`group relative overflow-hidden ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px' }}>
      <motion.div className="h-full w-full" variants={{ hidden: { scale: 1.25, opacity: 0.6 }, visible: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: EASE, delay } } }}>
        <SmartImage src={src} alt={alt} className={`h-full w-full object-cover ${hoverZoom ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]' : ''}`}/>
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-navy-800" variants={axis === 'x'
            ? { hidden: { x: '0%' }, visible: { x: `${sign * 101}%`, transition: { duration: 1.1, ease: EASE, delay } } }
            : { hidden: { y: '0%' }, visible: { y: `${sign * 101}%`, transition: { duration: 1.1, ease: EASE, delay } } }}/>
      {children}
    </motion.div>);
}
