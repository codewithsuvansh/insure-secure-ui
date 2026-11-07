import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the Insure Secure website and its tools.',
  alternates: { canonical: '/terms/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Terms of use' }]} title="Terms of use" />
      <section className="wrap pb-20">
        <div className="max-w-3xl space-y-6 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-2xl">
        <p>By using this website, you agree to these terms.</p>
        <h2>General information only</h2>
        <p>Content on this website is general information about insurance and investments. It does not take your personal circumstances into account. Exact benefits, exclusions and conditions depend on the insurer and policy, so always read the policy wording before you buy.</p>
        <h2>Tools and estimates</h2>
        <p>The coverage check, calculators and guides give general estimates based only on what you enter. They are not quotes, and they do not promise that cover will be available.</p>
        <h2>No cover until a policy is issued</h2>
        <p>Sending a message or a form does not create insurance cover. Cover starts only when an insurer accepts your proposal and issues a policy, on its terms.</p>
        <h2>Investments</h2>
        <p>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not indicate future returns. Investment content on this website is general information, and our calculators use assumptions that you choose.</p>
        <h2>Claims</h2>
        <p>{site.name} can help you with the claims process. Each claim decision is made by the insurer, under the terms of the policy.</p>
        <h2>Website content</h2>
        <p>The {site.name} name and logo belong to {site.legalName}. Some photographs are licensed stock images and show models or locations that are not connected with our clients.</p>
        <h2>External links</h2>
        <p>Links to services such as WhatsApp and Google Maps are provided for convenience. Those services have their own terms.</p>
        </div>
      </section>
    </>
  );
}
