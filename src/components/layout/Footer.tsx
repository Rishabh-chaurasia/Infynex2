import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { site, navLinks } from '../../data/site'
import { services } from '../../data/services'
import { EASE } from '../../utils/motion'

const col = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-navy-800/10 bg-ivory-100">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-70" />
      <div aria-hidden className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-teal-400/10 blur-[120px]" />

      <motion.div
        className="container-x relative grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div variants={col}>
          <img src={site.logo} alt={site.name} className="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-ink-600">{site.tagline}</p>
          <div className="mt-8 flex gap-3">
            <Social href={site.social.linkedin} label="LinkedIn"><LinkedInIcon /></Social>
            <Social href={site.social.whatsapp} label="WhatsApp"><MessageCircle className="h-4 w-4" /></Social>
          </div>
        </motion.div>

        <motion.div variants={col}>
          <h4 className="eyebrow text-navy-900">Services</h4>
          <ul className="mt-6 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <FooterLink to={s.path}>{s.navTitle}</FooterLink>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={col}>
          <h4 className="eyebrow text-navy-900">Navigation</h4>
          <ul className="mt-6 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}><FooterLink to={l.to}>{l.label}</FooterLink></li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={col}>
          <h4 className="eyebrow text-navy-900">Contact</h4>
          <ul className="mt-6 space-y-4 text-sm text-ink-600">
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><a href={`mailto:${site.contact.email}`} className="hover:text-navy-900">{site.contact.email}</a></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><a href={`tel:${site.contact.phone}`} className="hover:text-navy-900">{site.contact.phone}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><span>{site.contact.address}</span></li>
          </ul>
          <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-teal-600">
            Send an enquiry <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-navy-800/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Imagery is illustrative and does not depict Infynex projects or clients.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-navy-900">
      <span className="h-px w-0 bg-teal-500 transition-all duration-500 group-hover:w-4" />
      {children}
    </Link>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href} target="_blank" rel="noreferrer" aria-label={label} data-cursor="hover"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-800/15 text-navy-900 transition-all duration-500 hover:-translate-y-1 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
    >
      {children}
    </a>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}
