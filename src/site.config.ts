/**
 * Configuración central del sitio.
 * Todo el contenido "global" (marca, navegación, oficinas, cifras, redes)
 * vive aquí para poder reemplazarlo fácilmente cuando llegue el contenido real.
 */

export const site = {
  name: 'Halden',
  legalName: 'Halden Construction Group',
  tagline: 'Building what moves communities forward.',
  description:
    'Halden is a full-service general contractor and construction manager delivering commercial, institutional, industrial and civil projects across North America.',
  founded: 1987,
  email: 'info@halden.example',
  phone: '+1 (416) 555-0142',
  estimatingEmail: 'estimating@halden.example',
  careersUrl: '/contact#careers',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
  /**
   * Endpoint de formularios. Por defecto se usa Netlify Forms (atributo data-netlify).
   * Si se despliega en otro hosting, poner aquí la URL de Formspree / Basin / API propia.
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
  { value: 38, suffix: '', label: 'Years building', note: `Since ${site.founded}` },
  { value: 1200, suffix: '+', label: 'Projects delivered', note: 'Across 6 sectors' },
  { value: 4.8, suffix: 'B', prefix: '$', decimals: 1, label: 'Work in place', note: 'Last 10 years' },
  { value: 0.42, suffix: '', decimals: 2, label: 'EMR safety rating', note: 'Industry avg. 1.0' },
] as const;

export const offices = [
  {
    city: 'Toronto',
    label: 'Head Office',
    address: ['120 Front Street West, Suite 900', 'Toronto, ON M5J 2L7'],
    phone: '+1 (416) 555-0142',
    email: 'toronto@halden.example',
    hours: 'Mon–Fri · 8:00–17:00',
    // posición relativa (0–100) en el mapa SVG estilizado
    map: { x: 71, y: 58 },
    coords: '43.6453° N, 79.3806° W',
  },
  {
    city: 'Vancouver',
    label: 'Western Region',
    address: ['1055 West Georgia Street, Floor 14', 'Vancouver, BC V6E 3P3'],
    phone: '+1 (604) 555-0187',
    email: 'vancouver@halden.example',
    hours: 'Mon–Fri · 8:00–17:00',
    map: { x: 14, y: 50 },
    coords: '49.2856° N, 123.1207° W',
  },
  {
    city: 'Calgary',
    label: 'Prairies Region',
    address: ['600 3rd Avenue SW, Suite 1200', 'Calgary, AB T2P 0G5'],
    phone: '+1 (403) 555-0119',
    email: 'calgary@halden.example',
    hours: 'Mon–Fri · 8:00–17:00',
    map: { x: 27, y: 52 },
    coords: '51.0486° N, 114.0708° W',
  },
  {
    city: 'Montréal',
    label: 'Eastern Region',
    address: ['1250 René-Lévesque Blvd W, Suite 2200', 'Montréal, QC H3B 4W8'],
    phone: '+1 (514) 555-0163',
    email: 'montreal@halden.example',
    hours: 'Mon–Fri · 8:00–17:00',
    map: { x: 80, y: 52 },
    coords: '45.4972° N, 73.5716° W',
  },
] as const;

export const sectors = [
  'Commercial',
  'Institutional',
  'Healthcare',
  'Industrial',
  'Infrastructure',
  'Residential',
] as const;

export type Sector = (typeof sectors)[number];
