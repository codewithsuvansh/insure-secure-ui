import { investmentRole, site } from '@/content/site';

/** Shows the business name, plus licence details only once they are filled in. */
export function LicenceRows() {
  const { type, registrationNumber, validUntil } = site.licence;
  const rows: [string, string | null][] = [
    ['Business name', site.legalName],
    ['Licence type', type],
    ['IRDAI registration number', registrationNumber],
    ['Valid until', validUntil],
  ];
  return <DetailRows rows={rows} />;
}

function DetailRows({ rows }: { rows: [string, string | null][] }) {
  const filled = rows.filter((row) => row[1]);
  if (filled.length === 0) return null;
  return (
    <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {filled.map(([label, value]) => (
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

/** Stays hidden until an investment registration is filled in. */
export function InvestmentRows() {
  const { amfiArn, arnValidUntil, sebiRiaNumber } = site.investments;
  if (!amfiArn && !sebiRiaNumber) return null;
  return (
    <DetailRows
      rows={[
        ['Investment services', investmentRole()],
        ['AMFI registration (ARN)', amfiArn],
        ['ARN valid until', arnValidUntil],
        ['SEBI registration number', sebiRiaNumber],
      ]}
    />
  );
}

export function MutualFundNotice({ className = '' }: { className?: string }) {
  return (
    <p data-testid="mf-notice" className={`rounded-2xl border border-navy-900/15 bg-white p-4 text-[0.95rem] font-medium text-navy-900 ${className}`}>
      {mutualFundNotice}
    </p>
  );
}
