import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui';
import { guides } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Insurance Guides',
  description: 'Plain-language guides on term cover, health plans, car and travel insurance, SIPs and mutual funds.',
  alternates: { canonical: '/guides/' },
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Guides' }]} eyebrow="Guides" title="Insurance and investing, explained without the jargon." lede="Short, practical reads to help you ask better questions before you buy." />
      <section className="wrap pb-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}/`} className="card group flex h-full flex-col p-8 transition hover:-translate-y-0.5 hover:border-leaf-500 hover:shadow-lift">
                <span className="text-sm font-semibold text-leaf-700">{g.readMinutes} minute read</span>
                <h2 className="mt-3 text-[1.75rem] group-hover:text-leaf-700">{g.title}</h2>
                <p className="mt-3 flex-1 text-muted">{g.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-700">
                  Read the guide <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
