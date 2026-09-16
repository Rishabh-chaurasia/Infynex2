import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { site, navLinks } from '../../data/site'
import { services } from '../../data/services'
import { EASE } from '../../utils/motion'
import MagneticButton from '../ui/MagneticButton'

const navServices = [
  { slug: 'it-infra', label: 'IT Infra & Services' },
  { slug: 'cloud-server', label: 'Cloud Server' },
  { slug: 'hardware', label: 'Hardware' },
  { slug: 'amc', label: 'AMC' },
  { slug: 'technical-support', label: 'Technical & Helpdesk Support' },
  { slug: 'tele-services', label: 'Tele Services' },
  { slug: 'robotic-duct-cleaning', label: 'Robotic Duct Cleaning' },
  { slug: 'solar', label: 'Solar System Services' },
  { slug: 'vehicle-vendor', label: 'Business Vehicle Supply' },
].map(({ slug, label }) => ({ service: services.find((item) => item.slug === slug)!, label }))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))
  // Service pages open on dark photographic heroes; a light glass keeps the
  // navy logo legible there from the first frame instead of waiting for scroll.
  const darkHero = location.pathname === '/' || location.pathname.startsWith('/services') || location.pathname === '/industries'
  const solid = scrolled || mega || darkHero
  useEffect(() => { setOpen(false); setMega(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const openFooterContact = () => {
    setOpen(false)
    window.requestAnimationFrame(() => document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `group/nav relative rounded-full px-3.5 py-2 font-display text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-teal-500/10 text-teal-700' : 'text-ink-600 hover:-translate-y-0.5 hover:bg-[#edf9fc] hover:text-teal-700'}`

  return (
    <>
      <motion.header
        initial={false}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${solid ? 'border-teal-500/15 bg-white/90 backdrop-blur-2xl' : 'border-transparent bg-transparent'} ${scrolled || mega ? 'shadow-[0_14px_45px_-22px_rgba(11,21,51,0.3)]' : ''}`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="container-x flex items-center justify-between transition-all duration-500" style={{ height: scrolled ? 'calc(var(--nav-h) * .8)' : 'var(--nav-h)' }}>
          <Link to="/" className="relative z-10 flex items-center" aria-label={`${site.name} home`}>
            <img src={site.logo} alt={site.name} className={`w-auto transition-all duration-500 ${scrolled ? 'h-9' : 'h-11'}`} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {navLinks.map((l) =>
              l.label === 'Services' ? (
                <div key={l.to} className="relative" onMouseEnter={() => setMega(true)}>
                  <NavLink to={l.to} className={linkCls} end>
                    {({ isActive }) => (
                      <span className="flex items-center gap-1">
                        {l.label}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
                        <ActiveDot active={isActive || location.pathname.startsWith('/services')} />
                      </span>
                    )}
                  </NavLink>
                </div>
              ) : (
                <NavLink key={l.to} to={l.to} className={linkCls} end={l.to === '/'} onMouseEnter={() => setMega(false)}>
                  {({ isActive }) => (
                    <span className="relative">
                      {l.label}
                      <ActiveDot active={isActive} />
                    </span>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton onClick={openFooterContact} variant="dark" className="!bg-gradient-to-r !from-teal-600 !to-[#526ee8] !px-6 !py-3 shadow-[0_10px_26px_rgba(26,157,195,.32)] hover:!from-[#ff7a45] hover:!to-[#ef5d8d]">Get in touch</MagneticButton>
          </div>

          <button
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
              exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-t border-navy-800/5 lg:block"
            >
              <div className="bg-ivory-50/95 backdrop-blur-2xl">
                <div className="container-x grid grid-cols-[1.2fr_3fr] gap-10 py-10">
                  <div className="border-r border-navy-800/10 pr-10">
                    <p className="eyebrow text-teal-600">Services</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-navy-900">Integrated services for dependable business operations.</h3>
                    <p className="mt-3 text-sm text-ink-600">Explore professionally managed solutions designed around your infrastructure, support and operational requirements.</p>
                    <Link to="/services" className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-900">
                      View all services <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <motion.ul
                    className="mega-services-grid grid gap-2"
                    initial="hidden" animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }}
                  >
                    {navServices.map(({ service: s, label }) => {
                      const Icon = s.icon
                      return (
                        <motion.li key={s.slug} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
                          <NavLink
                            to={s.path}
                            className={({ isActive }) =>
                              `group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-navy-900/[0.04] ${isActive ? 'bg-navy-900/[0.05]' : ''}`
                            }
                          >
                            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-all duration-500 group-hover:bg-teal-500 group-hover:rotate-[-6deg]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block whitespace-nowrap font-display text-[.78rem] font-semibold text-navy-900 xl:text-sm">{label}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-ink-600">{s.tagline}</span>
                            </span>
                          </NavLink>
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial="closed" animate="open" exit="closed"
          >
            <motion.div
              className="absolute inset-0 bg-navy-950"
              variants={{ closed: { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }, open: { clipPath: 'circle(150% at calc(100% - 44px) 44px)' } }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-50" />
            <motion.nav
              className="relative flex h-full flex-col overflow-y-auto px-7 pb-10 pt-28"
              variants={{ closed: {}, open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
              aria-label="Mobile"
            >
              {navLinks.map((l) => (
                <motion.div key={l.to} variants={{ closed: { opacity: 0, y: 30, x: -10 }, open: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: EASE } } }} className="border-b border-white/10">
                  {l.label === 'Services' ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-5 font-display text-3xl font-semibold text-white"
                        onClick={() => setMobileServices((v) => !v)}
                        aria-expanded={mobileServices}
                      >
                        Services
                        <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${mobileServices ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServices && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden pb-4"
                          >
                            <li><Link to="/services" className="block py-2 text-teal-300">All services</Link></li>
                            {navServices.map(({ service: s, label }) => (
                              <li key={s.slug}><Link to={s.path} className="block py-2 text-white/75">{label}</Link></li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `block py-5 font-display text-3xl font-semibold ${isActive ? 'text-teal-300' : 'text-white'}`}>
                      {l.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <motion.div variants={{ closed: { opacity: 0, y: 20 }, open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }} className="mt-auto pt-10">
                <MagneticButton onClick={openFooterContact} variant="dark" className="w-full">Get in touch</MagneticButton>
                <div className="mt-6 flex gap-6 text-sm text-white/60">
                  <a href={site.social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
                  <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ActiveDot({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-teal-500"
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      )}
    </AnimatePresence>
  )
}
