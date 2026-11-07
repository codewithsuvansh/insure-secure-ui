import { investmentRole, site } from '@/content/site';

export function Pending({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      data-pending
      className={`inline-block rounded border border-dashed px-1.5 text-[0.85em] font-semibold ${
        light ? 'border-lime/70 text-lime' : 'border-amber-note/60 bg-amber-50 text-amber-note'
      }`}
    >
      Add before launch: {children}
    </span>
  );
}

export function LicenceRows({ light = false }: { light?: boolean }) {
  const { type, registrationNumber, validUntil } = site.licence;
  const rows: [string, React.ReactNode][] = [
    ['Registered name', site.legalName],
    ['Licence type', type ?? <Pending light={light}>licence type</Pending>],
    ['IRDAI registration number', registrationNumber ?? <Pending light={light}>registration number</Pending>],
    ['Valid until', validUntil ?? <Pending light={light}>validity date</Pending>],
  ];
  return (
    <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="inline font-semibold">{label}: </dt>
          <dd className="inline">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export const solicitationNotice =
  'Insurance is the subject matter of solicitation. For more details on benefits, exclusions, limitations, terms and conditions, please read the sales brochure and policy wording carefully before concluding a sale.';

export const irdaiNotice =
  'IRDAI and its officials do not sell insurance policies, announce bonuses or invest premiums. Anyone receiving such phone calls should lodge a police complaint.';

export const mutualFundNotice =
  'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not indicate future returns.';

export function InvestmentRows({ light = false }: { light?: boolean }) {
  const { amfiArn, arnValidUntil, sebiRiaNumber } = site.investments;
  const rows: [string, React.ReactNode][] = [
    ['Investment services', investmentRole()],
    ['AMFI registration (ARN)', amfiArn ?? <Pending light={light}>ARN</Pending>],
    ['ARN valid until', arnValidUntil ?? <Pending light={light}>ARN validity date</Pending>],
    ...(sebiRiaNumber ? ([['SEBI registration number', sebiRiaNumber]] as [string, React.ReactNode][]) : []),
  ];
  return (
    <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="inline font-semibold">{label}: </dt>
          <dd className="inline">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MutualFundNotice({ className = '' }: { className?: string }) {
  return (
    <p data-testid="mf-notice" className={`rounded-2xl border border-navy-900/15 bg-white p-4 text-[0.95rem] font-medium text-navy-900 ${className}`}>
      {mutualFundNotice}
    </p>
  );
}
