import { describe, expect, it } from 'vitest';
import { coverageQuestions, estimateHealthCover, estimateTermCover, planGoal, projectSip, scoreCoverage } from '@/lib/calculators';
import { axisTicks, formatLakhCrore, formatRupees } from '@/lib/format';
import { buildReminderIcs, parseDateOnly } from '@/lib/ics';

describe('estimateTermCover', () => {
  const base = { annualIncome: 10_00_000, annualExpenses: 6_00_000, yearsToSupport: 20, loans: 25_00_000, goals: 15_00_000, existingCover: 50_00_000, savings: 5_00_000 };
  it('adds needs, subtracts offsets and rounds up to ₹5 lakh', () => {
    const r = estimateTermCover(base);
    expect(r.gross).toBe(1_60_00_000);
    expect(r.offsets).toBe(55_00_000);
    expect(r.recommended).toBe(1_05_00_000);
    expect(r.ruleOfThumb).toEqual({ min: 1_00_00_000, max: 1_50_00_000 });
    expect(estimateTermCover({ ...base, savings: 5_00_001 }).recommended).toBe(1_05_00_000);
  });
  it('never recommends a negative amount', () => {
    expect(estimateTermCover({ ...base, existingCover: 10_00_00_000 }).recommended).toBe(0);
  });
  it('treats invalid input as zero', () => {
    expect(estimateTermCover({ ...base, annualExpenses: Number.NaN, loans: -5 }).gross).toBe(15_00_000);
  });
});

describe('estimateHealthCover', () => {
  it('raises the range with family size and age', () => {
    const small = estimateHealthCover({ adults: 1, children: 0, eldestAge: 30, cityType: 'large', includesParents: false, hasEmployerCover: false });
    const large = estimateHealthCover({ adults: 2, children: 3, eldestAge: 50, cityType: 'large', includesParents: false, hasEmployerCover: false });
    expect(small).toMatchObject({ minLakh: 10, maxLakh: 15 });
    expect(large).toMatchObject({ minLakh: 25, maxLakh: 30 });
  });
  it('adds advice for parents and employer cover', () => {
    const r = estimateHealthCover({ adults: 2, children: 0, eldestAge: 62, cityType: 'metro', includesParents: true, hasEmployerCover: true });
    expect(r.notes.join(' ')).toMatch(/parents/);
    expect(r.notes.join(' ')).toMatch(/Employer/);
  });
});

describe('scoreCoverage', () => {
  it('scores a fully protected household at 100 with no gaps', () => {
    const r = scoreCoverage({ dependents: 'yes', life: 'strong', health: 'own', parents: 'yes', vehicle: 'comprehensive', home: 'both' });
    expect(r).toEqual({ score: 100, band: 'strong', gaps: [] });
  });
  it('scores an unprotected household at 0 and lists high-severity gaps first', () => {
    const r = scoreCoverage({ dependents: 'yes', life: 'none', health: 'none', parents: 'no', vehicle: 'expired', home: 'none' });
    expect(r.score).toBe(0);
    expect(r.band).toBe('exposed');
    expect(r.gaps[0]?.severity).toBe('high');
    expect(r.gaps.at(-1)?.severity).toBe('medium');
  });
  it('excludes questions that do not apply', () => {
    const r = scoreCoverage({ dependents: 'no', life: 'none', health: 'own', parents: 'na', vehicle: 'none', home: 'both' });
    expect(r.gaps).toEqual([]);
    expect(r.score).toBeGreaterThan(80);
  });
  it('links every gap to a real-looking internal path', () => {
    for (const q of coverageQuestions) for (const o of q.options) if (o.gap) expect(o.gap.href).toMatch(/^\/.+\/$/);
  });
});

describe('formatting', () => {
  it('uses Indian grouping', () => {
    expect(formatRupees(1250000)).toBe('₹12,50,000');
    expect(formatLakhCrore(12_50_000)).toBe('₹12.5 lakh');
    expect(formatLakhCrore(1_25_00_000)).toBe('₹1.25 crore');
  });
});

describe('reminder calendar file', () => {
  const now = new Date('2026-11-07T10:00:00Z');
  it('schedules an all-day event before the renewal date', () => {
    const ics = buildReminderIcs({ policyLabel: 'car insurance', renewalDate: '2027-03-15', daysBefore: 30, phoneDisplay: '+91 79861 08922', now });
    expect(ics).toContain('DTSTART;VALUE=DATE:20270213');
    expect(ics).toContain('DTEND;VALUE=DATE:20270214');
    expect(ics).toContain('SUMMARY:Renew car insurance by 2027-03-15');
    expect(ics.split('\r\n').at(0)).toBe('BEGIN:VCALENDAR');
  });
  it('escapes special characters', () => {
    const ics = buildReminderIcs({ policyLabel: 'home, contents; cover', renewalDate: '2027-01-01', daysBefore: 7, phoneDisplay: 'x', now });
    expect(ics).toContain('home\\, contents\; cover');
  });
  it('rejects impossible dates', () => {
    expect(parseDateOnly('2026-02-31')).toBeNull();
    expect(() => buildReminderIcs({ policyLabel: 'x', renewalDate: 'soon', daysBefore: 7, phoneDisplay: 'x', now })).toThrow();
  });
});

describe('projectSip', () => {
  it('matches the standard formula for a level monthly investment', () => {
    const r = projectSip({ monthly: 10_000, years: 10, annualReturn: 12 });
    const m = Math.pow(1.12, 1 / 12) - 1;
    const expected = 10_000 * ((Math.pow(1 + m, 120) - 1) / m) * (1 + m);
    expect(r.value).toBeCloseTo(expected, 2);
    expect(r.invested).toBe(12_00_000);
    expect(r.growth).toBeCloseTo(expected - 12_00_000, 2);
    expect(r.yearly).toHaveLength(10);
    expect(r.yearly.at(-1)?.value).toBeCloseTo(r.value, 6);
  });
  it('returns exactly what was invested at a zero rate', () => {
    const r = projectSip({ monthly: 5_000, years: 2, annualReturn: 0 });
    expect(r.value).toBeCloseTo(1_20_000, 6);
    expect(r.growth).toBeCloseTo(0, 6);
  });
  it('raises contributions each year with a step-up', () => {
    const r = projectSip({ monthly: 10_000, years: 2, annualReturn: 0, stepUp: 10 });
    expect(r.invested).toBeCloseTo(1_20_000 + 1_32_000, 6);
  });
  it('handles invalid input without producing NaN', () => {
    const r = projectSip({ monthly: Number.NaN, years: 0, annualReturn: -5 });
    expect(r).toMatchObject({ invested: 0, value: 0, growth: 0 });
  });
});

describe('planGoal', () => {
  it('reaches the goal when the monthly amount is invested', () => {
    const input = { costToday: 25_00_000, years: 12, inflation: 6, annualReturn: 10, alreadySaved: 2_00_000 };
    const plan = planGoal(input);
    expect(plan.futureCost).toBeCloseTo(25_00_000 * Math.pow(1.06, 12), 2);
    expect(plan.monthlyNeeded % 100).toBe(0);
    const projected = projectSip({ monthly: plan.monthlyNeeded, years: 12, annualReturn: 10 }).value + plan.savedGrowsTo;
    expect(projected).toBeGreaterThanOrEqual(plan.futureCost);
    const shortBy100 = projectSip({ monthly: plan.monthlyNeeded - 100, years: 12, annualReturn: 10 }).value + plan.savedGrowsTo;
    expect(shortBy100).toBeLessThan(plan.futureCost);
  });
  it('needs nothing when savings already cover the goal', () => {
    const plan = planGoal({ costToday: 1_00_000, years: 5, inflation: 5, annualReturn: 10, alreadySaved: 50_00_000 });
    expect(plan).toMatchObject({ gap: 0, monthlyNeeded: 0, totalInvested: 0 });
  });
  it('works at a zero return', () => {
    const plan = planGoal({ costToday: 12_000, years: 1, inflation: 0, annualReturn: 0, alreadySaved: 0 });
    expect(plan.monthlyNeeded).toBe(1_000);
  });
});

describe('axisTicks', () => {
  it('produces clean ticks that reach past the maximum', () => {
    expect(axisTicks(95, 4)).toEqual([0, 50, 100]);
    const ticks = axisTicks(2_34_00_000);
    expect(ticks[0]).toBe(0);
    expect(ticks.at(-1)!).toBeGreaterThanOrEqual(2_34_00_000);
    expect(ticks.length).toBeLessThanOrEqual(7);
  });
  it('survives zero', () => {
    expect(axisTicks(0)).toEqual([0, 1]);
  });
});
