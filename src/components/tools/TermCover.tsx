'use client';

import { useId, useState } from 'react';
import { estimateTermCover, type TermCoverInput } from '@/lib/calculators';
import { formatLakhCrore } from '@/lib/format';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

const LAKH = 1_00_000;

interface SliderDef {
  key: keyof TermCoverInput;
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  years?: boolean;
}

const sliders: SliderDef[] = [
  { key: 'annualIncome', label: 'Your yearly income', min: LAKH, max: 100 * LAKH, step: LAKH },
  { key: 'annualExpenses', label: 'Your family’s yearly expenses', min: LAKH, max: 60 * LAKH, step: 50_000 },
  { key: 'yearsToSupport', label: 'Years your family would need support', hint: 'Usually until your youngest child is independent, or your spouse retires.', min: 1, max: 40, step: 1, years: true },
  { key: 'loans', label: 'Outstanding loans', hint: 'Home, car, business and personal loans.', min: 0, max: 300 * LAKH, step: LAKH },
  { key: 'goals', label: 'Future goals to fund', hint: 'Such as education or a child’s wedding.', min: 0, max: 300 * LAKH, step: LAKH },
  { key: 'existingCover', label: 'Life cover you already have', min: 0, max: 500 * LAKH, step: 5 * LAKH },
  { key: 'savings', label: 'Savings your family could use', hint: 'Do not count your home or your retirement funds if your family will need them.', min: 0, max: 300 * LAKH, step: LAKH },
];

function Slider({ def, value, onChange }: { def: SliderDef; value: number; onChange: (n: number) => void }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="field-label !mb-0">{def.label}</label>
        <output htmlFor={id} className="shrink-0 font-display text-xl font-semibold text-navy-900">
          {def.years ? `${value} years` : formatLakhCrore(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="slider mt-1"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        aria-valuetext={def.years ? `${value} years` : formatLakhCrore(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {def.hint && <p className="text-sm text-muted">{def.hint}</p>}
    </div>
  );
}

export function TermCover() {
  const [input, setInput] = useState<TermCoverInput>({
    annualIncome: 10 * LAKH,
    annualExpenses: 6 * LAKH,
    yearsToSupport: 20,
    loans: 20 * LAKH,
    goals: 15 * LAKH,
    existingCover: 25 * LAKH,
    savings: 5 * LAKH,
  });
  const result = estimateTermCover(input);
  const parts = [
    { label: 'Income support', value: result.incomeNeed, bar: 'bg-navy-200' },
    { label: 'Loans', value: result.loans, bar: 'bg-leaf-500' },
    { label: 'Goals', value: result.goals, bar: 'bg-lime' },
  ];
  const message = `Hello Insure Secure, I used your term cover calculator. It estimated a gap of about ${formatLakhCrore(result.recommended)}, based on expenses of ${formatLakhCrore(input.annualExpenses)} a year for ${input.yearsToSupport} years. Could you help me look at my options?`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="sticky top-[4.5rem] z-10 -mx-4 flex items-center justify-between gap-3 bg-navy-900 px-4 py-3 text-white sm:-mx-6 sm:px-6 lg:hidden" data-testid="term-live">
        <span className="text-sm font-semibold">Estimated extra cover</span>
        <span className="font-display text-xl font-semibold">{formatLakhCrore(result.recommended)}</span>
      </div>
      <div className="card space-y-6 rounded-[1.75rem] p-6 sm:p-9">
        {sliders.map((def) => (
          <Slider key={def.key} def={def} value={input[def.key]} onChange={(n) => setInput((prev) => ({ ...prev, [def.key]: n }))} />
        ))}
      </div>
      <div className="rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-9 lg:sticky lg:top-24" data-testid="term-result">
        <p className="eyebrow eyebrow-light">Estimated extra cover</p>
        <p aria-live="polite" className="mt-3 font-display text-[clamp(2.75rem,2rem+3vw,4rem)] leading-none font-semibold">{formatLakhCrore(result.recommended)}</p>
        <p className="mt-3 text-navy-100">Rounded up to the next ₹5 lakh, after existing cover and savings of {formatLakhCrore(result.offsets)}.</p>

        <div className="mt-7">
          <p className="font-semibold">Your family’s total need: {formatLakhCrore(result.gross)}</p>
          <div aria-hidden="true" className="mt-3 flex h-3 gap-0.5 overflow-hidden rounded-full bg-white/15">
            {parts.map((p) => (
              <div key={p.label} className={`${p.bar} transition-all duration-300`} style={{ width: `${result.gross ? (p.value / result.gross) * 100 : 0}%` }} />
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-[0.95rem] text-navy-100">
            {parts.map((p) => (
              <li key={p.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${p.bar}`} />
                  {p.label}
                </span>
                {formatLakhCrore(p.value)}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 border-t border-white/15 pt-5 text-[0.95rem] text-navy-100">
          For comparison, the 10 to 15 times income rule of thumb gives {formatLakhCrore(result.ruleOfThumb.min)} to {formatLakhCrore(result.ruleOfThumb.max)} in total cover.
        </p>
        <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6 w-full">
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Discuss this on WhatsApp
        </a>
        <p className="mt-4 text-sm text-navy-200">This is an estimate that ignores inflation and investment returns. It is not a quote or a recommendation of any plan.</p>
      </div>
    </div>
  );
}
