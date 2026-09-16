import { Navigate, Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { getService } from '../data/services';
import SmartImage from '../components/ui/SmartImage';
import CTASection from '../components/ui/CTASection';
import usePageTitle from '../hooks/usePageTitle';
const serviceCtas = {
    amc: { title: 'Dependable AMC coverage for consistent system performance.', text: 'Provide your equipment and site details to receive a clearly defined maintenance plan.' },
    hardware: { title: 'Business hardware selected, deployed and supported with care.', text: 'Provide your requirements or current inventory for practical, specification-led recommendations.' },
    'it-infra': { title: 'Reliable IT infrastructure engineered for your workplace.', text: 'Provide your site and application requirements for a clear infrastructure delivery plan.' },
    'cloud-server': { title: 'Secure, scalable and manageable cloud environments.', text: 'Provide your current environment details for a structured migration and management plan.' },
    'tele-services': { title: 'Professional customer communication delivered by trained teams.', text: 'Provide your call volumes and operating process for a suitable team and workflow recommendation.' },
    'robotic-duct-cleaning': { title: 'Documented robotic duct cleaning for cleaner ventilation systems.', text: 'Provide your building details for a structured inspection and cleaning plan.' },
    'technical-support': { title: 'Responsive technical support for teams and workplaces.', text: 'Provide your locations and support requirements for an appropriate coverage model.' },
    'vehicle-vendor': { title: 'A structured vehicle supply solution for your business fleet.', text: 'Provide the required vehicle types and quantities for clear options, commercial terms and delivery planning.' },
    solar: { title: 'Professionally designed solar systems for dependable clean energy.', text: 'Provide your site details for a structured survey, design, installation and maintenance plan.' },
};
export default function ServiceDetail() {
    const { slug = '' } = useParams();
    const service = getService(slug === 'helpdesk' ? 'technical-support' : slug);
    usePageTitle(`${service?.title ?? 'Service'} — Infynex Technologies`);
    if (!service)
        return <Navigate to="/services" replace/>;
    const cta = serviceCtas[service.slug];
    return (<>
      <section className="service-detail-hero relative flex min-h-[560px] items-end overflow-hidden bg-navy-950 pt-24 text-white md:min-h-[680px]" style={{ '--service-accent': service.accent }}>
        <SmartImage src={service.hero} alt={service.title} className="service-detail-hero-image absolute inset-0 h-full w-full object-cover opacity-65"/>
        <div className="service-detail-hero-overlay absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/5"/>
        <div className="service-detail-hero-content container-x relative pb-14 md:pb-20">
          <nav className="service-detail-breadcrumb mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold sm:gap-3 sm:text-base" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight className="h-4 w-4"/>
            <Link to="/services">Services</Link><ChevronRight className="h-4 w-4"/>
            <span>{service.navTitle}</span>
          </nav>
          <p className="service-detail-eyebrow eyebrow" style={{ '--service-accent': service.accent }}>{service.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl md:text-6xl">{service.title}</h1>
          <p className="service-detail-tagline mt-5 w-fit max-w-2xl rounded-xl border border-white/15 bg-navy-950/55 px-4 py-2.5 text-base font-semibold leading-relaxed backdrop-blur-sm sm:text-lg" style={{ '--service-accent': service.accent }}>{service.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-teal-400">Get a quote <ArrowUpRight className="h-4 w-4"/></Link>
            <Link to="/services" className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff7a45] to-[#ef4f92] px-6 py-3 font-display text-sm font-bold text-white shadow-[0_10px_28px_rgba(239,79,146,.3)] transition hover:-translate-y-0.5 hover:from-[#ff925f] hover:to-[#f267a3]">View all services</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="eyebrow text-teal-600">Service overview</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-navy-900 md:text-4xl">{service.slug === 'it-infra' ? 'Infrastructure engineered for performance and growth.' : 'Professional services aligned with your operations.'}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">{service.overview}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-ivory-100 p-3 text-sm text-navy-900"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"/>{index === service.highlights.length - 1 ? 'Many more' : item}</li>)}
            </ul>
          </div>
          <SmartImage src={service.gallery[0]} alt={`${service.title} service`} className="aspect-[4/3] h-full w-full rounded-[1.5rem] object-cover"/>
        </div>
      </section>

      <section className="bg-ivory-100 py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-teal-600">Core capabilities</p>
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

      <CTASection title={cta.title} text={cta.text} image={service.gallery[1] ?? service.hero} compact/>
    </>);
}
