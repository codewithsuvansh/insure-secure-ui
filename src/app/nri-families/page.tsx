import { ArrowRight, Check, Clock, FileCheck2, HousePlus, MessageSquareText, Plane, Stethoscope, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/Actions';
import { Photo } from '@/components/Photo';
import { Breadcrumbs, faqJsonLd, Faqs, JsonLd, SectionHeading } from '@/components/ui';
import { messages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Insurance for NRI Families',
  description: 'Health cover for parents in Punjab, protection for your home and travel insurance for visits and students, arranged by Insure Secure in Jalandhar.',
  alternates: { canonical: '/nri-families/' },
};

const needs = [
  { icon: Stethoscope, title: 'Your parents’ health', text: 'Senior citizen cover, with honest guidance on waiting periods, co-payments and hospitals near your parents.', href: '/insurance/senior-citizen-health-insurance/', cta: 'Senior citizen health' },
  { icon: HousePlus, title: 'The family home', text: 'Building and contents cover, planned around how often the house is actually occupied.', href: '/insurance/home-insurance/', cta: 'Home insurance' },
  { icon: Plane, title: 'Visits and journeys', text: 'Cover for parents visiting you overseas, and your family’s trips between countries.', href: '/insurance/international-travel-insurance/', cta: 'International travel' },
  { icon: FileCheck2, title: 'Students leaving home', text: 'Long-stay plans for study abroad, checked against your university’s written requirements.', href: '/insurance/student-travel-insurance/', cta: 'Student travel' },
  { icon: TrendingUp, title: 'Investing in India', text: 'Mutual funds and SIPs through NRE or NRO accounts, after checking the rules for the country you live in. Mutual fund investments are subject to market risks.', href: '/investments/nri-investing/', cta: 'Mutual funds for NRIs' },
];

const howWeHelp = [
  { icon: MessageSquareText, title: 'Talk on WhatsApp, from anywhere', text: 'Use the same app your family already uses, and message when it suits you.' },
  { icon: Clock, title: 'Allow for your time zone', text: 'Send your questions at any time, and we will reply when we are available.' },
  { icon: Check, title: 'Have a contact in Jalandhar', text: 'Your parents can visit or call the office, instead of relying on you for everything from abroad.' },
];

const faqs = [
  { q: 'Can I buy a health policy for my parents from abroad?', a: 'In many cases, yes. Rules on the proposer and how premiums may be paid differ by insurer. We check these for your situation at the start.' },
  { q: 'Is the house covered if nobody lives there?', a: 'It depends. Many policies have conditions for homes left empty for a long time, so tell the insurer how the house is used. Do not assume that a standard policy will respond.' },
  { q: 'Do my parents need medical tests?', a: 'Sometimes. It depends on their ages, their medical history and the insurer. Have their recent reports ready, and declare all conditions.' },
  { q: 'Will a visitor plan satisfy my host country’s visa rules?', a: 'Requirements differ by country and visa type. Share the official requirement with us, and always confirm with the authority issuing the visa.' },
];

export default function NriPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="wrap grid items-center gap-10 pt-8 pb-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Breadcrumbs items={[{ name: 'NRI families' }]} />
          <p className="eyebrow mt-8">For families abroad</p>
          <h1 className="mt-3 text-[clamp(2.5rem,1.7rem+3.4vw,4.4rem)]">You may live far away. They are still your responsibility.</h1>
          <p className="lede mt-5 max-w-xl">Many families in Jalandhar and the Doaba region have children overseas and parents at home. We help you arrange cover for the people and property you left behind.</p>
          <WhatsAppButton message={messages.nri} className="mt-7">Message us from anywhere</WhatsAppButton>
        </div>
        <Photo name="generations" sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] w-full rounded-[1.75rem] object-cover object-[50%_22%] shadow-lift" />
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap">
          <SectionHeading eyebrow="What families ask about" title="Five things to sort out, from wherever you are." />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {needs.map((n) => (
              <li key={n.title} className="flex flex-col rounded-[1.25rem] bg-bone p-7 last:md:col-span-2 sm:p-8">
                <n.icon aria-hidden="true" className="size-9 text-leaf-600" />
                <h3 className="mt-4 text-2xl">{n.title}</h3>
                <p className="mt-2 flex-1 text-muted">{n.text}</p>
                <Link href={n.href} className="link mt-4 inline-flex items-center gap-1.5">
                  {n.cta} <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="wrap">
          <SectionHeading eyebrow="Working together" title="Designed for long-distance families." />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {howWeHelp.map((h) => (
              <li key={h.title} className="border-t-2 border-navy-900 pt-5">
                <h.icon aria-hidden="true" className="size-7 text-leaf-600" />
                <h3 className="mt-3 text-2xl">{h.title}</h3>
                <p className="mt-2 text-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <SectionHeading eyebrow="Questions" title="What NRI families often ask." />
          <Faqs items={faqs} />
        </div>
      </section>
    </>
  );
}
