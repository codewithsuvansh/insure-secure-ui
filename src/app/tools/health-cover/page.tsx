import type { Metadata } from 'next';
import { HealthCover } from '@/components/tools/HealthCover';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Health Insurance Cover Guide',
  description: 'Get a starting range for health cover, based on your family size, age and where you would go for treatment.',
  alternates: { canonical: '/tools/health-cover/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'Health cover guide' }]} eyebrow="Health cover guide" title="How much health cover is enough?" lede="Tell us a little about your family for a starting point. There are no premiums here, because they depend on the insurer and your health." />
      <section className="wrap pb-20">
        <HealthCover />
      </section>
    </>
  );
}
