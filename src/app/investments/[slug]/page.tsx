import { AlertTriangle, ArrowRight, Calculator, Check, Lightbulb, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { MutualFundNotice } from '@/components/Disclosure';
import { ProductIcon } from '@/components/icons';
import { Photo } from '@/components/Photo';
import { QuoteForm } from '@/components/QuoteForm';
import { Breadcrumbs, breadcrumbJsonLd, faqJsonLd, Faqs, JsonLd } from '@/components/ui';
import { findProduct, productHref } from '@/content/catalog';
import { investmentDetails } from '@/content/investment-details';
import { findInvestment, investmentHref, investments } from '@/content/investments';
import { site } from '@/content/site';
import { messages } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return investments.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findInvestment(slug);
  const detail = investmentDetails[slug];
  if (!item || !detail) return {};
  return {
    title: item.name,
    description: `${detail.intro} Mutual fund investments are subject to market risks.`,
    alternates: { canonical: investmentHref(slug) },
    openGraph: { title: `${item.name} in Jalandhar | ${site.name}`, description: item.blurb },
  };
}

export default async function InvestmentPage({ params }: Props) {
  const { slug } = await params;
  const item = findInvestment(slug);
  const detail = investmentDetails[slug];
  if (!item || !detail) notFound();
  const relatedLinks = [
    ...detail.relatedInvestments.map(findInvestment).filter((i) => i !== undefined).map((i) => ({ href: investmentHref(i.slug), name: i.name })),
    ...detail.relatedInsurance.map(findProduct).filter((p) => p !== undefined).map((p) => ({ href: productHref(p.slug), name: p.name })),
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(detail.faqs)} />
      <JsonLd data={breadcrumbJsonLd(site.url, [{ name: 'Investments', href: '/investments/' }, { name: item.name, href: investmentHref(slug) }])} />

      <section className="wrap grid items-center gap-10 pt-8 pb-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Breadcrumbs items={[{ name: 'Investments', href: '/investments/' }, { name: item.name }]} />
          <p className="eyebrow mt-8 flex items-center gap-2">
            <ProductIcon name={item.icon} className="size-5" />
            Investments
          </p>
          <h1 className="mt-3 text-[clamp(2.4rem,1.7rem+3vw,4rem)]">{item.name}</h1>
          <p className="lede mt-5">{detail.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={slug === 'portfolio-review' ? messages.portfolioReview : messages.investment(item.name)}>Ask about this</WhatsAppButton>
            <CallButton />
          </div>
        </div>
        <Photo name={item.photo} sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-lift" style={{ objectPosition: item.position ?? '50% 50%' }} />
      </section>

      <div className="wrap pb-10">
        <MutualFundNotice />
      </div>

      <section className="wrap pb-5">
        <div className="card flex items-start gap-4 p-7">
          <UserCheck aria-hidden="true" className="mt-0.5 size-8 shrink-0 text-leaf-600" />
          <div>
            <h2 className="text-2xl">Who it can suit</h2>
            <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-3">
              {detail.suits.map((w) => <li key={w} className="text-muted">{w}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap pb-5">
        <div className="card p-7 sm:p-9">
          <h2 className="text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {detail.howItWorks.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-body text-lg font-semibold">{s.title}</h3>
                  <p className="mt-0.5 text-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap grid gap-5 pb-5 md:grid-cols-2">
        <div className="card p-7">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="flex size-9 items-center justify-center rounded-full bg-leaf-100 text-leaf-700"><Check aria-hidden="true" className="size-5" /></span>
            Why people choose it
          </h2>
          <ul className="mt-5 space-y-3">
            {detail.attractions.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-leaf-600" strokeWidth={2.5} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-7">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-amber-900"><AlertTriangle aria-hidden="true" className="size-5" /></span>
            Risks and what to watch
          </h2>
          <ul className="mt-5 space-y-3">
            {detail.watchOut.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <AlertTriangle aria-hidden="true" className="mt-1 size-4 shrink-0 text-amber-700" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap grid gap-5 pb-14 md:grid-cols-[1.2fr_1fr]">
        <div className="card p-7">
          <h2 className="flex items-center gap-3 text-2xl">
            <Lightbulb aria-hidden="true" className="size-7 text-leaf-600" />
            Practical tips
          </h2>
          <ul className="mt-5 space-y-3">
            {detail.tips.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-leaf-500" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-between rounded-[1.25rem] bg-navy-900 p-7 text-white">
          <div>
            <Calculator aria-hidden="true" className="size-9 text-lime" />
            <h2 className="mt-4 text-2xl !text-white">See the numbers for yourself</h2>
            <p className="mt-2 text-navy-100">An illustration using amounts and rates that you choose.</p>
          </div>
          <Link href={detail.tool.href} className="btn btn-light mt-6">
            {detail.tool.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Common questions</h2>
            <div className="mt-7">
              <Faqs items={detail.faqs} />
            </div>
            <h2 className="mt-12 text-2xl">Related pages</h2>
            <ul className="mt-4 space-y-2">
              {relatedLinks.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="link inline-flex items-center gap-1.5">
                    {r.name}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-[1.75rem] bg-bone p-7 sm:p-9" id="quote">
            <h2 className="text-3xl">Ask about {item.name}</h2>
            <p className="mt-2 mb-6 text-muted">Share a few details, and they will open as a WhatsApp message to us.</p>
            <QuoteForm defaultProduct={item.name} compact />
          </div>
        </div>
      </section>
    </>
  );
}
