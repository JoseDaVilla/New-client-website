/**
 * Lee la paleta desde src/styles/global.css (bloque @theme) en build,
 * para que favicon, imagen OG y theme-color usen exactamente los mismos colores.
 */
import css from '@/styles/global.css?raw';

const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{3,8})\b/gi)].map((m) => [m[1], m[2]]),
) as Record<string, string>;

const pick = (name: string) => {
  const value = tokens[name];
  if (!value) throw new Error(`Color --color-${name} no encontrado en global.css`);
  return value;
};

export const palette = {
  ink: pick('ink'),
  bone: pick('bone'),
  mute: pick('mute'),
  signal: pick('signal'),
};
