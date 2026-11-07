import { ArrowRight, BellRing, Gauge, HeartPulse, Repeat, ScanSearch, Target, Umbrella } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/Actions';
import { PageHeader } from '@/components/ui';
import { messages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Free Insurance Tools',
  description: 'Check your coverage gaps, estimate term and health cover, illustrate a SIP, plan a goal and set a renewal reminder.',
  alternates: { canonical: '/tools/' },
};

const tools = [
  { href: '/tools/coverage-check/', icon: Gauge, name: 'Coverage check', text: 'Six questions, a protection score and a list of your gaps.' },
  { href: '/tools/term-cover/', icon: Umbrella, name: 'Term cover calculator', text: 'Estimate the life cover your family may need.' },
  { href: '/tools/health-cover/', icon: HeartPulse, name: 'Health cover guide', text: 'A starting range based on your family and city.' },
  { href: '/tools/sip-calculator/', icon: Repeat, name: 'SIP calculator', text: 'Illustrate what a monthly investment could become.' },
  { href: '/tools/goal-planner/', icon: Target, name: 'Goal planner', text: 'Work out a monthly amount for education, a home or retirement.' },
  { href: '/tools/renewal-reminder/', icon: BellRing, name: 'Renewal reminder', text: 'Add your renewal date to your calendar.' },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools' }]} eyebrow="Tools" title="Get clear on your cover and your goals, in minutes." lede="No sign-up needed. These tools run in your browser and do not store what you enter." />
      <section className="wrap grid gap-5 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="card group flex flex-col p-8 transition hover:-translate-y-0.5 hover:border-leaf-500 hover:shadow-lift">
            <t.icon aria-hidden="true" className="size-10 text-leaf-600" />
            <h2 className="mt-5 text-3xl group-hover:text-leaf-700">{t.name}</h2>
            <p className="mt-2 text-muted">{t.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-700">
              Open <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        ))}
        <div className="flex flex-col items-start rounded-[1.25rem] bg-navy-900 p-8 text-white md:col-span-2 lg:col-span-3">
          <ScanSearch aria-hidden="true" className="size-10 text-lime" />
          <h2 className="mt-5 text-3xl !text-white">Want a person to check your policy?</h2>
          <p className="mt-2 max-w-2xl text-navy-100">Send your policy details on WhatsApp for a second opinion on what it covers and where it may fall short.</p>
          <WhatsAppButton message={messages.secondOpinion} className="mt-6 !bg-white !text-navy-900 hover:!bg-leaf-100">Get a second opinion</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
