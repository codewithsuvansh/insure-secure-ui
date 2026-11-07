import type { Metadata } from 'next';
import { Catalogue } from '@/components/Catalogue';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'All Types of Insurance',
  description: 'Search health, life, motor, home, travel, business and farm insurance, each explained in plain language by Insure Secure in Jalandhar.',
  alternates: { canonical: '/insurance/' },
};

export default function InsurancePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Insurance' }]}
        eyebrow="All cover"
        title="What would you like to protect?"
        lede="Find out what each type of insurance does, who it suits and what to watch out for. Search by what you need, or browse by category."
      />
      <section className="wrap pb-20">
        <Catalogue />
      </section>
    </>
  );
}
