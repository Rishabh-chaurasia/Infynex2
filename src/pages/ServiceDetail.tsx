import { Navigate, Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { getService } from '../data/services'
import SmartImage from '../components/ui/SmartImage'
import CTASection from '../components/ui/CTASection'
import usePageTitle from '../hooks/usePageTitle'

const serviceCtas: Record<string, { title: string; text: string }> = {
  amc: { title: 'Keep your systems running with dependable AMC support.', text: 'Share your equipment and site details, and we will prepare a clear maintenance plan.' },
  hardware: { title: 'The right hardware, selected and supported with care.', text: 'Share your requirement or current inventory, and our team will suggest practical options.' },
  'it-infra': { title: 'Build reliable IT infrastructure for your workplace.', text: 'Share your sites and applications, and we will outline a clear and practical approach.' },
  'cloud-server': { title: 'Move forward with secure and manageable cloud services.', text: 'Tell us about your current setup, and our team will explain a suitable migration plan.' },
  'tele-services': { title: 'Support your customers with a trained calling team.', text: 'Share your call volumes and process, and we will recommend a suitable team structure.' },
  'robotic-duct-cleaning': { title: 'Keep your air ducts clean with documented robotic service.', text: 'Share your building details, and we will arrange an inspection and cleaning plan.' },
  'technical-support': { title: 'Reliable technical support for your team and workplace.', text: 'Share your locations and support needs, and we will suggest the right coverage.' },
  'vehicle-vendor': { title: 'We can help you build your company fleet.', text: 'Simply share how many vehicles you need. Our team will explain the available options, costs and delivery process clearly.' },
  solar: { title: 'Take a practical step towards clean energy.', text: 'Share your site details, and our team will guide you through survey, design and installation.' },
}

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = getService(slug === 'helpdesk' ? 'technical-support' : slug)
  usePageTitle(`${service?.title ?? 'Service'} — Infynex Technologies`)

  if (!service) return <Navigate to="/services" replace />
  const cta = serviceCtas[service.slug]

  return (
    <>
      <section className="service-detail-hero relative flex min-h-[520px] items-end overflow-hidden bg-navy-950 pt-24 text-white md:min-h-[620px]" style={{ '--service-accent': service.accent } as React.CSSProperties}>
        <SmartImage src={service.hero} alt={service.title} className="service-detail-hero-image absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="service-detail-hero-overlay absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/5" />
        <div className="service-detail-hero-content container-x relative pb-14 md:pb-20">
          <nav className="service-detail-breadcrumb mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold sm:gap-3 sm:text-base" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight className="h-4 w-4" />
            <Link to="/services">Services</Link><ChevronRight className="h-4 w-4" />
            <span>{service.navTitle}</span>
          </nav>
          <p className="service-detail-eyebrow eyebrow" style={{ '--service-accent': service.accent } as React.CSSProperties}>{service.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl md:text-6xl">{service.title}</h1>
          <p className="service-detail-tagline mt-5 w-fit max-w-2xl rounded-xl border border-white/15 bg-navy-950/55 px-4 py-2.5 text-base font-semibold leading-relaxed backdrop-blur-sm sm:text-lg" style={{ '--service-accent': service.accent } as React.CSSProperties}>{service.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-teal-400">Get a quote <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/services" className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff7a45] to-[#ef4f92] px-6 py-3 font-display text-sm font-bold text-white shadow-[0_10px_28px_rgba(239,79,146,.3)] transition hover:-translate-y-0.5 hover:from-[#ff925f] hover:to-[#f267a3]">View all services</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="eyebrow text-teal-600">How we help</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-navy-900 md:text-4xl">{service.slug === 'it-infra' ? 'Infrastructure engineered for performance and growth.' : 'Practical support for your business.'}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">{service.overview}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((item) => <li key={item} className="flex gap-3 rounded-xl bg-ivory-100 p-3 text-sm text-navy-900"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />{item}</li>)}
            </ul>
          </div>
          <SmartImage src={service.gallery[0]} alt={`${service.title} service`} className="aspect-[4/3] h-full w-full rounded-[1.5rem] object-cover" />
        </div>
      </section>

      <section className="bg-ivory-100 py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-teal-600">What we provide</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((item) => <article key={item.title} className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p></article>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-teal-600">Simple process</p>
            <ol className="mt-6 space-y-3">
              {service.process.map((step, index) => <li key={step.title} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-sm font-bold text-white">{index + 1}</span><span><strong className="block font-display text-navy-900">{step.title}</strong><span className="mt-1 block text-sm leading-relaxed text-ink-600">{step.text}</span></span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <CTASection title={cta.title} text={cta.text} image={service.gallery[1] ?? service.hero} compact />
    </>
  )
}
