import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { sectors } from './site.config';

const variant = z.enum(['tower', 'midrise', 'bridge', 'warehouse', 'campus', 'hospital', 'plant', 'road']);

/**
 * Proyectos: un archivo .md por proyecto en src/content/projects.
 * `cover` y `gallery` aceptan imágenes locales (src/assets/...) que Astro
 * optimiza automáticamente a AVIF/WebP. Si se omiten, se usa el placeholder.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      sector: z.enum(sectors),
      location: z.string(),
      client: z.string(),
      year: z.number(),
      status: z.enum(['Completed', 'In progress', 'Pre-construction']),
      value: z.string().optional(),
      size: z.string().optional(),
      delivery: z.string(),
      services: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      cover: image().optional(),
      gallery: z.array(z.object({ src: image().optional(), caption: z.string(), variant: variant.optional() })).default([]),
      video: z.string().url().optional(),
      variant: variant.optional(),
      facts: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      category: z.enum(['Company', 'Projects', 'Safety', 'Community', 'Careers']),
      author: z.string().default('Communications Team'),
      cover: image().optional(),
      variant: variant.optional(),
    }),
});

export const collections = { projects, news };
