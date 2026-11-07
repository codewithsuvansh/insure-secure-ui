import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  Activity, Baby, Bandage, Beef, Bike, Briefcase, Car, Construction, Contact, Factory, Flame, GraduationCap, HardHat,
  HeartPulse, House, Repeat, ScanSearch, Target, Hospital, Landmark, Layers, PiggyBank, Plane, Receipt, Scale, ShieldCheck, ShieldPlus, Ship, Store,
  Sunset, Tractor, TrendingUp, Truck, Umbrella, UserRound, Users, Wallet, Wheat,
} from 'lucide-react';
import type { IconName } from '@/content/catalog';

const map: Record<IconName, LucideIcon> = {
  'heart-pulse': HeartPulse, users: Users, 'user-round': UserRound, activity: Activity, 'shield-plus': ShieldPlus,
  layers: Layers, bandage: Bandage, umbrella: Umbrella, landmark: Landmark, 'piggy-bank': PiggyBank, 'trending-up': TrendingUp,
  baby: Baby, sunset: Sunset, wallet: Wallet, car: Car, bike: Bike, truck: Truck, home: House, plane: Plane,
  'graduation-cap': GraduationCap, store: Store, factory: Factory, flame: Flame, ship: Ship, 'hard-hat': HardHat, scale: Scale,
  briefcase: Briefcase, 'shield-check': ShieldCheck, receipt: Receipt, construction: Construction, hospital: Hospital,
  contact: Contact, tractor: Tractor, beef: Beef, wheat: Wheat, repeat: Repeat, target: Target, 'scan-search': ScanSearch,
};

export function ProductIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}

export function WhatsAppIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.89 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
    </svg>
  );
}
