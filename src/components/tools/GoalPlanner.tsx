'use client';

import { useId, useState } from 'react';
import { planGoal } from '@/lib/calculators';
import { formatLakhCrore, formatRupees } from '@/lib/format';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

const LAKH = 1_00_000;

const presets = [
  { id: 'education', label: 'Child’s education', cost: 25 * LAKH, years: 12, inflation: 8 },
  { id: 'home', label: 'Home down payment', cost: 20 * LAKH, years: 7, inflation: 6 },
  { id: 'wedding', label: 'Child’s wedding', cost: 15 * LAKH, years: 15, inflation: 6 },
  { id: 'retirement', label: 'Retirement fund', cost: 200 * LAKH, years: 25, inflation: 6 },
];

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

export function GoalPlanner() {
  const [presetId, setPresetId] = useState('education');
  const [costToday, setCostToday] = useState(25 * LAKH);
  const [years, setYears] = useState(12);
  const [inflation, setInflation] = useState(8);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [alreadySaved, setAlreadySaved] = useState(0);
  const plan = planGoal({ costToday, years, inflation, annualReturn, alreadySaved });
  const goalName = presets.find((p) => p.id === presetId)?.label ?? 'a goal';
  const message = `Hello Insure Secure, I used your goal planner for ${goalName}. It illustrated about ${formatRupees(plan.monthlyNeeded)} a month for ${years} years. Could you help me plan this?`;

  function applyPreset(p: (typeof presets)[number]) {
    setPresetId(p.id);
    setCostToday(p.cost);
    setYears(p.years);
    setInflation(p.inflation);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="sticky top-[4.5rem] z-10 -mx-4 flex items-center justify-between gap-3 bg-navy-900 px-4 py-3 text-white sm:-mx-6 sm:px-6 lg:hidden">
        <span className="text-sm font-semibold">Illustrated monthly SIP</span>
        <span className="font-display text-xl font-semibold">{formatRupees(plan.monthlyNeeded)}</span>
      </div>
      <div className="card space-y-6 rounded-[1.75rem] p-6 sm:p-9">
        <div>
          <p id="goal-label" className="field-label">What are you saving for?</p>
          <div role="group" aria-labelledby="goal-label" className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button key={p.id} type="button" aria-pressed={presetId === p.id} onClick={() => applyPreset(p)} className={`min-h-11 rounded-full border-[1.5px] px-4 font-semibold transition-colors ${presetId === p.id ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/25 text-navy-900 hover:border-navy-900'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">These amounts are starting examples. Adjust them to suit your goal.</p>
        </div>
        <Slider label="What it would cost today" value={costToday} display={formatLakhCrore(costToday)} min={LAKH} max={500 * LAKH} step={LAKH} onChange={setCostToday} />
        <Slider label="Years until you need it" value={years} display={`${years} years`} min={1} max={40} step={1} onChange={setYears} />
        <Slider label="Expected yearly price rise" value={inflation} display={`${inflation}%`} min={0} max={12} step={0.5} onChange={setInflation} />
        <Slider label="Assumed yearly return" hint="You choose this rate. It is an assumption, not a forecast." value={annualReturn} display={`${annualReturn}%`} min={0} max={15} step={0.5} onChange={setAnnualReturn} />
        <Slider label="Already saved for this goal" value={alreadySaved} display={formatLakhCrore(alreadySaved)} min={0} max={200 * LAKH} step={LAKH} onChange={setAlreadySaved} />
      </div>
      <div className="rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-9 lg:sticky lg:top-24" data-testid="goal-result">
        <p className="eyebrow eyebrow-light">Illustrated monthly SIP</p>
        <p aria-live="polite" className="mt-3 font-display text-[clamp(2.75rem,2rem+3vw,4rem)] leading-none font-semibold">{formatRupees(plan.monthlyNeeded)}</p>
        <p className="mt-3 text-navy-100">Rounded up to the next ₹100, using the rates you chose.</p>
        <dl className="mt-6 space-y-2 border-t border-white/15 pt-5">
          <div className="flex justify-between gap-3"><dt className="text-navy-100">Estimated future cost</dt><dd className="font-semibold">{formatLakhCrore(plan.futureCost)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-navy-100">Your savings could grow to</dt><dd className="font-semibold">{formatLakhCrore(plan.savedGrowsTo)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-navy-100">Total you would put in</dt><dd className="font-semibold">{formatLakhCrore(plan.totalInvested)}</dd></div>
        </dl>
        <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-7 w-full">
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Plan this on WhatsApp
        </a>
        <p className="mt-4 text-sm text-navy-200">This is an illustration only, before costs and tax. It is not a promise of returns or a recommendation of any scheme.</p>
      </div>
    </div>
  );
}
