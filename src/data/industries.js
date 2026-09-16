import offices from '../assets/industries/offices.jpg';
import warehouses from '../assets/industries/warehouses.jpg';
import factories from '../assets/industries/factories.jpg';
import retail from '../assets/industries/retail.jpg';
import education from '../assets/industries/education.jpg';
import builders from '../assets/industries/builders-india.webp';
export const industries = [
    {
        id: 'offices',
        title: 'Commercial Offices',
        description: 'Coordinated IT infrastructure, maintenance and technical support aligned with workplace schedules and business continuity priorities.',
        services: ['amc', 'hardware', 'it-infra', 'technical-support'],
        image: offices,
        accent: '#258fcb',
    },
    {
        id: 'warehouses',
        title: 'Warehouses & Logistics',
        description: 'Dependable technology, maintenance, mobility and energy services structured for active logistics environments and distributed operations.',
        services: ['amc', 'it-infra', 'vehicle-vendor', 'solar'],
        image: warehouses,
        accent: '#ef8d3e',
    },
    {
        id: 'factories',
        title: 'Factories & Plants',
        description: 'Structured maintenance, ventilation cleaning and technology services delivered with careful consideration for production continuity and site safety.',
        services: ['amc', 'robotic-duct-cleaning', 'solar'],
        image: factories,
        accent: '#2eae72',
    },
    {
        id: 'retail',
        title: 'Retail & Hospitality',
        description: 'Responsive technology, equipment and ventilation services designed to support consistent operations across customer-facing environments.',
        services: ['hardware', 'technical-support', 'robotic-duct-cleaning'],
        image: retail,
        accent: '#9a64d5',
    },
    {
        id: 'education',
        title: 'Schools & Hospitals',
        description: 'Reliable infrastructure, equipment and technical support planned around essential daily services, users and operational schedules.',
        services: ['it-infra', 'hardware', 'amc', 'technical-support'],
        image: education,
        accent: '#e05a83',
    },
    {
        id: 'builders',
        title: 'Builders & Contractors',
        description: 'Coordinated site technology, mobility and solar services supported by clear project documentation and structured handover.',
        services: ['solar', 'vehicle-vendor', 'it-infra'],
        image: builders,
        accent: '#b08b20',
    },
];
