# Sitio corporativo — constructora

Maquetación completa del sitio web corporativo para una empresa constructora (referencias: grascan.com, pcl.com).
Construido con **Astro 7 + Tailwind CSS 4**, sin frameworks de UI en el cliente: HTML estático, ~5 KB de JS propio y animaciones con CSS/SVG.

> La marca **"Halden"**, los textos, cifras, proyectos y noticias son **placeholders** hasta recibir el contenido real.
> Las fotos se sustituyen por ilustraciones tipo plano (SVG generadas en build) que desaparecen automáticamente al añadir imágenes.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321/New-client-website/
npm run build     # genera /dist (estático)
npm run preview   # sirve /dist
```

Para volver a ver la **intro** (sale una vez por sesión): abrir `/?intro`.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Home: intro animada, hero con escena SVG (grúa + torre), cifras, servicios, proyectos destacados, seguridad + vídeo, CTA proveedores, noticias, oficinas |
| `/about` | Historia, misión, cifras, valores, timeline, liderazgo, seguridad y sostenibilidad, certificaciones |
| `/services` | 6 servicios con capacidades y proyectos relacionados |
| `/projects` | Portafolio filtrable por sector |
| `/projects/[slug]` | Ficha de proyecto: hero, cifras clave, ficha técnica, texto, galería con lightbox, vídeo, siguiente proyecto |
| `/estimating` | Proceso, licitaciones abiertas y **formulario de registro de proveedores** en 3 pasos con subida de documentos |
| `/news` y `/news/[slug]` | Noticias con filtro por categoría y artículo |
| `/media` | Vídeos (carga diferida) y galería de fotos filtrable con lightbox |
| `/contact` | Formulario, departamentos, oficinas con mapa (carga al hacer clic) |
| `/privacy`, `/thanks`, `404` | Legales, confirmación de formularios, error |

## Dónde se cambia el contenido

| Qué | Archivo |
| --- | --- |
| Nombre, email, teléfono, redes, oficinas, cifras, sectores, menú | `src/site.config.ts` |
| Servicios, valores, timeline, liderazgo, licitaciones, oficios | `src/data/services.ts` |
| Proyectos (un `.md` por proyecto) | `src/content/projects/` |
| Noticias (un `.md` por noticia) | `src/content/news/` |
| Colores y tipografías | `src/styles/global.css` (bloque `@theme`) |
| Logo | `src/components/Logo.astro`, `public/favicon.svg`, `public/og.png` |
| Dominio | `astro.config.mjs` (`site`) y `public/robots.txt` |

### Añadir fotos a un proyecto

1. Copiar las imágenes en `src/assets/projects/<slug>/` (JPG/PNG grandes, Astro las optimiza a AVIF/WebP y genera `srcset`).
2. En el `.md` del proyecto:

```yaml
cover: ../../assets/projects/harbourline-tower/cover.jpg
gallery:
  - { src: ../../assets/projects/harbourline-tower/01.jpg, caption: "Site overview" }
video: https://www.youtube-nocookie.com/embed/VIDEO_ID
```

Si un campo de imagen se omite, se muestra el placeholder SVG.

### Vídeo de fondo en el hero

En `src/pages/index.astro` pasar `video` al componente:

```astro
<Hero video={{ src: '/video/hero.mp4', poster: '/video/hero.jpg' }} ... />
```

(Colocar el archivo en `public/video/`. Recomendado: MP4 H.264, 1920px, < 6 MB, sin audio.)

## Formularios

Por defecto usan **Netlify Forms** (`data-netlify="true"`, incluye subida de archivos y honeypot anti-spam).
Si se despliega en otro hosting, poner la URL de Formspree / Basin / API propia en `site.formEndpoint` (`src/site.config.ts`).

## Rendimiento y técnica

- **Mobile first**: estilos base pensados para móvil y ampliados con `sm/md/lg/xl`; el contenido que en escritorio aparece al pasar el cursor está siempre visible en táctil; titulares con menor anchura tipográfica en móvil; licitaciones en tarjetas en móvil y tabla en escritorio; objetivos táctiles ≥ 44 px.

- Lighthouse (móvil, home): **Performance 99 · Best Practices 100 · SEO 100 · Accesibilidad 96**, CLS 0.
- Fuentes self-hosted (Archivo variable con eje de anchura + JetBrains Mono), precargadas.
- CSS inlined por página, un único bundle JS (`src/scripts/main.ts`), prefetch de enlaces al pasar el cursor.
- Transiciones entre páginas con View Transitions nativas (sin JS).
- Animaciones: intro 100 % CSS, trazado de SVG con `pathLength`, reveals con IntersectionObserver, scroll-driven animations (con fallback). Todo respeta `prefers-reduced-motion`.
- Mapas y vídeos de YouTube sólo se cargan al hacer clic (no penalizan la carga).
- Sitemap, Open Graph, JSON-LD (`GeneralContractor`), canonical.

## Despliegue

### GitHub Pages (actual)

URL: **https://josedavilla.github.io/New-client-website/**

- El workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main` o `ccr-235f9ecb-ks3q6e` (también se puede lanzar a mano desde *Actions → Deploy to GitHub Pages → Run workflow*).
- Requisito único: en *Settings → Pages → Build and deployment → Source* elegir **GitHub Actions**.
- Como el sitio vive en un subdirectorio, todos los enlaces internos pasan por el helper `u()` de `src/lib/url.ts`, que añade el `base`. **Al crear enlaces nuevos usar siempre `href={u('/ruta')}`**.
- Los formularios no funcionan en GitHub Pages (es hosting estático sin backend): configurar `site.formEndpoint` con Formspree/Basin para recibir envíos.

### Dominio propio u otro hosting

Compilar con `SITE_URL=https://www.cliente.com BASE_PATH=/ npm run build`. `netlify.toml` incluido (build + cabeceras de caché + Netlify Forms). También funciona en Vercel, Cloudflare Pages o cualquier hosting estático sirviendo `dist/`.
