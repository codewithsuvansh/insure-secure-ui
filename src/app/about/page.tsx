import { BookOpenText, Eye, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { PageHeader } from '@/components/ui';
import { site } from '@/content/site';
import { messages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Insure Secure and Sakul Mahajan',
  description: 'Insure Secure Financial Services offers insurance and mutual fund services in Jalandhar, founded by Sakul Mahajan.',
  alternates: { canonical: '/about/' },
};

const values = [
  { icon: BookOpenText, title: 'Plain language', text: 'We explain what a policy covers or how a fund works, in words you can use to make a decision.' },
  { icon: Eye, title: 'Honest about limits', text: 'Insurance has exclusions and conditions, and investments carry risk. We would rather you hear about them first.' },
  { icon: PhoneCall, title: 'Easy to reach', text: 'You get a name, a phone number and an office in Jalandhar, and not just a website form.' },
];

export default function AboutPage() {
  const firstName = site.advisor.name.split(' ')[0];
  return (
    <>
      <PageHeader crumbs={[{ name: 'About' }]} eyebrow="About us" title={`${site.tagline}, one conversation at a time.`} lede={`${site.legalName} helps families and businesses in Jalandhar understand and arrange the insurance they need, and plan their investments.`} />
      <section className="wrap grid items-start gap-10 pb-16 lg:grid-cols-[1fr_1.4fr]">
        {site.advisor.photo ? (
          <img src={site.advisor.photo} alt={site.advisor.name} className="aspect-square w-full rounded-[1.75rem] object-cover" />
        ) : (
          <img src="/brand/logo-full.webp" alt="Insure Secure Financial Services logo, with the tagline Protecting Your Future" width={710} height={590} className="w-full rounded-[1.75rem] bg-white p-6 shadow-card" />
        )}
        <div>
          <p className="eyebrow">{site.advisor.role}</p>
          <h2 className="section-title mt-2">{site.advisor.name}</h2>
          <div className="lede mt-5 space-y-4">
            {site.advisor.bio ? (
              site.advisor.bio.map((p) => <p key={p}>{p}</p>)
            ) : (
              <>
                <p>{site.advisor.name} started Insure Secure with a straightforward idea. People should be able to understand their insurance and investments, and they should know who to call when they need help.</p>
                <p>From a family’s first health plan to a factory’s export cover or a monthly SIP, the aim stays the same: help you choose carefully, and stay reachable afterwards.</p>
              </>
            )}
            {site.advisor.experience && <p>{site.advisor.experience}</p>}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={messages.general}>Message {firstName}</WhatsAppButton>
            <CallButton />
          </div>
        </div>
      </section>
      <section className="bg-white py-14 lg:py-20">
        <div className="wrap">
          <h2 className="section-title">How we work</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="border-t-2 border-navy-900 pt-5">
                <v.icon aria-hidden="true" className="size-8 text-leaf-600" />
                <h3 className="mt-3 text-2xl">{v.title}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
