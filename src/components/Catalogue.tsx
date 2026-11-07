'use client';

import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { catalog, categories, productHref, searchCatalog, type CategoryId } from '@/content/catalog';
import { ProductIcon } from './icons';

type Filter = CategoryId | 'all';

export function Catalogue() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  // Footer links can open the catalogue on a category, such as ?category=health.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category');
    if (value && categories.some((c) => c.id === value)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable after hydration on a static page.
      setFilter(value as CategoryId);
    }
  }, []);

  const results = useMemo(() => searchCatalog(query, filter), [query, filter]);

  return (
    <div>
      <div className="relative max-w-2xl">
        <label htmlFor="cover-search" className="sr-only">Search insurance types</label>
        <Search aria-hidden="true" className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
        <input
          id="cover-search"
          type="search"
          className="field !rounded-full !pl-12 !text-lg"
          placeholder="Try ‘parents’, ‘exports’ or ‘tractor’"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div role="group" aria-label="Filter by category" className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: 'all' as const, name: 'All' }, ...categories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`min-h-11 shrink-0 rounded-full px-5 font-semibold transition-colors ${filter === c.id ? 'bg-navy-900 text-white' : 'bg-white text-navy-900 hover:bg-navy-100'}`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[0.95rem] text-muted">
        Looking for mutual funds or SIPs? <Link href="/investments/" className="link">See our investment services</Link>.
      </p>
      <p aria-live="polite" className="mt-3 text-muted">
        Showing {results.length} of {catalog.length} types of cover
      </p>
      {results.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={productHref(p.slug)} className="card group flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-leaf-500 hover:shadow-lift">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                  <ProductIcon name={p.icon} className="size-6" />
                </span>
                <span>
                  <span className="block font-semibold text-navy-900 group-hover:text-leaf-700">{p.name}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-muted">{p.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-4 p-8 text-center">
          <p className="text-lg font-semibold text-navy-900">No matching cover found.</p>
          <p className="mt-1 text-muted">Tell us what you want to protect and we can point you in the right direction.</p>
          <button type="button" onClick={() => { setQuery(''); setFilter('all'); }} className="btn btn-outline mt-5">
            <X aria-hidden="true" className="size-4" />
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
