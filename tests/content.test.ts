import { describe, expect, it } from 'vitest';
import { catalog, productHref, searchCatalog } from '@/content/catalog';
import { productDetails } from '@/content/products';
import { investmentDetails } from '@/content/investment-details';
import { investmentForProduct, investments } from '@/content/investments';
import { guides } from '@/content/guides';
import { coverageQuestions } from '@/lib/calculators';

describe('product content', () => {
  it('has unique slugs', () => {
    expect(new Set(catalog.map((p) => p.slug)).size).toBe(catalog.length);
  });
  it('has a complete detail record for every product, and no orphans', () => {
    expect(Object.keys(productDetails).sort()).toEqual(catalog.map((p) => p.slug).sort());
    for (const p of catalog) {
      const d = productDetails[p.slug]!;
      expect(d.intro.length, p.slug).toBeGreaterThan(60);
      for (const list of [d.whoNeeds, d.covers, d.excludes, d.tips, d.claimDocs]) expect(list.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(d.faqs.length, p.slug).toBeGreaterThanOrEqual(2);
    }
  });
  it('only links to related products that exist', () => {
    const slugs = new Set(catalog.map((p) => p.slug));
    for (const [slug, d] of Object.entries(productDetails)) {
      for (const r of d.related) expect(slugs.has(r), `${slug} -> ${r}`).toBe(true);
      expect(d.related).not.toContain(slug);
    }
  });
  it('avoids absolute marketing claims', () => {
    const banned = /\b(best|cheapest|lowest|no\.? ?1|number one|100%)\b|guarantee(d|s)? (claim|settlement|return)/i;
    for (const [slug, d] of Object.entries(productDetails)) {
      expect(JSON.stringify(d), slug).not.toMatch(banned);
    }
  });
  it('coverage check gaps point at real product or tool pages', () => {
    const valid = new Set([...catalog.map((p) => productHref(p.slug)), '/tools/term-cover/', '/tools/health-cover/', '/tools/renewal-reminder/']);
    for (const q of coverageQuestions) for (const o of q.options) if (o.gap) expect(valid.has(o.gap.href), o.gap.href).toBe(true);
  });
});

describe('catalogue search', () => {
  const slugs = (q: string) => searchCatalog(q).map((p) => p.slug);
  it('matches whole word starts, not the middle of words', () => {
    expect(slugs('tractor')).toEqual(['tractor-insurance']);
    expect(slugs('contractor')).toContain('contractors-risk-insurance');
  });
  it('finds products by everyday words', () => {
    expect(slugs('parents')).toContain('senior-citizen-health-insurance');
    expect(slugs('exports')).toContain('marine-cargo-insurance');
    expect(slugs('mediclaim')).toContain('family-floater-health-insurance');
    expect(slugs('bike')).toEqual(['two-wheeler-insurance']);
  });
  it('requires every word and respects the category', () => {
    expect(slugs('health senior')).toEqual(['senior-citizen-health-insurance']);
    expect(searchCatalog('insurance', 'farm')).toHaveLength(3);
    expect(searchCatalog('')).toHaveLength(catalog.length);
    expect(slugs('zzzz')).toEqual([]);
  });
});

describe('investment content', () => {
  const slugs = new Set(investments.map((i) => i.slug));
  const products = new Set(catalog.map((p) => p.slug));
  const banned = /\b(best|cheapest|lowest|guaranteed|risk-free returns|assured returns|double your|no\.? ?1|100%)\b/i;
  it('has a detail record for every service, and no orphans', () => {
    expect(Object.keys(investmentDetails).sort()).toEqual([...slugs].sort());
  });
  it('only links to pages that exist', () => {
    for (const [slug, d] of Object.entries(investmentDetails)) {
      for (const r of d.relatedInvestments) expect(slugs.has(r), `${slug} -> ${r}`).toBe(true);
      for (const r of d.relatedInsurance) expect(products.has(r), `${slug} -> ${r}`).toBe(true);
      expect(d.relatedInvestments).not.toContain(slug);
    }
    for (const [p, i] of Object.entries(investmentForProduct)) {
      expect(products.has(p), p).toBe(true);
      expect(slugs.has(i), i).toBe(true);
    }
    for (const g of guides) {
      for (const r of g.related) expect(products.has(r), r).toBe(true);
      for (const r of g.relatedInvestments ?? []) expect(slugs.has(r), r).toBe(true);
    }
  });
  it('avoids return promises and absolute claims', () => {
    for (const [slug, d] of Object.entries(investmentDetails)) expect(JSON.stringify(d), slug).not.toMatch(banned);
  });
  it('states the risk on every service page', () => {
    for (const [slug, d] of Object.entries(investmentDetails)) expect(d.watchOut.length, slug).toBeGreaterThanOrEqual(3);
  });
});
