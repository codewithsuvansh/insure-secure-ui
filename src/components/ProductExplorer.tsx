'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { catalog, categories, productHref, productsIn, type CategoryId } from '@/content/catalog';
import { ProductIcon } from './icons';

export function ProductExplorer() {
  const [active, setActive] = useState<CategoryId>('health');

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = categories[(index + delta + categories.length) % categories.length]!;
    setActive(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Insurance categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c, i) => (
          <button
            key={c.id}
            id={`tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={active === c.id}
            aria-controls={`panel-${c.id}`}
            tabIndex={active === c.id ? 0 : -1}
            onClick={() => setActive(c.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex min-h-12 shrink-0 items-center gap-2 rounded-full px-5 font-semibold transition-colors ${
              active === c.id ? 'bg-navy-900 text-white' : 'bg-white text-navy-900 hover:bg-navy-100'
            }`}
          >
            <ProductIcon name={c.icon} className={`size-5 ${active === c.id ? 'text-lime' : 'text-leaf-600'}`} />
            {c.name}
          </button>
        ))}
      </div>

      {categories.map((c) => (
        <div key={c.id} id={`panel-${c.id}`} role="tabpanel" aria-labelledby={`tab-${c.id}`} hidden={active !== c.id} className="mt-6">
          <p className="mb-5 text-lg text-muted">{c.blurb}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productsIn(c.id).map((p) => (
              <li key={p.slug}>
                <Link href={productHref(p.slug)} className="card group flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-leaf-500 hover:shadow-lift">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                    <ProductIcon name={p.icon} className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-navy-900 group-hover:text-leaf-700">{p.name}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug text-muted">{p.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link href="/insurance/" className="link mt-7 inline-flex items-center gap-1.5">
        Search all {catalog.length} types of cover
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
