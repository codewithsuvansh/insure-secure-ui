import type { PhotoName } from './photos';

export interface HeroOption {
  id: string;
  label: string;
  photo: PhotoName;
  /** Focal point for the crop inside the shield. */
  position: string;
  title: string;
  points: string[];
  href: string;
  linkLabel: string;
  message: string;
  /** Shown beneath the points, for market-linked options. */
  note?: string;
}

export const heroOptions: HeroOption[] = [
  {
    id: 'family',
    label: 'My family',
    photo: 'family',
    position: '50% 30%',
    title: 'Keep your family secure, whatever happens to you.',
    points: ['Term life cover to replace your income', 'Family floater health insurance', 'A plan for your child’s education'],
    href: '/insurance/term-life-insurance/',
    linkLabel: 'Explore family cover',
    message: 'Hello Insure Secure, I would like to protect my family. Could you help me with life and health cover?',
  },
  {
    id: 'health',
    label: 'Our health',
    photo: 'health',
    position: '62% 25%',
    title: 'Be ready for hospital bills before they arrive.',
    points: ['Individual and family health plans', 'Senior citizen cover for parents', 'Critical illness and super top-up'],
    href: '/insurance/family-floater-health-insurance/',
    linkLabel: 'Explore health cover',
    message: 'Hello Insure Secure, I would like to discuss health insurance for my family.',
  },
  {
    id: 'savings',
    label: 'My savings',
    photo: 'planning',
    position: '62% 50%',
    title: 'Give your savings a job, and a plan to match.',
    points: ['Monthly SIPs at an amount that suits you', 'Mutual funds for education, a home or retirement', 'A second look at the investments you already hold'],
    href: '/investments/',
    linkLabel: 'Explore investing',
    message: 'Hello Insure Secure, I would like to start investing and need some help getting started.',
    note: 'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.',
  },
  {
    id: 'car',
    label: 'My vehicle',
    photo: 'car',
    position: '50% 55%',
    title: 'Stay legal on the road, and protected when things go wrong.',
    points: ['Car and two-wheeler policies', 'Commercial vehicles and tractors', 'Help keeping your no claim bonus'],
    href: '/insurance/car-insurance/',
    linkLabel: 'Explore motor cover',
    message: 'Hello Insure Secure, I would like help with insurance for my vehicle.',
  },
  {
    id: 'home',
    label: 'My home',
    photo: 'home',
    position: '50% 45%',
    title: 'Protect the home you have worked so hard to build.',
    points: ['Building and contents cover', 'Fire, flood and burglary protection', 'Guidance on homes left empty by NRI families'],
    href: '/insurance/home-insurance/',
    linkLabel: 'Explore home cover',
    message: 'Hello Insure Secure, I would like to insure my home.',
  },
  {
    id: 'business',
    label: 'My business',
    photo: 'business',
    position: '72% 45%',
    title: 'Keep your business running after a setback.',
    points: ['Shop, factory and fire insurance', 'Marine cargo and trade credit for exporters', 'Group health and life for your team'],
    href: '/business/',
    linkLabel: 'Explore business cover',
    message: 'Hello Insure Secure, I would like to review insurance for my business.',
  },
  {
    id: 'travel',
    label: 'My travel',
    photo: 'travel',
    position: '70% 50%',
    title: 'Fly abroad knowing that help is covered.',
    points: ['Family and business travel plans', 'Long-stay cover for students', 'Cover for parents visiting relatives overseas'],
    href: '/insurance/international-travel-insurance/',
    linkLabel: 'Explore travel cover',
    message: 'Hello Insure Secure, I am planning a trip abroad and need travel insurance.',
  },
];
