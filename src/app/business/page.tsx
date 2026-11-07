import { ArrowRight, Building2, HeartHandshake, Scale, Ship } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { Photo } from '@/components/Photo';
import { Breadcrumbs, faqJsonLd, Faqs, JsonLd, SectionHeading } from '@/components/ui';
import { findProduct, productHref } from '@/content/catalog';
import { messages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Business Insurance for Jalandhar Manufacturers and Traders',
  description: 'Factory, fire, marine cargo, liability, trade credit and group cover for Jalandhar businesses, including sports goods and hand tool manufacturers.',
  alternates: { canonical: '/business/' },
};

const risks = [
  { icon: Building2, title: 'Your premises, machinery and stock', text: 'A fire or flood can stop production. Cover can help you rebuild and support you while you get back to work.', products: ['factory-insurance', 'fire-insurance', 'shop-insurance', 'contractors-risk-insurance'] },
  { icon: Ship, title: 'Goods and payments', text: 'Shipments can be damaged, and buyers may not pay. These plans protect the money tied up in your sales.', products: ['marine-cargo-insurance', 'trade-credit-insurance'] },
  { icon: Scale, title: 'Claims against your business', text: 'Injuries, faulty products, data breaches and professional errors can all lead to costly legal claims.', products: ['liability-insurance', 'professional-indemnity-insurance', 'cyber-insurance'] },
  { icon: HeartHandshake, title: 'Your people', text: 'Protect your workers, meet your responsibilities as an employer and offer benefits that can help you retain staff.', products: ['workmens-compensation-insurance', 'group-health-insurance', 'group-life-insurance'] },
];

const review = ['Are your stock and machinery values up to date?', 'Do your policies list every location you use?', 'Do you know who carries the risk at each stage of a shipment?', 'Would you have enough income to get through months of downtime?', 'Does your liability cover meet what your overseas buyers require?', 'Are your workers and contractors correctly declared?'];

const faqs = [
  { q: 'We are a small unit. Is this only for large companies?', a: 'No. Many small shops and workshops can start with a simple package and add cover as they grow.' },
  { q: 'Can you review policies arranged by someone else?', a: 'Yes. Share your current policies and we can go through values, locations and any gaps with you.' },
  { q: 'What do you need to get started?', a: 'A short description of your business, your locations, approximate values and your current policies. We can then tell you what else is required.' },
];

export default function BusinessPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="wrap grid items-center gap-10 pt-8 pb-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Breadcrumbs items={[{ name: 'Business' }]} />
          <p className="eyebrow mt-8">For makers, traders and exporters</p>
          <h1 className="mt-3 text-[clamp(2.5rem,1.7rem+3.4vw,4.4rem)]">Your business took years to build. Make sure one bad day can’t undo it.</h1>
          <p className="lede mt-5 max-w-xl">From sports goods and hand tools to shops and service firms, Jalandhar’s businesses have their own risks. We help you match your cover to the ones you actually face.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={messages.business}>Review my business cover</WhatsAppButton>
            <CallButton />
          </div>
        </div>
        <Photo name="business" sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] w-full rounded-[1.75rem] object-cover object-[72%_45%] shadow-lift" />
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap">
          <SectionHeading eyebrow="Where businesses are exposed" title="Four areas that deserve a proper look." />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {risks.map((r) => (
              <li key={r.title} className="rounded-[1.25rem] bg-bone p-7 sm:p-8">
                <r.icon aria-hidden="true" className="size-9 text-leaf-600" />
                <h3 className="mt-4 text-2xl">{r.title}</h3>
                <p className="mt-2 text-muted">{r.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {r.products.map((slug) => (
                    <li key={slug}>
                      <Link href={productHref(slug)} className="link inline-flex items-center gap-1.5">
                        {findProduct(slug)?.name}
                        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="wrap">
          <div className="grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-navy-900 text-white lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="eyebrow eyebrow-light">A quick self-check</p>
              <h2 className="section-title mt-3 !text-white">Six questions to ask before your next renewal.</h2>
              <ol className="mt-6 space-y-3">
                {review.map((q, i) => (
                  <li key={q} className="flex items-start gap-3 text-navy-50">
                    <span className="font-display text-lg font-semibold text-lime">{i + 1}</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <Link href="/guides/insurance-checklist-for-jalandhar-manufacturers/" className="btn btn-light mt-7">
                Read the full checklist
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <Photo name="workshop" sizes="(min-width: 1024px) 600px, 100vw" className="h-full min-h-72 w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <SectionHeading eyebrow="Questions" title="What business owners often ask." />
          <Faqs items={faqs} />
        </div>
      </section>
    </>
  );
}
