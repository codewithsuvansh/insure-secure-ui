/** Semi-circular score gauge. Accessible text should be provided alongside it. */
export function ScoreGauge({ score, light = false }: { score: number; light?: boolean }) {
  const clamped = Math.max(0, Math.min(100, score));
  const length = Math.PI * 90;
  const color = clamped >= 80 ? '#5f9e27' : clamped >= 50 ? '#d4a017' : '#c2410c';
  return (
    <svg viewBox="0 0 220 124" aria-hidden="true" className="w-full max-w-[17rem]">
      <path d="M20 112a90 90 0 0 1 180 0" fill="none" stroke={light ? 'rgb(255 255 255 / 0.18)' : '#dfe9f2'} strokeWidth="18" strokeLinecap="round" />
      <path
        d="M20 112a90 90 0 0 1 180 0"
        fill="none"
        stroke={color}
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray={`${(clamped / 100) * length} ${length}`}
        style={{ transition: 'stroke-dasharray 700ms ease-out' }}
      />
      <text x="110" y="100" textAnchor="middle" fontFamily="var(--font-display)" fontSize="50" fontWeight="600" fill={light ? '#fff' : '#0d3656'}>
        {clamped}
      </text>
    </svg>
  );
}
