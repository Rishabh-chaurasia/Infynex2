import { motion } from 'framer-motion'
import { Bot, Cloud, Server, Sun, Wrench } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import SmartImage from '../ui/SmartImage'
import { images } from '../../data/images'
import { EASE, fadeUp, viewportOnce } from '../../utils/motion'

const chips = [
  { icon: Wrench, label: 'AMC', position: 'left-[2%] top-[14%]', delay: 0 },
  { icon: Server, label: 'IT Infra', position: 'right-[1%] top-[5%]', delay: 0.5 },
  { icon: Cloud, label: 'Cloud', position: 'right-[-2%] top-[49%]', delay: 1 },
  { icon: Sun, label: 'Solar', position: 'left-[-2%] bottom-[17%]', delay: 1.5 },
  { icon: Bot, label: 'Robotic Cleaning', position: 'right-[2%] bottom-[5%]', delay: 2 },
]

/** Light editorial composition from the original first-project homepage. */
export default function EditorialTechnology() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[linear-gradient(110deg,#f8fbfd_0%,#e4f7fb_48%,#fbfcfd_100%)] py-20 md:py-24">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-80" />
      <div className="container-x relative grid min-h-[650px] items-center gap-14 lg:grid-cols-[.92fr_1.18fr] lg:gap-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="relative z-10">
          <p className="eyebrow mb-7 flex items-center gap-3 text-teal-600">
            <span className="h-px w-10 bg-teal-500" />Technology · Infrastructure · Services
          </p>
          <h2 className="font-display text-[clamp(3.2rem,5.7vw,5.6rem)] font-semibold leading-[.94] tracking-[-.055em] text-navy-900">
            Technology<br />that<br />keeps your<br />
            <span className="text-teal-600">business<br />running.</span>
          </h2>
          <p className="mt-9 max-w-[33rem] text-lg leading-relaxed text-ink-600">
            Infynex Technologies delivers maintenance, hardware, IT infrastructure, cloud, support, robotic duct cleaning, solar and vehicle services — as one accountable partner.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton to="/services">Explore services</MagneticButton>
            <MagneticButton to="/contact" variant="ghost">Talk to us</MagneticButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 1, ease: EASE }} className="relative min-h-[440px] perspective sm:min-h-[570px] lg:min-h-[650px]">
          <span aria-hidden className="absolute left-[7%] top-[8%] aspect-square w-[86%] rounded-full border border-navy-800/15" />
          <span aria-hidden className="animate-spin-slow absolute left-[18%] top-[19%] aspect-square w-[64%] rounded-full border border-dashed border-navy-800/20" />
          <span aria-hidden className="absolute left-1/2 top-[8%] h-[84%] w-px bg-teal-500/60" />
          <span aria-hidden className="absolute left-[7%] top-1/2 h-px w-[86%] bg-teal-500/60" />

          <motion.div initial={{ clipPath: 'inset(45% 45% 45% 45%)' }} whileInView={{ clipPath: 'inset(0 0 0 0)' }} viewport={viewportOnce} transition={{ duration: 1.25, ease: EASE }} className="absolute left-[17%] top-[15%] h-[67%] w-[62%] overflow-hidden rounded-[2rem] shadow-[0_45px_90px_-30px_rgba(11,21,51,.5)]">
            <SmartImage src={images.heroMain} alt="Server corridor with rows of racks" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 text-white"><small className="eyebrow text-[.55rem] text-teal-300">Infrastructure</small><p className="mt-1 font-display text-sm font-semibold">Built, monitored, maintained</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute right-0 top-[3%] h-[29%] w-[32%] overflow-hidden rounded-2xl border border-white/70 shadow-[0_28px_60px_-22px_rgba(11,21,51,.45)] rotate-[4deg]">
            <SmartImage src={images.heroSmall} alt="Network cabling" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-0 right-[-2%] h-[40%] w-[43%] overflow-hidden rounded-[1.6rem] border border-white/70 shadow-[0_35px_75px_-25px_rgba(11,21,51,.5)] rotate-[-2deg]">
            <SmartImage src={images.heroSide} alt="Engineer working with technical equipment" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white"><small className="eyebrow text-[.5rem] text-teal-300">On-site</small><p className="mt-1 font-display text-xs font-semibold">Engineers where you are</p></div>
          </motion.div>

          {chips.map(({ icon: Icon, label, position, delay }) => (
            <motion.span key={label} animate={{ y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, delay }} className={`absolute z-10 hidden items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-2 font-display text-xs font-semibold text-navy-900 shadow-[0_14px_35px_rgba(11,21,51,.16)] backdrop-blur sm:flex ${position}`}>
              <i className="grid h-7 w-7 place-items-center rounded-full bg-navy-900 text-white"><Icon className="h-3.5 w-3.5" /></i>{label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
