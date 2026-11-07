'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import { projectSip } from '@/lib/calculators';
import { formatLakhCrore, formatRupees } from '@/lib/format';

const ASSUMED = 10;

/** Compact SIP illustration for the home and investment pages. */
export function SipMini() {
  const id = useId();
  const [monthly, setMonthly] = useState(5_000);
  const [years, setYears] = useState(15);
  const { invested, value } = projectSip({ monthly, years, annualReturn: ASSUMED });
  return (
    <div className="card rounded-[1.75rem] p-6 sm:p-8" data-testid="sip-mini">
      <p className="font-display text-2xl font-semibold text-navy-900">What could a monthly SIP become?</p>
      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={`${id}-m`} className="field-label !mb-0">Every month</label>
            <output htmlFor={`${id}-m`} className="font-display text-xl font-semibold text-navy-900">{formatRupees(monthly)}</output>
          </div>
          <input id={`${id}-m`} type="range" className="slider" min={500} max={1_00_000} step={500} value={monthly} aria-valuetext={formatRupees(monthly)} onChange={(e) => setMonthly(Number(e.target.value))} />
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={`${id}-y`} className="field-label !mb-0">For</label>
            <output htmlFor={`${id}-y`} className="font-display text-xl font-semibold text-navy-900">{years} years</output>
          </div>
          <input id={`${id}-y`} type="range" className="slider" min={1} max={40} value={years} aria-valuetext={`${years} years`} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-navy-900 p-5 text-white">
        <p className="text-sm text-navy-100">Illustrated value at an assumed {ASSUMED}% a year</p>
        <p aria-live="polite" className="mt-1 font-display text-4xl font-semibold">{formatLakhCrore(value)}</p>
        <p className="mt-1 text-sm text-navy-100">You would have put in {formatLakhCrore(invested)}</p>
      </div>
      <p className="mt-3 text-sm text-muted">An illustration, not a promise. Actual returns can be lower or negative, and this ignores costs and tax.</p>
      <Link href="/tools/sip-calculator/" className="link mt-3 inline-flex items-center gap-1.5">
        Open the full calculator
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
