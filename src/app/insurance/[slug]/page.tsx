import { ArrowRight, Check, FileText, Lightbulb, UserCheck, X } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { ProductIcon } from '@/components/icons';
import { Photo } from '@/components/Photo';
import { QuoteForm } from '@/components/QuoteForm';
import { Breadcrumbs, breadcrumbJsonLd, faqJsonLd, Faqs, JsonLd } from '@/components/ui';
import { catalog, categories, findProduct, productHref, type CategoryId } from '@/content/catalog';
import type { PhotoName } from '@/content/photos';
import { findInvestment, investmentForProduct, investmentHref } from '@/content/investments';
import { productDetails } from '@/content/products';
import { site } from '@/content/site';
import { messages } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

const categoryPhoto: Record<CategoryId, PhotoName> = {
  health: 'mother',
  life: 'family',
  motor: 'car',
  'home-travel': 'home',
  business: 'business',
  farm: 'farm',
};

const photoOverride: Record<string, PhotoName> = {
  'international-travel-insurance': 'travel',
  'student-travel-insurance': 'travel',
  'senior-citizen-health-insurance': 'generations',
  'individual-health-insurance': 'health',
  'critical-illness-insurance': 'health',
  'factory-insurance': 'workshop',
};

const photoPosition: Partial<Record<PhotoName, string>> = {
  generations: '50% 25%',
  car: '50% 55%',
  business: '75% 45%',
  health: '65% 25%',
  farm: '50% 70%',
};

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findProduct(slug);
  const detail = productDetails[slug];
  if (!item || !detail) return {};
  return {
    title: item.name,
    description: detail.intro,
    alternates: { canonical: productHref(slug) },
    openGraph: { title: `${item.name} in Jalandhar | ${site.name}`, description: item.blurb },
  };
}

function ListCard({ title, icon, items, tone }: { title: string; icon: React.ReactNode; items: string[]; tone: 'yes' | 'no' | 'plain' }) {
  return (
    <div className="card h-full p-7">
      <h2 className="flex items-center gap-3 text-2xl">
        {icon}
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((text) => (
          <li key={text} className="flex items-start gap-3">
            {tone === 'yes' && <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-leaf-600" strokeWidth={2.5} />}
            {tone === 'no' && <X aria-hidden="true" className="mt-1 size-5 shrink-0 text-red-700" strokeWidth={2.5} />}
            {tone === 'plain' && <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-leaf-500" />}
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const item = findProduct(slug);
  const detail = productDetails[slug];
  if (!item || !detail) notFound();
  const category = categories.find((c) => c.id === item.category)!;
  const photo = photoOverride[slug] ?? categoryPhoto[item.category];
  const related = detail.related.map((r) => findProduct(r)).filter((r) => r !== undefined);
  const pairedInvestment = findInvestment(investmentForProduct[slug] ?? '');

  return (
    <>
      <JsonLd data={faqJsonLd(detail.faqs)} />
      <JsonLd data={breadcrumbJsonLd(site.url, [{ name: 'Insurance', href: '/insurance/' }, { name: item.name, href: productHref(slug) }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: item.name,
          description: detail.intro,
          provider: { '@type': 'InsuranceAgency', name: site.legalName, telephone: site.phone.e164 },
          areaServed: 'Jalandhar',
        }}
      />

      <section className="wrap grid items-center gap-10 pt-8 pb-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Breadcrumbs items={[{ name: 'Insurance', href: '/insurance/' }, { name: item.name }]} />
          <p className="eyebrow mt-8 flex items-center gap-2">
            <ProductIcon name={item.icon} className="size-5" />
            {category.name} insurance
          </p>
          <h1 className="mt-3 text-[clamp(2.4rem,1.7rem+3vw,4rem)]">{item.name}</h1>
          <p className="lede mt-5">{detail.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={messages.product(item.name)}>Ask about this cover</WhatsAppButton>
            <CallButton />
          </div>
        </div>
        <Photo name={photo} sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-lift" style={{ objectPosition: photoPosition[photo] ?? '50% 50%' }} />
      </section>

      <section className="wrap pb-14">
        <div className="card flex items-start gap-4 p-7">
          <UserCheck aria-hidden="true" className="mt-0.5 size-8 shrink-0 text-leaf-600" />
          <div>
            <h2 className="text-2xl">Who it suits</h2>
            <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-3">
              {detail.whoNeeds.map((w) => (
                <li key={w} className="text-muted">{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-5 pb-5 md:grid-cols-2">
        <ListCard title="What it usually covers" tone="yes" items={detail.covers} icon={<span className="flex size-9 items-center justify-center rounded-full bg-leaf-100 text-leaf-700"><Check aria-hidden="true" className="size-5" /></span>} />
        <ListCard title="What to watch out for" tone="no" items={detail.excludes} icon={<span className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-700"><X aria-hidden="true" className="size-5" /></span>} />
      </section>
      <section className="wrap grid gap-5 pb-5 md:grid-cols-2">
        <ListCard title="Buying tips" tone="plain" items={detail.tips} icon={<Lightbulb aria-hidden="true" className="size-7 text-leaf-600" />} />
        <ListCard title="Keep ready for a claim" tone="plain" items={detail.claimDocs} icon={<FileText aria-hidden="true" className="size-7 text-leaf-600" />} />
      </section>
      <p className="wrap pb-14 text-sm text-muted">Cover differs between insurers and plans. The policy wording decides what is covered, so please read it before buying.</p>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Common questions</h2>
            <div className="mt-7">
              <Faqs items={detail.faqs} />
            </div>
            <h2 className="mt-12 text-2xl">Related cover</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={productHref(r.slug)} className="link inline-flex items-center gap-1.5">
                    {r.name}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
              {pairedInvestment && (
                <li>
                  <Link href={investmentHref(pairedInvestment.slug)} className="link inline-flex items-center gap-1.5">
                    Also consider: {pairedInvestment.name}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="self-start rounded-[1.75rem] bg-bone p-7 sm:p-9" id="quote">
            <h2 className="text-3xl">Ask about {item.name.toLowerCase().includes('ulip') ? 'ULIPs' : item.name}</h2>
            <p className="mt-2 mb-6 text-muted">Share a few details, and they will open as a WhatsApp message to us.</p>
            <QuoteForm defaultProduct={item.name} compact />
          </div>
        </div>
      </section>
    </>
  );
}
