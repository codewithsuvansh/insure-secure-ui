'use client';

import { useState } from 'react';
import { claimTypes } from '@/content/claims';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export function ClaimDesk() {
  const [activeId, setActiveId] = useState(claimTypes[0]!.id);
  const [ready, setReady] = useState<Record<string, boolean>>({});

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = claimTypes[(index + delta + claimTypes.length) % claimTypes.length]!;
    setActiveId(next.id);
    document.getElementById(`claim-tab-${next.id}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Type of claim" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {claimTypes.map((c, i) => (
          <button
            key={c.id}
            id={`claim-tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={activeId === c.id}
            aria-controls={`claim-panel-${c.id}`}
            tabIndex={activeId === c.id ? 0 : -1}
            onClick={() => setActiveId(c.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`min-h-12 shrink-0 rounded-full px-5 font-semibold transition-colors ${activeId === c.id ? 'bg-navy-900 text-white' : 'bg-white text-navy-900 hover:bg-navy-100'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {claimTypes.map((c) => {
        const readyDocs = c.documents.filter((d) => ready[`${c.id}:${d}`]);
        return (
          <div key={c.id} id={`claim-panel-${c.id}`} role="tabpanel" aria-labelledby={`claim-tab-${c.id}`} hidden={activeId !== c.id} className="mt-6">
            <div className="rounded-2xl border-l-4 border-leaf-500 bg-leaf-50 p-5 sm:p-6">
              <h2 className="text-xl">First things first</h2>
              <p className="mt-1.5">{c.first}</p>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="card p-6 sm:p-8">
                <h2 className="text-3xl">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {c.steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display font-semibold text-white">{i + 1}</span>
                      <div>
                        <h3 className="font-body text-lg font-semibold">{s.title}</h3>
                        <p className="mt-0.5 text-muted">{s.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="card flex flex-col p-6 sm:p-8">
                <h2 className="text-3xl">Document checklist</h2>
                <p className="mt-2 text-muted">Tick what you have. The insurer may ask for more, depending on your claim.</p>
                <ul className="mt-5 space-y-1">
                  {c.documents.map((d) => {
                    const key = `${c.id}:${d}`;
                    return (
                      <li key={d}>
                        <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5">
                          <input
                            type="checkbox"
                            className="mt-1 size-5 shrink-0 accent-leaf-600"
                            checked={!!ready[key]}
                            onChange={(e) => setReady((prev) => ({ ...prev, [key]: e.target.checked }))}
                          />
                          <span>{d}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <p aria-live="polite" className="mt-3 text-sm font-semibold text-navy-900">
                  {readyDocs.length} of {c.documents.length} documents ready
                </p>
                <a href={whatsappUrl(messages.claim(c.noun, readyDocs))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5">
                  <WhatsAppIcon />
                  Get claim help on WhatsApp
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
