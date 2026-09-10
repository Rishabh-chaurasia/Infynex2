import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../../data/services'
import TiltCard from './TiltCard'
import SmartImage from './SmartImage'
import { EASE } from '../../utils/motion'

interface Props {
  service: Service
  index?: number
  variant?: 'tall' | 'wide'
}

/**
 * Interactive service card: 3D tilt, image zoom, animated icon,
 * hover-revealed description and a View Service CTA.
 */
export default function ServiceCard({ service, index = 0, variant = 'tall' }: Props) {
  const Icon = service.icon
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, rotateX: 12 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: EASE, delay: (index % 4) * 0.1 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      className="perspective"
    >
      <TiltCard className={`rounded-3xl ${variant === 'tall' ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}>
        <Link
          to={service.path}
          className="relative block h-full w-full overflow-hidden rounded-3xl bg-navy-900 text-white shadow-[0_30px_80px_-30px_rgba(11,21,51,0.45)]"
          aria-label={`View ${service.title}`}
        >
          <SmartImage
            src={service.hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
            style={{ background: service.accent }}
          />

          <div className="relative flex h-full flex-col justify-between p-6 md:p-7" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-white/20">
                <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="font-display text-xs tracking-[0.3em] text-white/50">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div>
              <p className="eyebrow mb-2 text-teal-300">{service.eyebrow}</p>
              <h3 className="font-display text-2xl font-semibold leading-tight">{service.title}</h3>
              <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr]">
                <p className="overflow-hidden text-sm leading-relaxed text-white/70 transition-all duration-500 group-hover:mt-3">{service.short}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-white">
                View Service
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:bg-teal-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}
