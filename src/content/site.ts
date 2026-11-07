/**
 * Single source of truth for business details.
 * Anything left null is either hidden on the site or, for regulatory details,
 * shown as a clearly marked "add before launch" placeholder.
 */
export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
}

export interface Insurer {
  name: string;
  /** Path under /public, only for logos the insurer has permitted. */
  logo?: string;
}

export const site = {
  name: 'Insure Secure',
  legalName: 'Insure Secure Financial Services',
  tagline: 'Protecting Your Future',
  description:
    'Insurance and mutual fund services in Jalandhar: health, life, motor, home, travel and business cover, plus SIPs and goal-based investing. Talk to Sakul Mahajan on WhatsApp or by phone.',
  /** Replace with the live domain before launch. Can also be set with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://insure-secure.example',
  advisor: {
    name: 'Sakul Mahajan',
    role: 'Founder',
    /** Path under /public, for example /images/sakul.webp */
    photo: null as string | null,
    /** Paragraphs supplied by the client. A neutral introduction is shown until then. */
    bio: null as string[] | null,
    experience: null as string | null,
  },
  phone: {
    display: '+91 79861 08922',
    e164: '+917986108922',
    whatsapp: '917986108922',
  },
  address: {
    line1: 'House No 511, Karol Bagh Road, near DIPS School',
    line2: 'Karol Bagh, Kot Ram Dass, Rail Vihar',
    city: 'Jalandhar',
    state: 'Punjab',
    postcode: '144001' as string | null,
    country: 'India',
    /** Finds the business's own Google listing. A plain address search pins DIPS School instead. */
    mapSearch: 'Insure Secure Financial Services, 511, Karol Bagh Rd, Jalandhar, Punjab 144001',
  },
  email: 'insuresecure1961@gmail.com' as string | null,
  hours: null as string | null,
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
  },
  /** Regulatory details. All three must be completed before launch. */
  licence: {
    type: null as string | null,
    registrationNumber: null as string | null,
    validUntil: null as string | null,
  },
  /**
   * Investment registrations. Selling mutual funds needs an AMFI registration (ARN).
   * Giving investment advice for a fee needs SEBI registration as an Investment Adviser.
   * Setting sebiRiaNumber changes how the site describes this role.
   */
  investments: {
    amfiArn: null as string | null,
    arnValidUntil: null as string | null,
    sebiRiaNumber: null as string | null,
  },
  /** Insurers represented, only with permission. The section stays hidden while empty. */
  insurers: [] as Insurer[],
  /** Genuine client reviews only, shared with permission. The section stays hidden while empty. */
  testimonials: [] as Testimonial[],
  /** Set to true once the client confirms consultations carry no charge. */
  freeConsultation: false,
} as const;

export function investmentRole(): string {
  return site.investments.sebiRiaNumber ? 'SEBI Registered Investment Adviser' : 'Mutual fund distributor';
}

export function fullAddress(): string {
  const { line1, line2, city, state, postcode } = site.address;
  return [line1, line2, city, postcode ? `${state} ${postcode}` : state].join(', ');
}

export function mapsQuery(): string {
  return encodeURIComponent(site.address.mapSearch);
}

export const telUrl = `tel:${site.phone.e164}`;
