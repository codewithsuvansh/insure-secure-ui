'use client';

import { Minus, Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { estimateHealthCover, type CityType } from '@/lib/calculators';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <span id={id} className="field-label !mb-0">{label}</span>
      <div role="group" aria-labelledby={id} className="flex items-center gap-2">
        <button type="button" aria-label={`Fewer: ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-navy-900/30 text-navy-900 hover:border-navy-900 disabled:opacity-35">
          <Minus aria-hidden="true" className="size-4" />
        </button>
        <output aria-live="polite" className="w-8 text-center font-display text-2xl font-semibold text-navy-900">{value}</output>
        <button type="button" aria-label={`More: ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-navy-900/30 text-navy-900 hover:border-navy-900 disabled:opacity-35">
          <Plus aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}

const cities: { value: CityType; label: string; hint: string }[] = [
  { value: 'metro', label: 'Metro city', hint: 'Delhi, Mumbai, Bengaluru and similar' },
  { value: 'large', label: 'Large city', hint: 'Jalandhar, Ludhiana, Chandigarh and similar' },
  { value: 'town', label: 'Smaller town', hint: 'Mainly local hospitals' },
];

export function HealthCover() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [eldestAge, setEldestAge] = useState(38);
  const [cityType, setCityType] = useState<CityType>('large');
  const [includesParents, setIncludesParents] = useState(false);
  const [hasEmployerCover, setHasEmployerCover] = useState(false);
  const ageId = useId();

  const result = estimateHealthCover({ adults, children, eldestAge, cityType, includesParents, hasEmployerCover });
  const range = `₹${result.minLakh} lakh to ₹${result.maxLakh} lakh`;
  const message = `Hello Insure Secure, I used your health cover guide for ${adults} adult(s) and ${children} child(ren), eldest aged ${eldestAge}. It suggested ${range}. Could you help me look at my options?`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="sticky top-[4.5rem] z-10 -mx-4 flex items-center justify-between gap-3 bg-navy-900 px-4 py-3 text-white sm:-mx-6 sm:px-6 lg:hidden">
        <span className="text-sm font-semibold">Starting range</span>
        <span className="font-display text-lg font-semibold">{range}</span>
      </div>
      <div className="card space-y-7 rounded-[1.75rem] p-6 sm:p-9">
        <Stepper label="Adults to cover" value={adults} min={1} max={6} onChange={setAdults} />
        <Stepper label="Children to cover" value={children} min={0} max={6} onChange={setChildren} />
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={ageId} className="field-label !mb-0">Age of the eldest person</label>
            <output htmlFor={ageId} className="font-display text-2xl font-semibold text-navy-900">{eldestAge}</output>
          </div>
          <input id={ageId} type="range" className="slider mt-1" min={18} max={85} value={eldestAge} onChange={(e) => setEldestAge(Number(e.target.value))} />
        </div>
        <fieldset>
          <legend className="field-label">Where would you usually go for treatment?</legend>
          <div className="mt-1 grid gap-2">
            {cities.map((c) => (
              <label key={c.value} className={`flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] p-4 transition-colors ${cityType === c.value ? 'border-leaf-600 bg-leaf-50' : 'border-navy-900/20 hover:border-navy-900/50'}`}>
                <input type="radio" name="city" value={c.value} checked={cityType === c.value} onChange={() => setCityType(c.value)} className="mt-1 size-4 accent-leaf-600" />
                <span>
                  <span className="block font-semibold text-navy-900">{c.label}</span>
                  <span className="block text-sm text-muted">{c.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="space-y-3">
          <label className="flex items-center gap-3 font-medium">
            <input type="checkbox" className="size-5 accent-leaf-600" checked={includesParents} onChange={(e) => setIncludesParents(e.target.checked)} />
            I also want to cover my parents
          </label>
          <label className="flex items-center gap-3 font-medium">
            <input type="checkbox" className="size-5 accent-leaf-600" checked={hasEmployerCover} onChange={(e) => setHasEmployerCover(e.target.checked)} />
            I have health cover through my employer
          </label>
        </div>
      </div>

      <div className="rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-9 lg:sticky lg:top-24" data-testid="health-result">
        <p className="eyebrow eyebrow-light">A sensible starting range</p>
        <p aria-live="polite" className="mt-3 font-display text-[clamp(2.25rem,1.6rem+2.5vw,3.25rem)] leading-tight font-semibold">{range}</p>
        <p className="mt-2 text-navy-100">Suggested cover per year, for the people above.</p>
        <ul className="mt-6 space-y-3 border-t border-white/15 pt-5 text-[0.975rem] text-navy-50">
          {result.notes.map((n) => (
            <li key={n} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-lime" />
              {n}
            </li>
          ))}
        </ul>
        <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-7 w-full">
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Discuss this on WhatsApp
        </a>
        <p className="mt-4 text-sm text-navy-200">This range is a general rule of thumb and not a premium quote. Premiums and what you can buy depend on the insurer, your health and your age.</p>
      </div>
    </div>
  );
}
