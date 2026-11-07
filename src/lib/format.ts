/** Formats rupees using Indian digit grouping, for example 12,50,000. */
export function formatRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/** Formats rupees in lakh or crore, for example ₹1.25 crore. */
export function formatLakhCrore(amount: number): string {
  const value = Math.round(amount);
  const trim = (n: number) => Number(n.toFixed(2)).toString();
  if (Math.abs(value) >= 1_00_00_000) return `₹${trim(value / 1_00_00_000)} crore`;
  if (Math.abs(value) >= 1_00_000) return `₹${trim(value / 1_00_000)} lakh`;
  return formatRupees(value);
}

/** Rounds an axis maximum up to a clean 1, 2 or 5 step, and returns the tick values from zero. */
export function axisTicks(max: number, count = 4): number[] {
  if (!Number.isFinite(max) || max <= 0) return [0, 1];
  const rough = max / count;
  const power = Math.pow(10, Math.floor(Math.log10(rough)));
  const scaled = rough / power;
  const step = (scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10) * power;
  const ticks: number[] = [];
  for (let t = 0; t < max + step * 0.999; t += step) ticks.push(t);
  return ticks;
}
