import type { APIRoute } from 'astro';
import { palette } from '@/lib/palette';

/** Favicon generado en build con los colores de la paleta. */
export const faviconSvg = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${palette.ink}"/><path d="M18 14v36M46 14v36" stroke="${palette.bone}" stroke-width="7" stroke-linecap="square"/><path d="M18 32h28" stroke="${palette.signal}" stroke-width="7"/></svg>`;

export const GET: APIRoute = () => new Response(faviconSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
