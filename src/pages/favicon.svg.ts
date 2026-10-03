import type { APIRoute } from 'astro';
import { palette } from '@/lib/palette';
import { logo } from '@/lib/logo';

/** Favicon generado en build: icono del logo Grascan Build con los colores de la paleta. */
export const GET: APIRoute = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="71 -40 458 541"><rect x="71" y="-40" width="458" height="541" rx="60" fill="${palette.bone}"/><path d="${logo.gray}" fill="${palette.gray}"/><path d="${logo.navy}" fill="${palette.signal}"/><path d="${logo.g}" fill="${palette.signal}" fill-rule="evenodd"/></svg>`,
    { headers: { 'Content-Type': 'image/svg+xml' } },
  );
