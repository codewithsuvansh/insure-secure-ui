import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { fullAddress, mapsQuery, site, telUrl } from '@/content/site';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { QuoteForm } from './QuoteForm';

export function ContactDetails() {
  return (
    <ul className="space-y-4">
      <li>
        <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="flex gap-3.5 hover:text-leaf-700">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
            <WhatsAppIcon />
          </span>
          <span>
            <span className="block font-semibold text-navy-900">WhatsApp</span>
            <span className="text-muted">{site.phone.display}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={telUrl} className="flex gap-3.5 hover:text-leaf-700">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
            <Phone aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block font-semibold text-navy-900">Call</span>
            <span className="text-muted">{site.phone.display}</span>
          </span>
        </a>
      </li>
      <li className="flex gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-white">
          <MapPin aria-hidden="true" className="size-5" />
        </span>
        <span>
          <span className="block font-semibold text-navy-900">Visit</span>
          <span className="block text-muted">{fullAddress()}</span>
          <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery()}`} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex items-center gap-1 text-[0.95rem]">
            Get directions
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </span>
      </li>
      {site.email && (
        <li>
          <a href={`mailto:${site.email}`} className="flex gap-3.5 hover:text-leaf-700">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-navy-900">Email</span>
              <span className="block break-all text-muted">{site.email}</span>
            </span>
          </a>
        </li>
      )}
      {site.hours && <li className="text-muted">Office hours: {site.hours}</li>}
    </ul>
  );
}

export function OfficeMap({ className = '' }: { className?: string }) {
  return (
    <iframe
      title={`Map showing ${site.name} at ${fullAddress()}`}
      src={`https://www.google.com/maps?q=${mapsQuery()}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full rounded-2xl border-0 bg-navy-100 ${className}`}
    />
  );
}

export function ContactSection({ headingLevel = 2, defaultProduct }: { headingLevel?: 1 | 2; defaultProduct?: string }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <section id="quote" className="bg-white py-16 lg:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">Talk to us</p>
          <Heading className="section-title mt-3">Tell us what you need, and we will take it from there.</Heading>
          <p className="lede mt-4 max-w-2xl">Fill this in and your details will open as a WhatsApp message to Insure Secure. Prefer to talk? Just call.{site.freeConsultation ? ' Consultations are free of charge.' : ''}</p>
          <div className="mt-8">
            <QuoteForm defaultProduct={defaultProduct} />
          </div>
        </div>
        <div className="space-y-6">
          <ContactDetails />
          <OfficeMap className="h-72" />
        </div>
      </div>
    </section>
  );
}
