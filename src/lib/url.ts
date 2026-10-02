/**
 * Prefija las rutas internas con el `base` de Astro (p. ej. "/New-client-website"
 * en GitHub Pages) y añade la barra final a las páginas (evita la redirección 301
 * de GitHub Pages). Deja intactos enlaces externos, mailto:, tel: y anclas.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const u = (path: string) => {
  if (/^([a-z]+:|#|\/\/)/i.test(path)) return path;
  const [pathname, hash = ''] = path.split('#');
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const withSlash = isFile || pathname.endsWith('/') ? pathname : pathname + '/';
  return base + withSlash + (hash ? '#' + hash : '');
};
