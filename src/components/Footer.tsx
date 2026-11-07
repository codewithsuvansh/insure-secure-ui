import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/content/catalog';
import { investmentHref, investments } from '@/content/investments';
import { fullAddress, mapsQuery, site, telUrl } from '@/content/site';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { InvestmentRows, irdaiNotice, LicenceRows, mutualFundNotice, solicitationNotice } from './Disclosure';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';

const columns = [
  {
    title: 'Insurance',
    links: [...categories.map((c) => ({ href: `/insurance/?category=${c.id}`, name: c.name })), { href: '/insurance/', name: 'All cover' }],
  },
  {
    title: 'Investments',
    links: [
      { href: '/investments/', name: 'All investments' },
      ...investments.slice(0, 6).map((i) => ({ href: investmentHref(i.slug), name: i.name.replace(' (Systematic Investment Plan)', 's') })),
    ],
  },
  {
    title: 'Tools and help',
    links: [
      { href: '/tools/coverage-check/', name: 'Coverage check' },
      { href: '/tools/term-cover/', name: 'Term cover calculator' },
      { href: '/tools/health-cover/', name: 'Health cover guide' },
      { href: '/tools/sip-calculator/', name: 'SIP calculator' },
      { href: '/tools/goal-planner/', name: 'Goal planner' },
      { href: '/tools/renewal-reminder/', name: 'Renewal reminder' },
      { href: '/claims/', name: 'Claim help' },
      { href: '/guides/', name: 'Guides' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', name: 'About us' },
      { href: '/nri-families/', name: 'NRI families' },
      { href: '/business/', name: 'Business cover' },
      { href: '/contact/', name: 'Contact' },
      { href: '/disclosures/', name: 'Disclosures' },
      { href: '/privacy/', name: 'Privacy' },
      { href: '/terms/', name: 'Terms of use' },
    ],
  },
];

export function Footer() {
  const socials: [string, string | null][] = [
    ['Facebook', site.social.facebook],
    ['Instagram', site.social.instagram],
    ['LinkedIn', site.social.linkedin],
  ];
  const socialLinks = socials.filter((entry): entry is [string, string] => Boolean(entry[1]));
  return (
    <footer className="bg-navy-950 pb-20 text-navy-100 md:pb-0">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs font-display text-xl text-white">{site.tagline}</p>
          <ul className="mt-5 space-y-3 text-[0.975rem]">
            <li>
              <a href={telUrl} className="flex items-center gap-2.5 hover:text-white">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-lime" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                <WhatsAppIcon className="size-4 shrink-0 text-lime" />
                Chat on WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all hover:text-white">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-lime" />
                  {site.email}
                </a>
              </li>
            )}
            <li>
              <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery()}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-lime" />
                {fullAddress()}
              </a>
            </li>
          </ul>
          {socialLinks.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[0.975rem]">
              {socialLinks.map(([name, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-3 hover:text-white">{name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-body text-sm font-bold tracking-[0.1em] text-white uppercase">{col.title}</h2>
            <ul className="mt-4 space-y-2 text-[0.975rem]">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="wrap space-y-3 py-8 text-sm leading-relaxed text-navy-200">
          <LicenceRows light />
          <InvestmentRows light />
          <p className="font-semibold text-white">{mutualFundNotice}</p>
          <p>{solicitationNotice}</p>
          <p>{irdaiNotice}</p>
          <p className="pt-2">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
