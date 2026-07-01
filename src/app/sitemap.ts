import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { getAllCategories } from '@entities/question';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fedeep.kr';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/reference`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/learn/flashcard`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/learn/daily`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/search`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const categories = await getAllCategories(supabase);
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/reference/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
