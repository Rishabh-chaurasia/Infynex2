import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Factory, BriefcaseBusiness } from 'lucide-react'
import CTASection from '../components/ui/CTASection'
import { industries } from '../data/industries'
import { services } from '../data/services'
import { EASE } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'

export default function Industries() {
  usePageTitle('Industries — Infynex Technologies')

  return (
    <div className="source-industries-page">
      <div aria-hidden className="source-industries-orb source-industries-orb-one" />
      <div aria-hidden className="source-industries-orb source-industries-orb-two" />

      <header className="container-x source-industries-header">
        <motion.span initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }} className="eyebrow text-teal-600">Industries</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.12, ease: EASE }}>
          Services that fit<br /><em>your business.</em>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="source-industries-header-bottom">
          <p>We adjust our services for your workplace, people and schedule.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .45, ease: EASE }} className="source-industries-icons" aria-hidden="true">
          <Building2 /><Factory /><BriefcaseBusiness />
        </motion.div>
      </header>

      <section className="container-x source-industry-editorial" id="overview">
        {industries.map((industry, index) => (
          <motion.article
            className="source-industry-row"
            id={industry.id}
            key={industry.id}
            style={{ '--industry-accent': industry.accent } as React.CSSProperties}
            initial={{ opacity: 0, y: 35, rotateX: 5, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <div className="source-industry-photo">
              <img src={industry.image} alt={`${industry.title} operating environment`} loading="lazy" />
            </div>
            <div className="source-industry-copy">
              <span className="eyebrow">Sector {String(index + 1).padStart(2, '0')}</span>
              <h2>{industry.title}</h2>
              <p>{industry.description}</p>
              <div className="source-industry-tags">
                {industry.services.map((slug) => {
                  const service = services.find((item) => item.slug === slug)
                  return service ? <Link key={slug} to={service.path}>{service.title}<ArrowUpRight size={12} /></Link> : null
                })}
              </div>
              <Link className="source-industry-link" to="/contact">Discuss your site <ArrowUpRight size={17} /></Link>
            </div>
          </motion.article>
        ))}
      </section>

      <CTASection title="Tell us about your workplace." text="We will suggest the services that fit your site and schedule." image={industries[1].image} compact />
    </div>
  )
}
