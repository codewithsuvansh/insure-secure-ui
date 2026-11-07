import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';
import { Breadcrumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact and Get a Quote',
  description: 'Contact Insure Secure in Jalandhar by WhatsApp or phone on +91 79861 08922, or visit the Karol Bagh Extension office.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <div className="wrap pt-8 pb-6">
        <Breadcrumbs items={[{ name: 'Contact' }]} />
      </div>
      <ContactSection headingLevel={1} />
    </>
  );
}
