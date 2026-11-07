import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { fullAddress, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Insure Secure handles information shared through this website and on WhatsApp.',
  alternates: { canonical: '/privacy/' },
};

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'Privacy' }]} title="Privacy policy" />
      <section className="wrap pb-20">
        <div className="max-w-3xl space-y-6 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-2xl">
        <p>This policy explains how {site.legalName} handles information shared through this website.</p>
        <h2>What this website collects</h2>
        <p>This website has no user accounts or database. Our forms and tools run in your browser, and the website itself does not store what you type.</p>
        <h2>When you contact us</h2>
        <p>Our forms prepare a message for WhatsApp. We receive it only if you choose to send it. If you message or call us, we use your details to respond to your enquiry and to help you with insurance. To arrange cover or investments, we may need to share relevant details with insurers, fund houses and their service providers.</p>
        <h2>Other services</h2>
        <p>WhatsApp is run by Meta, and its own terms and privacy policy apply to messages you send there. The map on this website is provided by Google, which may collect information when the map loads. Calendar files download directly to your device.</p>
        <h2>Your choices</h2>
        <p>You can ask us about the information we hold about you, or ask us to correct or delete it, unless we must keep it for legal or regulatory reasons. To do this, contact us on {site.phone.display}, at {site.email} or at {fullAddress()}.</p>
        <h2>Changes</h2>
        <p>We may update this policy, for example if we add new website features. The current version will always be on this page.</p>
        </div>
      </section>
    </>
  );
}
