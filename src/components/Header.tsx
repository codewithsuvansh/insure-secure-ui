'use client';

import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { catalog, categories, productHref, productsIn } from '@/content/catalog';
import { investmentHref, investments } from '@/content/investments';
import { site, telUrl } from '@/content/site';
import { ProductIcon } from './icons';
import { Logo } from './Logo';

const tools = [
  { href: '/tools/coverage-check/', name: 'Coverage check', blurb: 'Find the gaps in six questions' },
  { href: '/tools/term-cover/', name: 'Term cover calculator', blurb: 'Estimate the life cover you need' },
  { href: '/tools/health-cover/', name: 'Health cover guide', blurb: 'A starting range for your family' },
  { href: '/tools/sip-calculator/', name: 'SIP calculator', blurb: 'Illustrate what a monthly SIP could become' },
  { href: '/tools/goal-planner/', name: 'Goal planner', blurb: 'Work out a monthly amount for any goal' },
  { href: '/tools/renewal-reminder/', name: 'Renewal reminder', blurb: 'Add a renewal to your calendar' },
];

const simpleLinks = [
  { href: '/nri-families/', name: 'NRI families' },
  { href: '/business/', name: 'Business' },
  { href: '/claims/', name: 'Claim help' },
  { href: '/about/', name: 'About' },
];

type MenuId = 'insurance' | 'investments' | 'tools' | null;

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuId>(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus after navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  const trigger = (id: Exclude<MenuId, null>, label: string) => (
    <button
      type="button"
      aria-expanded={menu === id}
      aria-controls={`menu-${id}`}
      onClick={() => setMenu(menu === id ? null : id)}
      className={`flex items-center gap-1 rounded-lg px-3 py-2 font-semibold transition-colors hover:text-leaf-700 ${menu === id ? 'text-leaf-700' : 'text-navy-900'}`}
    >
      {label}
      <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${menu === id ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-bone/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div ref={navRef} className="wrap relative flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 text-[0.975rem] xl:flex">
          {trigger('insurance', 'Insurance')}
          {trigger('investments', 'Investments')}
          {simpleLinks.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 font-semibold text-navy-900 transition-colors hover:text-leaf-700">
              {l.name}
            </Link>
          ))}
          {trigger('tools', 'Tools')}
          {simpleLinks.slice(2).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 font-semibold text-navy-900 transition-colors hover:text-leaf-700">
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telUrl} className="hidden items-center gap-2 px-2 font-semibold whitespace-nowrap text-navy-900 hover:text-leaf-700 2xl:flex">
            <Phone aria-hidden="true" className="size-4" />
            {site.phone.display}
          </a>
          <Link href="/contact/#quote" className="btn btn-navy hidden !min-h-11 !py-2 sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
            className="flex size-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-100 xl:hidden"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>

        {menu === 'insurance' && (
          <div id="menu-insurance" className="card absolute inset-x-4 top-[calc(100%+0.5rem)] hidden max-h-[calc(100dvh-6rem)] overflow-y-auto p-7 xl:block">
            <div className="columns-4 gap-8">
              {categories.map((c) => (
                <div key={c.id} className="mb-6 break-inside-avoid">
                  <p className="mb-2 flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
                    <ProductIcon name={c.icon} className="size-5 text-leaf-600" />
                    {c.name}
                  </p>
                  <ul className="space-y-0.5">
                    {productsIn(c.id).map((p) => (
                      <li key={p.slug}>
                        <Link href={productHref(p.slug)} className="block rounded py-0.5 text-[0.9rem] leading-snug text-muted hover:text-leaf-700">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href="/insurance/" className="link mt-1 inline-block text-[0.95rem]">
              Search all {catalog.length} types of cover
            </Link>
          </div>
        )}

        {menu === 'investments' && (
          <div id="menu-investments" className="card absolute top-[calc(100%+0.5rem)] left-1/2 hidden w-[44rem] -translate-x-1/2 p-4 xl:block">
            <ul className="grid grid-cols-2 gap-1">
              {investments.map((i) => (
                <li key={i.slug}>
                  <Link href={investmentHref(i.slug)} className="flex h-full gap-3 rounded-xl px-3 py-2.5 hover:bg-leaf-50">
                    <ProductIcon name={i.icon} className="mt-0.5 size-5 shrink-0 text-leaf-600" />
                    <span>
                      <span className="block font-semibold text-navy-900">{i.name}</span>
                      <span className="block text-sm leading-snug text-muted">{i.blurb}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-navy-900/10 px-3 pt-3">
              <Link href="/investments/" className="link text-[0.95rem]">See all investments</Link>
              <p className="text-xs text-muted">Mutual fund investments are subject to market risks.</p>
            </div>
          </div>
        )}

        {menu === 'tools' && (
          <div id="menu-tools" className="card absolute top-[calc(100%+0.5rem)] right-4 hidden w-[26rem] p-3 xl:block">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className="block rounded-xl px-4 py-3 hover:bg-leaf-50">
                <span className="block font-semibold text-navy-900">{t.name}</span>
                <span className="block text-sm text-muted">{t.blurb}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex h-dvh flex-col bg-bone xl:hidden">
          <div className="wrap flex h-[4.5rem] shrink-0 items-center justify-between border-b border-navy-900/10">
            <Logo />
            <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} className="flex size-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-100">
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto py-4 text-lg font-semibold text-navy-900">
            <details className="faq-item border-b border-navy-900/10 py-1">
              <summary className="flex min-h-12 items-center justify-between">
                Insurance
                <ChevronDown aria-hidden="true" className="size-5" />
              </summary>
              <div className="pb-3">
                {categories.map((c) => (
                  <details key={c.id} className="faq-item">
                    <summary className="flex min-h-11 items-center gap-2 text-base">
                      <ProductIcon name={c.icon} className="size-5 text-leaf-600" />
                      {c.name}
                    </summary>
                    <ul className="mb-2 ml-7 space-y-1 text-base font-normal text-muted">
                      {productsIn(c.id).map((p) => (
                        <li key={p.slug}>
                          <Link href={productHref(p.slug)} className="block py-1.5">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
                <Link href="/insurance/" className="link mt-1 block text-base">
                  Search all cover
                </Link>
              </div>
            </details>
            <details className="faq-item border-b border-navy-900/10 py-1">
              <summary className="flex min-h-12 items-center justify-between">
                Investments
                <ChevronDown aria-hidden="true" className="size-5" />
              </summary>
              <ul className="pb-3 text-base font-normal text-muted">
                {investments.map((i) => (
                  <li key={i.slug}>
                    <Link href={investmentHref(i.slug)} className="block py-2">{i.name}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/investments/" className="link mt-1 block">See all investments</Link>
                </li>
              </ul>
            </details>
            <details className="faq-item border-b border-navy-900/10 py-1">
              <summary className="flex min-h-12 items-center justify-between">
                Tools
                <ChevronDown aria-hidden="true" className="size-5" />
              </summary>
              <ul className="pb-3 text-base font-normal text-muted">
                {tools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="block py-2">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            {[...simpleLinks, { href: '/guides/', name: 'Guides' }, { href: '/contact/', name: 'Contact' }].map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-13 items-center border-b border-navy-900/10">
                {l.name}
              </Link>
            ))}
          </nav>
          <div className="wrap shrink-0 border-t border-navy-900/10 py-4">
            <Link href="/contact/#quote" className="btn btn-navy w-full">
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
