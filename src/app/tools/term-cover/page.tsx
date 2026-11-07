import type { Metadata } from 'next';
import { TermCover } from '@/components/tools/TermCover';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Term Insurance Cover Calculator',
  description: 'Estimate how much term life insurance your family may need, based on expenses, loans, goals and existing cover.',
  alternates: { canonical: '/tools/term-cover/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'Term cover calculator' }]} eyebrow="Term cover calculator" title="How much life cover does your family need?" lede="Move the sliders to match your situation. The estimate updates as you go." />
      <section className="wrap pb-20">
        <TermCover />
      </section>
    </>
  );
}
