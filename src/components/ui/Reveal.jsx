import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';
/** In-view wrapper with sensible defaults. Use custom variants for non-fade motion. */
export default function Reveal({ children, className, variants = fadeUp, delay = 0, once = true }) {
    return (<motion.div className={className} variants={variants} initial="hidden" whileInView="visible" viewport={{ ...viewportOnce, once }} custom={delay}>
      {children}
    </motion.div>);
}
