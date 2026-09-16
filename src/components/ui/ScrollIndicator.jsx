import { motion } from 'framer-motion';
export default function ScrollIndicator({ dark = true }) {
    const c = dark ? 'border-white/40 text-white/60' : 'border-navy-900/30 text-ink-400';
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex ${c}`} aria-hidden>
      <span className="eyebrow text-[0.6rem]">Scroll</span>
      <span className={`relative h-10 w-6 rounded-full border ${c}`}>
        <motion.span className={`absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${dark ? 'bg-teal-300' : 'bg-teal-500'}`} animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}/>
      </span>
    </motion.div>);
}
