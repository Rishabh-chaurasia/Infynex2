import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
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
        className="container-x relative grid gap-8 py-10 sm:grid-cols-2 sm:gap-12 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-14 2xl:gap-14 2xl:py-20"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div variants={col} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
          <motion.img src={site.logo} alt={site.name} className="h-10 w-auto sm:h-12 2xl:h-14" whileHover={{ scale: 1.06 }} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600 sm:mt-6 sm:text-base">{site.tagline}</p>
          <div className="mt-5 flex gap-3 sm:mt-8">
            <Social href={site.social.linkedin} label="LinkedIn" brand="linkedin"><LinkedInIcon /></Social>
            <Social href={site.social.whatsapp} label="WhatsApp" brand="whatsapp"><WhatsAppIcon /></Social>
          </div>
        </motion.div>

        <motion.div variants={col} whileHover={{ x: 4 }} transition={{ duration: 0.3 }} className="hidden sm:block">
          <h4 className="eyebrow text-navy-900">Services</h4>
          <ul className="mt-6 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <FooterLink to={s.path}>{s.navTitle}</FooterLink>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={col} whileHover={{ x: 4 }} transition={{ duration: 0.3 }} className="hidden sm:block">
          <h4 className="eyebrow text-navy-900">Navigation</h4>
          <ul className="mt-6 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}><FooterLink to={l.to}>{l.label}</FooterLink></li>
            ))}
          </ul>
        </motion.div>

        <motion.div id="footer-contact" variants={col} whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="order-2 scroll-mt-28 rounded-2xl border border-navy-800/10 bg-white/70 p-5 shadow-sm sm:order-none sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          <h4 className="eyebrow text-navy-900">Contact</h4>
          <ul className="mt-6 space-y-4 text-sm text-ink-600">
            <li className="flex gap-3 transition-transform duration-300 hover:translate-x-1"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><a href={`mailto:${site.contact.email}`} className="hover:text-navy-900">{site.contact.email}</a></li>
            <li className="flex gap-3 transition-transform duration-300 hover:translate-x-1"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><a href={`tel:${site.contact.phone}`} className="hover:text-navy-900">{site.contact.phone}</a></li>
            <li className="flex gap-3 transition-transform duration-300 hover:translate-x-1"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><span>{site.contact.address}</span></li>
          </ul>
          <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-teal-600">
            Send an enquiry <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div variants={col} className="order-3 grid gap-3 sm:hidden">
          <details className="group rounded-2xl border border-navy-800/10 bg-white/70 px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold text-navy-900">
              Services <span className="text-xl font-light text-teal-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-navy-800/10 pt-4">
              {services.map((s) => <li key={s.slug}><FooterLink to={s.path}>{s.navTitle}</FooterLink></li>)}
            </ul>
          </details>
          <details className="group rounded-2xl border border-navy-800/10 bg-white/70 px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold text-navy-900">
              Quick links <span className="text-xl font-light text-teal-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-800/10 pt-4">
              {navLinks.map((l) => <li key={l.to}><FooterLink to={l.to}>{l.label}</FooterLink></li>)}
            </ul>
          </details>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-navy-800/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-4 text-[.7rem] text-ink-400 md:flex-row md:items-center md:text-xs 2xl:py-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
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

function Social({ href, label, brand, children }: { href: string; label: string; brand: 'linkedin' | 'whatsapp'; children: React.ReactNode }) {
  const brandClass = brand === 'linkedin'
    ? 'border-[#0A66C2] bg-[#0A66C2] text-white shadow-[0_8px_20px_rgba(10,102,194,.24)] hover:bg-[#084f96]'
    : 'border-[#25D366] bg-[#25D366] text-white shadow-[0_8px_20px_rgba(37,211,102,.24)] hover:bg-[#1eaa52]'

  return (
    <a
      href={href} target="_blank" rel="noreferrer" aria-label={label} data-cursor="hover"
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 hover:-translate-y-1 ${brandClass}`}
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.83 9.83 0 0 0-8.45 14.86L2 22l5.28-1.55A9.96 9.96 0 1 0 12.04 2Zm0 17.98a8.05 8.05 0 0 1-4.1-1.12l-.3-.18-3.13.92.94-3.05-.2-.31a7.92 7.92 0 1 1 6.79 3.74Zm4.43-5.94c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.55.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.27 7.27 0 0 1-1.34-1.66c-.14-.24-.02-.37.1-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.31-.75-1.8-.2-.47-.4-.4-.55-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.57 4.09 3.6.57.25 1.02.39 1.36.5.57.18 1.09.16 1.5.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}
