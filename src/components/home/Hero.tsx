import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Headphones, ShieldCheck, Waypoints } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/multi-service-hero.webp'
import { EASE } from '../../utils/motion'

const signals = [
  { label: 'SOLAR ARRAY', value: 'ENERGY ACTIVE', className: 'left-[69%] top-[15%]' },
  { label: 'NETWORK CORE', value: 'SYSTEMS ONLINE', className: 'left-[60%] top-[48%]' },
  { label: 'FIELD SUPPORT', value: 'DISPATCH READY', className: 'left-[31%] top-[69%]' },
  { label: 'HVAC SERVICE', value: 'SCAN IN PROGRESS', className: 'right-[3%] top-[60%]' },
]

const proof = [
  { icon: Waypoints, label: 'Complete service solutions' },
  { icon: ShieldCheck, label: 'One reliable team' },
  { icon: Headphones, label: 'Ongoing support' },
]

export default function Hero() {
  return (
    <section className="source-hero relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#041521] text-white sm:min-h-[680px] lg:min-h-[700px]">
      <motion.img src={heroImage} alt="Infynex teams delivering IT, cloud, hardware, support, duct cleaning, solar and business vehicle services" fetchPriority="high" initial={{ scale: 1.03, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: EASE }} className="source-hero-image absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="source-hero-overlay absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,31,.96)_0%,rgba(3,23,38,.84)_42%,rgba(3,20,34,.34)_72%,rgba(3,17,29,.18)_100%)] max-md:bg-[linear-gradient(90deg,rgba(3,18,31,.94),rgba(3,23,38,.72))]" />
      <div aria-hidden className="absolute inset-0 opacity-40 grid-lines-dark" />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg className="absolute inset-0 h-full w-full drop-shadow-[0_0_5px_#6defff]" viewBox="0 0 1000 620" preserveAspectRatio="none">
          {['M700 105 C720 180 650 205 665 275', 'M665 275 C585 320 625 390 570 430', 'M665 275 C790 310 800 390 875 425', 'M570 430 C480 500 400 450 345 510'].map((d) => <path key={d} d={d} className="source-data-path" />)}
        </svg>
        {signals.map((signal, index) => (
          <motion.div key={signal.label} className={`absolute flex items-center gap-2.5 text-white ${signal.className}`} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * -.45 }}>
            <span className="source-signal-dot relative grid h-3.5 w-3.5 place-items-center rounded-full border border-teal-200 shadow-[0_0_16px_#54e7fa]"><i className="h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]" /></span>
            <span className="grid border-l border-teal-200 bg-[#071e2db8] px-2.5 py-1.5 backdrop-blur-md"><b className="text-[.46rem] tracking-[.16em]">{signal.label}</b><small className="text-[.4rem] tracking-[.11em] text-teal-200">{signal.value}</small></span>
          </motion.div>
        ))}
      </div>

      <div className="source-hero-content container-x relative z-10 pb-7 pt-28 md:pt-32">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1, ease: EASE }} className="eyebrow mb-4 block text-[.7rem] text-teal-300 sm:mb-7 sm:text-[.84rem] md:text-[.92rem]">Infynex Technologies</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .15, ease: EASE }} className="max-w-[980px] font-display text-[clamp(2.3rem,10.5vw,4.7rem)] font-medium leading-[1.07] tracking-[-.035em] md:max-w-[61%] md:text-[clamp(3rem,5.2vw,4.7rem)] lg:max-w-[64%]">Powering Your Business<br /><span className="source-hero-accent">with Services That Work.</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .3, ease: EASE }} className="mt-4 max-w-[690px] text-[.88rem] leading-[1.65] text-white/75 sm:mt-6 sm:text-[.95rem] sm:leading-[1.75] md:max-w-[55%]">From IT infrastructure and ongoing support to solar, vehicle and facility services, Infynex helps keep your business running smoothly.</motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .42, ease: EASE }} className="my-5 grid gap-2.5 sm:my-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4 md:mb-12"><Link to="/services" className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 font-display text-sm font-bold text-white shadow-[0_14px_38px_-16px_rgba(42,183,221,.9)] transition duration-300 hover:-translate-y-1 sm:min-h-14 sm:w-auto sm:px-8 sm:text-base hover:shadow-[0_18px_44px_-14px_rgba(42,183,221,1)]">Explore Our Services <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link><Link to="/contact" className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 font-display text-sm font-bold text-white shadow-[0_14px_38px_-16px_rgba(244,91,105,.95)] transition duration-300 hover:-translate-y-1 sm:min-h-14 sm:w-auto sm:px-8 sm:text-base hover:shadow-[0_18px_44px_-14px_rgba(244,91,105,1)]">Talk to Our Team <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link></motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .8 }} className="mb-0 grid grid-cols-2 gap-x-3 gap-y-2 border-y border-white/15 py-3 sm:mb-8 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:py-4 md:w-fit md:border-y-0 md:py-0" aria-label="Infynex service strengths">{proof.map(({ icon: Icon, label }, index) => <span key={label} className={`flex items-center gap-2 text-[.76rem] text-white/80 sm:gap-2.5 sm:text-sm md:text-[.95rem] ${index === 0 ? 'col-span-2' : ''}`}><Icon className="h-4 w-4 shrink-0 text-teal-300 sm:h-5 sm:w-5" /><strong className="font-medium">{label}</strong></span>)}</motion.div>
        <div className="hidden items-center justify-between gap-5 border-t border-white/15 pt-5 text-[.62rem] font-semibold tracking-[.1em] text-white/65 sm:flex sm:text-[.72rem] sm:tracking-[.14em] md:text-[.78rem]"><span>TECHNOLOGY. INFRASTRUCTURE. SERVICES.</span><a href="#capabilities" className="flex shrink-0 items-center gap-3 transition-colors hover:text-teal-300" aria-label="Scroll to service network"><ArrowDown className="source-explore-arrow h-5 w-5" /> EXPLORE</a></div>
      </div>
    </section>
  )
}
