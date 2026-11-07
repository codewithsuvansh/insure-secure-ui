'use client';

import { useState } from 'react';
import type { SipYear } from '@/lib/calculators';
import { axisTicks, formatLakhCrore } from '@/lib/format';

const INVESTED = '#1a5a8e';
const GROWTH = '#5f9e27';

/** Stacked yearly columns: money paid in, plus the assumed growth on top. */
export function GrowthChart({ yearly }: { yearly: SipYear[] }) {
  const [active, setActive] = useState<number | null>(null);
  const last = yearly.at(-1);
  if (!last) return null;
  const ticks = axisTicks(last.value);
  const top = ticks.at(-1) ?? 1;
  const shown = active === null ? null : (yearly[active] ?? null);
  const labelEvery = yearly.length > 24 ? 10 : yearly.length > 10 ? 5 : yearly.length > 5 ? 2 : 1;

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') return setActive(null);
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const from = active ?? yearly.length - 1;
    setActive(Math.max(0, Math.min(yearly.length - 1, from + delta)));
  }

  return (
    <figure data-testid="growth-chart">
      <figcaption className="font-semibold text-navy-900">How the illustration builds, year by year</figcaption>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[3px]" style={{ background: INVESTED }} />
          Money you put in
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[3px]" style={{ background: GROWTH }} />
          Assumed growth
        </li>
      </ul>

      <div className="mt-3 grid grid-cols-[3.75rem_1fr] gap-x-2">
        <div className="relative h-60" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 translate-y-1/2 text-xs text-muted" style={{ bottom: `${(t / top) * 100}%` }}>
              {t === 0 ? '₹0' : formatLakhCrore(t).replace(' lakh', 'L').replace(' crore', 'Cr')}
            </span>
          ))}
        </div>
        <div
          role="group"
          tabIndex={0}
          aria-label={`Column chart for ${yearly.length} years. Use the left and right arrow keys to read each year. The table below lists every value.`}
          onKeyDown={onKeyDown}
          onMouseLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
          className="relative h-60 rounded-sm"
        >
          {ticks.map((t) => (
            <span key={t} aria-hidden="true" className="absolute inset-x-0 h-px bg-navy-900/10" style={{ bottom: `${(t / top) * 100}%` }} />
          ))}
          <div className="absolute inset-0 flex items-end justify-between">
            {yearly.map((y, i) => (
              <div
                key={y.year}
                onPointerEnter={() => setActive(i)}
                onPointerDown={() => setActive(i)}
                className="flex h-full min-w-0 flex-1 cursor-default flex-col justify-end"
              >
                <div
                  className="mx-auto flex w-[72%] max-w-6 flex-col justify-end gap-[2px]"
                  style={{ height: `${(y.value / top) * 100}%`, opacity: active === null || active === i ? 1 : 0.45 }}
                >
                  <div className="shrink-0 rounded-t-[4px]" style={{ height: `${(y.growth / y.value) * 100}%`, background: GROWTH }} />
                  <div className="min-h-0 flex-1" style={{ background: INVESTED }} />
                </div>
              </div>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 text-xs font-semibold whitespace-nowrap text-navy-900"
            style={{ bottom: `calc(${(last.value / top) * 100}% + 4px)` }}
          >
            {formatLakhCrore(last.value)}
          </span>
          {shown && (
            <div
              className="pointer-events-none absolute top-1 z-10 w-48 rounded-xl border border-navy-900/15 bg-white p-3 text-sm shadow-lift"
              style={(active ?? 0) > yearly.length / 2 ? { left: 0 } : { right: 0 }}
            >
              <p className="font-semibold text-navy-900">Year {shown.year}</p>
              <p className="mt-1 flex justify-between gap-2 text-muted"><span>Put in</span><span className="text-ink">{formatLakhCrore(shown.invested)}</span></p>
              <p className="flex justify-between gap-2 text-muted"><span>Growth</span><span className="text-ink">{formatLakhCrore(shown.growth)}</span></p>
              <p className="flex justify-between gap-2 font-semibold text-navy-900"><span>Total</span><span>{formatLakhCrore(shown.value)}</span></p>
            </div>
          )}
        </div>
        <div />
        <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-muted">
          {yearly.map((y) => (
            <span key={y.year} className="min-w-0 flex-1 text-center">
              {y.year === 1 || y.year % labelEvery === 0 ? y.year : ''}
            </span>
          ))}
        </div>
      </div>
      <p aria-hidden="true" className="mt-1 text-center text-xs text-muted">Years invested</p>
      <p aria-live="polite" className="sr-only">
        {shown ? `Year ${shown.year}: put in ${formatLakhCrore(shown.invested)}, growth ${formatLakhCrore(shown.growth)}, total ${formatLakhCrore(shown.value)}.` : ''}
      </p>

      <details className="mt-3 text-sm">
        <summary className="link inline-block">Show the numbers as a table</summary>
        <div className="mt-2 max-h-64 overflow-y-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-navy-900/20 text-navy-900">
                <th scope="col" className="py-1.5 font-semibold">Year</th>
                <th scope="col" className="py-1.5 text-right font-semibold">Put in</th>
                <th scope="col" className="py-1.5 text-right font-semibold">Growth</th>
                <th scope="col" className="py-1.5 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {yearly.map((y) => (
                <tr key={y.year} className="border-b border-navy-900/10">
                  <td className="py-1.5">{y.year}</td>
                  <td className="py-1.5 text-right">{formatLakhCrore(y.invested)}</td>
                  <td className="py-1.5 text-right">{formatLakhCrore(y.growth)}</td>
                  <td className="py-1.5 text-right">{formatLakhCrore(y.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
