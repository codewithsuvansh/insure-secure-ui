'use client';

import { FileText, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { telUrl } from '@/content/site';
import { messageForPath } from '@/lib/context-message';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/** Floating WhatsApp on larger screens, and a sticky action bar on phones. */
export function ContactDock() {
  const pathname = usePathname();
  const href = whatsappUrl(messageForPath(pathname));
  return (
    <div data-no-print>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us: chat with Insure Secure"
        className="group fixed right-6 bottom-6 z-30 hidden items-center gap-2 rounded-full bg-whatsapp py-3.5 pr-5 pl-4 font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-whatsapp-dark md:flex"
      >
        <WhatsAppIcon className="size-6" />
        WhatsApp us
      </a>
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-navy-900/15 bg-white pb-[env(safe-area-inset-bottom)] text-sm font-semibold md:hidden">
        <a href={telUrl} className="flex h-15 flex-col items-center justify-center gap-0.5 text-navy-900">
          <Phone aria-hidden="true" className="size-5" />
          Call
        </a>
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-15 flex-col items-center justify-center gap-0.5 bg-whatsapp text-white">
          <WhatsAppIcon />
          WhatsApp
        </a>
        <Link href="/contact/#quote" className="flex h-15 flex-col items-center justify-center gap-0.5 text-navy-900">
          <FileText aria-hidden="true" className="size-5" />
          Quote
        </Link>
      </nav>
    </div>
  );
}
