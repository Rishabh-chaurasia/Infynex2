import { images } from './images';
/**
 * Blog / Insights content.
 * These are general service-insight articles written from the perspective of the
 * services Infynex offers. They contain no client stories, testimonials or project results.
 * Replace or extend with real company updates.
 */
export const posts = [
    {
        slug: 'why-preventive-maintenance-beats-break-fix',
        title: 'How regular maintenance keeps your office IT running',
        category: 'AMC',
        excerpt: 'Simple, regular checks can prevent sudden IT problems and keep your office running smoothly.',
        date: '2026-08-18',
        readTime: '4 min read',
        image: images.blog6,
        body: [
            'Most organisations only think about their IT equipment when something stops working. By then the cost is already being paid — in lost time, in urgent call-outs and in the scramble to source a replacement part.',
            'Preventive maintenance flips the model. Equipment is inspected on a schedule, worn components are identified before they fail, firmware and drivers are kept current and the physical environment (dust, airflow, cabling) is cleaned up. The result is fewer surprises and a clearer view of what needs replacing and when.',
            'An Annual Maintenance Contract formalises this into one agreement: what is covered, how often it is visited and how faults are handled in between. For a growing business it is often the simplest way to bring order to a mixed estate of desktops, servers, network devices and printers.',
        ],
    },
    {
        slug: 'what-happens-inside-your-ducts',
        title: 'How robotic cleaning keeps your air ducts clean',
        category: 'Robotic Duct Cleaning',
        excerpt: 'See how camera-guided robots inspect and clean dust from hard-to-reach air ducts.',
        date: '2026-07-30',
        readTime: '5 min read',
        image: images.blog3,
        body: [
            'Air-handling ducts run through ceilings, risers and plant rooms that are rarely opened. Over time, dust, fibres and construction debris settle on the interior surfaces and are recirculated into occupied spaces.',
            'Robotic duct cleaning uses a compact, tracked robot fitted with cameras, lighting and cleaning attachments. The operator drives it through the duct network while watching live video, inspecting the condition of each section and running rotating brushes and vacuum extraction where needed.',
            'Because the process is camera-guided, it can be documented. Before-and-after footage shows exactly what was found and what was removed, giving facility managers a record they can share with occupants and auditors.',
        ],
    },
    {
        slug: 'planning-a-rooftop-solar-system',
        title: 'What to check before installing rooftop solar',
        category: 'Solar',
        excerpt: 'A site survey checks your roof, sunlight and power needs before solar panels are installed.',
        date: '2026-07-12',
        readTime: '4 min read',
        image: images.blog2,
        body: [
            'A solar system is only as good as the site it sits on. The survey stage looks at the roof structure and orientation, obstructions that could cast shadows across the day, the available electrical connection and the pattern of energy use on site.',
            'From this, a design is produced: panel layout, inverter selection, mounting structure, cable routes and safety provisions. The proposal should make clear what is being installed and how it will be maintained.',
            'Maintenance matters more than many owners expect. Panels collect dust and need periodic cleaning; inverters and connections benefit from scheduled inspection. A service plan agreed at the outset keeps the system producing as intended.',
        ],
    },
    {
        slug: 'helpdesk-versus-on-site-support',
        title: 'When you need remote or on-site IT support',
        category: 'Support',
        excerpt: 'Some IT issues can be fixed remotely, while others need an engineer at your workplace.',
        date: '2026-06-25',
        readTime: '3 min read',
        image: images.blog4,
        body: [
            'A remote helpdesk is the fastest route for password resets, software issues, access requests and configuration questions. Tickets are logged, prioritised and resolved without anyone travelling.',
            'Physical faults — a failed drive, a dead switch port, a printer that will not feed — need an engineer on site. Scheduled or resident engineers cover this, and they also handle installations, moves and rollouts.',
            'The two models work best together: the helpdesk logs and triages everything, resolves what it can remotely and escalates the rest to the on-site team with full context.',
        ],
    },
    {
        slug: 'moving-to-cloud-servers-checklist',
        title: 'A simple checklist for moving to cloud servers',
        category: 'Cloud',
        excerpt: 'Prepare your applications, data and user access before moving your systems to the cloud.',
        date: '2026-06-05',
        readTime: '5 min read',
        image: images.blog5,
        body: [
            'Start with an inventory: which applications, which databases, which integrations and which users depend on each. Note the operating systems, licences and storage volumes involved.',
            'Decide what moves first. Low-risk, self-contained workloads are ideal candidates for a first wave; they build confidence in the process and reveal any gaps in networking or access.',
            'Plan the cut-over and the way back. A tested rollback path removes most of the anxiety from a migration weekend. After go-live, monitoring, backups and access reviews become part of routine administration.',
        ],
    },
    {
        slug: 'choosing-hardware-for-a-new-office',
        title: 'How to choose the right hardware for your office',
        category: 'Hardware',
        excerpt: 'Choose computers and office equipment based on the daily work your team needs to complete.',
        date: '2026-05-20',
        readTime: '4 min read',
        image: images.blog1,
        body: [
            'Before comparing models, list the roles in the office and the applications each uses. Design and engineering teams, finance teams and front-desk staff have very different needs.',
            'Then consider the shared layer — the network switches, wireless coverage, printers and server or cloud resources that everyone touches. This is where reliability matters most.',
            'Finally plan for the lifecycle: how equipment will be installed, tracked, upgraded and eventually replaced. A hardware partner that supports the full cycle keeps the estate coherent over time.',
        ],
    },
];
export const getPost = (slug) => posts.find((p) => p.slug === slug);
