import { ArrowRight, HeartPulse, PiggyBank, Sprout } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { ContactSection } from '@/components/ContactSection';
import { MutualFundNotice } from '@/components/Disclosure';
import { ProductIcon } from '@/components/icons';
import { Photo } from '@/components/Photo';
import { SipMini } from '@/components/tools/SipMini';
import { Breadcrumbs, faqJsonLd, Faqs, JsonLd, SectionHeading } from '@/components/ui';
import { investmentFaqs } from '@/content/investment-faqs';
import { investmentHref, investments } from '@/content/investments';
import { messages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Mutual Funds and SIPs',
  description: 'Mutual funds, SIPs, goal-based and retirement investing, explained in plain language by Insure Secure in Jalandhar. Mutual fund investments are subject to market risks.',
  alternates: { canonical: '/investments/' },
};

const order = [
  { icon: PiggyBank, title: 'Keep a safety net', text: 'Set aside several months of expenses, so that an emergency does not force you to sell investments.' },
  { icon: HeartPulse, title: 'Get protected', text: 'Health and term insurance shield your family and your savings from the biggest shocks.', href: '/tools/coverage-check/', cta: 'Check your cover' },
  { icon: Sprout, title: 'Invest for your goals', text: 'With the basics in place, a monthly SIP can work steadily towards what you want.', href: '/tools/goal-planner/', cta: 'Plan a goal' },
];

export default function InvestmentsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(investmentFaqs)} />
      <section className="wrap grid items-center gap-10 pt-8 pb-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Breadcrumbs items={[{ name: 'Investments' }]} />
          <p className="eyebrow mt-8">Investments</p>
          <h1 className="mt-3 text-[clamp(2.5rem,1.7rem+3.4vw,4.4rem)]">Your money should have a plan, not just a bank account.</h1>
          <p className="lede mt-5 max-w-xl">Mutual funds and SIPs for education, a home, retirement and more, explained in plain language by the same person who looks after your insurance.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={messages.investing}>Start the conversation</WhatsAppButton>
            <CallButton />
          </div>
        </div>
        <Photo name="planning" sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] w-full rounded-[1.75rem] object-cover object-[60%_50%] shadow-lift" />
      </section>
      <div className="wrap pb-12">
        <MutualFundNotice />
      </div>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap">
          <SectionHeading eyebrow="What we help with" title="Where would you like to start?" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {investments.map((i) => (
              <li key={i.slug}>
                <Link href={investmentHref(i.slug)} className="group flex h-full flex-col rounded-[1.25rem] bg-bone p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <ProductIcon name={i.icon} className="size-8 text-leaf-600" />
                  <span className="mt-4 font-display text-xl font-semibold text-navy-900 group-hover:text-leaf-700">{i.name}</span>
                  <span className="mt-2 flex-1 text-[0.95rem] text-muted">{i.blurb}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy-700">
                    Learn more <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="wrap">
          <SectionHeading eyebrow="The right order" title="Protect first. Then grow." lede="Looking at your insurance and investments together helps you get them in the right order, so that a setback does not undo years of saving." />
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {order.map((o, i) => (
              <li key={o.title} className="border-t-2 border-navy-900 pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-medium text-leaf-600">{i + 1}</span>
                  <o.icon aria-hidden="true" className="size-7 text-navy-700" />
                </div>
                <h3 className="mt-3 text-2xl">{o.title}</h3>
                <p className="mt-2 text-muted">{o.text}</p>
                {o.href && <Link href={o.href} className="link mt-3 inline-block">{o.cta}</Link>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-14 lg:pb-20">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Questions" title="Good to know before you invest." />
            <div className="mt-8">
              <Faqs items={investmentFaqs} />
            </div>
          </div>
          <SipMini />
        </div>
      </section>

      <ContactSection defaultProduct="Mutual Funds" />
    </>
  );
}
