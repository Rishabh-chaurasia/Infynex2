import offices from '../assets/industries/offices.jpg'
import warehouses from '../assets/industries/warehouses.jpg'
import factories from '../assets/industries/factories.jpg'
import retail from '../assets/industries/retail.jpg'
import education from '../assets/industries/education.jpg'
import builders from '../assets/industries/builders-india.webp'

export interface Industry {
  id: string
  title: string
  description: string
  services: string[]
  image: string
  accent: string
}

export const industries: Industry[] = [
  {
    id: 'offices',
    title: 'Commercial Offices',
    description: 'IT, maintenance and support that fit your working hours.',
    services: ['amc', 'hardware', 'it-infra', 'technical-support'],
    image: offices,
    accent: '#258fcb',
  },
  {
    id: 'warehouses',
    title: 'Warehouses & Logistics',
    description: 'Reliable IT, maintenance and transport for busy sites.',
    services: ['amc', 'it-infra', 'vehicle-vendor', 'solar'],
    image: warehouses,
    accent: '#ef8d3e',
  },
  {
    id: 'factories',
    title: 'Factories & Plants',
    description: 'Maintenance, clean ventilation and IT support for production sites.',
    services: ['amc', 'robotic-duct-cleaning', 'solar'],
    image: factories,
    accent: '#2eae72',
  },
  {
    id: 'retail',
    title: 'Retail & Hospitality',
    description: 'Equipment, IT help and ventilation care for customer-facing spaces.',
    services: ['hardware', 'technical-support', 'robotic-duct-cleaning'],
    image: retail,
    accent: '#9a64d5',
  },
  {
    id: 'education',
    title: 'Schools & Hospitals',
    description: 'Technical support and equipment planned around daily operations.',
    services: ['it-infra', 'hardware', 'amc', 'technical-support'],
    image: education,
    accent: '#e05a83',
  },
  {
    id: 'builders',
    title: 'Builders & Contractors',
    description: 'Site services, project support and clear handover records.',
    services: ['solar', 'vehicle-vendor', 'it-infra'],
    image: builders,
    accent: '#b08b20',
  },
]
