/**
 * Configuración central del sitio Grascan Build.
 * Contenido basado en grascan.com (historia, servicios, proyectos, oficinas).
 * Los valores marcados con TODO deben confirmarse con el cliente.
 */

export const site = {
  name: 'Grascan',
  legalName: 'Grascan Build',
  tagline: 'Building Southern Ontario since 1987.',
  description:
    'Grascan Build brings nearly four decades of Grascan experience — time-sensitive, complex and high-profile construction across Southern Ontario — to private-sector clients.',
  founded: 1987,
  email: 'info@grascanbuild.com', // TODO: confirmar email general
  phone: '416-644-8858',
  tollFree: '1-888-929-4727',
  fax: '416-644-8864',
  estimatingEmail: 'estimating@grascanbuild.com', // TODO: confirmar
  safetyEmail: 'safety@grascan.com',
  careersEmail: 'hr@grascanbuild.com', // TODO: confirmar
  social: [
    { label: 'LinkedIn', href: 'https://ca.linkedin.com/company/grascan-construction-ltd-' },
  ],
  /**
   * Endpoint de formularios. GitHub Pages no procesa formularios: poner aquí la URL
   * de Formspree / Basin / API propia. Vacío = Netlify Forms (si se aloja en Netlify).
   */
  formEndpoint: '',
} as const;

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Estimating', href: '/estimating' },
  { label: 'News', href: '/news' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
] as const;

export const stats = [
  { value: new Date().getFullYear() - 1987, suffix: '', label: 'Years building', note: 'Incorporated in 1987' },
  { value: 300, prefix: '$', suffix: 'M+', label: 'Tender capacity', note: 'Single-project bid capacity' },
  { value: 29, suffix: '', label: 'GO Stations upgraded', note: 'Early Stations design-build' },
  { value: 18, suffix: ' mo', label: 'Ahead of schedule', note: 'Gardiner Expressway Section 2' },
] as const;

export const offices = [
  {
    city: 'Toronto',
    label: 'Main Office & Facility',
    address: ['61 Steinway Blvd.', 'Toronto, ON M9W 6H6'],
    phone: '416-644-8858',
    phones: [
      { label: 'Tel', value: '416-644-8858' },
      { label: 'Fax', value: '416-644-8864' },
      { label: 'Toll free', value: '1-888-929-4727' },
    ],
    email: 'info@grascanbuild.com', // TODO: confirmar
    hours: 'Mon–Fri · 7:00–17:00', // TODO: confirmar horario
    // posición relativa (0–100) en el mapa estilizado del GTA
    map: { x: 46, y: 40 },
    coords: '43.7440° N, 79.5940° W',
  },
  {
    city: 'Brampton',
    label: 'EHS, Human Resources & Overflow Facility',
    address: ['85 Devon Rd.', 'Brampton, ON L6T 5A4'],
    phone: '416-213-8766',
    phones: [{ label: 'Tel', value: '416-213-8766' }],
    email: 'safety@grascan.com',
    hours: 'Mon–Fri · 7:00–17:00', // TODO: confirmar horario
    map: { x: 30, y: 30 },
    coords: '43.7110° N, 79.7000° W',
  },
] as const;

/** Categorías de proyecto (filtros). */
export const sectors = ['Bridges & Structures', 'Rail & Transit', 'Roads & Highways', 'Infrastructure'] as const;

export type Sector = (typeof sectors)[number];

/** Organizaciones para las que Grascan ha sido invitada a licitar (grascan.com). */
export const clients = [
  'Metrolinx (GO Transit)',
  'City of Toronto',
  'Ministry of Transportation Ontario',
  'Toronto Transit Commission',
  'CN Railway',
  'CP Rail',
  'Waterfront Toronto',
  'GTAA',
  'Regional Municipalities',
] as const;
