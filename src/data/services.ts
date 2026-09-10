import type { LucideIcon } from 'lucide-react'
import {
  Wrench, Cpu, Server, Cloud, PhoneCall, Bot, HardHat, Headset, Car, Sun, Handshake,
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
    tagline: 'Keep every system in service, all year round.',
    short: 'Planned, contract-based maintenance for IT equipment and infrastructure — preventive visits, repairs and support under one agreement.',
    overview:
      'An Annual Maintenance Contract with Infynex places your IT equipment and supporting infrastructure under a single, planned maintenance programme. Instead of reacting to breakdowns, scheduled inspections, preventive servicing and prompt repair support keep your environment stable and predictable for the full contract period.',
    icon: Wrench,
    accent: '#1a9dc3',
    hero: images.amcHero,
    gallery: [images.amcTech, images.amcRack, images.amcDesk],
    highlights: ['Desktops, laptops and workstations', 'Servers and storage', 'Networking equipment', 'Printers and peripherals', 'UPS and power backup', 'Preventive health checks'],
    capabilities: [
      { title: 'Preventive maintenance', text: 'Scheduled inspections, cleaning, firmware and health checks that catch issues before they interrupt work.' },
      { title: 'Corrective support', text: 'Diagnosis and repair of faults raised during the contract, with parts coordination where required.' },
      { title: 'Asset documentation', text: 'A maintained record of covered equipment, service history and recommendations.' },
      { title: 'Single point of contact', text: 'One agreement and one team responsible for the health of your covered infrastructure.' },
    ],
    process: [
      { title: 'Audit', text: 'We survey the equipment to be covered and document its condition.' },
      { title: 'Agreement', text: 'Scope, visit frequency and coverage are agreed and written into the contract.' },
      { title: 'Scheduled service', text: 'Preventive visits run on the agreed calendar with reports after each visit.' },
      { title: 'Ongoing support', text: 'Faults are attended under the contract for the full term, with periodic reviews.' },
    ],
  },
  {
    slug: 'hardware',
    path: '/services/hardware',
    title: 'Hardware',
    navTitle: 'Hardware',
    eyebrow: 'Hardware',
    tagline: 'The physical foundation of your workplace technology.',
    short: 'Supply, installation, upgrade and repair of computing, networking and peripheral hardware for offices and facilities.',
    overview:
      'From individual workstations to rack-mounted equipment, Infynex sources, installs and services the hardware your organisation runs on. We help you specify the right equipment for the job, deploy it cleanly and keep it performing through upgrades and repairs.',
    icon: Cpu,
    accent: '#2ab7dd',
    hero: images.hwHero,
    gallery: [images.hwBoard, images.hwPc, images.hwLaptop, images.hwCables],
    highlights: ['Desktops and laptops', 'Servers and storage', 'Switches, routers and access points', 'Monitors, printers and peripherals', 'Memory, storage and component upgrades', 'Structured cabling accessories'],
    capabilities: [
      { title: 'Specification and supply', text: 'Requirement-led recommendations and procurement of suitable equipment.' },
      { title: 'Installation and setup', text: 'Physical installation, configuration and handover, ready for use.' },
      { title: 'Upgrades', text: 'Component and capacity upgrades that extend the working life of existing systems.' },
      { title: 'Repair and replacement', text: 'Fault diagnosis, repair and like-for-like replacement of failed equipment.' },
    ],
    process: [
      { title: 'Requirement', text: 'Understand workloads, users and the environment.' },
      { title: 'Recommend', text: 'Propose equipment that fits the requirement and budget.' },
      { title: 'Deploy', text: 'Install, configure and test on site.' },
      { title: 'Support', text: 'Upgrade and repair through the lifecycle.' },
    ],
  },
  {
    slug: 'it-infra',
    path: '/services/it-infra',
    title: 'IT Infrastructure & Services',
    navTitle: 'IT Infra & Services',
    eyebrow: 'IT Infrastructure',
    tagline: 'Networks, servers and systems designed to work together.',
    short: 'Design, implementation and management of the networks, servers and systems that connect your organisation.',
    overview:
      'Infynex plans and builds IT infrastructure as a connected whole — network, compute, storage, security and the services that run on top. Whether you are setting up a new office or modernising an existing environment, we deliver infrastructure that is documented, resilient and ready to grow.',
    icon: Server,
    accent: '#6fd3ee',
    hero: images.infraHero,
    gallery: [images.infraRack, images.infraDc, images.infraCables],
    highlights: ['LAN / WAN design and implementation', 'Server and storage deployment', 'Structured cabling', 'Firewall and network security', 'Wireless coverage', 'Monitoring and management'],
    capabilities: [
      { title: 'Design', text: 'Architecture that reflects how your teams and applications actually communicate.' },
      { title: 'Implementation', text: 'Racking, cabling, configuration and commissioning carried out by our engineers.' },
      { title: 'Security', text: 'Segmentation, firewalls and access controls built in from the start.' },
      { title: 'Managed services', text: 'Ongoing monitoring, patching and administration of the environment.' },
    ],
    process: [
      { title: 'Assess', text: 'Review the current state and future requirements.' },
      { title: 'Architect', text: 'Produce a design and bill of materials.' },
      { title: 'Build', text: 'Implement in stages with minimal disruption.' },
      { title: 'Operate', text: 'Monitor, maintain and evolve the infrastructure.' },
    ],
  },
  {
    slug: 'cloud-server',
    path: '/services/cloud-server',
    title: 'Cloud Server',
    navTitle: 'Cloud Server',
    eyebrow: 'Cloud',
    tagline: 'Compute and storage that scale with your business.',
    short: 'Provisioning, migration and management of cloud servers and hosted environments for applications and data.',
    overview:
      'Infynex helps organisations move workloads to cloud servers and run them well. We provision environments, migrate applications and data, secure access and manage day-to-day operations — so your teams can focus on using the platform rather than maintaining it.',
    icon: Cloud,
    accent: '#1a9dc3',
    hero: images.cloudHero,
    gallery: [images.cloudDc, images.cloudRack, images.cloudCode],
    highlights: ['Cloud server provisioning', 'Application and data migration', 'Backup and recovery configuration', 'Access and identity management', 'Cost and capacity reviews', 'Ongoing administration'],
    capabilities: [
      { title: 'Provisioning', text: 'Right-sized virtual servers, storage and networking configured for your workloads.' },
      { title: 'Migration', text: 'Planned movement of applications and data with testing and rollback paths.' },
      { title: 'Security', text: 'Hardened access, patching and backup practices applied consistently.' },
      { title: 'Management', text: 'Monitoring, updates and support for the environment after go-live.' },
    ],
    process: [
      { title: 'Discover', text: 'Map workloads, dependencies and requirements.' },
      { title: 'Plan', text: 'Choose the platform, sizing and migration approach.' },
      { title: 'Migrate', text: 'Move, validate and cut over in controlled stages.' },
      { title: 'Manage', text: 'Operate and optimise the environment over time.' },
    ],
  },
  {
    slug: 'tele-services',
    path: '/services/tele-services',
    title: 'Tele Services Outsourcing',
    navTitle: 'Tele Services',
    eyebrow: 'Tele Services',
    tagline: 'Professional voice and communication support, outsourced.',
    short: 'Outsourced tele-calling, customer communication and telecom support services delivered by trained teams.',
    overview:
      'Infynex provides outsourced tele services so that your customer communication is handled consistently and professionally. Our teams manage inbound and outbound calling, follow-ups and communication workflows on your behalf, using scripts and processes agreed with you.',
    icon: PhoneCall,
    accent: '#2ab7dd',
    hero: images.teleHero,
    gallery: [images.teleAgent, images.teleTeam, images.teleAntenna],
    highlights: ['Inbound call handling', 'Outbound calling campaigns', 'Customer follow-up and reminders', 'Lead qualification', 'Multilingual communication', 'Reporting on call activity'],
    capabilities: [
      { title: 'Inbound', text: 'Answering, routing and resolving customer calls according to your process.' },
      { title: 'Outbound', text: 'Structured calling for follow-ups, surveys, renewals and campaigns.' },
      { title: 'Process design', text: 'Scripts, escalation paths and quality checks defined with you.' },
      { title: 'Reporting', text: 'Regular visibility into call volumes, outcomes and feedback.' },
    ],
    process: [
      { title: 'Brief', text: 'Understand your customers, offer and tone.' },
      { title: 'Set up', text: 'Scripts, systems and team training.' },
      { title: 'Operate', text: 'Calls handled with quality monitoring.' },
      { title: 'Review', text: 'Reports and continuous improvement.' },
    ],
  },
  {
    slug: 'robotic-duct-cleaning',
    path: '/services/robotic-duct-cleaning',
    title: 'Robotic Duct Cleaning',
    navTitle: 'Robotic Duct Cleaning',
    eyebrow: 'Robotic Cleaning',
    tagline: 'Precision cleaning inside HVAC ductwork, guided by camera-equipped robots.',
    short: 'Camera-guided robotic cleaning of HVAC and ventilation ducts for offices, industrial and commercial facilities.',
    overview:
      'Ductwork is difficult to inspect and even harder to clean by hand. Infynex uses robotic equipment fitted with cameras and cleaning attachments to travel inside ducts, inspect their condition, remove accumulated dust and debris, and document the result — with minimal disruption to the building.',
    icon: Bot,
    accent: '#6fd3ee',
    hero: images.ductHero,
    gallery: [images.ductRobot, images.ductIndustrial, images.ductInspection, images.ductPipes],
    highlights: ['HVAC supply and return ducts', 'Commercial and office buildings', 'Industrial ventilation', 'Camera inspection before and after', 'Brush and vacuum cleaning', 'Documented reports'],
    capabilities: [
      { title: 'Inspection', text: 'Robot-mounted cameras record the interior condition of the duct network.' },
      { title: 'Cleaning', text: 'Rotating brushes and negative-pressure extraction remove dust and debris.' },
      { title: 'Monitoring', text: 'Live video lets the operator verify progress and revisit sections as needed.' },
      { title: 'Reporting', text: 'Before-and-after footage and a completion report are shared with you.' },
    ],
    process: [
      { title: 'Inspection', text: 'Robotic camera survey of the duct interior and access points.' },
      { title: 'Cleaning', text: 'Brush and vacuum cleaning carried out section by section.' },
      { title: 'Monitoring', text: 'Live visual verification during the clean.' },
      { title: 'Completion', text: 'Final inspection, sealing of access points and report.' },
    ],
  },
  {
    slug: 'technical-support',
    path: '/services/technical-support',
    title: 'Technical Support at Client Site',
    navTitle: 'Technical Support',
    eyebrow: 'On-site Support',
    tagline: 'Engineers where your users are.',
    short: 'Skilled engineers deployed at your premises for hands-on troubleshooting, installations and day-to-day IT support.',
    overview:
      'Some problems need a person in the room. Infynex places qualified engineers at your site — on a scheduled, resident or on-call basis — to resolve issues hands-on, support users, manage installations and keep your working environment running.',
    icon: HardHat,
    accent: '#1a9dc3',
    hero: images.tsHero,
    gallery: [images.tsOffice, images.tsFix, images.tsDesk],
    highlights: ['Resident or scheduled engineers', 'Desktop and user support', 'Installations and moves', 'Network and printer issues', 'Coordination with vendors', 'Escalation to specialist teams'],
    capabilities: [
      { title: 'Resident engineers', text: 'Dedicated engineers based at your premises during agreed hours.' },
      { title: 'Scheduled visits', text: 'Planned site visits for maintenance and pending tasks.' },
      { title: 'On-call response', text: 'Engineers dispatched when an issue needs hands-on attention.' },
      { title: 'Project assistance', text: 'Additional hands for rollouts, relocations and upgrades.' },
    ],
    process: [
      { title: 'Scope', text: 'Agree coverage hours, locations and responsibilities.' },
      { title: 'Deploy', text: 'Engineers onboarded to your site and systems.' },
      { title: 'Support', text: 'Issues resolved on site with tracked tickets.' },
      { title: 'Report', text: 'Regular summaries of work completed and recommendations.' },
    ],
  },
  {
    slug: 'helpdesk',
    path: '/services/helpdesk',
    title: 'Helpdesk Support',
    navTitle: 'Helpdesk Support',
    eyebrow: 'Helpdesk',
    tagline: 'A single place for every IT request.',
    short: 'Remote helpdesk that logs, prioritises and resolves user requests through phone, email and ticketing.',
    overview:
      'The Infynex helpdesk gives your users one point of contact for IT issues. Requests are logged, categorised and worked through a ticketing process — resolved remotely where possible and escalated to on-site or specialist teams when needed.',
    icon: Headset,
    accent: '#2ab7dd',
    hero: images.hdHero,
    gallery: [images.hdTeam, images.hdAgent, images.hdScreen],
    highlights: ['Phone, email and portal intake', 'Ticket logging and tracking', 'Remote troubleshooting', 'User account and access requests', 'Escalation management', 'Knowledge base and reporting'],
    capabilities: [
      { title: 'Intake', text: 'Every request captured with the details needed to act on it.' },
      { title: 'Resolution', text: 'Remote diagnosis and fixes for common software, access and device issues.' },
      { title: 'Escalation', text: 'Clear paths to on-site engineers and specialist teams.' },
      { title: 'Visibility', text: 'Reports on ticket volumes, categories and status.' },
    ],
    process: [
      { title: 'Log', text: 'User raises a request by phone, email or portal.' },
      { title: 'Triage', text: 'Ticket categorised and prioritised.' },
      { title: 'Resolve', text: 'Remote resolution or escalation.' },
      { title: 'Close', text: 'Confirmation with the user and record update.' },
    ],
  },
  {
    slug: 'vehicle-vendor',
    path: '/services/vehicle-vendor',
    title: 'Vehicle Vendor',
    navTitle: 'Vehicle Vendor',
    eyebrow: 'Vehicle Services',
    tagline: 'Reliable vehicles for business movement.',
    short: 'Vehicle vendor services for corporate transport, staff movement and business logistics needs.',
    overview:
      'Infynex acts as a vehicle vendor for organisations that need dependable transport — for employees, visitors, events and routine business movement. We coordinate vehicles and drivers against your schedule so that transport is one less thing to manage.',
    icon: Car,
    accent: '#6fd3ee',
    hero: images.vvHero,
    gallery: [images.vvCar, images.vvRoad, images.vvFleet],
    highlights: ['Employee transport', 'Visitor and guest movement', 'Event transportation', 'Scheduled and on-demand trips', 'Driver coordination', 'Trip records and billing'],
    capabilities: [
      { title: 'Scheduled transport', text: 'Recurring routes and shifts planned in advance.' },
      { title: 'On-demand', text: 'Vehicles arranged for ad-hoc business requirements.' },
      { title: 'Coordination', text: 'A single contact managing vehicles, drivers and timings.' },
      { title: 'Records', text: 'Trip logs and consolidated billing for your accounts team.' },
    ],
    process: [
      { title: 'Requirement', text: 'Routes, timings and vehicle types.' },
      { title: 'Plan', text: 'Schedule and allocation.' },
      { title: 'Operate', text: 'Trips run and monitored.' },
      { title: 'Review', text: 'Records shared and plans adjusted.' },
    ],
  },
  {
    slug: 'solar',
    path: '/services/solar',
    title: 'Solar System & Services',
    navTitle: 'Solar System & Services',
    eyebrow: 'Solar',
    tagline: 'Clean energy systems, installed and maintained.',
    short: 'Design, installation and maintenance of solar power systems for commercial, industrial and residential sites.',
    overview:
      'Infynex delivers solar energy systems from site survey to commissioning and beyond. We assess your site, design a system suited to the available space and load, install panels and electrical components, and provide ongoing servicing to keep the system producing.',
    icon: Sun,
    accent: '#f5b544',
    hero: images.solarHero,
    gallery: [images.solarField, images.solarInstall, images.solarRoof],
    highlights: ['Rooftop solar systems', 'Ground-mounted installations', 'Inverters and electrical works', 'Site survey and design', 'Panel cleaning and servicing', 'Performance checks'],
    capabilities: [
      { title: 'Survey and design', text: 'Site assessment, shading review and system sizing.' },
      { title: 'Installation', text: 'Mounting, panels, inverters, wiring and safety works.' },
      { title: 'Commissioning', text: 'Testing and handover with documentation.' },
      { title: 'Maintenance', text: 'Cleaning, inspection and servicing programmes.' },
    ],
    process: [
      { title: 'Survey', text: 'Assess the site and energy requirement.' },
      { title: 'Design', text: 'System layout, components and proposal.' },
      { title: 'Install', text: 'Structure, panels and electrical integration.' },
      { title: 'Maintain', text: 'Ongoing servicing and performance checks.' },
    ],
  },
  {
    slug: 'b2b-b2c',
    path: '/services/b2b-b2c',
    title: 'B2B & B2C',
    navTitle: 'B2B & B2C',
    eyebrow: 'B2B & B2C',
    tagline: 'Services shaped for businesses and for individuals.',
    short: 'Technology and service offerings tailored to business clients and to individual customers.',
    overview:
      'Infynex serves both organisations and individual customers. Business clients receive structured, contract-based services across our portfolio; individual customers receive accessible, well-supported services for home and personal needs.',
    icon: Handshake,
    accent: '#1a9dc3',
    hero: images.b2bHero,
    gallery: [images.b2bMeeting, images.b2bOffice, images.b2cStore, images.b2cPeople],
    highlights: ['Corporate service agreements', 'Multi-site support', 'Consumer sales and support', 'Home installations', 'Dedicated account contact', 'Flexible engagement models'],
    capabilities: [
      { title: 'B2B engagements', text: 'Contracts, SLAs and account management defined with each client.' },
      { title: 'B2C services', text: 'Straightforward services and support for individual customers.' },
      { title: 'Cross-portfolio', text: 'Any Infynex service delivered under the right engagement model.' },
      { title: 'Account care', text: 'A consistent point of contact for questions and requests.' },
    ],
    process: [
      { title: 'Understand', text: 'Who you are and what you need.' },
      { title: 'Propose', text: 'The right service and engagement model.' },
      { title: 'Deliver', text: 'Service delivered to the agreed scope.' },
      { title: 'Support', text: 'Ongoing care and follow-up.' },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
