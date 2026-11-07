import type { Metadata } from 'next';
import { CoverageCheck } from '@/components/tools/CoverageCheck';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insurance Coverage Check',
  description: 'Answer six questions to see a protection score and the main gaps in your insurance.',
  alternates: { canonical: '/tools/coverage-check/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'Coverage check' }]} eyebrow="Coverage check" title="How protected are you, really?" lede="Six quick questions. Your answers stay in your browser unless you choose to send them to us." />
      <section className="wrap pb-20">
        <div className="max-w-3xl">
        <CoverageCheck />
        </div>
      </section>
    </>
  );
}
