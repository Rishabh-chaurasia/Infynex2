import { useState, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services, type Service } from '../../data/services'
import { site } from '../../data/site'

const points = [
  [50, 5], [72, 15], [84, 38], [78, 67], [60, 86],
  [40, 86], [22, 67], [16, 38], [28, 15],
]
const accents = ['#ef5d62', '#ed963f', '#2eaf78', '#6177e8', '#d05da6', '#22a7b5', '#795bc9', '#bd8b28', '#e0703f']

type HubService = Service
const hubServices: HubService[] = services

export default function ConnectedHub() {
  const [active, setActive] = useState(0)
  const selected = hubServices[active]
  const accent = accents[active]
  const selectedX = points[active][0]
  const detailSide = selectedX <= 50 ? 'lg:right-[calc(100%+1rem)]' : 'lg:left-[calc(100%+1rem)]'

  return (
    <section id="capabilities" className="connected-hub connected-hub-dark relative overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(10,80,99,.36),transparent_30%),linear-gradient(145deg,#041521,#08283a_58%,#061c2a)] pb-10 pt-10 text-white lg:min-h-[calc(100svh-80px)]">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-50" />
      <div className="container-x relative">
        <header className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow text-[#74dfeb]">Infynex Technologies Services</span>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,2.8vw,2.65rem)] font-semibold tracking-[-.045em]">
            We deliver tailored solutions for <span className="text-[#75e3a9]">seamless business operations.</span>
          </h2>
        </header>

        <div className="relative mx-auto my-6 grid max-w-[700px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:my-2 lg:block lg:h-[330px]">
          <svg className="absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {points.map(([x, y], index) => (
              <line key={index} x1="50" y1="48" x2={50 + (x - 50) * .88} y2={48 + (y - 48) * .88} stroke={active === index ? accents[index] : '#45cce0aa'} strokeWidth={active === index ? 3 : 1.5} strokeDasharray={active === index ? undefined : '4 3'} vectorEffect="non-scaling-stroke" className="transition-all duration-300" />
            ))}
          </svg>

          <div aria-hidden className="absolute left-1/2 top-[48%] hidden h-20 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.4rem] border border-teal-200/30 bg-[#071e2d]/90 shadow-[0_0_60px_rgba(74,213,230,.24)] backdrop-blur lg:grid">
            <img src={site.logo} alt="Infynex" className="w-20" />
            <i className="hub-core-pulse absolute inset-[-18px] rounded-[2.5rem] border border-teal-300/20" />
          </div>

          {hubServices.map((service, index) => {
            const Icon = service.icon
            const [x, y] = points[index]
            const isActive = active === index
            return (
              <Link
                key={service.slug}
                to={service.path}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                style={{ '--node-accent': accents[index], left: `${x}%`, top: `${y}%` } as CSSProperties}
                className={`hub-service-node hub-service-node-minimal group relative z-[4] flex min-h-[5.5rem] flex-col items-center justify-center rounded-xl px-2 text-center transition-all duration-300 lg:absolute lg:min-h-[54px] lg:w-36 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-none ${isActive ? 'lg:scale-110' : 'hover:scale-105'}`}
              >
                <i className="mb-1 grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-300 group-hover:-translate-y-1"><Icon className="h-[18px] w-[18px]" strokeWidth={2.2} /></i>
                <span className="service-node-name text-sm font-bold leading-snug lg:text-[.72rem]">{service.navTitle}</span>
              </Link>
            )
          })}

          <Link key={`desktop-${selected.slug}`} to={selected.path} style={{ '--active-accent': accent } as CSSProperties} className={`hub-detail absolute top-1/2 z-10 hidden w-[245px] -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0b2b3d]/95 px-5 py-5 text-left shadow-[inset_4px_0_var(--active-accent),0_20px_55px_rgba(0,0,0,.28)] backdrop-blur-md transition-colors hover:bg-[#10384c] lg:block ${detailSide}`}>
            <span className="text-[.58rem] tracking-[.15em]" style={{ color: accent }}>{String(active + 1).padStart(2, '0')} / 09</span>
            <h3 className="hub-detail-service-title mt-2 font-display text-xl font-semibold leading-tight">{selected.navTitle}</h3>
            <p className="mt-3 text-[.82rem] leading-relaxed text-[#c5d6dd]">{selected.short}</p>
            <span className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#7ee3ec]">Explore service <ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </div>

        <Link key={`mobile-${selected.slug}`} to={selected.path} style={{ '--active-accent': accent } as CSSProperties} className="hub-detail mx-auto grid w-full max-w-[460px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 shadow-[inset_4px_0_var(--active-accent)] transition-colors hover:bg-white/[.07] lg:hidden">
          <span className="text-[.62rem] tracking-[.15em]" style={{ color: accent }}>{String(active + 1).padStart(2, '0')} / 09</span>
          <div>
            <h3 className="hub-detail-service-title font-display text-xl font-semibold">{selected.navTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b8ccd5]">{selected.short}</p>
          </div>
          <span className="flex items-center justify-between gap-2 whitespace-nowrap text-xs font-semibold text-[#7ee3ec]">Explore service <ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </div>
    </section>
  )
}
