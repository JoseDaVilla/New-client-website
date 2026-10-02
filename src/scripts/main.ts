/**
 * Único bundle JS del sitio (~pocos KB). Sin frameworks.
 * - Header: estado al hacer scroll, ocultar/mostrar, menú móvil
 * - Reveal on scroll (IntersectionObserver)
 * - Contadores animados
 * - Filtros genéricos (proyectos, noticias, media)
 * - Lightbox para galerías
 * - Skip de la intro
 */

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Intro skip ---------------- */
if (root.classList.contains('has-intro') && !root.classList.contains('intro-done')) {
  const skip = () => {
    root.classList.add('intro-skip');
    setTimeout(() => root.classList.add('intro-done'), 600);
  };
  document.getElementById('intro')?.addEventListener('click', skip, { once: true });
  addEventListener('keydown', skip, { once: true });
}

/* ---------------- Header ---------------- */
const header = document.getElementById('site-header');
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
let lastY = scrollY;
let menuOpen = false;

const onScroll = () => {
  const y = scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  if (!menuOpen) header?.classList.toggle('is-hidden', y > lastY && y > 400);
  lastY = y;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const setMenu = (open: boolean) => {
  if (!menu || !toggle || !header) return;
  menuOpen = open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => header.classList.add('menu-open')));
    root.style.overflow = 'hidden';
    header.classList.remove('is-hidden');
  } else {
    header.classList.remove('menu-open');
    root.style.overflow = '';
    setTimeout(() => {
      if (!menuOpen) menu.hidden = true;
    }, 700);
  }
};
toggle?.addEventListener('click', () => setMenu(!menuOpen));
addEventListener('keydown', (e) => e.key === 'Escape' && menuOpen && setMenu(false));
matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------------- Reveal on scroll ---------------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-reveal], [data-split], .draw, [data-count]').forEach((el) => io.observe(el));

/* ---------------- Counters ---------------- */
const counterIO = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      counterIO.unobserve(el);
      const to = parseFloat(el.dataset.count || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (reduceMotion) {
        el.textContent = fmt.format(to);
        continue;
      }
      const delay = parseInt(el.dataset.delay || '0', 10);
      const dur = 1800;
      let start = 0;
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt.format(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), delay);
    }
  },
  { threshold: 0.4 },
);
document.querySelectorAll('[data-count]').forEach((el) => counterIO.observe(el));

/* ---------------- Filters ---------------- */
document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
  const target = document.getElementById(group.dataset.filterGroup!);
  if (!target) return;
  const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = target.querySelectorAll<HTMLElement>('[data-tags]');
  const empty = target.parentElement?.querySelector<HTMLElement>('[data-filter-empty]');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter!;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const match = (item: HTMLElement) => f === 'all' || item.dataset.tags!.split('|').includes(f);
      const visible = [...items].filter(match).length;
      const apply = () =>
        items.forEach((item) => {
          const show = match(item);
          item.hidden = !show;
          if (show) item.querySelectorAll('[data-reveal], .draw').forEach((el) => el.classList.add('is-in'));
          if (show) item.classList.add('is-in');
        });
      // View Transitions API para un reacomodo suave (si existe)
      if ('startViewTransition' in document && !reduceMotion) (document as any).startViewTransition(apply);
      else apply();
      if (empty) empty.hidden = visible > 0;
    }),
  );
});

/* ---------------- Lightbox ---------------- */
const lightbox = document.getElementById('lightbox') as HTMLDialogElement | null;
if (lightbox) {
  const stage = lightbox.querySelector<HTMLElement>('[data-lb-stage]')!;
  const caption = lightbox.querySelector<HTMLElement>('[data-lb-caption]')!;
  const counter = lightbox.querySelector<HTMLElement>('[data-lb-counter]')!;
  let items: HTMLElement[] = [];
  let index = 0;

  const render = () => {
    const item = items[index];
    if (!item) return;
    stage.innerHTML = '';
    const video = item.dataset.video;
    if (video) {
      const iframe = document.createElement('iframe');
      iframe.src = video + (video.includes('?') ? '&' : '?') + 'autoplay=1';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.title = item.dataset.caption || 'Video';
      iframe.className = 'aspect-video w-full max-h-[80vh] bg-black';
      stage.append(iframe);
    } else {
      const media = item.querySelector('img, svg');
      if (media) {
        const clone = media.cloneNode(true) as HTMLElement;
        clone.classList.remove('is-in');
        clone.removeAttribute('loading');
        clone.setAttribute('class', 'max-h-[80vh] w-auto max-w-full object-contain');
        if (clone.tagName.toLowerCase() === 'svg') clone.setAttribute('class', 'aspect-[4/3] h-[min(70vh,75vw)] max-w-full bg-ink-2');
        stage.append(clone);
      }
    }
    caption.textContent = item.dataset.caption || '';
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox]');
    if (!trigger) return;
    e.preventDefault();
    const group = trigger.dataset.lightbox;
    items = [...document.querySelectorAll<HTMLElement>(`[data-lightbox="${group}"]`)].filter((el) => !el.closest('[hidden]'));
    index = items.indexOf(trigger);
    render();
    lightbox.showModal();
  });
  const step = (d: number) => {
    index = (index + d + items.length) % items.length;
    render();
  };
  lightbox.querySelector('[data-lb-prev]')?.addEventListener('click', () => step(-1));
  lightbox.querySelector('[data-lb-next]')?.addEventListener('click', () => step(1));
  lightbox.querySelector('[data-lb-close]')?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('close', () => (stage.innerHTML = ''));
  lightbox.addEventListener('click', (e) => e.target === lightbox && lightbox.close());
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
}

/* ---------------- Lazy video facades ---------------- */
document.querySelectorAll<HTMLButtonElement>('[data-video-facade]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = btn.dataset.videoFacade! + '?autoplay=1&rel=0';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.title = btn.getAttribute('aria-label') || 'Video';
    iframe.className = 'absolute inset-0 h-full w-full';
    btn.replaceWith(iframe);
  }),
);

/* ---------------- Lazy map ---------------- */
document.querySelectorAll<HTMLButtonElement>('[data-map-src]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = btn.dataset.mapSrc!;
    iframe.loading = 'lazy';
    iframe.title = btn.getAttribute('aria-label') || 'Map';
    iframe.className = 'absolute inset-0 h-full w-full grayscale';
    btn.replaceWith(iframe);
  }),
);
