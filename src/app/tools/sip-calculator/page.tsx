import type { Metadata } from 'next';
import { MutualFundNotice } from '@/components/Disclosure';
import { SipCalculator } from '@/components/tools/SipCalculator';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'SIP Calculator',
  description: 'Illustrate what a monthly SIP could become, using an amount, period and assumed return that you choose.',
  alternates: { canonical: '/tools/sip-calculator/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'SIP calculator' }]} eyebrow="SIP calculator" title="What could a monthly SIP become?" lede="Move the sliders to see how the amount, the time and the assumed return change the picture. Time is often the part that surprises people." />
      <section className="wrap space-y-6 pb-20">
        <SipCalculator />
        <MutualFundNotice />
      </section>
    </>
  );
}
