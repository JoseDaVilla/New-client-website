// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: https://josedavilla.github.io/New-client-website/
  // Con dominio propio: SITE_URL=https://www.cliente.com BASE_PATH=/
  site: process.env.SITE_URL ?? 'https://josedavilla.github.io',
  base: process.env.BASE_PATH ?? '/New-client-website',
  integrations: [sitemap({ filter: (page) => !/\/(thanks|privacy)\/$/.test(page) })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
