import { ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-leaf-700 hover:underline">
            Home
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.name} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className="size-3.5" />
            {c.href ? (
              <Link href={c.href} className="hover:text-leaf-700 hover:underline">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy-900">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  light,
  center,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
      <h2 className={`section-title mt-3 ${light ? '!text-white' : ''}`}>{title}</h2>
      {lede && <p className={`lede mt-4 ${light ? '!text-navy-100' : ''}`}>{lede}</p>}
    </div>
  );
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="wrap pt-8 pb-10 sm:pt-10">
      <Breadcrumbs items={crumbs} />
      {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
      <h1 className={`${eyebrow ? 'mt-3' : 'mt-8'} max-w-4xl text-[clamp(2.4rem,1.7rem+3vw,4rem)]`}>{title}</h1>
      {lede && <p className="lede mt-5 max-w-3xl">{lede}</p>}
      {children}
    </div>
  );
}

export function Faqs({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-navy-900/10 border-y border-navy-900/10">
      {items.map((f) => (
        <details key={f.q} className="faq-item group py-1">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-lg font-semibold text-navy-900 hover:text-leaf-700">
            {f.q}
            <Plus aria-hidden="true" className="faq-chevron size-5 shrink-0 text-leaf-600 transition-transform" />
          </summary>
          <p className="max-w-3xl pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(baseUrl: string, items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', href: '/' }, ...items].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.href, baseUrl).toString(),
    })),
  };
}
