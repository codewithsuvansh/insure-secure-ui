import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WhatsAppButton } from '@/components/Actions';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { findProduct, productHref } from '@/content/catalog';
import { findGuide, guides } from '@/content/guides';
import { findInvestment, investmentHref } from '@/content/investments';
import { MutualFundNotice } from '@/components/Disclosure';
import { site } from '@/content/site';
import { messages } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = findGuide((await params).slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: { type: 'article', title: guide.title, description: guide.summary },
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = findGuide((await params).slug);
  if (!guide) notFound();
  const related = [
    ...guide.related.map(findProduct).filter((p) => p !== undefined).map((p) => ({ href: productHref(p.slug), name: p.name })),
    ...(guide.relatedInvestments ?? []).map(findInvestment).filter((i) => i !== undefined).map((i) => ({ href: investmentHref(i.slug), name: i.name })),
  ];
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.summary,
          author: { '@type': 'Organization', name: site.legalName },
          publisher: { '@type': 'Organization', name: site.legalName },
        }}
      />
      <article className="wrap max-w-3xl pt-8 pb-16">
        <Breadcrumbs items={[{ name: 'Guides', href: '/guides/' }, { name: guide.title }]} />
        <p className="eyebrow mt-8">{guide.readMinutes} minute read</p>
        <h1 className="mt-3 text-[clamp(2.3rem,1.7rem+2.8vw,3.75rem)]">{guide.title}</h1>
        <div className="mt-8 space-y-8 text-[1.125rem] leading-[1.7]">
          {guide.sections.map((s, i) => (
            <section key={s.heading ?? i}>
              {s.heading && <h2 className="mb-3 text-3xl">{s.heading}</h2>}
              {s.paragraphs?.map((p) => <p key={p} className="mb-3">{p}</p>)}
              {s.bullets && (
                <ul className="mb-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-3 size-2 shrink-0 rounded-full bg-leaf-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        {(guide.relatedInvestments?.length ?? 0) > 0 && <MutualFundNotice className="mt-8" />}
        <p className="mt-8 text-sm text-muted">This guide is general information and not personal advice. Policy terms differ, so please read the wording of any plan before you buy.</p>
        <aside className="mt-10 rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-9">
          <h2 className="text-3xl !text-white">Have a question about your own situation?</h2>
          <p className="mt-2 text-navy-100">Send us a message and we will help you work it out.</p>
          <WhatsAppButton message={messages.general} className="mt-6 !bg-white !text-navy-900 hover:!bg-leaf-100">Ask on WhatsApp</WhatsAppButton>
        </aside>
        <h2 className="mt-12 text-2xl">Related pages</h2>
        <ul className="mt-3 space-y-2">
          {related.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="link inline-flex items-center gap-1.5">
                {p.name} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
