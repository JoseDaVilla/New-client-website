// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final del cliente
  site: 'https://www.example.com',
  integrations: [sitemap({ filter: (page) => !/\/(thanks|privacy)\/$/.test(page) })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
