import type { Metadata } from 'next';
import { RenewalReminder } from '@/components/tools/RenewalReminder';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Policy Renewal Reminder',
  description: 'Add an insurance renewal reminder to your calendar, so that your cover does not lapse.',
  alternates: { canonical: '/tools/renewal-reminder/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'Renewal reminder' }]} eyebrow="Renewal reminder" title="Never miss a renewal again." lede="A lapsed policy can mean no cover when you need it, and it can cost you waiting period credit or your no claim bonus. Set a reminder in a few seconds." />
      <section className="wrap pb-20">
        <div className="max-w-3xl">
        <RenewalReminder />
        </div>
      </section>
    </>
  );
}
