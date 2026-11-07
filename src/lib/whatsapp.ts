import { site } from '@/content/site';

/** Builds the one link format used for every WhatsApp action on the site. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: 'Hello Insure Secure, I would like some help with insurance.',
  product: (name: string) =>
    `Hello Insure Secure, I am interested in ${name}. Could you help me understand my options?`,
  secondOpinion:
    'Hello Insure Secure, I would like a second opinion on a policy I already have. Can I share the details here?',
  investment: (name: string) => `Hello Insure Secure, I would like to know more about ${name}.`,
  investing: 'Hello Insure Secure, I would like to start investing and need some help getting started.',
  portfolioReview: 'Hello Insure Secure, I would like someone to look through my existing investments with me.',
  claim: (type: string, ready: string[] = []) =>
    [
      `Hello Insure Secure, I need help with a ${type} claim.`,
      ready.length ? `Documents I have ready: ${ready.join(', ')}.` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  nri: 'Hello Insure Secure, I am looking for insurance for my family in India while I live abroad.',
  business: 'Hello Insure Secure, I would like to review insurance for my business.',
} as const;

export interface QuoteDetails {
  name: string;
  mobile: string;
  product: string;
  city: string;
  note?: string;
}

export function quoteMessage({ name, mobile, product, city, note }: QuoteDetails): string {
  return [
    'Hello Insure Secure, I would like some help.',
    `Name: ${name.trim()}`,
    `Mobile: +91 ${normaliseMobile(mobile)}`,
    `Interested in: ${product}`,
    `City: ${city.trim()}`,
    note?.trim() ? `Details: ${note.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Strips separators and an optional +91 or 0 prefix from an Indian mobile number. */
export function normaliseMobile(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function isValidMobile(input: string): boolean {
  return /^[6-9]\d{9}$/.test(normaliseMobile(input));
}

export interface QuoteErrors {
  name?: string;
  mobile?: string;
  product?: string;
  city?: string;
  consent?: string;
}

export function validateQuote(details: QuoteDetails, consent: boolean): QuoteErrors {
  const errors: QuoteErrors = {};
  if (details.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!isValidMobile(details.mobile)) errors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
  if (!details.product) errors.product = 'Please choose what you need help with.';
  if (details.city.trim().length < 2) errors.city = 'Please enter your city.';
  if (!consent) errors.consent = 'Please confirm that Insure Secure may contact you.';
  return errors;
}
