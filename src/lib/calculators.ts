/* Term cover estimate -------------------------------------------------- */

export interface TermCoverInput {
  annualIncome: number;
  annualExpenses: number;
  yearsToSupport: number;
  loans: number;
  goals: number;
  existingCover: number;
  savings: number;
}

export interface TermCoverResult {
  incomeNeed: number;
  loans: number;
  goals: number;
  gross: number;
  offsets: number;
  /** The gap, rounded up to the next ₹5 lakh. */
  recommended: number;
  /** A 10 to 15 times income rule of thumb, for comparison. */
  ruleOfThumb: { min: number; max: number };
}

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function estimateTermCover(input: TermCoverInput): TermCoverResult {
  const incomeNeed = clamp(input.annualExpenses) * clamp(input.yearsToSupport);
  const loans = clamp(input.loans);
  const goals = clamp(input.goals);
  const gross = incomeNeed + loans + goals;
  const offsets = clamp(input.existingCover) + clamp(input.savings);
  const gap = Math.max(0, gross - offsets);
  const step = 5_00_000;
  return {
    incomeNeed,
    loans,
    goals,
    gross,
    offsets,
    recommended: Math.ceil(gap / step) * step,
    ruleOfThumb: { min: clamp(input.annualIncome) * 10, max: clamp(input.annualIncome) * 15 },
  };
}

/* Health cover guide --------------------------------------------------- */

export type CityType = 'metro' | 'large' | 'town';

export interface HealthCoverInput {
  adults: number;
  children: number;
  eldestAge: number;
  cityType: CityType;
  includesParents: boolean;
  hasEmployerCover: boolean;
}

export interface HealthCoverResult {
  minLakh: number;
  maxLakh: number;
  notes: string[];
}

const baseRange: Record<CityType, [number, number]> = {
  metro: [15, 25],
  large: [10, 15],
  town: [5, 10],
};

export function estimateHealthCover(input: HealthCoverInput): HealthCoverResult {
  const [baseMin, baseMax] = baseRange[input.cityType];
  const members = Math.max(1, input.adults) + Math.max(0, input.children);
  let min = baseMin;
  let max = baseMax;
  if (members >= 3) {
    min += 5;
    max += 5;
  }
  if (members >= 5) {
    min += 5;
    max += 5;
  }
  if (input.eldestAge >= 45) {
    min += 5;
    max += 5;
  }
  const notes: string[] = [];
  if (input.includesParents || input.eldestAge >= 60) {
    notes.push(
      'Consider a separate plan for parents or members over 60, so their claims do not use up the shared family cover.',
    );
  }
  if (input.hasEmployerCover) {
    notes.push('Employer cover usually ends when you leave the job, so treat it as a bonus and not your main cover.');
  }
  if (members >= 3) {
    notes.push('A family floater shares one cover amount across members, so check that it is enough for two claims in one year.');
  }
  notes.push('A super top-up can raise your total cover, often at a lower cost than increasing the base plan.');
  return { minLakh: min, maxLakh: max, notes };
}

/* Coverage check ------------------------------------------------------- */

export interface CoverageOption {
  value: string;
  label: string;
  /** Share of this question's weight earned. null means it does not apply. */
  score: number | null;
  gap?: { title: string; detail: string; href: string; severity: 'high' | 'medium' };
}

export interface CoverageQuestion {
  id: string;
  question: string;
  hint: string;
  weight: number;
  options: CoverageOption[];
}

export const coverageQuestions: CoverageQuestion[] = [
  {
    id: 'dependents',
    question: 'Does anyone depend on your income?',
    hint: 'A spouse, children, parents, or anyone sharing a home loan with you.',
    weight: 0,
    options: [
      { value: 'yes', label: 'Yes, people depend on me', score: null },
      { value: 'no', label: 'No, not at the moment', score: null },
    ],
  },
  {
    id: 'life',
    question: 'How much life cover do you have?',
    hint: 'Count term plans and the sum assured on other life policies.',
    weight: 25,
    options: [
      { value: 'strong', label: '10 times my yearly income or more', score: 1 },
      {
        value: 'some',
        label: 'Some, but less than that',
        score: 0.5,
        gap: {
          title: 'Your life cover may fall short',
          detail: 'Check whether it would clear your loans and replace your income for the years your family needs it.',
          href: '/tools/term-cover/',
          severity: 'medium',
        },
      },
      {
        value: 'none',
        label: 'None, or I am not sure',
        score: 0,
        gap: {
          title: 'Your family has no income protection',
          detail: 'Term insurance is usually the most direct way to replace income if something happens to you.',
          href: '/insurance/term-life-insurance/',
          severity: 'high',
        },
      },
    ],
  },
  {
    id: 'health',
    question: 'What health cover do you have for yourself and your family?',
    hint: 'A personal policy stays with you when you change jobs.',
    weight: 30,
    options: [
      { value: 'own', label: 'Our own personal or family policy', score: 1 },
      {
        value: 'employer',
        label: 'Only through my employer',
        score: 0.4,
        gap: {
          title: 'Your health cover depends on your job',
          detail: 'Employer cover usually ends when you leave. A personal plan keeps your family protected between jobs.',
          href: '/insurance/family-floater-health-insurance/',
          severity: 'medium',
        },
      },
      {
        value: 'none',
        label: 'None, or I am not sure',
        score: 0,
        gap: {
          title: 'A hospital stay would come out of your savings',
          detail: 'A family floater or individual plan is the first cover most households should put in place.',
          href: '/tools/health-cover/',
          severity: 'high',
        },
      },
    ],
  },
  {
    id: 'parents',
    question: 'Are your parents covered for health?',
    hint: 'Waiting periods make this easier to arrange before health conditions appear.',
    weight: 15,
    options: [
      { value: 'yes', label: 'Yes, they have their own cover', score: 1 },
      {
        value: 'no',
        label: 'No, they are not covered',
        score: 0,
        gap: {
          title: 'Your parents have no health cover',
          detail: 'Senior citizen plans are designed for this stage of life. Acceptance and waiting periods vary by insurer.',
          href: '/insurance/senior-citizen-health-insurance/',
          severity: 'high',
        },
      },
      { value: 'na', label: 'This does not apply to me', score: null },
    ],
  },
  {
    id: 'vehicle',
    question: 'How is your vehicle insured?',
    hint: 'Third-party cover is the legal minimum, and it does not pay for damage to your own vehicle.',
    weight: 15,
    options: [
      { value: 'comprehensive', label: 'Comprehensive and up to date', score: 1 },
      {
        value: 'third-party',
        label: 'Third-party only',
        score: 0.5,
        gap: {
          title: 'Repairs to your own vehicle are not covered',
          detail: 'Comprehensive cover adds own-damage protection for accidents, theft, fire and floods.',
          href: '/insurance/car-insurance/',
          severity: 'medium',
        },
      },
      {
        value: 'expired',
        label: 'It has expired, or I am not sure',
        score: 0,
        gap: {
          title: 'Check your vehicle policy today',
          detail: 'Driving without at least third-party cover is against the law and leaves you personally exposed.',
          href: '/tools/renewal-reminder/',
          severity: 'high',
        },
      },
      { value: 'none', label: 'I do not own a vehicle', score: null },
    ],
  },
  {
    id: 'home',
    question: 'Is your home and what is inside it insured?',
    hint: 'Renters can usually insure their belongings too.',
    weight: 15,
    options: [
      { value: 'both', label: 'Yes, the building and belongings', score: 1 },
      {
        value: 'partial',
        label: 'Only partly, such as through a home loan',
        score: 0.5,
        gap: {
          title: 'Your belongings may be unprotected',
          detail: 'Loan-linked cover often focuses on the building. Check that your contents are included too.',
          href: '/insurance/home-insurance/',
          severity: 'medium',
        },
      },
      {
        value: 'none',
        label: 'No, or I am not sure',
        score: 0,
        gap: {
          title: 'Your home is uninsured',
          detail: 'Fire, floods and burglary can cost far more than a home policy.',
          href: '/insurance/home-insurance/',
          severity: 'medium',
        },
      },
    ],
  },
];

export interface CoverageResult {
  score: number;
  band: 'strong' | 'fair' | 'exposed';
  gaps: NonNullable<CoverageOption['gap']>[];
}

export function scoreCoverage(answers: Record<string, string>): CoverageResult {
  const hasDependents = answers.dependents === 'yes';
  let earned = 0;
  let possible = 0;
  const gaps: CoverageResult['gaps'] = [];
  for (const question of coverageQuestions) {
    const option = question.options.find((o) => o.value === answers[question.id]);
    if (!option || option.score === null) continue;
    // Life cover matters far less when nobody relies on the income.
    const weight = question.id === 'life' && !hasDependents ? question.weight * 0.3 : question.weight;
    earned += weight * option.score;
    possible += weight;
    if (option.gap && (question.id !== 'life' || hasDependents)) gaps.push(option.gap);
  }
  const score = possible === 0 ? 0 : Math.round((earned / possible) * 100);
  gaps.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'high' ? -1 : 1));
  return { score, band: score >= 80 ? 'strong' : score >= 50 ? 'fair' : 'exposed', gaps };
}

export function coverageSummaryMessage(result: CoverageResult): string {
  return [
    `Hello Insure Secure, I took the coverage check on your website and scored ${result.score} out of 100.`,
    result.gaps.length ? `Gaps it found:\n${result.gaps.map((g) => `- ${g.title}`).join('\n')}` : '',
    'Could you help me review this?',
  ]
    .filter(Boolean)
    .join('\n');
}

/* SIP projection ------------------------------------------------------- */

export interface SipInput {
  monthly: number;
  years: number;
  /** Assumed yearly return, as a percentage. An illustration, never a forecast. */
  annualReturn: number;
  /** Yearly increase in the monthly amount, as a percentage. */
  stepUp?: number;
}

export interface SipYear {
  year: number;
  invested: number;
  value: number;
  growth: number;
}

export interface SipResult {
  invested: number;
  value: number;
  growth: number;
  yearly: SipYear[];
}

const monthlyRate = (annualPercent: number) => Math.pow(1 + annualPercent / 100, 1 / 12) - 1;

/** Projects a monthly investment made at the start of each month. */
export function projectSip({ monthly, years, annualReturn, stepUp = 0 }: SipInput): SipResult {
  const rate = monthlyRate(Math.max(0, annualReturn));
  const wholeYears = Math.max(0, Math.round(years));
  let value = 0;
  let invested = 0;
  let amount = clamp(monthly);
  const yearly: SipYear[] = [];
  for (let year = 1; year <= wholeYears; year++) {
    for (let month = 0; month < 12; month++) {
      value = (value + amount) * (1 + rate);
      invested += amount;
    }
    yearly.push({ year, invested, value, growth: value - invested });
    amount *= 1 + Math.max(0, stepUp) / 100;
  }
  return { invested, value, growth: value - invested, yearly };
}

/* Goal planner --------------------------------------------------------- */

export interface GoalInput {
  /** What the goal would cost today. */
  costToday: number;
  years: number;
  inflation: number;
  annualReturn: number;
  alreadySaved: number;
}

export interface GoalResult {
  futureCost: number;
  savedGrowsTo: number;
  gap: number;
  /** Rounded up to the next ₹100. */
  monthlyNeeded: number;
  totalInvested: number;
}

export function planGoal({ costToday, years, inflation, annualReturn, alreadySaved }: GoalInput): GoalResult {
  const y = Math.max(0, years);
  const futureCost = clamp(costToday) * Math.pow(1 + Math.max(0, inflation) / 100, y);
  const savedGrowsTo = clamp(alreadySaved) * Math.pow(1 + Math.max(0, annualReturn) / 100, y);
  const gap = Math.max(0, futureCost - savedGrowsTo);
  const months = Math.round(y * 12);
  const rate = monthlyRate(Math.max(0, annualReturn));
  let factor = months;
  if (rate > 0) factor = ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
  const monthlyNeeded = gap === 0 || factor === 0 ? 0 : Math.ceil(gap / factor / 100) * 100;
  return { futureCost, savedGrowsTo, gap, monthlyNeeded, totalInvested: monthlyNeeded * months };
}
