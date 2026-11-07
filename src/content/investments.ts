import type { IconName } from './catalog';
import type { PhotoName } from './photos';

/** Lightweight list, safe to import into client components. */
export interface InvestmentItem {
  slug: string;
  name: string;
  icon: IconName;
  blurb: string;
  photo: PhotoName;
  position?: string;
}

export const investments: InvestmentItem[] = [
  { slug: 'mutual-funds', name: 'Mutual Funds', icon: 'trending-up', blurb: 'Equity, debt and hybrid funds, explained without the jargon.', photo: 'planning', position: '60% 50%' },
  { slug: 'sip', name: 'SIP (Systematic Investment Plan)', icon: 'repeat', blurb: 'Invest a fixed amount every month, automatically.', photo: 'couple', position: '60% 40%' },
  { slug: 'goal-based-investing', name: 'Goal-Based Investing', icon: 'target', blurb: 'A plan for education, a home or any big goal.', photo: 'mother', position: '60% 40%' },
  { slug: 'retirement-investing', name: 'Retirement Investing', icon: 'sunset', blurb: 'Build a fund now, and plan your income for later.', photo: 'retired', position: '50% 30%' },
  { slug: 'tax-saving-funds', name: 'Tax-Saving Funds (ELSS)', icon: 'receipt', blurb: 'Equity funds with a three-year lock-in and a possible tax benefit.', photo: 'coins' },
  { slug: 'debt-and-liquid-funds', name: 'Debt and Liquid Funds', icon: 'landmark', blurb: 'For shorter goals and money you may need sooner.', photo: 'coins' },
  { slug: 'nri-investing', name: 'Mutual Funds for NRIs', icon: 'plane', blurb: 'Investing in India while you live overseas.', photo: 'generations', position: '50% 20%' },
  { slug: 'portfolio-review', name: 'Investment Portfolio Review', icon: 'scan-search', blurb: 'A second look at the funds you already hold.', photo: 'planning', position: '60% 50%' },
];

export const findInvestment = (slug: string) => investments.find((i) => i.slug === slug);
export const investmentHref = (slug: string) => `/investments/${slug}/`;

/** Pairs life insurance pages with a related investment page. */
export const investmentForProduct: Record<string, string> = {
  'term-life-insurance': 'sip',
  'whole-life-insurance': 'goal-based-investing',
  'savings-life-insurance': 'mutual-funds',
  ulip: 'mutual-funds',
  'child-insurance-plan': 'goal-based-investing',
  'retirement-pension-plan': 'retirement-investing',
  'annuity-plan': 'retirement-investing',
};
