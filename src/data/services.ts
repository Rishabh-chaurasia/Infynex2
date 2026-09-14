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
    tagline: 'Keep your IT equipment working all year.',
    short: 'Regular checks, repairs and support for your IT equipment under one contract.',
    overview:
      'We check and maintain your IT equipment on a regular schedule. If something fails, our team helps repair it under one clear contract.',
    icon: Wrench,
    accent: '#1a9dc3',
    hero: images.amcHero,
    gallery: [images.amcTech, images.amcRack, images.amcDesk],
    highlights: ['Desktops, laptops and workstations', 'Servers and storage', 'Networking equipment', 'Printers and peripherals', 'UPS and power backup', 'Preventive health checks'],
    capabilities: [
      { title: 'Preventive maintenance', text: 'Scheduled inspections, cleaning, firmware and health checks that catch issues before they interrupt work.' },
      { title: 'Corrective support', text: 'Diagnosis and repair of faults raised during the contract, with parts coordination where required.' },
      { title: 'Asset documentation', text: 'A maintained record of covered equipment, service history and recommendations.' },
      { title: 'One contact', text: 'One team manages all equipment covered by your contract.' },
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
    tagline: 'The right equipment for your workplace.',
    short: 'We supply, install, upgrade and repair computers, network equipment and office devices.',
    overview:
      'We help you choose, install and maintain the hardware your team needs. This includes computers, servers, network devices and office equipment.',
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
    tagline: 'Networks and systems that work together.',
    short: 'We design, install and manage the networks and systems that connect your business.',
    overview:
      'We plan and build networks, servers, storage and security for new and existing offices. We also document the setup and help you manage it.',
    icon: Server,
    accent: '#6fd3ee',
    hero: images.infraHero,
    gallery: [images.infraRack, images.infraDc, images.infraCables],
    highlights: ['LAN / WAN design and implementation', 'Server and storage deployment', 'Structured cabling', 'Firewall and network security', 'Wireless coverage', 'Monitoring and management'],
    capabilities: [
      { title: 'Design', text: 'Architecture that reflects how your teams and applications actually communicate.' },
      { title: 'Installation', text: 'Our engineers install racks, cables and equipment and make sure it works.' },
      { title: 'Security', text: 'Segmentation, firewalls and access controls built in from the start.' },
      { title: 'Managed services', text: 'Ongoing monitoring, patching and administration of the environment.' },
    ],
    process: [
      { title: 'Assess', text: 'Review the current state and future requirements.' },
      { title: 'Architect', text: 'Produce a design and bill of materials.' },
      { title: 'Build', text: 'Implement in stages with minimal disruption.' },
      { title: 'Support', text: 'We monitor, maintain and improve the system.' },
    ],
  },
  {
    slug: 'cloud-server',
    path: '/services/cloud-server',
    title: 'Cloud Server',
    navTitle: 'Cloud Server',
    eyebrow: 'Cloud',
    tagline: 'Cloud servers that can grow with your business.',
    short: 'Provisioning, migration and management of cloud servers and hosted environments for applications and data.',
    overview:
      'We set up cloud servers, move your apps and data, secure access and manage daily operations. Your team can focus on work instead of server maintenance.',
    icon: Cloud,
    accent: '#1a9dc3',
    hero: images.cloudHero,
    gallery: [images.cloudDc, images.cloudRack, images.cloudCode],
    highlights: ['Cloud server setup', 'App and data transfer', 'Backup and recovery', 'Secure user access', 'Cost and capacity checks', 'Regular management'],
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
    tagline: 'A trained team for your customer calls.',
    short: 'Outsourced tele-calling, customer communication and telecom support services delivered by trained teams.',
    overview:
      'Our trained team handles incoming calls, outgoing calls and customer follow-ups for your business. We use the script and process agreed with you.',
    icon: PhoneCall,
    accent: '#2ab7dd',
    hero: images.teleHero,
    gallery: [images.teleAgent, images.teleTeam, images.teleAntenna],
    highlights: ['Inbound call handling', 'Outbound calling campaigns', 'Customer follow-up and reminders', 'Lead qualification', 'Multilingual communication', 'Reporting on call activity'],
    capabilities: [
      { title: 'Inbound', text: 'Answering, routing and resolving customer calls according to your process.' },
      { title: 'Outbound', text: 'Structured calling for follow-ups, surveys, renewals and campaigns.' },
      { title: 'Process design', text: 'Scripts, escalation paths and quality checks defined with you.' },
      { title: 'Reports', text: 'Simple reports show call numbers, results and feedback.' },
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
    tagline: 'Camera-guided cleaning for HVAC ducts.',
    short: 'Camera-guided robotic cleaning of HVAC and ventilation ducts for offices, industrial and commercial facilities.',
    overview:
      'We use camera-equipped robots to inspect and clean HVAC ducts. You receive before-and-after footage and a clear service report.',
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
    title: 'Technical & Helpdesk Support',
    navTitle: 'Technical & Helpdesk Support',
    eyebrow: 'On-site & Remote Support',
    tagline: 'Fast remote help and engineers at your site.',
    short: 'Remote helpdesk and on-site engineers for everyday IT issues, repairs and installations.',
    overview:
      'Users can contact our helpdesk by phone or email. We solve issues remotely when possible and send a trained engineer when hands-on support is needed.',
    icon: Headset,
    accent: '#1a9dc3',
    hero: images.tsHero,
    gallery: [images.tsOffice, images.hdTeam, images.tsFix, images.hdAgent],
    highlights: ['Phone and email helpdesk', 'Ticket logging and tracking', 'Remote troubleshooting', 'Resident or scheduled engineers', 'Installations and repairs', 'Escalation to specialist teams'],
    capabilities: [
      { title: 'Remote helpdesk', text: 'Requests are logged, prioritised and resolved by phone, email or remote access.' },
      { title: 'On-site engineers', text: 'Engineers work at your location during agreed hours or scheduled visits.' },
      { title: 'Clear escalation', text: 'Issues that need hands-on work move from the helpdesk to an engineer with full context.' },
      { title: 'Project assistance', text: 'Additional hands for rollouts, relocations and upgrades.' },
    ],
    process: [
      { title: 'Contact', text: 'A user reports an issue by phone, email or the agreed support channel.' },
      { title: 'Resolve remotely', text: 'The helpdesk records the request and fixes it remotely when possible.' },
      { title: 'Support on site', text: 'An engineer attends when the issue needs hands-on work.' },
      { title: 'Report', text: 'Regular summaries of work completed and recommendations.' },
    ],
  },
  {
    slug: 'vehicle-vendor',
    path: '/services/vehicle-vendor',
    title: 'Business Vehicle Supply',
    navTitle: 'Business Vehicle Supply',
    eyebrow: 'Vehicle Supply',
    tagline: 'New vehicles procured and supplied for your business.',
    short: 'We procure and provide new vehicles at the scale your organisation requires.',
    overview:
      'When your organisation needs a dedicated fleet, we procure new vehicles in the required quantity and provide them under a clear commercial agreement. Whether you need 10 cars or 100, our team coordinates vehicle selection, purchase, registration, delivery and ongoing account support while you pay through the agreed service plan.',
    icon: Car,
    accent: '#6fd3ee',
    hero: images.vvFleet,
    gallery: [images.vvFleet, images.vvRoad, images.vvCar],
    highlights: ['New vehicle procurement', 'Small and large fleet requirements', 'Vehicle selection support', 'Registration and delivery coordination', 'Dedicated account management', 'Clear commercial billing'],
    capabilities: [
      { title: 'Fleet planning', text: 'We understand the quantity, vehicle type, usage and budget required.' },
      { title: 'Vehicle procurement', text: 'New vehicles are purchased and prepared according to the approved requirement.' },
      { title: 'Business deployment', text: 'We coordinate registration, documentation and delivery to your organisation.' },
      { title: 'Account support', text: 'One team manages records, billing and agreed fleet support.' },
    ],
    process: [
      { title: 'Requirement', text: 'Confirm vehicle types, quantity, usage and commercial terms.' },
      { title: 'Proposal', text: 'Share the fleet plan, pricing and delivery schedule.' },
      { title: 'Procurement', text: 'Purchase and prepare the approved new vehicles.' },
      { title: 'Delivery', text: 'Complete documentation and hand over the fleet with ongoing support.' },
    ],
  },
  {
    slug: 'solar',
    path: '/services/solar',
    title: 'Solar System & Services',
    navTitle: 'Solar System & Services',
    eyebrow: 'ESG Solutions',
    tagline: 'Clean energy systems, installed and maintained.',
    short: 'Design, installation and maintenance of solar power systems for commercial, industrial and residential sites.',
    overview:
      'We survey your site, design the right solar system, install the panels and electrical equipment, and provide regular maintenance.',
    icon: Sun,
    accent: '#f5b544',
    hero: images.solarHero,
    gallery: [images.solarField, images.solarInstall, images.solarRoof],
    highlights: ['Rooftop solar systems', 'Ground-mounted installations', 'Inverters and electrical works', 'Site survey and design', 'Panel cleaning and servicing', 'Performance checks'],
    capabilities: [
      { title: 'Survey and design', text: 'Site assessment, shading review and system sizing.' },
      { title: 'Installation', text: 'Mounting, panels, inverters, wiring and safety works.' },
      { title: 'Commissioning', text: 'Testing and handover with documentation.' },
      { title: 'Maintenance', text: 'Regular cleaning, checks and servicing.' },
    ],
    process: [
      { title: 'Survey', text: 'Assess the site and energy requirement.' },
      { title: 'Design', text: 'System layout, components and proposal.' },
      { title: 'Install', text: 'Structure, panels and electrical integration.' },
      { title: 'Maintain', text: 'Ongoing servicing and performance checks.' },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

