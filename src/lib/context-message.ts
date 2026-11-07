import { catalog } from '@/content/catalog';
import { investments } from '@/content/investments';
import { messages } from './whatsapp';

/** Chooses the pre-filled WhatsApp message for the page a visitor is on. */
export function messageForPath(pathname: string): string {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const product = /^\/insurance\/([^/]+)\/$/.exec(path)?.[1];
  if (product) {
    const item = catalog.find((p) => p.slug === product);
    if (item) return messages.product(item.name);
  }
  const investment = /^\/investments\/([^/]+)\/$/.exec(path)?.[1];
  if (investment) {
    const item = investments.find((i) => i.slug === investment);
    if (item) return messages.investment(item.name);
  }
  if (path.startsWith('/investments/')) return messages.investing;
  if (path.startsWith('/tools/sip-calculator/') || path.startsWith('/tools/goal-planner/')) return messages.investing;
  if (path.startsWith('/nri-families/')) return messages.nri;
  if (path.startsWith('/business/')) return messages.business;
  if (path.startsWith('/claims/')) return 'Hello Insure Secure, I need help with an insurance claim.';
  if (path.startsWith('/tools/term-cover/')) return messages.product('Term Life Insurance');
  if (path.startsWith('/tools/health-cover/')) return messages.product('health insurance');
  if (path.startsWith('/tools/renewal-reminder/')) return 'Hello Insure Secure, I have a policy coming up for renewal and would like some help.';
  return messages.general;
}
