/**
 * Generador determinista de ilustraciones tipo "plano" (SVG) para usar
 * como placeholder de fotografías mientras llega el contenido real.
 * Se ejecuta en build: cero JS en el cliente.
 */

export type BlueprintVariant =
  | 'tower'
  | 'midrise'
  | 'bridge'
  | 'warehouse'
  | 'campus'
  | 'hospital'
  | 'plant'
  | 'road';

export const variants: BlueprintVariant[] = ['tower', 'midrise', 'bridge', 'warehouse', 'campus', 'hospital', 'plant', 'road'];

export interface Stroke {
  d: string;
  /** 'main' | 'thin' | 'accent' | 'fill' | 'accent-fill' */
  kind: 'main' | 'thin' | 'accent' | 'fill' | 'accent-fill' | 'dash';
}

export interface Blueprint {
  w: number;
  h: number;
  ground: number;
  strokes: Stroke[];
  label: string;
  dims: { x1: number; x2: number; y: number; text: string }[];
}

function hash(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function variantFor(seed: string): BlueprintVariant {
  return variants[hash(seed) % variants.length];
}

export function blueprint(seed: string, variant: BlueprintVariant = variantFor(seed)): Blueprint {
  const rand = rng(seed + variant);
  const between = (a: number, b: number) => a + rand() * (b - a);
  const int = (a: number, b: number) => Math.floor(between(a, b + 1));

  const W = 800;
  const H = 600;
  const G = 478; // línea de suelo
  const s: Stroke[] = [];
  const dims: Blueprint['dims'] = [];
  const add = (d: string, kind: Stroke['kind'] = 'main') => s.push({ d, kind });
  const rect = (x: number, y: number, w: number, h: number, kind: Stroke['kind'] = 'main') =>
    add(`M${r1(x)} ${r1(y)}h${r1(w)}v${r1(h)}h${r1(-w)}Z`, kind);
  const hline = (x: number, y: number, w: number, kind: Stroke['kind'] = 'thin') => add(`M${r1(x)} ${r1(y)}h${r1(w)}`, kind);
  const vline = (x: number, y: number, h: number, kind: Stroke['kind'] = 'thin') => add(`M${r1(x)} ${r1(y)}v${r1(h)}`, kind);

  // Fachada genérica con plantas y montantes
  const facade = (x: number, w: number, top: number, floor = 26, cols = 6, accentFloor = -1) => {
    rect(x, top, w, G - top);
    const floors = Math.floor((G - top) / floor);
    for (let f = 1; f < floors; f++) hline(x, G - f * floor, w);
    for (let c = 1; c < cols; c++) vline(x + (w / cols) * c, top, G - top);
    if (accentFloor > 0 && accentFloor < floors) rect(x, G - (accentFloor + 1) * floor, w, floor, 'accent-fill');
    dims.push({ x1: x, x2: x + w, y: G + 34, text: `${Math.round(w * 0.12 * 10) / 10} m` });
  };

  const crane = (x: number, top: number, reach: number, dir: 1 | -1 = 1) => {
    vline(x, top, G - top, 'accent');
    vline(x + 10, top, G - top, 'accent');
    for (let y = top + 18; y < G; y += 22) add(`M${x} ${y}l10 -18`, 'thin');
    add(`M${x - 50 * dir} ${top}h${(reach + 50) * dir}`, 'accent');
    add(`M${x + 5} ${top - 34}L${x - 50 * dir} ${top}M${x + 5} ${top - 34}L${x + reach * dir} ${top}`, 'thin');
    vline(x + 5, top - 34, 34, 'accent');
    const hook = x + reach * 0.7 * dir;
    vline(hook, top, between(60, 140), 'dash');
    rect(x - 52 * dir - (dir < 0 ? 18 : 0), top + 2, 18, 14, 'accent-fill');
  };

  const tree = (x: number, r: number) => {
    add(`M${x} ${G}v${-r}`, 'thin');
    add(`M${x - r} ${G - r * 1.6}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`, 'thin');
  };

  let label = '';
  switch (variant) {
    case 'tower': {
      const w = between(150, 210);
      const x = between(260, 380);
      const top = between(70, 120);
      facade(x, w, top, 24, int(5, 8), int(3, 9));
      rect(x + 20, top - 30, w - 40, 30);
      // podio
      facade(x - 90, 90, G - 110, 26, 3);
      facade(x + w, 120, G - 80, 26, 4);
      crane(x + w + 60, top - 40, 220, -1);
      label = 'Tower · North elevation';
      break;
    }
    case 'midrise': {
      let x = 90;
      const blocks = int(3, 4);
      for (let i = 0; i < blocks; i++) {
        const w = between(120, 180);
        const top = between(200, 320);
        facade(x, w, top, 28, int(3, 6), i === 1 ? int(2, 5) : -1);
        add(`M${x - 6} ${top}h${w + 12}`, 'main');
        x += w + between(8, 24);
      }
      tree(60, 16);
      tree(x + 30, 20);
      label = 'Mixed-use · Street elevation';
      break;
    }
    case 'bridge': {
      const deck = 330;
      add(`M0 ${deck}H${W}M0 ${deck + 14}H${W}`, 'main');
      const p1 = 250;
      const p2 = 550;
      for (const p of [p1, p2]) {
        rect(p - 10, 110, 20, G - 110);
        for (let k = 1; k <= 7; k++) {
          add(`M${p} ${120 + k * 10}L${p - k * 30} ${deck}M${p} ${120 + k * 10}L${p + k * 30} ${deck}`, k % 3 === 0 ? 'accent' : 'thin');
        }
      }
      add(`M0 ${G}Q400 ${G - 40} ${W} ${G}`, 'thin');
      for (let x = 20; x < W; x += 40) add(`M${x} ${G + 20}q10 -6 20 0t20 0`, 'thin');
      dims.push({ x1: p1, x2: p2, y: deck - 40, text: `${Math.round((p2 - p1) * 0.6)} m span` });
      label = 'Cable-stayed bridge · Profile';
      break;
    }
    case 'warehouse': {
      const x = 80;
      const w = 640;
      const top = between(300, 340);
      rect(x, top, w, G - top);
      const teeth = int(6, 9);
      const tw = w / teeth;
      let d = `M${x} ${top}`;
      for (let i = 0; i < teeth; i++) d += `l0 -34l${r1(tw)} 34`;
      add(d, 'main');
      for (let i = 0; i < teeth; i++) add(`M${r1(x + i * tw)} ${top - 34}l${r1(tw * 0.25)} 8.5`, 'accent');
      const docks = int(5, 8);
      for (let i = 0; i < docks; i++) rect(x + 40 + i * 70, G - 60, 50, 60, i === 2 ? 'accent-fill' : 'main');
      hline(x, top + 28, w);
      dims.push({ x1: x, x2: x + w, y: G + 34, text: `${int(180, 320)},000 sq ft` });
      label = 'Distribution centre · South elevation';
      break;
    }
    case 'campus': {
      let x = 50;
      while (x < 700) {
        const w = between(120, 200);
        const top = between(300, 380);
        rect(x, top, w, G - top);
        add(`M${x - 8} ${top}L${x + w / 2} ${top - between(30, 60)}L${x + w + 8} ${top}`, 'main');
        for (let i = 1; i < 5; i++) vline(x + (w / 5) * i, top + 20, G - top - 20);
        hline(x, top + 40, w);
        x += w + between(30, 60);
        tree(x - between(10, 22), between(10, 16));
      }
      rect(330, G - 60, 70, 60, 'accent-fill');
      label = 'Campus · Site section';
      break;
    }
    case 'hospital': {
      facade(140, 160, 210, 30, 4);
      facade(500, 160, 210, 30, 4, 4);
      facade(300, 200, 290, 30, 5);
      rect(385, 180, 30, 80, 'accent');
      rect(360, 205, 80, 30, 'accent');
      add(`M300 290L300 250H500V290`, 'thin');
      label = 'Healthcare · Front elevation';
      break;
    }
    case 'plant': {
      const tanks = int(3, 4);
      for (let i = 0; i < tanks; i++) {
        const cx = 120 + i * 120;
        const r = between(36, 50);
        const top = between(300, 360);
        add(`M${cx - r} ${G}V${top}a${r} 16 0 0 1 ${2 * r} 0V${G}`, 'main');
        add(`M${cx - r} ${top}a${r} 16 0 0 0 ${2 * r} 0`, 'thin');
        for (let y = top + 30; y < G; y += 30) hline(cx - r, y, 2 * r);
      }
      for (const [sx, top] of [
        [610, 120],
        [660, 170],
      ]) {
        add(`M${sx - 12} ${G}L${sx - 8} ${top}H${sx + 8}L${sx + 12} ${G}`, 'main');
        hline(sx - 9, top + 18, 18, 'accent');
      }
      add(`M80 ${G - 120}H700M80 ${G - 108}H700`, 'accent');
      rect(560, G - 160, 160, 160);
      label = 'Process facility · Section A-A';
      break;
    }
    case 'road': {
      // Perspectiva de vía con intercambio
      add(`M0 ${G}L360 260M800 ${G}L440 260`, 'main');
      for (let i = 0; i < 9; i++) {
        const t = i / 9;
        const y = 260 + (G - 260) * t * t;
        add(`M${r1(400 - 2 * t * 4)} ${r1(y)}v${r1(6 + t * 20)}`, 'accent');
      }
      add(`M0 300C200 320 300 200 400 210S650 330 800 280`, 'main');
      add(`M0 314C200 334 300 214 400 224S650 344 800 294`, 'thin');
      for (let x = 60; x < W; x += 90) vline(x, 290 + Math.sin(x / 120) * 30, G - 290, 'thin');
      label = 'Interchange · Perspective';
      break;
    }
  }

  // Suelo y cotas
  add(`M0 ${G}H${W}`, 'main');
  for (let x = 0; x < W; x += 16) add(`M${x} ${G + 2}l-10 10`, 'thin');

  return { w: W, h: H, ground: G, strokes: s, label, dims };
}
