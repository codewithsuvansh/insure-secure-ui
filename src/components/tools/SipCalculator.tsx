'use client';

import { useId, useState } from 'react';
import { projectSip } from '@/lib/calculators';
import { formatLakhCrore, formatRupees } from '@/lib/format';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';
import { GrowthChart } from './GrowthChart';

function Slider({ label, hint, value, display, min, max, step, onChange }: { label: string; hint?: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="field-label !mb-0">{label}</label>
        <output htmlFor={id} className="shrink-0 font-display text-xl font-semibold text-navy-900">{display}</output>
      </div>
      <input id={id} type="range" className="slider mt-1" min={min} max={max} step={step} value={value} aria-valuetext={display} onChange={(e) => onChange(Number(e.target.value))} />
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10_000);
  const [years, setYears] = useState(15);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [stepUp, setStepUp] = useState(0);
  const result = projectSip({ monthly, years, annualReturn, stepUp });
  const message = `Hello Insure Secure, I tried your SIP calculator with ${formatRupees(monthly)} a month for ${years} years. Could you help me get started?`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="sticky top-[4.5rem] z-10 -mx-4 flex items-center justify-between gap-3 bg-navy-900 px-4 py-3 text-white sm:-mx-6 sm:px-6 lg:hidden">
        <span className="text-sm font-semibold">Illustrated value</span>
        <span className="font-display text-xl font-semibold">{formatLakhCrore(result.value)}</span>
      </div>
      <div className="space-y-6">
        <div className="card space-y-6 rounded-[1.75rem] p-6 sm:p-9">
          <Slider label="Monthly investment" value={monthly} display={formatRupees(monthly)} min={500} max={2_00_000} step={500} onChange={setMonthly} />
          <Slider label="Years invested" value={years} display={`${years} years`} min={1} max={40} step={1} onChange={setYears} />
          <Slider label="Assumed yearly return" hint="You choose this rate. It is an assumption, not a forecast, and actual returns can be lower or negative." value={annualReturn} display={`${annualReturn}%`} min={0} max={15} step={0.5} onChange={setAnnualReturn} />
          <Slider label="Yearly increase in your SIP" hint="Optional. For example, raising your SIP each year as your income grows." value={stepUp} display={`${stepUp}%`} min={0} max={20} step={1} onChange={setStepUp} />
        </div>
        <div className="card rounded-[1.75rem] p-6 sm:p-9">
          <GrowthChart yearly={result.yearly} />
        </div>
      </div>
      <div className="rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-9 lg:sticky lg:top-24" data-testid="sip-result">
        <p className="eyebrow eyebrow-light">Illustrated value</p>
        <p aria-live="polite" className="mt-3 font-display text-[clamp(2.75rem,2rem+3vw,4rem)] leading-none font-semibold">{formatLakhCrore(result.value)}</p>
        <p className="mt-3 text-navy-100">After {years} years, if the assumed {annualReturn}% were earned every year. Markets do not move in a straight line.</p>
        <dl className="mt-6 space-y-2 border-t border-white/15 pt-5">
          <div className="flex justify-between gap-3"><dt className="text-navy-100">Money you put in</dt><dd className="font-semibold">{formatLakhCrore(result.invested)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-navy-100">Assumed growth</dt><dd className="font-semibold">{formatLakhCrore(result.growth)}</dd></div>
        </dl>
        <a href={whatsappUrl(message || messages.investing)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-7 w-full">
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Start a SIP on WhatsApp
        </a>
        <p className="mt-4 text-sm text-navy-200">This is an illustration only, before costs and tax. It is not a promise of returns or a recommendation of any scheme.</p>
      </div>
    </div>
  );
}
