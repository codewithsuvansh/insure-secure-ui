import { PhoneCall, Scale, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';
import { CallButton, WhatsAppButton } from '@/components/Actions';
import { ClaimDesk } from '@/components/ClaimDesk';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insurance Claim Help Desk',
  description: 'Steps and document checklists for health, motor, life, home, travel and business insurance claims, with help from Insure Secure in Jalandhar.',
  alternates: { canonical: '/claims/' },
};

export default function ClaimsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Claim help' }]} eyebrow="Claim help desk" title="Need to make a claim? Start here." lede="Choose your type of claim to see what to do first, what happens next and which documents to gather. If you are unsure, just contact us.">
        <div className="mt-7 flex flex-wrap gap-3">
          <WhatsAppButton message="Hello Insure Secure, I need help with an insurance claim.">Message us now</WhatsAppButton>
          <CallButton />
        </div>
      </PageHeader>
      <section className="wrap pb-14">
        <ClaimDesk />
      </section>
      <section className="bg-white py-14 lg:py-20">
        <div className="wrap">
          <h2 className="section-title max-w-3xl">Good habits that can protect your claim</h2>
          <ul className="mt-9 grid gap-8 md:grid-cols-3">
            <li>
              <PhoneCall aria-hidden="true" className="size-8 text-leaf-600" />
              <h3 className="mt-3 text-2xl">Report it early</h3>
              <p className="mt-2 text-muted">Policies set deadlines for telling the insurer. Delays can cause avoidable problems, so tell the insurer as soon as you can.</p>
            </li>
            <li>
              <ShieldAlert aria-hidden="true" className="size-8 text-leaf-600" />
              <h3 className="mt-3 text-2xl">Share accurate details</h3>
              <p className="mt-2 text-muted">Give the same accurate facts on every form. Do not admit fault or agree on compensation before you speak to the insurer.</p>
            </li>
            <li>
              <Scale aria-hidden="true" className="size-8 text-leaf-600" />
              <h3 className="mt-3 text-2xl">Know your options</h3>
              <p className="mt-2 text-muted">If you disagree with a decision, you can raise it with the insurer’s grievance team, then IRDAI’s Bima Bharosa system or the Insurance Ombudsman.</p>
            </li>
          </ul>
          <p className="mt-10 text-sm text-muted">Each insurer makes its own claim decisions under the policy terms. These steps are general guidance, so always follow your policy wording and your insurer’s instructions.</p>
        </div>
      </section>
    </>
  );
}
