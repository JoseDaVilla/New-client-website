export type ServiceIcon = 'cm' | 'gc' | 'db' | 'pre' | 'civil' | 'industrial';

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: ServiceIcon;
  capabilities: string[];
}

export const services: Service[] = [
  {
    slug: 'construction-management',
    title: 'Construction Management',
    short: 'One accountable partner from first estimate to final handover.',
    description:
      'We act as an extension of the owner’s team — controlling cost, schedule and quality while managing every trade partner on site. Transparent reporting and open-book pricing keep decisions informed at every stage.',
    icon: 'cm',
    capabilities: ['At-risk & agency CM', 'Cost & schedule control', 'Trade procurement', 'Quality assurance', 'Commissioning & closeout'],
  },
  {
    slug: 'general-contracting',
    title: 'General Contracting',
    short: 'Lump-sum delivery with the certainty of a single contract.',
    description:
      'For owners who need price certainty, our general contracting teams self-perform critical scopes and coordinate specialty trades to deliver on budget, on schedule and to specification.',
    icon: 'gc',
    capabilities: ['Stipulated sum', 'Self-performed concrete', 'Site logistics', 'Safety leadership', 'Warranty program'],
  },
  {
    slug: 'design-build',
    title: 'Design-Build',
    short: 'Design and construction integrated under one roof.',
    description:
      'Integrated design-build teams compress schedules and reduce risk. Architects, engineers and builders collaborate from day one, so constructability is designed in — not added later.',
    icon: 'db',
    capabilities: ['Progressive design-build', 'P3 & alternative finance', 'Integrated project delivery', 'Value engineering', 'BIM coordination'],
  },
  {
    slug: 'pre-construction',
    title: 'Pre-Construction',
    short: 'Decisions made early cost less. We make them with you.',
    description:
      'Conceptual estimating, feasibility, constructability reviews and phasing strategies give owners the clarity to move forward with confidence — long before ground is broken.',
    icon: 'pre',
    capabilities: ['Conceptual estimating', 'Feasibility studies', 'Constructability reviews', 'Phasing & logistics', 'Life-cycle costing'],
  },
  {
    slug: 'civil-infrastructure',
    title: 'Civil & Infrastructure',
    short: 'Roads, bridges, transit and utilities that connect regions.',
    description:
      'Our heavy civil division delivers the infrastructure communities rely on: bridges, interchanges, water treatment, transit and site servicing — with a fleet and crews built for complex environments.',
    icon: 'civil',
    capabilities: ['Bridges & structures', 'Transit & rail', 'Water & wastewater', 'Earthworks', 'Site servicing'],
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    short: 'Facilities engineered around process, uptime and safety.',
    description:
      'From advanced manufacturing to energy and logistics, we build industrial facilities around the process inside them — coordinating equipment, mechanical and electrical systems with zero tolerance for downtime.',
    icon: 'industrial',
    capabilities: ['Process facilities', 'Energy & utilities', 'Distribution centres', 'Shutdowns & retrofits', 'Modular fabrication'],
  },
];

export const values = [
  { title: 'Safety without exception', text: 'Everyone goes home safe, every day. It is the first item on every agenda and the last word on every decision.' },
  { title: 'Ownership', text: 'We treat every project as if we were the owner — because our name stays on it long after we leave.' },
  { title: 'Craft', text: 'Quality is built in by people who take pride in their trade, not inspected in at the end.' },
  { title: 'Community', text: 'We hire locally, invest locally and leave every neighbourhood better than we found it.' },
];

export const timeline = [
  { year: '1987', title: 'Founded', text: 'Started as a four-person concrete contractor in Toronto.' },
  { year: '1996', title: 'General contracting', text: 'First institutional project — a 120,000 sq ft secondary school.' },
  { year: '2004', title: 'Going west', text: 'Opened the Calgary office to serve the industrial sector.' },
  { year: '2012', title: 'Civil division', text: 'Launched heavy civil and infrastructure operations.' },
  { year: '2019', title: 'Coast to coast', text: 'Vancouver and Montréal offices complete the national footprint.' },
  { year: '2025', title: 'Net-zero commitment', text: 'Pledged net-zero operational emissions by 2040.' },
];

export const leadership = [
  { name: 'Full Name', role: 'President & CEO' },
  { name: 'Full Name', role: 'Chief Operating Officer' },
  { name: 'Full Name', role: 'Chief Financial Officer' },
  { name: 'Full Name', role: 'VP, Pre-Construction' },
  { name: 'Full Name', role: 'VP, Civil & Infrastructure' },
  { name: 'Full Name', role: 'Director, Health & Safety' },
];

/** Oportunidades de licitación abiertas (página Estimating). */
export const bids = [
  { id: 'HB-2614', project: 'Lakeshore Medical Pavilion', location: 'Toronto, ON', trades: 'Mechanical, Electrical', closes: '2026-10-21' },
  { id: 'HB-2609', project: 'Northgate Distribution Hub', location: 'Calgary, AB', trades: 'Structural Steel, Roofing', closes: '2026-10-28' },
  { id: 'HB-2603', project: 'Fraser River Bridge Rehab', location: 'Vancouver, BC', trades: 'Rebar, Formwork, Traffic Control', closes: '2026-11-04' },
  { id: 'HB-2598', project: 'Saint-Laurent Library', location: 'Montréal, QC', trades: 'Curtain Wall, Millwork', closes: '2026-11-12' },
];

export const trades = [
  'Sitework & Excavation',
  'Concrete & Formwork',
  'Masonry',
  'Structural Steel',
  'Carpentry & Millwork',
  'Roofing & Waterproofing',
  'Curtain Wall & Glazing',
  'Drywall & Ceilings',
  'Flooring',
  'Painting & Coatings',
  'Mechanical / HVAC',
  'Plumbing',
  'Electrical',
  'Fire Protection',
  'Elevators',
  'Landscaping',
  'Material Supplier',
  'Equipment Rental',
];
