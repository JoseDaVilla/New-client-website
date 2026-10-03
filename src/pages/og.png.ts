import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { palette } from '@/lib/palette';
import { logo } from '@/lib/logo';
import { site } from '@/site.config';

/** Imagen Open Graph (1200×630): logo Grascan Build sobre blanco con retícula de plano. */
export const GET: APIRoute = async () => {
  const { bone, signal, gray, mute } = palette;
  let grid = '';
  for (let x = 0; x <= 1200; x += 60) grid += `<path d="M${x} 0V630" stroke="${signal}" stroke-opacity=".06"/>`;
  for (let y = 0; y <= 630; y += 60) grid += `<path d="M0 ${y}H1200" stroke="${signal}" stroke-opacity=".06"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${bone}"/>${grid}
    <g transform="translate(395 70) scale(0.68)">
      <path d="${logo.gray}" fill="${gray}"/><path d="${logo.navy}" fill="${signal}"/><path d="${logo.g}" fill="${signal}" fill-rule="evenodd"/>
      <path d="${logo.word}" fill="${signal}" fill-rule="evenodd"/><path d="${logo.build}" fill="${gray}" fill-rule="evenodd"/>
    </g>
    <text x="600" y="540" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" fill="${mute}" letter-spacing="3">${site.tagline.replace(/\.$/, '').toUpperCase()}</text>
    <rect x="0" y="618" width="1200" height="12" fill="${signal}"/>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
