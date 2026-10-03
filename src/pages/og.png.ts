import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { palette } from '@/lib/palette';
import { site } from '@/site.config';

/** Imagen Open Graph (1200×630) generada en build con la paleta y la marca. */
export const GET: APIRoute = async () => {
  const { ink, bone, mute, signal } = palette;
  let grid = '';
  for (let x = 0; x <= 1200; x += 60) grid += `<path d="M${x} 0V630" stroke="${bone}" stroke-opacity=".06"/>`;
  for (let y = 0; y <= 630; y += 60) grid += `<path d="M0 ${y}H1200" stroke="${bone}" stroke-opacity=".06"/>`;
  let floors = '';
  for (let i = 0; i < 9; i++) floors += `<path d="M880 ${560 - i * 40}H1100" stroke="${bone}" stroke-opacity=".3"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${ink}"/>${grid}
    <g transform="translate(80 80)"><path d="M18 10v60M62 10v60" stroke="${bone}" stroke-width="10"/><path d="M18 40h44" stroke="${signal}" stroke-width="10"/></g>
    <text x="80" y="420" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="128" fill="${bone}" letter-spacing="-4">${site.name.toUpperCase()}<tspan fill="${signal}">.</tspan></text>
    <text x="84" y="490" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="${mute}" letter-spacing="4">${site.tagline.replace(/\.$/, '').toUpperCase()}</text>
    <path d="M880 560V200M1100 560V200M880 560H1100" stroke="${bone}" stroke-opacity=".5" stroke-width="2"/>${floors}
    <path d="M1140 560V110M820 110H1180" stroke="${signal}" stroke-width="3"/><rect x="930" y="240" width="80" height="14" fill="${signal}"/><path d="M970 110V240" stroke="${bone}" stroke-opacity=".5"/>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
