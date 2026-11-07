/** Lightweight product list, safe to import into client components. */
export type CategoryId = 'health' | 'life' | 'motor' | 'home-travel' | 'business' | 'farm';

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  icon: IconName;
}

export type IconName =
  | 'heart-pulse' | 'users' | 'user-round' | 'activity' | 'shield-plus' | 'layers' | 'bandage'
  | 'umbrella' | 'landmark' | 'piggy-bank' | 'trending-up' | 'baby' | 'sunset' | 'wallet'
  | 'car' | 'bike' | 'truck' | 'home' | 'plane' | 'graduation-cap'
  | 'store' | 'factory' | 'flame' | 'ship' | 'hard-hat' | 'scale' | 'briefcase' | 'shield-check'
  | 'receipt' | 'construction' | 'hospital' | 'contact' | 'tractor' | 'beef' | 'wheat'
  | 'repeat' | 'target' | 'scan-search';

export const categories: Category[] = [
  { id: 'health', name: 'Health', blurb: 'Hospital bills, serious illness and accidents.', icon: 'heart-pulse' },
  { id: 'life', name: 'Life', blurb: 'Income protection, savings and retirement.', icon: 'umbrella' },
  { id: 'motor', name: 'Motor', blurb: 'Cars, two-wheelers and commercial vehicles.', icon: 'car' },
  { id: 'home-travel', name: 'Home and travel', blurb: 'Your home in India and your trips abroad.', icon: 'home' },
  { id: 'business', name: 'Business', blurb: 'Premises, goods, staff and liabilities.', icon: 'factory' },
  { id: 'farm', name: 'Farm', blurb: 'Tractors, livestock and crops.', icon: 'tractor' },
];

export interface CatalogItem {
  slug: string;
  name: string;
  category: CategoryId;
  icon: IconName;
  blurb: string;
}

export const catalog: CatalogItem[] = [
  // Health
  { slug: 'individual-health-insurance', name: 'Individual Health Insurance', category: 'health', icon: 'user-round', blurb: 'Your own hospital cover, with a cover amount that is not shared.' },
  { slug: 'family-floater-health-insurance', name: 'Family Floater Health Insurance', category: 'health', icon: 'users', blurb: 'One policy and one shared cover amount for the whole family.' },
  { slug: 'senior-citizen-health-insurance', name: 'Senior Citizen Health Insurance', category: 'health', icon: 'hospital', blurb: 'Health plans designed for parents and people over 60.' },
  { slug: 'critical-illness-insurance', name: 'Critical Illness Insurance', category: 'health', icon: 'activity', blurb: 'A lump sum if a listed serious illness is diagnosed.' },
  { slug: 'personal-accident-insurance', name: 'Personal Accident Insurance', category: 'health', icon: 'bandage', blurb: 'Pays out for accidental death or disability.' },
  { slug: 'super-top-up-health-insurance', name: 'Super Top-Up Health Insurance', category: 'health', icon: 'layers', blurb: 'Extra health cover that starts above a set deductible.' },
  // Life
  { slug: 'term-life-insurance', name: 'Term Life Insurance', category: 'life', icon: 'umbrella', blurb: 'High life cover that protects your family’s income.' },
  { slug: 'whole-life-insurance', name: 'Whole Life Insurance', category: 'life', icon: 'shield-plus', blurb: 'Life cover that can last well into old age.' },
  { slug: 'savings-life-insurance', name: 'Savings Life Insurance', category: 'life', icon: 'piggy-bank', blurb: 'Life cover combined with disciplined long-term saving.' },
  { slug: 'ulip', name: 'Unit Linked Insurance Plan (ULIP)', category: 'life', icon: 'trending-up', blurb: 'Life cover with returns linked to market funds.' },
  { slug: 'child-insurance-plan', name: 'Child Insurance Plan', category: 'life', icon: 'baby', blurb: 'Keeps your child’s education fund on track.' },
  { slug: 'retirement-pension-plan', name: 'Retirement and Pension Plan', category: 'life', icon: 'sunset', blurb: 'Builds a fund for the years after you stop working.' },
  { slug: 'annuity-plan', name: 'Annuity Plan', category: 'life', icon: 'wallet', blurb: 'Turns a lump sum into a regular income.' },
  // Motor
  { slug: 'car-insurance', name: 'Car Insurance', category: 'motor', icon: 'car', blurb: 'Third-party and comprehensive cover for your car.' },
  { slug: 'two-wheeler-insurance', name: 'Two-Wheeler Insurance', category: 'motor', icon: 'bike', blurb: 'Cover for your motorcycle or scooter.' },
  { slug: 'commercial-vehicle-insurance', name: 'Commercial Vehicle Insurance', category: 'motor', icon: 'truck', blurb: 'Cover for trucks, taxis, buses and goods carriers.' },
  // Home and travel
  { slug: 'home-insurance', name: 'Home Insurance', category: 'home-travel', icon: 'home', blurb: 'Protects the building and what is inside it.' },
  { slug: 'international-travel-insurance', name: 'International Travel Insurance', category: 'home-travel', icon: 'plane', blurb: 'Medical emergencies and travel problems abroad.' },
  { slug: 'student-travel-insurance', name: 'Student Travel Insurance', category: 'home-travel', icon: 'graduation-cap', blurb: 'Long-stay cover for students studying overseas.' },
  // Business
  { slug: 'shop-insurance', name: 'Shop Insurance', category: 'business', icon: 'store', blurb: 'One package for your shop, stock and takings.' },
  { slug: 'factory-insurance', name: 'Factory Insurance', category: 'business', icon: 'factory', blurb: 'Buildings, machinery and stock under one plan.' },
  { slug: 'fire-insurance', name: 'Fire Insurance', category: 'business', icon: 'flame', blurb: 'Fire and allied perils for property and stock.' },
  { slug: 'marine-cargo-insurance', name: 'Marine Cargo Insurance', category: 'business', icon: 'ship', blurb: 'Goods in transit by sea, air, road and rail.' },
  { slug: 'workmens-compensation-insurance', name: 'Workmen’s Compensation Insurance', category: 'business', icon: 'hard-hat', blurb: 'Employer liability for injuries to workers.' },
  { slug: 'liability-insurance', name: 'Public and Product Liability Insurance', category: 'business', icon: 'scale', blurb: 'Claims by third parties for injury or damage.' },
  { slug: 'professional-indemnity-insurance', name: 'Professional Indemnity Insurance', category: 'business', icon: 'briefcase', blurb: 'Claims arising from professional errors.' },
  { slug: 'cyber-insurance', name: 'Cyber Insurance', category: 'business', icon: 'shield-check', blurb: 'Data breaches, cyber attacks and online fraud.' },
  { slug: 'trade-credit-insurance', name: 'Trade Credit Insurance', category: 'business', icon: 'receipt', blurb: 'Protection when buyers do not pay.' },
  { slug: 'contractors-risk-insurance', name: 'Contractor’s Risk Insurance', category: 'business', icon: 'construction', blurb: 'Construction projects, from start to handover.' },
  { slug: 'group-health-insurance', name: 'Group Health Insurance', category: 'business', icon: 'contact', blurb: 'Health cover as an employee benefit.' },
  { slug: 'group-life-insurance', name: 'Group Life Insurance', category: 'business', icon: 'users', blurb: 'Life cover for your whole team.' },
  // Farm
  { slug: 'tractor-insurance', name: 'Tractor Insurance', category: 'farm', icon: 'tractor', blurb: 'Cover for tractors and farm vehicles.' },
  { slug: 'livestock-insurance', name: 'Livestock Insurance', category: 'farm', icon: 'beef', blurb: 'Protects the value of cattle and other animals.' },
  { slug: 'crop-insurance', name: 'Crop Insurance', category: 'farm', icon: 'wheat', blurb: 'Crop loss cover, subject to local availability.' },
];

export function productsIn(category: CategoryId): CatalogItem[] {
  return catalog.filter((p) => p.category === category);
}

export function findProduct(slug: string): CatalogItem | undefined {
  return catalog.find((p) => p.slug === slug);
}

export const productHref = (slug: string) => `/insurance/${slug}/`;

/** Everyday words people search for, in addition to the product name and description. */
const searchKeywords: Record<string, string> = {
  'individual-health-insurance': 'mediclaim hospital medical self personal',
  'family-floater-health-insurance': 'mediclaim hospital medical spouse wife husband children kids maternity',
  'senior-citizen-health-insurance': 'mediclaim parents mother father elderly old age retired nri',
  'critical-illness-insurance': 'cancer heart attack stroke kidney',
  'personal-accident-insurance': 'injury disability',
  'super-top-up-health-insurance': 'topup extra mediclaim deductible',
  'term-life-insurance': 'death family income protection breadwinner',
  'whole-life-insurance': 'inheritance legacy',
  'savings-life-insurance': 'endowment money back investment',
  ulip: 'investment market linked',
  'child-insurance-plan': 'kids education college son daughter',
  'retirement-pension-plan': 'old age income pension',
  'annuity-plan': 'pension monthly income retired',
  'car-insurance': 'motor vehicle auto third party comprehensive',
  'two-wheeler-insurance': 'bike motorcycle scooter scooty motor vehicle',
  'commercial-vehicle-insurance': 'truck bus taxi cab van lorry fleet transport motor',
  'home-insurance': 'house property flat burglary nri landlord tenant contents',
  'international-travel-insurance': 'abroad overseas foreign visa schengen canada usa uk australia trip nri',
  'student-travel-insurance': 'study abroad university college overseas visa canada uk australia',
  'shop-insurance': 'store retail showroom stock burglary',
  'factory-insurance': 'manufacturing plant machinery sports goods hand tools leather unit',
  'fire-insurance': 'flood property warehouse godown stock',
  'marine-cargo-insurance': 'export exports exporter import shipment shipping goods transit container',
  'workmens-compensation-insurance': 'labour labor workers employee staff employer injury',
  'liability-insurance': 'export exports product legal lawsuit third party',
  'professional-indemnity-insurance': 'doctor lawyer accountant ca architect consultant negligence',
  'cyber-insurance': 'hacking fraud ransomware data online scam',
  'trade-credit-insurance': 'export exports buyer unpaid invoice non-payment receivables',
  'contractors-risk-insurance': 'construction building project builder',
  'group-health-insurance': 'employee staff corporate company mediclaim team',
  'group-life-insurance': 'employee staff corporate company team',
  'tractor-insurance': 'farmer agriculture trailer farm',
  'livestock-insurance': 'cattle cow buffalo dairy animal farmer',
  'crop-insurance': 'farmer agriculture wheat rice paddy harvest',
};

/** Matches every search word against the start of a word, so "tractor" does not find "contractor". */
export function searchCatalog(query: string, category: CategoryId | 'all' = 'all'): CatalogItem[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return catalog.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    const words = `${p.name} ${p.blurb} ${p.category} ${searchKeywords[p.slug] ?? ''}`.toLowerCase().split(/[^a-z0-9]+/);
    return terms.every((t) => words.some((w) => w.startsWith(t.replace(/[^a-z0-9]/g, ''))));
  });
}
