import type { Metadata } from 'next';
import { InvestmentRows, irdaiNotice, LicenceRows, mutualFundNotice, solicitationNotice } from '@/components/Disclosure';
import { PageHeader } from '@/components/ui';
import { fullAddress, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Regulatory Disclosures',
  description: 'Insurance and investment registration details and regulatory notices for Insure Secure Financial Services.',
  alternates: { canonical: '/disclosures/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Disclosures' }]} title="Regulatory disclosures" />
      <section className="wrap pb-20">
        <div className="max-w-3xl space-y-8">
        <div className="card p-7">
          <h2 className="mb-4 text-2xl">Registration details</h2>
          <LicenceRows />
          <p className="mt-3"><span className="font-semibold">Address: </span>{fullAddress()}</p>
          <p className="mt-2"><span className="font-semibold">Phone: </span>{site.phone.display}</p>
          {site.email && <p className="mt-2"><span className="font-semibold">Email: </span><a className="link break-all" href={`mailto:${site.email}`}>{site.email}</a></p>}
        </div>
        <div className="card p-7">
          <h2 className="mb-4 text-2xl">Investment registration</h2>
          <InvestmentRows />
          <p className="mt-4 font-semibold">{mutualFundNotice}</p>
          <p className="mt-3">A mutual fund distributor is typically paid a commission by the fund house on regular plans, and this forms part of the scheme’s expenses. Direct plans do not include distributor commission. Please ask us for commission details on any scheme we discuss. Calculators on this website use rates you choose. They are illustrations only and do not promise any return.</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl">Important notices</h2>
          <p>{solicitationNotice}</p>
          <p>{irdaiNotice}</p>
          <p>Calculators, scores and guides on this website are general estimates and information. They are not quotes, recommendations of any specific plan or a promise of cover. Policies are issued by insurers, subject to their acceptance and terms, and each insurer makes its own claim decisions.</p>
        </div>
        {site.insurers.length > 0 && (
          <div>
            <h2 className="text-2xl">Insurers represented</h2>
            <ul className="mt-3 list-disc pl-5">
              {site.insurers.map((i) => <li key={i.name}>{i.name}</li>)}
            </ul>
          </div>
        )}
        <div>
          <h2 className="text-2xl">Complaints</h2>
          <p className="mt-2">If you have a complaint about our service, please contact us first on {site.phone.display}{site.email ? ` or at ${site.email}` : ''}. For concerns about a policy or claim, you can contact the insurer’s grievance team. If it is not resolved, IRDAI’s Bima Bharosa system and the Insurance Ombudsman provide further routes. For mutual fund complaints, you can contact the fund house, and then use SEBI’s SCORES platform.</p>
        </div>
        </div>
      </section>
    </>
  );
}
