/**
 * Site-wide configuration.
 * Everything marked EDIT is a placeholder and should be replaced with real company details.
 */
export const site = {
  name: 'Infynex Technologies',
  shortName: 'Infynex',
  tagline: 'Technology, infrastructure and services — delivered end to end.',
  logo: '/logo.png',
  contact: {
    email: 'info@infyxcorp.com',
    phone: '+91 96899 00056',
    address: '601 & 625, 6th Floor, Eros Square, Sector 49–50, Gurugram, Haryana 122018, India',
    hours: 'Mon – Sat, 9:00 – 18:00', // EDIT
  },
  social: {
    whatsapp: 'https://wa.me/919689900056',
    linkedin: 'https://www.linkedin.com/company/infynex', // EDIT
  },
}

/**
 * Client / trust logos.
 * Names supplied by Infynex. Drop actual logo files into /public/clients and set `logo`.
 * When `logo` is undefined the name renders as an elegant wordmark — no fake logos are generated.
 */
export const clients: { name: string; logo?: string }[] = [
  { name: 'HiringTag', logo: '/clients/hiringtag.png' },
  { name: 'Sandha and Company', logo: '/clients/sandha-company.png' },
  { name: 'Locus', logo: '/clients/locus.png' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
