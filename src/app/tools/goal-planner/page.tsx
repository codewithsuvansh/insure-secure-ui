import type { Metadata } from 'next';
import { MutualFundNotice } from '@/components/Disclosure';
import { GoalPlanner } from '@/components/tools/GoalPlanner';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Goal Planner',
  description: 'Work out an illustrative monthly investment for education, a home, a wedding or retirement.',
  alternates: { canonical: '/tools/goal-planner/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Tools', href: '/tools/' }, { name: 'Goal planner' }]} eyebrow="Goal planner" title="Turn a big goal into a monthly number." lede="Choose a goal, allow for rising prices and see roughly what it could take each month." />
      <section className="wrap space-y-6 pb-20">
        <GoalPlanner />
        <MutualFundNotice />
      </section>
    </>
  );
}
