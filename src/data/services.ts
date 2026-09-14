import type { LucideIcon } from 'lucide-react'
import {
  Wrench, Cpu, Server, Cloud, PhoneCall, Bot, Headset, Car, Sun,
} from 'lucide-react'
import { images } from './images'

export interface ServiceStep {
  title: string
  text: string
}

export interface Service {
  slug: string
  path: string
  title: string
  navTitle: string
  eyebrow: string
  tagline: string
  short: string
  overview: string
  icon: LucideIcon
  accent: string // tailwind-compatible hex used for glows/accents
  hero: string
  gallery: string[]
  highlights: string[]
  capabilities: { title: string; text: string }[]
  process: ServiceStep[]
}

/**
 * Structured service content. Descriptions are intentionally written without
 * statistics, guarantees, SLAs or client claims — those must come from Infynex.
 */
export const services: Service[] = [
  {
    slug: 'amc',
    path: '/services/amc',
    title: 'Annual Maintenance Contracts',
    navTitle: 'AMC',
    eyebrow: 'AMC',
    tagline: 'Year-round maintenance coverage for dependable IT operations.',
    short: 'Preventive maintenance, responsive repairs and coordinated support under one clearly defined contract.',
    overview:
      'Our AMC service combines scheduled preventive maintenance, fault diagnosis, repairs and service documentation under one accountable contract. This structured approach supports equipment reliability, operational continuity and clearer maintenance planning.',
    icon: Wrench,
    accent: '#1a9dc3',
    hero: images.amcHero,
    gallery: [images.amcTech, images.amcRack, images.amcDesk],
    highlights: ['Desktops, laptops and workstations', 'Servers and storage', 'Networking equipment', 'Printers and peripherals', 'UPS and power backup', 'Preventive health checks'],
    capabilities: [
      { title: 'Preventive maintenance', text: 'Scheduled inspections, cleaning, firmware reviews and health checks designed to identify risks before operations are affected.' },
      { title: 'Corrective support', text: 'Structured fault diagnosis and repair, including replacement-part coordination where required.' },
      { title: 'Asset documentation', text: 'Accurate records of covered equipment, service history, completed work and technical recommendations.' },
      { title: 'Centralised coordination', text: 'One accountable team coordinates every asset and service activity included within the contract.' },
    ],
    process: [
      { title: 'Asset audit', text: 'Covered equipment is surveyed, assessed and documented before service commencement.' },
      { title: 'Service agreement', text: 'Scope, coverage, visit frequency and responsibilities are clearly defined within the contract.' },
      { title: 'Scheduled maintenance', text: 'Preventive service is completed to an agreed calendar, with documentation issued after every visit.' },
      { title: 'Ongoing support', text: 'Reported faults are managed throughout the contract term, supported by periodic service reviews.' },
    ],
  },
  {
    slug: 'hardware',
    path: '/services/hardware',
    title: 'Hardware',
    navTitle: 'Hardware',
    eyebrow: 'Hardware',
    tagline: 'Business-ready hardware specified for performance and reliability.',
    short: 'Specification, supply, installation, upgrades and repairs for workplace computing and network equipment.',
    overview:
      'We specify, procure, deploy and maintain hardware aligned with your users, workloads and operating environment. Our coverage includes computers, servers, network devices, peripherals and supporting office technology.',
    icon: Cpu,
    accent: '#2ab7dd',
    hero: images.hwHero,
    gallery: [images.hwBoard, images.hwPc, images.hwLaptop, images.hwCables],
    highlights: ['Desktops and laptops', 'Servers and storage', 'Switches, routers and access points', 'Monitors, printers and peripherals', 'Memory, storage and component upgrades', 'Structured cabling accessories'],
    capabilities: [
      { title: 'Specification and supply', text: 'Requirement-led specification and procurement of compatible, fit-for-purpose equipment.' },
      { title: 'Installation and setup', text: 'Professional installation, configuration, testing and documented handover for operational readiness.' },
      { title: 'Lifecycle upgrades', text: 'Targeted component and capacity upgrades that extend system value and useful operating life.' },
      { title: 'Repair and replacement', text: 'Fault diagnosis, repair coordination and appropriate replacement of failed equipment.' },
    ],
    process: [
      { title: 'Requirements assessment', text: 'User needs, workloads, compatibility and operating conditions are assessed.' },
      { title: 'Technical recommendation', text: 'Suitable equipment is proposed against the approved specification and budget.' },
      { title: 'Deployment', text: 'Equipment is installed, configured and tested within the operating environment.' },
      { title: 'Lifecycle support', text: 'Repairs, replacements and upgrades are coordinated throughout the equipment lifecycle.' },
    ],
  },
  {
    slug: 'it-infra',
    path: '/services/it-infra',
    title: 'IT Infrastructure & Services',
    navTitle: 'IT Infra & Services',
    eyebrow: 'IT Infrastructure',
    tagline: 'Integrated networks and systems engineered for secure business connectivity.',
    short: 'Design, deployment and management of resilient networks, servers and connected workplace systems.',
    overview:
      'We design and deploy secure, resilient networks, servers and storage for new and existing workplaces. Every environment is fully documented and supported for dependable day-to-day management and future growth.',
    icon: Server,
    accent: '#6fd3ee',
    hero: images.infraHero,
    gallery: [images.infraRack, images.infraDc, images.infraCables],
    highlights: ['LAN / WAN design and implementation', 'Server and storage deployment', 'Structured cabling', 'Firewall and network security', 'Wireless coverage', 'Monitoring and management'],
    capabilities: [
      { title: 'Design', text: 'Purpose-built architecture aligned with your users, applications, performance requirements and future growth.' },
      { title: 'Installation', text: 'Professional installation of racks, structured cabling and equipment, followed by complete testing and commissioning.' },
      { title: 'Security', text: 'Network segmentation, firewalls and access controls integrated from the outset to protect critical systems and data.' },
      { title: 'Managed services', text: 'Proactive monitoring, patching and administration that keeps your infrastructure secure, stable and performing reliably.' },
    ],
    process: [
      { title: 'Assessment', text: 'The current environment, operational dependencies and future capacity requirements are evaluated.' },
      { title: 'Architecture', text: 'A detailed technical design and bill of materials establish the delivery framework.' },
      { title: 'Implementation', text: 'Infrastructure is deployed, tested and commissioned in controlled stages with minimal disruption.' },
      { title: 'Managed support', text: 'Ongoing monitoring, maintenance and optimisation sustain performance and security.' },
    ],
  },
  {
    slug: 'cloud-server',
    path: '/services/cloud-server',
    title: 'Cloud Server',
    navTitle: 'Cloud Server',
    eyebrow: 'Cloud',
    tagline: 'Secure cloud infrastructure designed to scale with your business.',
    short: 'Provisioning, migration and ongoing management of cloud servers, applications and hosted data environments.',
    overview:
      'We provision secure cloud environments, migrate applications and data, configure controlled access and manage ongoing operations. The result is a scalable platform supported by structured administration, monitoring and recovery practices.',
    icon: Cloud,
    accent: '#1a9dc3',
    hero: images.cloudHero,
    gallery: [images.cloudDc, images.cloudRack, images.cloudCode],
    highlights: ['Cloud server setup', 'App and data transfer', 'Backup and recovery', 'Secure user access', 'Cost and capacity checks', 'Regular management'],
    capabilities: [
      { title: 'Cloud provisioning', text: 'Right-sized compute, storage and network resources configured around application workloads.' },
      { title: 'Controlled migration', text: 'Applications and data are migrated through a tested plan with validation and rollback provisions.' },
      { title: 'Security and resilience', text: 'Access controls, patching, backup and recovery practices are applied consistently across the environment.' },
      { title: 'Ongoing management', text: 'Monitoring, updates, capacity reviews and technical support continue after production launch.' },
    ],
    process: [
      { title: 'Discovery', text: 'Workloads, dependencies, security controls and capacity requirements are documented.' },
      { title: 'Solution design', text: 'Platform selection, resource sizing and the migration sequence are formally defined.' },
      { title: 'Migration', text: 'Workloads are transferred, validated and commissioned through controlled stages.' },
      { title: 'Management', text: 'The environment is monitored, maintained and optimised throughout its lifecycle.' },
    ],
  },
  {
    slug: 'tele-services',
    path: '/services/tele-services',
    title: 'Tele Services Outsourcing',
    navTitle: 'Tele Services',
    eyebrow: 'Tele Services',
    tagline: 'Structured customer communication delivered by trained professionals.',
    short: 'Managed inbound, outbound and follow-up communication delivered through trained teams and defined workflows.',
    overview:
      'Our trained teams manage inbound calls, outbound campaigns and customer follow-ups through approved scripts, escalation paths and quality controls. Clear reporting provides visibility across call activity, outcomes and customer feedback.',
    icon: PhoneCall,
    accent: '#2ab7dd',
    hero: images.teleHero,
    gallery: [images.teleAgent, images.teleTeam, images.teleAntenna],
    highlights: ['Inbound call handling', 'Outbound calling campaigns', 'Customer follow-up and reminders', 'Lead qualification', 'Multilingual communication', 'Reporting on call activity'],
    capabilities: [
      { title: 'Inbound services', text: 'Customer calls are answered, routed and resolved in accordance with the approved service process.' },
      { title: 'Outbound services', text: 'Structured calling supports follow-ups, surveys, renewals and targeted campaigns.' },
      { title: 'Process governance', text: 'Scripts, escalation paths, quality standards and review controls are clearly documented.' },
      { title: 'Performance reporting', text: 'Clear reports provide visibility into call volumes, outcomes, trends and customer feedback.' },
    ],
    process: [
      { title: 'Service briefing', text: 'Customer profiles, service objectives, communication standards and brand tone are documented.' },
      { title: 'Operational setup', text: 'Scripts, systems, escalation paths and team training are completed before launch.' },
      { title: 'Service delivery', text: 'Calls are managed through defined workflows with ongoing quality monitoring.' },
      { title: 'Performance review', text: 'Regular reporting and structured reviews support continuous service improvement.' },
    ],
  },
  {
    slug: 'robotic-duct-cleaning',
    path: '/services/robotic-duct-cleaning',
    title: 'Robotic Duct Cleaning',
    navTitle: 'Robotic Duct Cleaning',
    eyebrow: 'Robotic Cleaning',
    tagline: 'Precision robotic cleaning supported by camera-guided inspection.',
    short: 'Documented robotic inspection and cleaning for HVAC and ventilation systems across commercial and industrial facilities.',
    overview:
      'Camera-equipped robotic systems inspect and clean internal HVAC ductwork with controlled precision. Before-and-after footage, visual verification and structured service documentation provide a clear record of completed work.',
    icon: Bot,
    accent: '#6fd3ee',
    hero: images.ductHero,
    gallery: [images.ductRobot, images.ductIndustrial, images.ductInspection, images.ductPipes],
    highlights: ['HVAC supply and return ducts', 'Commercial and office buildings', 'Industrial ventilation', 'Camera inspection before and after', 'Brush and vacuum cleaning', 'Documented reports'],
    capabilities: [
      { title: 'Internal inspection', text: 'Robot-mounted cameras document the condition and accessibility of the internal duct network.' },
      { title: 'Robotic cleaning', text: 'Rotating brushes and controlled negative-pressure extraction remove accumulated dust and debris.' },
      { title: 'Live monitoring', text: 'Real-time video enables operators to verify progress and address individual sections precisely.' },
      { title: 'Service reporting', text: 'Before-and-after footage and a detailed completion record document the delivered service.' },
    ],
    process: [
      { title: 'Site inspection', text: 'Duct routes, access points and internal conditions are assessed through a robotic camera survey.' },
      { title: 'Sectional cleaning', text: 'Brush and vacuum cleaning is completed systematically across each accessible duct section.' },
      { title: 'Visual verification', text: 'Live monitoring confirms cleaning progress and supports targeted corrective passes.' },
      { title: 'Completion record', text: 'Final inspection, access-point closure and service documentation complete the process.' },
    ],
  },
  {
    slug: 'technical-support',
    path: '/services/technical-support',
    title: 'Technical & Helpdesk Support',
    navTitle: 'Technical & Helpdesk Support',
    eyebrow: 'On-site & Remote Support',
    tagline: 'Responsive remote assistance backed by coordinated on-site engineering.',
    short: 'Structured helpdesk support and on-site engineering for incidents, repairs, installations and user assistance.',
    overview:
      'Our helpdesk records, prioritises and resolves user requests through approved support channels. Remote resolution is supported by coordinated on-site engineering whenever physical intervention, repair or installation is required.',
    icon: Headset,
    accent: '#1a9dc3',
    hero: images.tsHero,
    gallery: [images.tsOffice, images.hdTeam, images.tsFix, images.hdAgent],
    highlights: ['Phone and email helpdesk', 'Ticket logging and tracking', 'Remote troubleshooting', 'Resident or scheduled engineers', 'Installations and repairs', 'Escalation to specialist teams'],
    capabilities: [
      { title: 'Remote helpdesk', text: 'Requests are logged, prioritised and resolved through phone, email and secure remote access.' },
      { title: 'On-site engineering', text: 'Qualified engineers attend your location during agreed coverage hours or scheduled visits.' },
      { title: 'Structured escalation', text: 'Incidents requiring physical intervention transfer to an engineer with complete service context.' },
      { title: 'Project assistance', text: 'Additional technical capacity supports rollouts, workplace relocations, installations and upgrades.' },
    ],
    process: [
      { title: 'Request logging', text: 'User requests are recorded through the agreed phone, email or service channel.' },
      { title: 'Remote resolution', text: 'The helpdesk diagnoses, prioritises and resolves incidents remotely wherever appropriate.' },
      { title: 'On-site resolution', text: 'An engineer attends with full incident context when physical intervention is required.' },
      { title: 'Service reporting', text: 'Regular summaries document completed work, recurring trends and technical recommendations.' },
    ],
  },
  {
    slug: 'vehicle-vendor',
    path: '/services/vehicle-vendor',
    title: 'Business Vehicle Supply',
    navTitle: 'Business Vehicle Supply',
    eyebrow: 'Vehicle Supply',
    tagline: 'Business vehicle procurement coordinated from selection through delivery.',
    short: 'Structured procurement and supply of new vehicles at the scale required by your organisation.',
    overview:
      'Our business vehicle service coordinates fleet planning, vehicle selection, procurement, registration and delivery under a clearly defined commercial agreement. A dedicated account team manages documentation, billing and ongoing coordination for both focused and large-scale fleet requirements.',
    icon: Car,
    accent: '#6fd3ee',
    hero: images.vvHero,
    gallery: [images.vvFleet, images.vvRoad, images.vvCar],
    highlights: ['New vehicle procurement', 'Small and large fleet requirements', 'Vehicle selection support', 'Registration and delivery coordination', 'Dedicated account management', 'Clear commercial billing'],
    capabilities: [
      { title: 'Fleet planning', text: 'Vehicle quantity, type, intended use, delivery locations and commercial parameters are documented.' },
      { title: 'Vehicle procurement', text: 'Approved new vehicles are sourced, purchased and prepared against the agreed specification.' },
      { title: 'Business deployment', text: 'Registration, documentation, scheduling and delivery are coordinated across the organisation.' },
      { title: 'Account support', text: 'A dedicated team manages service records, commercial billing and ongoing fleet coordination.' },
    ],
    process: [
      { title: 'Requirements definition', text: 'Vehicle types, quantities, usage profiles, locations and commercial terms are confirmed.' },
      { title: 'Fleet proposal', text: 'The recommended fleet structure, pricing framework and delivery schedule are documented.' },
      { title: 'Procurement', text: 'Approved vehicles are sourced, purchased and prepared for organisational deployment.' },
      { title: 'Delivery and support', text: 'Documentation and handover are completed with ongoing account coordination.' },
    ],
  },
  {
    slug: 'solar',
    path: '/services/solar',
    title: 'Solar System & Services',
    navTitle: 'Solar System & Services',
    eyebrow: 'ESG Solutions',
    tagline: 'Complete solar systems designed, installed and maintained professionally.',
    short: 'End-to-end solar design, installation, commissioning and maintenance for commercial, industrial and residential sites.',
    overview:
      'Our solar service covers site assessment, system design, equipment selection, installation, commissioning and scheduled maintenance. Every solution is aligned with site conditions, energy requirements, electrical safety and long-term operating performance.',
    icon: Sun,
    accent: '#f5b544',
    hero: images.solarHero,
    gallery: [images.solarField, images.solarInstall, images.solarRoof],
    highlights: ['Rooftop solar systems', 'Ground-mounted installations', 'Inverters and electrical works', 'Site survey and design', 'Panel cleaning and servicing', 'Performance checks'],
    capabilities: [
      { title: 'Survey and design', text: 'Site conditions, shading, electrical infrastructure and energy demand inform the system design.' },
      { title: 'Professional installation', text: 'Mounting structures, panels, inverters, cabling and safety systems are installed to the approved design.' },
      { title: 'Testing and commissioning', text: 'Performance, protection and electrical systems are tested before documented handover.' },
      { title: 'Scheduled maintenance', text: 'Panel cleaning, system checks and preventive servicing support consistent long-term operation.' },
    ],
    process: [
      { title: 'Site assessment', text: 'Site conditions, available area, electrical infrastructure and energy requirements are evaluated.' },
      { title: 'System design', text: 'The system layout, component specification and implementation proposal are prepared.' },
      { title: 'Installation', text: 'Structures, panels, inverters and electrical systems are integrated and commissioned.' },
      { title: 'Maintenance', text: 'Scheduled servicing, cleaning and performance checks support reliable operation.' },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

