import type { MetadataRoute } from 'next';
import { catalog, productHref } from '@/content/catalog';
import { guides } from '@/content/guides';
import { investmentHref, investments } from '@/content/investments';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/insurance/', '/nri-families/', '/business/', '/tools/', '/tools/coverage-check/', '/tools/term-cover/', '/tools/health-cover/',
    '/tools/sip-calculator/', '/tools/goal-planner/', '/tools/renewal-reminder/', '/investments/', '/claims/', '/guides/', '/about/', '/contact/', '/disclosures/', '/privacy/', '/terms/',
    ...catalog.map((p) => productHref(p.slug)),
    ...investments.map((i) => investmentHref(i.slug)),
    ...guides.map((g) => `/guides/${g.slug}/`),
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
