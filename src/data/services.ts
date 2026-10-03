/**
 * Contenido basado en grascan.com (servicios, historia, cultura, estimating).
 */
export type ServiceIcon =
  | 'bridge'
  | 'dam'
  | 'designbuild'
  | 'environmental'
  | 'paving'
  | 'infrastructure'
  | 'landscaping'
  | 'pm'
  | 'rail'
  | 'roads'
  | 'underground';

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
    slug: 'bridges-and-structures',
    title: 'Bridges and Structures',
    short: 'Rehabilitation and new construction of highway, pedestrian and rail structures.',
    description:
      'As one of Toronto’s largest bridge contractors, Grascan provides a full-service approach to the rehabilitation and new construction of highway, pedestrian and rail structures and other transportation structures.',
    icon: 'bridge',
    capabilities: ['Bridge rehabilitation', 'New bridge construction', 'Pedestrian & cyclist bridges', 'Rail structures', 'Deck replacement & re-decking'],
  },
  {
    slug: 'dams-and-waterways',
    title: 'Dams and Waterways',
    short: 'Design-build expertise in the construction of dams and waterways.',
    description:
      'Grascan brings design-build expertise to the construction and rehabilitation of dams, channels and waterways, including channel stabilization and emergency wash-out repairs.',
    icon: 'dam',
    capabilities: ['Dam construction & rehabilitation', 'Channel stabilization', 'Erosion control', 'Emergency wash-out repairs'],
  },
  {
    slug: 'design-build',
    title: 'Design / Build',
    short: 'An integrated Design-Build team delivering major projects.',
    description:
      'With over 36 years of experience successfully completing Bid-Build projects, Grascan has established an integrated Design-Build Team which is currently performing multiple major Design-Build projects for Metrolinx.',
    icon: 'designbuild',
    capabilities: ['Integrated design-build team', 'Progressive design-build', 'Constructability reviews', 'Design coordination'],
  },
  {
    slug: 'environmental',
    title: 'Environmental',
    short: 'Meeting and exceeding environmental regulations on every site.',
    description:
      'Grascan is committed to meeting and exceeding relevant environmental regulations and environmental-related requirements on every project it delivers.',
    icon: 'environmental',
    capabilities: ['Environmental compliance', 'Erosion & sediment control', 'Spill prevention', 'Site restoration'],
  },
  {
    slug: 'grading-and-paving',
    title: 'Grading and Paving',
    short: 'Fully equipped crews for any size job, from roads to parking lots.',
    description:
      'Grascan has successfully provided grading and paving services throughout the Greater Toronto Area, with crews fully equipped to handle any size job, from roads to bridges, parking lots to channel stabilization.',
    icon: 'paving',
    capabilities: ['Site grading', 'Asphalt paving', 'Parking lots', 'Bridge approaches'],
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    short: 'From emergency repairs to complete hard and soft infrastructure.',
    description:
      'Grascan has completed many infrastructure projects, ranging from critical infrastructure during emergency repairs to the Gardiner Expressway, sinkhole repairs and emergency wash-outs, and has been invited by municipalities and private firms to construct or reconstruct their hard to soft infrastructure needs.',
    icon: 'infrastructure',
    capabilities: ['Emergency repairs', 'Sinkhole repairs', 'Municipal infrastructure', 'Private-sector infrastructure'],
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    short: 'Some of the largest landscape projects in the City of Toronto.',
    description:
      'Grascan has successfully completed some of the largest landscape projects the City of Toronto has been able to offer, with works ranging from laser-cut steel statues, precast planters and granite pavers to specialty granite monuments, boardwalks and piazzas.',
    icon: 'landscaping',
    capabilities: ['Granite pavers & monuments', 'Boardwalks & piazzas', 'Precast planters', 'Public art installation'],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    short: 'Coordinating every trade on complicated, time-sensitive projects.',
    description:
      'Grascan specializes in project management and coordination, typically performing all associated civil work and maintaining excellent relationships with subcontractors to meet high demand and critical timing.',
    icon: 'pm',
    capabilities: ['Planning & scheduling', 'Subcontractor coordination', 'Cost control', 'Stakeholder management'],
  },
  {
    slug: 'rapid-transit-and-railway',
    title: 'Rapid Transit and Railway',
    short: 'An approved Metrolinx, CN Rail and TTC contractor.',
    description:
      'Grascan is one of the few approved Metrolinx (GO Transit), Canadian National Railway (CNR) and Toronto Transit Commission (TTC) contractors, delivering stations, platforms, grade separations and rail structures.',
    icon: 'rail',
    capabilities: ['GO Station construction', 'Platforms & tunnels', 'Rail-to-rail grade separations', 'Rail bridges'],
  },
  {
    slug: 'roads-and-highway-construction',
    title: 'Roads and Highway Construction',
    short: 'A preferred contractor for major road construction in Southern Ontario.',
    description:
      'Grascan’s ability to deliver time-sensitive, complicated and high-profile heavy civil projects has cemented its legacy as a preferred contractor for major road construction, with a Ministry of Transportation of Ontario rating in excess of $100,000,000.',
    icon: 'roads',
    capabilities: ['Highway reconstruction', 'Ramps & interchanges', 'Urban road reconstruction', 'Expressway re-decking'],
  },
  {
    slug: 'underground-infrastructure',
    title: 'Underground Infrastructure',
    short: 'Sanitary, storm and water services to specialized systems.',
    description:
      'Grascan is at the forefront of underground infrastructure projects, completing contracts with sanitary, storm and water services, from large transmission services to specialized snow-melting systems for Metrolinx platforms.',
    icon: 'underground',
    capabilities: ['Sanitary & storm sewers', 'Watermains & transmission', 'Snow-melting systems', 'Utility relocation'],
  },
];

export const values = [
  {
    title: 'Safety first',
    text: 'COR™ certified since 2015. Senior management instills strong safety values into the fabric of every operation, and every person is committed to continual improvement.',
  },
  {
    title: 'Our people',
    text: 'Grascan places a premium on creating a comfortable and desirable work environment, a priority since the company was incorporated in 1987.',
  },
  {
    title: 'Innovation',
    text: 'From being the first contractor in Ontario to dismantle the Gardiner Expressway to an integrated design-build team, we lead with an innovative mindset.',
  },
  {
    title: 'Partnership',
    text: 'Seasonal barbecues, holiday gatherings and an annual Christmas party bring together our employees and valued partners.',
  },
];

export const timeline = [
  { year: '1987', title: 'Incorporated', text: 'Founded by Angelo Grassa and John Balazic, starting with basic roadwork.' },
  { year: '2000', title: 'Captains of industry', text: 'High-profile City of Toronto work, including dismantling of the Gardiner.' },
  { year: '2011', title: 'West Toronto Diamond', text: 'Rail-to-rail grade separation for Metrolinx.' },
  { year: '2014', title: 'Gardiner re-decking', text: '$75M contract delivered 3 months early and $2M under budget. Named one of Canada’s Best Managed Companies.' },
  { year: '2015', title: 'COR™ certified', text: 'Certificate of Recognition for health & safety.' },
  { year: '2019', title: 'Gold Certified', text: 'Best Managed Gold status, and the Early Stations design-build for Metrolinx.' },
  { year: '2021', title: 'Platinum Member', text: 'Platinum status after 7 years as one of Canada’s Best Managed Companies.' },
];

export const leadership = [
  { name: 'Angelo Grassa', role: 'Co-Founder & Owner' },
  { name: 'John Balazic', role: 'Co-Founder & Owner' },
  { name: 'Full Name', role: 'Director, Design-Build' }, // TODO: equipo directivo
  { name: 'Full Name', role: 'Director, Estimating' },
  { name: 'Full Name', role: 'Manager, Health & Safety' },
  { name: 'Full Name', role: 'Manager, Human Resources' },
];

export const awards = [
  'Canada’s Best Managed Companies, Platinum Member (2021)',
  'Best Managed, Gold Certified (2019)',
  'Canada’s Best Managed Companies (2014, 2016)',
  'COR™ / ISO 45001 Certified',
  'Structural Design Innovation',
  'Canada’s Top Contractors',
];

/** Oportunidades de licitación abiertas (página Estimating). TODO: reemplazar por licitaciones reales. */
export const bids = [
  { id: 'GB-0101', project: 'Sample: Commercial Site Works', location: 'Vaughan, ON', trades: 'Excavation, Underground Services', closes: '2026-10-21' },
  { id: 'GB-0102', project: 'Sample: Private Bridge Crossing', location: 'Mississauga, ON', trades: 'Rebar, Formwork, Structural Steel', closes: '2026-10-28' },
  { id: 'GB-0103', project: 'Sample: Industrial Campus Paving', location: 'Brampton, ON', trades: 'Grading, Asphalt Paving', closes: '2026-11-04' },
  { id: 'GB-0104', project: 'Sample: Mixed-Use Landscape Package', location: 'Toronto, ON', trades: 'Landscaping, Granite Pavers', closes: '2026-11-12' },
];

export const trades = [
  'Excavation & Earthworks',
  'Concrete & Formwork',
  'Rebar',
  'Structural Steel',
  'Precast Concrete',
  'Waterproofing',
  'Asphalt Paving',
  'Sanitary / Storm / Watermain',
  'Electrical',
  'Rail Track Work',
  'Traffic Control',
  'Survey & Layout',
  'Landscaping',
  'Environmental',
  'Demolition',
  'Trucking & Haulage',
  'Material Supplier',
  'Equipment Rental',
];
