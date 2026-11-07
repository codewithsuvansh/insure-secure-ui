import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/Actions';
import { messages } from '@/lib/whatsapp';

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-[clamp(2.5rem,1.8rem+3vw,4rem)]">This page isn’t covered.</h1>
      <p className="lede mt-4 max-w-xl">The link may be out of date. You can browse all our cover, or message us to ask what you were looking for.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/insurance/" className="btn btn-navy">
          Browse all cover
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <WhatsAppButton message={messages.general}>Ask on WhatsApp</WhatsAppButton>
      </div>
    </section>
  );
}
