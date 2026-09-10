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
    email: 'info@infynex.example', // EDIT
    phone: '+91 00000 00000', // EDIT
    address: 'Address line, City, State — PIN', // EDIT
    hours: 'Mon – Sat, 9:00 – 18:00', // EDIT
  },
  social: {
    whatsapp: 'https://wa.me/910000000000', // EDIT
    linkedin: 'https://www.linkedin.com/company/infynex', // EDIT
  },
}

/**
 * Client / trust logos.
 * Names supplied by Infynex. Drop actual logo files into /public/clients and set `logo`.
 * When `logo` is undefined the name renders as an elegant wordmark — no fake logos are generated.
 */
export const clients: { name: string; logo?: string }[] = [
  { name: 'HiringTag' },
  { name: 'Sandha and Company' },
  { name: 'Locus' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
