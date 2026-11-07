import { Phone } from 'lucide-react';
import { site, telUrl } from '@/content/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export function WhatsAppButton({
  message,
  children = 'Chat on WhatsApp',
  className = '',
}: {
  message: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${className}`}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export function CallButton({ className = 'btn-outline', label }: { className?: string; label?: string }) {
  return (
    <a href={telUrl} className={`btn ${className}`}>
      <Phone aria-hidden="true" className="size-[1.1rem]" />
      {label ?? site.phone.display}
    </a>
  );
}
