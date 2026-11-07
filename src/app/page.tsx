import { ArrowRight, BadgeCheck, ClipboardList, FileSearch, Handshake, MapPin, MessageCircle, Phone, ScanSearch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { ContactSection } from '@/components/ContactSection';
import { HeroSelector } from '@/components/HeroSelector';
import { Photo } from '@/components/Photo';
import { ProductExplorer } from '@/components/ProductExplorer';
import { MutualFundNotice } from '@/components/Disclosure';
import { ProductIcon } from '@/components/icons';
import { ScoreGauge } from '@/components/ScoreGauge';
import { SipMini } from '@/components/tools/SipMini';
import { faqJsonLd, Faqs, JsonLd, SectionHeading } from '@/components/ui';
import { catalog } from '@/content/catalog';
import { investmentHref, investments } from '@/content/investments';
import { generalFaqs } from '@/content/faqs';
import { site } from '@/content/site';
import { messages } from '@/lib/whatsapp';

const steps = [
  { icon: MessageCircle, title: 'Tell us what matters', text: 'Send a WhatsApp message, call or visit. Share what you want to protect, and any policy you already have.' },
  { icon: FileSearch, title: 'Understand your options', text: 'We explain what suitable plans cover and what they leave out, without jargon, so you can compare them properly.' },
  { icon: Handshake, title: 'Decide, then stay supported', text: 'The decision is always yours. After you buy, we stay on hand for renewals, changes and claims.' },
];

const claimStages = [
  { title: 'Call or message us', text: 'Tell us what happened, as soon as you can.' },
  { title: 'Know what to do first', text: 'We explain the first steps and the insurer’s deadlines.' },
  { title: 'Get the papers in order', text: 'You get a checklist of the documents your claim needs.' },
  { title: 'Follow up with the insurer', text: 'We help you respond to questions until there is a decision.' },
];

export default function HomePage() {
  const trust = [
    { icon: BadgeCheck, title: site.advisor.name, text: 'A real person, not a call centre' },
    { icon: MapPin, title: 'Karol Bagh, Jalandhar', text: 'A local office near DIPS School' },
    { icon: Phone, title: 'WhatsApp or call', text: site.phone.display },
    ...(site.licence.registrationNumber
      ? [{ icon: ShieldCheck, title: 'IRDAI registered', text: site.licence.registrationNumber }]
      : [{ icon: ClipboardList, title: 'Insurance and investments', text: `${catalog.length} types of cover, plus mutual funds` }]),
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(generalFaqs)} />
      <HeroSelector />

      <section aria-label="Why talk to us" className="border-y border-navy-900/10 bg-white">
        <ul className="wrap grid grid-cols-1 gap-x-6 gap-y-5 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <li key={t.title} className="flex items-center gap-3.5">
              <t.icon aria-hidden="true" className="size-7 shrink-0 text-leaf-600" />
              <span className="min-w-0 leading-snug">
                <span className="block font-semibold text-navy-900">{t.title}</span>
                <span className="block text-[0.95rem] text-muted">{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-16 lg:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Insurance for every part of life"
            title="From a family’s first health plan to a factory’s export cargo."
            lede="Pick a category to see what each type of insurance does, who it suits and what to watch out for."
          />
          <ProductExplorer />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="wrap grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="reveal grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-navy-900 p-8 text-white sm:grid-cols-[1.35fr_1fr] sm:p-12">
            <div>
              <p className="eyebrow eyebrow-light">Coverage check</p>
              <h2 className="section-title mt-3 !text-white">How protected are you, really?</h2>
              <p className="mt-4 text-lg text-navy-100">Answer six quick questions and get a score, a list of your gaps and what to look at first. It takes about a minute.</p>
              <Link href="/tools/coverage-check/" className="btn btn-light mt-7">
                Check my cover
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <ScoreGauge score={62} light />
              <p className="mt-1 text-sm text-navy-200">Example result</p>
            </div>
          </div>
          <div className="reveal card flex flex-col justify-between rounded-[1.75rem] p-8 sm:p-10">
            <div>
              <ScanSearch aria-hidden="true" className="size-10 text-leaf-600" />
              <h2 className="mt-5 text-3xl">Already have a policy?</h2>
              <p className="mt-3 text-muted">Get a second opinion. Send us your policy details and we will go through what it covers and where it may fall short.</p>
            </div>
            <WhatsAppButton message={messages.secondOpinion} className="mt-7 self-start">
              Review my policy
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24" aria-labelledby="grow-heading">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Investments</p>
            <h2 id="grow-heading" className="section-title mt-3">Once you are protected, put your money to work.</h2>
            <p className="lede mt-4 max-w-2xl">Mutual funds and monthly SIPs for education, a home, retirement or simply a stronger future. It is one conversation with the same person who handles your insurance.</p>
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {investments.map((i) => (
                <li key={i.slug}>
                  <Link href={investmentHref(i.slug)} className="group flex min-h-12 items-center gap-3 rounded-xl border border-navy-900/10 bg-white px-4 py-2.5 font-semibold text-navy-900 transition-colors hover:border-leaf-500 hover:text-leaf-700">
                    <ProductIcon name={i.icon} className="size-5 shrink-0 text-leaf-600" />
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton message={messages.investing}>Start the conversation</WhatsAppButton>
              <Link href="/investments/" className="btn btn-outline">
                Explore investing
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <MutualFundNotice className="mt-7" />
          </div>
          <SipMini />
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="wrap">
          <SectionHeading eyebrow="How it works" title="Straightforward advice, in three steps." />
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal border-t-2 border-navy-900 pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-medium text-leaf-600">{i + 1}</span>
                  <s.icon aria-hidden="true" className="size-7 text-navy-700" />
                </div>
                <h3 className="mt-4 text-2xl">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-950 py-16 lg:py-24">
        <div className="wrap">
          <SectionHeading
            light
            eyebrow="Claim support"
            title="The real test of a policy is the day you claim."
            lede="Claims can arrive at the worst possible time. We help you understand each step and stay on top of the process. The insurer makes the final decision on every claim."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {claimStages.map((c, i) => (
              <li key={c.title} className="reveal rounded-2xl border border-white/15 bg-white/5 p-6">
                <span className="text-sm font-bold tracking-[0.12em] text-lime uppercase">Step {i + 1}</span>
                <h3 className="mt-3 text-xl !text-white">{c.title}</h3>
                <p className="mt-2 text-navy-100">{c.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/claims/" className="btn btn-light">
              Open the claim help desk
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <CallButton className="btn-outline-light" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Built around Jalandhar" title="Cover for the way this city lives and works." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Link href="/nri-families/" className="reveal group flex flex-col overflow-hidden rounded-[1.75rem] bg-navy-900 text-white transition-shadow hover:shadow-lift">
              <span className="block h-64 overflow-hidden sm:h-80">
                <Photo name="generations" sizes="(min-width: 1024px) 600px, 100vw" alt="" className="size-full object-cover object-[50%_18%] transition-transform duration-500 group-hover:scale-105" />
              </span>
              <span className="flex flex-1 flex-col p-8 sm:p-10">
                <span className="eyebrow eyebrow-light">For families abroad</span>
                <h3 className="mt-2 text-4xl !text-white">Living overseas, with family back home?</h3>
                <span className="mt-3 max-w-lg flex-1 text-navy-50">Parents’ health cover, the house in Punjab, and travel plans for visits and students.</span>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                  See cover for NRI families <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
            <Link href="/business/" className="reveal group flex flex-col overflow-hidden rounded-[1.75rem] bg-navy-900 text-white transition-shadow hover:shadow-lift">
              <span className="block h-64 overflow-hidden sm:h-80">
                <Photo name="workshop" sizes="(min-width: 1024px) 600px, 100vw" alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </span>
              <span className="flex flex-1 flex-col p-8 sm:p-10">
                <span className="eyebrow eyebrow-light">For makers and exporters</span>
                <h3 className="mt-2 text-4xl !text-white">Sports goods, hand tools, trade and beyond.</h3>
                <span className="mt-3 max-w-lg flex-1 text-navy-50">Factory and fire cover, cargo on its way overseas, buyers who do not pay, and your team’s health.</span>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                  See cover for business <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="wrap">
          <div className="reveal card grid items-center gap-10 rounded-[1.75rem] p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
            {site.advisor.photo ? (
              <img src={site.advisor.photo} alt={site.advisor.name} className="mx-auto aspect-square w-60 rounded-3xl object-cover" />
            ) : (
              <img src="/brand/logo-full.webp" alt="Insure Secure Financial Services logo, with the tagline Protecting Your Future" width={710} height={590} loading="lazy" className="mx-auto w-64 mix-blend-multiply" />
            )}
            <div>
              <p className="eyebrow">Meet the founder</p>
              <h2 className="section-title mt-3">{site.advisor.name}</h2>
              <p className="lede mt-4 max-w-2xl">
                {site.advisor.name} founded Insure Secure so that families and businesses in Jalandhar can get help with
                insurance and investments from a person they know and can reach. You will know exactly who to call, before you buy and on the day you need your policy.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppButton message={messages.general}>Message {site.advisor.name.split(' ')[0]}</WhatsAppButton>
                <Link href="/about/" className="btn btn-outline">About Insure Secure</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {site.testimonials.length > 0 && (
        <section data-section="testimonials" className="pb-16 lg:pb-24">
          <div className="wrap">
            <SectionHeading eyebrow="Client stories" title="What our clients say." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {site.testimonials.map((t) => (
                <figure key={t.name + t.quote} className="card p-7">
                  <blockquote className="text-lg">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-navy-900">
                    {t.name}, <span className="font-normal text-muted">{t.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {site.insurers.length > 0 && (
        <section data-section="insurers" className="pb-16 lg:pb-24">
          <div className="wrap">
            <SectionHeading eyebrow="Insurers" title="Insurers we represent." />
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {site.insurers.map((i) => (
                <li key={i.name} className="card flex h-24 items-center justify-center p-4 text-center font-semibold text-navy-900">
                  {i.logo ? <img src={i.logo} alt={i.name} loading="lazy" className="max-h-full max-w-full object-contain" /> : i.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pb-16 lg:pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <SectionHeading eyebrow="Questions" title="Good to know before you message us." />
          <Faqs items={generalFaqs} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
